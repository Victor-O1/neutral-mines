import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        //DB is connnected
        await connectDB();

        // the req body is obtained
        const body = await request.json();
        const { id, dashboard } = body;
        const { date, emissions } = dashboard;

        // check if the user is present in the DB, if yes, pass the error
        const existingUser = await User.findByIdAndUpdate(id, { $set: { dashboard: dashboard } });

        if (existingUser) {
            console.log(existingUser);
        }
        else {
            return new NextResponse(JSON.stringify({ error: 'User not found.' }), { status: 400 });
        }

        const response = NextResponse.json({
            message: 'Dashboard updated successfully!',
            user: newUser,

        });

        return response;
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: "Error in creating user (POST) " + e.message }), { status: 500 });
    }
}