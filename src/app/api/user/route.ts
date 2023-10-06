import { createUser, fetchUsers, fetchUserByName } from "@/lib/planetScale";
import type { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: Request) => {
    const json = await req.json();
    const user = await createUser({
        name: json.name
    })

    return NextResponse.json(user);
}

export const GET = async (request: NextRequest) => {
    const nameParam = request.nextUrl.searchParams.get("name");
    var res
    if(nameParam){
        res = await fetchUserByName(nameParam)
    } else {
        res = await fetchUsers()
    }

    let json_response = {
        status: res.length ? "success" : "fail",
        results: res
    };
 
    return NextResponse.json(json_response)
}
