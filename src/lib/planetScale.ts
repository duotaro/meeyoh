import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/**
 *  Stamp
 */
export type User = {
    name: string
}

export async function createUser(params: User) {
    return await prisma.user.create({data: params});
}
export async function fetchUserByName(name:string) {
    return await prisma.user.findMany({where: {
        name: name
      }});
}
export async function fetchUsers() {

    return await prisma.user.findMany({});
}

/**
 *  Stamp
 */
export type Stamp = {
    name: string
    path: string
}

export async function createStamp(params: Stamp) {
    return await prisma.stamp.create({data: params});
}
export async function fetchStamps() {
    return await prisma.stamp.findMany({});
}

/**
 *  UserStamp
 */
export type UserStamp = {
    title: string
    description: string
    user_id: number
    stamp_id: number
    stamped_at: Date
    todo_id: number
}

export async function createUserStamp(params: UserStamp) {
    return await prisma.userStamp.create({data: params});
}
export async function fetchUserStamps() {
    return await prisma.userStamp.findMany({});
}

/**
 *  Todo
 */
export type Todo = {
    title: string
    description?: string
    user_id: number
    scheduled_at: Date
    complete: boolean
    completed_at?: Date
}

export async function createTodo(params: Todo) {
    return await prisma.todo.create({
        data: {
            title: params.title,
            description: params.description,
            user_id: params.user_id,
            scheduled_at: params.scheduled_at,
            complete: false,
            completed_at: null,//params.scheduled_at,
        }
    });
}
export async function updateTodo(id:number, params: Todo) {
    return await prisma.todo.update({where: {
        id: id,
      }, 
      data: {
          id:id,
          title: params.title,
          description: params.description,
          user_id: params.user_id,
          scheduled_at: params.scheduled_at,
          complete: false,
          completed_at: null,//params.scheduled_at,
      }
    });
}
export async function deleteTodo(id:number){
    prisma.todo.delete({
        where: {
            id: id,
        },
    })
}
export async function fetchTodo(userId:number) {
    return await prisma.todo.findMany({where: {
        user_id: userId
    }});
}