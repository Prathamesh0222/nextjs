import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: {
    params: {
        authRoute: string[];
    }
}) {
    console.log(params.authRoute);
    return NextResponse.json({
        message: "Hello from the API"
    })
}

export function POST(req:NextRequest){
    return NextResponse.json({
        message:"asdasd",
    })
}