"use client";

import React, { Dispatch, createContext, useReducer, useContext, useEffect } from "react";
import { initializeFirebaseApp, firebaseConfig } from '../lib/firebase'
import { getAuth, User, onAuthStateChanged, Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import Loading from "@/component/common/loading";
import { FirebaseApp } from "firebase/app";
import { CATEGORY_ALL } from "@/utils/const";

type StateType = {
  firebase?: FirebaseApp | null;
  firebaseAuth?: Auth | null;
  firebaseStorage:FirebaseStorage | null;
  user: User | null;
  loading: boolean;
  categoryFilter: string;
};

type ActionType = {
  type: string;
  value: any;
};

const initialState: StateType = {
  firebase: null,
  firebaseAuth: null,
  firebaseStorage: null,
  user: null,
  loading : false,
  categoryFilter: CATEGORY_ALL
};

export const INIT_FIREBASE_APP =  'INIT_FIREBASE_APP';
export const INIT_FIREBASE_AUTH = 'INIT_FIREBASE_AUTH';
export const INIT_FIREBASE_STORAGE = 'INIT_FIREBASE_STORAGE';
export const SET_FIREBASE_APP = 'SET_FIREBASE_APP'
export const SET_USER =  'SET_USER';
export const SET_FIREBASE_AUTH = 'SET_FIREBASE_AUTH';
export const SET_FIREBASE_STORAGE = 'SET_FIREBASE_STORAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_CATEGORY = 'SET_CATEGORY';

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case INIT_FIREBASE_APP:
        return { ...state, firebase: initializeFirebaseApp(firebaseConfig) };
    case INIT_FIREBASE_AUTH:
        return { ...state, firebaseAuth: null } 
    case INIT_FIREBASE_STORAGE:
        return { ...state, firebaseStorage: null } 
    case SET_FIREBASE_APP:
        return { ...state, firebase: action.value } 
    case SET_FIREBASE_AUTH:
        return { ...state, firebaseAuth: action.value } 
    case SET_FIREBASE_STORAGE:
        return { ...state, firebaseStorage: action.value } 
    case SET_USER:
        return { ...state, user: action.value } 
    case SET_LOADING:
        return { ...state, loading: action.value } 
    case SET_CATEGORY:
        return { ...state, categoryFilter: action.value } 
    default:
        return state;
  }
};

export const FirebaseContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const FirebaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      if(state.firebase){
        const auth = getAuth(state.firebase)
        return onAuthStateChanged(auth, (user) => {
          dispatch({type: SET_USER, value: user})
        })
      }
    } catch (error) {
      dispatch({type: SET_USER, value: null})
      throw error
    }
  }, [])

  return (
    <>
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
    {state.loading && <Loading></Loading>}
    </>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext)