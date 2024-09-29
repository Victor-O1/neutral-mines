"use client";

import React from 'react'
import MapDashboard from './MapDashboard';


// const user = {
//     id: "USER12345678",
//     name: "Priyesh Kumar Jha",
//     companyName: "GreenCoal Plant",
//     location: {
//         place: "Bangalore, India",
//         coordinates: [12.9716, 77.5946] // Bangalore, India (longitude, latitude)
//     },
//     governmentId: "GOV12345678",
//     environmentalLicenseNumber: "ELN98765432",
//     createdAt: "2024-09-08T10:15:30.000Z",
//     updatedAt: "2024-09-08T10:15:30.000Z"
// }



const Detail = ({ user }) => {
    return (
        <div className="flex gap-3 border">


            <div className="flex flex-col  m-4 p-4  border">
                <div className="text-6xl mb-6">Welcome <div className="inline text-red-500">{user.name}</div></div>
                <div className="text-3xl text-gray-400">{user.companyName}</div>
                <div className="text-xl text-gray-400 mb-4">{user.location.place}</div>
                <div>
                    <div>Government ID:  <div className="inline text-gray-400">{user.governmentId}</div></div>
                    <div>Environmental License Number:  <div className="inline text-gray-400">{user.environmentalLicenseNumber}</div></div>

                </div>

            </div>
            <div className="w-full m-4  rounded-xl overflow-clip">
                <MapDashboard user={user} />
            </div>
        </div>
    )
}

export default Detail