import connectDB from "@/lib/connectDB"
import User from "@/lib/models/User"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import cookie from 'cookie';

export const GET = async () => {
    try {
        await connectDB()
        const users = await User.find()
        return new NextResponse(JSON.stringify(users), { status: 200 })
    }
    catch (e) {
        console.log("Error in fetching users (GET) " + e.message, { status: 500 });
    }
}


export const POST = async (request) => {
    try {
        // const body = await request.json();
        // await connectDB();
        // const newUser = new User(body);
        // await newUser.save();
        // console.log(request.cookies.get("token"));
        // return new NextResponse(JSON.stringify({ message: "User was created", user: newUser }), { status: 201 }, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Set-Cookie": "token=cool"
        //     }
        // });

        await connectDB(); //DB is connnected

        const body = await request.json();  // the req body is obtained
        const { name, companyName, location, governmentId, environmentalLicenseNumber } = body;

        const existingUser = await User.findOne({ governmentId });

        if (existingUser) {
            return new NextResponse(JSON.stringify({ error: 'Government ID already exists.' }), { status: 400 });
        }
        // Create a new user in the database
        const newUser = await User.create({
            name,
            companyName,
            location,
            governmentId,
            environmentalLicenseNumber,
            data: { token: "jwt-token", userName: name }
        });

        // Generate a fake token for demonstration
        const token = '37y4heqnfu8rhrun3r';

        // Set cookies for token and username
        const response = NextResponse.json({
            message: 'User created successfully!',
            user: newUser,
            token,
        });

        // Setting cookie headers
        response.cookies.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
        response.cookies.set('userName', newUser.name, { maxAge: 60 * 60 * 24 * 7 });
        response.cookies.set('userName', newUser, { maxAge: 60 * 60 * 24 * 7 });

        return response;
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: "Error in creating user (POST) " + e.message }), { status: 500 });
    }
}