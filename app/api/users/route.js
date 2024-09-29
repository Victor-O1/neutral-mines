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


        //DB is connnected
        await connectDB();

        // the req body is obtained
        const body = await request.json();
        const { name, companyName, location, governmentId, environmentalLicenseNumber, dashboard } = body;

        // check if the user is present in the DB, if yes, pass the error
        const existingUser = await User.findOne({ governmentId });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ error: 'Government ID already exists.' }), { status: 400 });
        }
        // if no, create a new user in the database
        const newUser = await User.create({
            name,
            companyName,
            location,
            governmentId,
            environmentalLicenseNumber,
            dashboard,
            // data: { token: "jwt-token", userName: name }
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
        // response.cookies.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
        // response.cookies.set('userName', newUser.name, { maxAge: 60 * 60 * 24 * 7 });
        response.cookies.set('_id', newUser._id, { maxAge: 60 * 60 * 24 * 7 });

        return response;
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: "Error in creating user (POST) " + e.message }), { status: 500 });
    }
}


// export const PUT = async (request) => {
//     try {
//         const body = await request.json();
//         await connectDB();
//         const { dashboard, _id } = body;
//         const existingUser = await User.findByIdAndUpdate(_id, { $set: { dashboard } });
//         if (existingUser) {
//             console.log(existingUser);
//         }
//         else {
//             return new NextResponse(JSON.stringify({ error: 'User not found.' }), { status: 400 });
//         }
//     }

//     catch (e) {
//         console.log("Error in updating user (PUT) " + e.message, { status: 500 });
//     }
// }

// export const PUT = async (request) => {
//     try {
//         await connectDB(); // Connect to MongoDB

//         const body = await request.json(); // Parse the request body
//         const { _id, updates } = body; // Destructure the _id and updates from the body

//         // Check if _id is provided
//         if (!_id) {
//             return new NextResponse(JSON.stringify({ error: 'User ID not provided' }), { status: 400 });
//         }

//         // Update user by ID and apply the new dashboard data
//         const updatedUser = await User.findByIdAndUpdate(_id, { $set: updates }, { new: true });

//         // If user is not found, return a 404 response
//         if (!updatedUser) {
//             return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
//         }

//         // Return success response with the updated user data
//         return new NextResponse(JSON.stringify({
//             message: 'User updated successfully!',
//             user: updatedUser,
//         }), { status: 200 });
//     } catch (error) {
//         return new NextResponse(JSON.stringify({
//             error: 'Error updating user: ' + error.message,
//         }), { status: 500 });
//     }
// };


export const PUT = async (request) => {
    try {
        await connectDB();
        // const { _id, dashboard } = req.body;
        // Get the data from the request body
        const { _id, dashboard } = await request.json();

        // Update the user by pushing the new dashboard entry to the dashboard array
        const updatedUser = await User.findByIdAndUpdate(
            _id, // User's ID
            { $push: { dashboard: dashboard } }, // Push the new entry
            { new: true } // Return the updated user
        );

        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
