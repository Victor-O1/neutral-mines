"use client"
import React, { useState } from 'react'
import icon from "../../public/images/icons.svg"
import icon1 from "../../public/images/icons1.svg"
import Image from 'next/image'
import Link from 'next/link'
import { Hamburger } from '@/components/hamburger'
import StaggeredDropDown from '@/components/Dropdown'
import { HamburgerMenuPage } from '@/components/ham'
import { ModeToggle } from '@/components/ui/togglemode'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import menu from "../../public/menu.svg"
import ham from "../../public/ham.png"
import Cookies from "js-cookie";



const Navbar = () => {
    const user = Cookies.get("_id")
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isOpen, setisOpen] = useState(false)
    return (
        <div className="flex flex-col">

            <div className="sm:h-[130px]  w-full flex justify-between p-2 ">
                <div className="w-[5vh]">
                    <Link href="/">
                        <div className="sm:w-[50px] sm:h-[50px] ">
                            {theme === "dark" ? <Image src={icon1} alt="icon" className="" /> :
                                <Image src={icon} alt="icon" className="" />}
                        </div>
                        <div className="flex justify-between">
                            <div className="px-4 sm:text-5xl">Neutral<span className="text-red-500">MINE</span></div>

                        </div> </Link>
                </div>



                <div className={`xl:flex xl:w-auto gap-9 text-3xl p-[50px] hidden`}>
                    <Link href="/mines" className={`hover:text-red-500 ${pathname === "/mines" ? "text-red-500" : ""}`}>Mines</Link>
                    <Link href="/calculate" className={`hover:text-red-500 ${pathname === "/calculate" ? "text-red-500" : ""}`}>Calculate</Link>
                    <Link href="/news" className={`hover:text-red-500 ${pathname === "/news" ? "text-red-500" : ""}`}>News</Link>
                    {/* <Link href="/dashboard" className={`hover:text-red-500 ${pathname === "/dashboard" ? "text-red-500" : ""}`}>Dashboard</Link> */}
                    <Link href="/about" className={` hover:text-red-500 ${pathname === "/about" ? "text-red-500" : ""}`}>About</Link>
                    {user ? <Link href="/dashboard" className={` hover:text-red-500 ${pathname === "/dashboard" ? "text-red-500" : ""}`}>Dashboard</Link> : <Link href="/signin" className={` hover:text-red-500 ${pathname === "/signin" ? "text-red-500" : ""}`}>Sign In</Link>}
                    <ModeToggle />
                </div>
                <div className={`xl:hidden p-[50px] `} onClick={() => { setisOpen((prev) => !prev) }}>
                    {theme == "dark" ?
                        <Image src={ham} alt="menu" width={32} height={32} className="inline-block cursor-pointer xl:hidden" /> :
                        <Image src={menu} alt="menu" width={32} height={32} className="inline-block cursor-pointer xl:hidden" />}
                    {/* <StaggeredDropDown /> */}
                    {/* <HamburgerMenuPage /> */}


                </div>
            </div>



            {isOpen ? (
                <div className="xl:hidden w-full flex flex-col m-4">
                    <div className="px-2 pt-2 pb-3 flex flex-col justify-between items-center text-3xl gap-4 space-y-1 sm:px-3">
                        <Link href="/mines" className={`hover:text-red-500 ${pathname === "/mines" ? "text-red-500" : ""}`}>Mines</Link>
                        <Link href="/calculate" className={`hover:text-red-500 ${pathname === "/calculate" ? "text-red-500" : ""}`}>Calculate</Link>
                        <Link href="/dashboard" className={`hover:text-red-500 ${pathname === "/dashboard" ? "text-red-500" : ""}`}>Dashboard</Link>
                        <Link href="/about" className={`hover:text-red-500 ${pathname === "/about" ? "text-red-500" : ""}`}>About Us</Link>
                        <Link href="/signup" className={` hover:text-red-500 ${pathname === "/signup" ? "text-red-500" : ""}`}>SignUp</Link>
                        {/* <ModeToggle /> */}
                    </div>
                </div>) : null}



        </div>
    )
}

export default Navbar