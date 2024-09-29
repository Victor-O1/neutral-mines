import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import mine1 from "../../../public/minespics/1.jpg"

import React from 'react'
import Image from "next/image"
import Link from "next/link"

const MiniCard2 = async ({ mines }) => {
    // mines = JSON.parse(mines);
    // const imageLink = await getImageFromWeb(mines.Mine_Name)
    return (
        <Link href={`/mines/${mines.Mine_ID}`}>
            <div className="p-3 rounded-xl flex flex-col w-100 h-100  transition-transform transform hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300">
                <div className="text-3xl pt-2 ">
                    {mines.Mine_Name}
                </div>
                <div className="text-gray-500 pb-1">
                    {mines.State}
                </div>
                <div className="flex flex-col lg:flex-row gap-4">

                    <div className=" rounded-xl  overflow-clip">
                        <Image src={`/minespics/${mines.Mine_ID}.jpg`} width={500} height={200} alt="mine1" />
                    </div>

                    <div className=" flex flex-col gap-1">
                        <div className=" flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">Methane Emissions</div><div>{mines.Methane_Emissions}</div></div>
                        <div className=" flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">CO<sub>2</sub> Emissions </div><div>{mines.CO2_Emissions}</div></div>
                        {/* <div className="flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">Fugitive Emissions</div><div>{mines.Fugitive_Emissions}</div></div> */}
                    </div>
                    <div className=" flex flex-col gap-1">
                        <div className=" flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">Fugitive Emissions</div><div>{mines.Fugitive_Emissions}</div></div>
                        <div className=" flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">Coal Production  </div><div>{mines.Coal_Production}</div></div>
                        {/* <div className="flex flex-col gap-1 border p-3 rounded-md"><div className="text-red-500">Fugitive Emissions</div><div>{mines.Fugitive_Emissions}</div></div> */}
                    </div>
                </div>
                <div className="text-md py-3">
                    {mines.Description}
                </div>
            </div>
        </Link>
    )
}

export default MiniCard2

/*
<Card>
                <CardHeader>
                    <CardTitle>{mines.Mine_Name}</CardTitle>
                    <CardDescription>{mines.State}</CardDescription>
                    <CardDescription className="py-2">{mines.Mine_Type} mine</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="rounded-full border p-3">
                            CO<sub>2</sub> emision: {mines.CO2_Emissions}
                        </div>
                    </div>
                    <div className="w-[300px] overflow-clip rounded-xl">
                        <Image src={mine1} alt="mine1" className="w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
*/