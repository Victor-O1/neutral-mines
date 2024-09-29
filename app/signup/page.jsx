"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { redirect } from "next/navigation";

// Zod schema for validation
const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    companyName: z.string().min(1, { message: "Company name is required" }),
    place: z.string().min(1, { message: "Location place is required" }),
    longitude: z.number().min(-180, { message: "Invalid longitude" }),
    latitude: z.number().min(-90, { message: "Invalid latitude" }),
    governmentId: z.string().min(1, { message: "Government ID is required" }),
    environmentalLicenseNumber: z.string().min(1, { message: "License number is required" }),
});

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [name, setname] = useState(null)
    const [company, setcompany] = useState(null)
    const [place, setplace] = useState(null)
    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)
    const [governmentId, setgovernmentId] = useState(null)
    const [licenseNumber, setlicenseNumber] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setuserId] = useState(null)

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);


        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    companyName: company,
                    location: {
                        place: place,
                        coordinates: [latitude, longitude],
                    },
                    governmentId: governmentId,
                    environmentalLicenseNumber: licenseNumber,
                    // dashboard: dashboard
                }),
            });

            const data = await response.json();

            // if (data.user){
            //     setuserId(data.user._id);
            // }

            const id = getCookie('_id');
            if (id) {
                setuserId(id);
                console.log(id);

            }
            if (data.error) {
                alert("Error: " + data.error);
                return;
            }
            console.log('Response:', data);
            // Store cookies (you can store tokens or user info)
            // Cookies.set("token", response.data.token, { expires: 7 }); // 7 days expiry
            // Cookies.set("userName", response.data.user.name, { expires: 7 });

            alert("Sign up successful!");

        } catch (err) {
            console.error("Sign-up error", err);
            setError("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
            // redirect("/dashboard");
        }
    };

    return (
        <div className="backgroundradial-gradient relative min-h-screen flex items-center justify-center p-4">
            {/* Background shapes */}
            <div id="radius-shape-1" className="absolute rounded-full"></div>
            <div id="radius-shape-2" className="absolute rounded-full"></div>

            <div className="bg-glas p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Input type="text" {...register("name")} value={name} onChange={(e) => setname(e.target.value)} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Company Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <Input type="text" {...register("companyName")} value={company} onChange={(e) => setcompany(e.target.value)} />
                        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                    </div>

                    {/* Location Place Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location (Place)</label>
                        <Input type="text" {...register("place")} value={place} onChange={(e) => setplace(e.target.value)} />
                        {errors.place && <p className="text-red-500 text-sm">{errors.place.message}</p>}
                    </div>

                    {/* Longitude Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Longitude</label>
                        <Input type="number" step="any" {...register("longitude", { valueAsNumber: true })} value={longitude} onChange={(e) => setlongitude(e.target.value)} />
                        {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
                    </div>

                    {/* Latitude Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Latitude</label>
                        <Input type="number" step="any" {...register("latitude", { valueAsNumber: true })} value={latitude} onChange={(e) => setlatitude(e.target.value)} />
                        {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
                    </div>

                    {/* Government ID Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Government ID</label>
                        <Input type="text" {...register("governmentId")} value={governmentId} onChange={(e) => setgovernmentId(e.target.value)} />
                        {errors.governmentId && <p className="text-red-500 text-sm">{errors.governmentId.message}</p>}
                    </div>

                    {/* Environmental License Number Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Environmental License Number</label>
                        <Input type="text" {...register("environmentalLicenseNumber")} value={licenseNumber} onChange={(e) => setlicenseNumber(e.target.value)} />
                        {errors.environmentalLicenseNumber && <p className="text-red-500 text-sm">{errors.environmentalLicenseNumber.message}</p>}
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <div>
                        Already have an account <Link href="/signin" className="underline bold">Sign In</Link>
                    </div>
                    <div onClick={(e) => {

                        setname("Priyesh Kumar Jha");
                        setcompany("GreenCoal Plant")
                        setplace("Bangalore, India")
                        setlongitude(77.5946);
                        setlatitude(12.9716)
                        setgovernmentId("GOV12345678")
                        setlicenseNumber("ELN98765432")
                    }}>.</div>
                </form>
            </div>

            {/* Tailwind styles and custom CSS */}
            <style jsx>{`
        .background-radial-gradient {
          background-color: hsl(218, 41%, 15%);
          background-image: url('https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_9eaf61eb-311d-49fc-b703-a2477a59d2ce.jpg');
          background-size: cover;
          background-position: center;
        }
        
        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#2820be8c, #6bafd3);
          overflow: hidden;
        }
        
        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#2820be8c, #6bafd3);
          overflow: hidden;
        }
        
        .bg-glass {
          background-color: hsla(0, 0%, 100%, 0.9);
          backdrop-filter: saturate(200%) blur(25px);
        }
      `}</style>
        </div>
    );
}
