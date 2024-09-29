"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import Link from "next/link";

// Define the login form schema (you can add validation if needed)
export default function Login() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/login", data);

            // Store cookies (tokens or user data)
            Cookies.set("token", response.data.token, { expires: 7 });
            Cookies.set("userName", response.data.user.name, { expires: 7 });

            alert("Login successful!");
        } catch (err) {
            console.error("Login error", err);
            setError("Invalid login credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="backgroundadial-gradient relative min-h-screen flex items-center justify-center p-4">
            {/* Background shapes */}
            <div id="radius-shape-1" className="absolute rounded-full"></div>
            <div id="radius-shape-2" className="absolute rounded-full"></div>

            <div className="bg-glas p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Government ID Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Government ID</label>
                        <Input type="text" {...register("governmentId")} required />
                    </div>

                    {/* Environmental License Number Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Environmental License Number</label>
                        <Input type="text" {...register("environmentalLicenseNumber")} required />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    <div>
                        Don't have an account <Link href="/signup" className="underline bold">Sign Up</Link>
                    </div>
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
