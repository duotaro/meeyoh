import { createTodo, createUser, Todo } from "@/lib/planetScale";
import { UserEntity } from "@/utils/entity";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    try {
        const json = await req.json()// as Todo;
        console.log(json)
        const todo = await createTodo(json)
        //

        //const user = await createUser({name:crypto.randomUUID()})

        return NextResponse.json(todo);
    } catch(error:any){

        let error_response = {
            status: "error",
            message: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


