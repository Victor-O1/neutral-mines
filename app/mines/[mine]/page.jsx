
import React from 'react'
import { MineCard } from '../_components/MineCard'
// import { useParams } from 'next/navigation'


const getMines = async () => {
    const res = await fetch("http://localhost:3000/api/mines")
    const data = res.json();
    return data;

}


const Mine = async ({ params }) => {
    const min = await getMines();
    const mines = min.mine
    // const { mineId } = useParams();
    console.log(JSON.stringify(mines))
    return (
        <div>
            <MineCard mines={mines[params.mine - 1]} />
        </div>
    )
}

export default Mine 