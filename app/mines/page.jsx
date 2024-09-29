
// "use client"
// import React, { useEffect, useState } from 'react'
import { MineCard } from './_components/MineCard';
import MiniCard from './_components/MiniCard';
import MiniCard2 from './_components/MiniCard2';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from "axios";


const getMines = async () => {
    const res = await fetch("http://localhost:3000/api/mines")
    const data = res.json();
    return data;

}
const Page = async () => {
    const min = await getMines();
    const mines = min.mine
    // console.log(mines[0]);

    return (
        <>

            {/* {JSON.stringify(mines)} */}
            <div className="flex p-4 gap-4 justify-center mr-10">
                {/* {JSON.stringify(mines)} */}
                <Input type="text" className="mx-10 p-4" placeholder="Search..." />
                <Button className="p-4">Search</Button>
                <Button className="p-4">Filter</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-4 m-4">
                {mines.map((el) => {
                    return <div key={el._id}><MiniCard2 mines={el} /></div>
                })}

            </div>
            {/* <MineCard mines={mines[0]} /> */}
        </>
    )
}

export default Page