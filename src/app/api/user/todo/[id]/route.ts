import { fetchTodo, deleteTodo, updateTodo, Todo } from "@/lib/planetScale";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: { id: number }}) => {
    console.log("aaa")
    if(!params.id){
        return NextResponse.json({})
    }
    console.log("bbb")
    const res = await fetchTodo(Number(params.id))

    let json_response = {
        status: res.length ? "success" : "fail",
        results: res
    };
 
    return NextResponse.json(json_response)
}

export const PATCH = async (req: Request, { params }: { params: { id: number }}) => {
    if(!params.id){
        return NextResponse.json({})
    }
    const json = await req.json()// as Todo;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh")
    console.log(json)
    try {
        const user = await updateTodo(params.id, json)
        return NextResponse.json(user);
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

export const DELETE = async (req: Request, { params }: { params: { id: number }}) => {
    if(!params.id){
        return NextResponse.json({})
    }
    try {
        await deleteTodo(params.id)
        return new NextResponse(null, { status: 204 });
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