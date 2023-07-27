import { MEE_NAME, YOH_NAME } from "./const";
import moment from "moment";
moment.locale('ja')

import {YYYY_MM_DD_FORMAT, getMomentDate, formatDate, getDiff} from "@/utils/date";
import ENV from "./env";

export const MEE_BIRTHDAY = ENV.MEE_BIRTHDAY
export const YOH_BIRTHDAY = ENV.YOH_BIRTHDAY

/**
 * 年齢をmomentとして取得します
 * @param {*} who 
 * @param {*} format 
 * @returns 
 */
export function getBirthdayMoment(name:string) {
  const birthday = name == MEE_NAME ? MEE_BIRTHDAY : YOH_BIRTHDAY
  if (birthday) {
    return getMomentDate(birthday)
  }
  return undefined
}

/**
 * 年齢を取得します
 */
export function getAge(name:string) {
  const birthday = getBirthdayMoment(name)
  if(!birthday){
    return undefined
  }
  return getMomentDate().diff(birthday, 'years');
}

/**
 * 次の年齢を取得します
 */
export function getNextAge(name:string) {
    const age = getAge(name)
    if(!age){
      return undefined
    }
    return age+1
  }

/**
 * 生まれてからの日数を取得します
 * 
 */
export function getLifeDays(name:string) {
  const birthday = getBirthdayMoment(name)
  if(!birthday){
    return undefined
  }
  return getMomentDate().diff(birthday, 'days');
}

/**
 * 次の誕生日を取得します
 * 
 */
 export function getNextBirthday(name:string) {
  const birthday = getBirthdayMoment(name)
  if(!birthday){
    return undefined
  }
  const now = moment();
  const thisBirthday = birthday.year(now.year())
  let nextBirthday;
  if(now.isSameOrAfter(thisBirthday)){
    nextBirthday = thisBirthday.add(1, 'year')
  } else {
    nextBirthday = thisBirthday
  }
  return nextBirthday;
}

/**
 * 次の誕生日を取得します
 * 
 */
export function getLatestBirthday(name:string) {
    const nextBirthday = getNextBirthday(name)
    if(!nextBirthday){
      return undefined
    }
    return nextBirthday.add(-1, 'year')
  }


/**
 * 次の年齢までの日数を取得します
 * @param {*} who 
 */
export function getToBirthday(name:string) {
  const nextBirthday = getNextBirthday(name)
  if(!nextBirthday){
    return undefined
  }
  return getDiff(nextBirthday, moment(), 'days', false)
}