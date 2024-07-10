
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const client = new PrismaClient();

export async function GET(req: NextRequest) {

    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({
                message: "Empty request body"
            }, {
                status: 400
            });
        }

        console.log("Request body:", body);

        const validateBody = signInSchema.safeParse(body);

        if (!validateBody.success) {
            console.error("Validation errors:", validateBody.error);
            return NextResponse.json({
                message: "Invalid body",
                errors: validateBody.error.errors
            }, {
                status: 400
            });
        }

        const result = await client.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        console.log(result);

        if (!result) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 400
            })
        }

        return NextResponse.json({
            message: "User logged in successfully",
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message: "User login failed"
        }, {
            status: 400
        })
    }
}

export async function POST(req: NextRequest) {

    const body = await req.json();
    const signUpSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    try {
        const validateBody = signUpSchema.safeParse(body);

        if (!validateBody.success) {
            return NextResponse.json({
                message: "Invalid body"
            }, {
                status: 400
            })
        }

        const existingUser = await client.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists"
            }, {
                status: 400
            })
        }

        const result = await client.user.create({
            data: {
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName
            }
        })
        if (!result) {
            return NextResponse.json({
                message: "User creation error"
            }, {
                status: 400
            })
        }

        return NextResponse.json({
            message: "User created successfully",
        })

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message: "User creation failed"
        }, {
            status: 400
        })
    }
}


