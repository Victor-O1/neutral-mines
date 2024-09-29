import connectDB from "@/lib/connectDB";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
export const GET = async (request) => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Get the cookies from the request (not document.cookie as this is server-side)
        const cookies = request.cookies.get('_id');  // Get _id from cookies
        const userId = cookies?.value; // Extract the value of the cookie

        // Check if userId exists
        if (!userId) {
            return new NextResponse(JSON.stringify({ error: 'User ID not found in cookies' }), { status: 400 });
        }

        // Fetch the user by the ID from the database
        const existingUser = await User.findById(userId);

        // If user is not found, return an appropriate response
        if (!existingUser) {
            return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Return the existing user data in the response
        return new NextResponse(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        // Return error message with proper status code
        return new NextResponse(JSON.stringify({ error: "Error in fetching user: " + error.message }), { status: 500 });
    }
};