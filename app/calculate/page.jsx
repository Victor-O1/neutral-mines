"use client"
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { Extraction } from './_components/extraction'
import { Transportation } from './_components/transportation'
import { Input } from '@/components/ui/input'
import { Processing } from './_components/processing'
import { Blasting } from './_components/blasting'
import { Handling } from './_components/handling'
import CalendarEl from './_components/calender'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Energy from './_components/energy'
import { Earth, TreeDeciduous, TreePalm } from 'lucide-react'
import PieChart from './_components/PieChart'
import axios from 'axios'
import { redirect } from 'next/navigation'
// import { useRouter } from 'next/router'

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};




const Calculation = () => {
    // const router = useRouter()
    const [emission, setemission] = useState({})
    const [emissionnum, setemissionnum] = useState(0)
    const [tonnes, settonnes] = useState(null)
    const [km, setkm] = useState(null)
    const [date, setdate] = useState({})
    const [diff, setdiff] = useState(null)

    const putter = async () => {
        try {
            const id = getCookie('_id');
            const response = await axios.put('http://localhost:3000/api/users', {
                _id: id,  // Replace with the actual user ID
                dashboard: {
                    date: [date.from, date.to],
                    emissions: {
                        extraction: emission.extraction * tonnes,
                        processing: emission.processing * tonnes,
                        transportation: emission.transportation * km,
                        blasting: emission.blasting * tonnes,
                        handling: emission.handling * tonnes
                    }


                }
            });
            console.log('Update successful:', response.data);
            // router.push("/")
            // redirect("/dashboard")
            // const response = await fetch('http://localhost:3000/api/users', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         id: getCookie(id),
            //         // name: name,
            //         // companyName: company,
            //         // location: {
            //         //     place: place,
            //         //     coordinates: [latitude, longitude],
            //         // },
            //         // governmentId: governmentId,
            //         // environmentalLicenseNumber: licenseNumber,
            //         dashboard: {
            //             date: [date[0], date[1]],
            //             emissions: {
            //                 extraction: emission.extraction,
            //                 processing: emission.processing,
            //                 transportation: emission.transportation,
            //                 blasting: emission.blasting,
            //                 handling: emission.handling
            //             }
            //         }

            //     }),
            // })

            // const data = await response.json();

            // if (data) {
            //     console.log("yay");
            // }
            // else {
            //     console.log("dashboard not working");
            // }
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        console.log(emission)
        setemissionnum(Math.round((((isNaN(emission.extraction) ? 0 : emission.extraction) * tonnes) + ((isNaN(emission.transportation) ? 0 : emission.transportation) * km) + ((isNaN(emission.processing)) ? 0 : emission.processing) + ((isNaN(emission.blasting) ? 0 : emission.blasting) * tonnes) + ((isNaN(emission.handling) ? 0 : emission.handling) * tonnes) + ((isNaN(emission.energy) ? 0 : emission.energy) * tonnes)) * 1000) / 1000)
    }, [tonnes, km, emission])

    useEffect(() => {
        console.log("emissionnum is ", emissionnum)
    }, [emissionnum])


    return (



        <div className="flex flex-col  align-center justify-center p-4 pt-5">
            <div className="flex flex-col lg:flex-row w-full h-[350px] overflow-clip gap-3">
                <div className="flex flex-col text-7xl">
                    Let's Save Earth 🌎
                    <span></span>
                    <span className='text-red-400 my-5'> LETS GO NET <span className='text-red-600'>ZERO</span></span>
                </div>
                <div>
                    <Image src="/images/coal_mine2.jpg" alt="coal_mine1" width={1920} height={1080} className="object-contain" />
                </div>
            </div>

            <div className="flex lg:flex flex-col md:flex-row gap-3 m-5 mt-10">


                <form className="flex flex-col w-[80vw] max-w-[800px] p-10 py-16 gap-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        putter()
                    }}>
                    <Label htmlFor="extraction" className="text-red-500">Extraction</Label>
                    <div className="flex gap-4">
                        <Extraction emission={emission} setemission={setemission} className="py-2" />
                        <Input type="number" placeholder="Tonnes of coal mined" className="py-2" value={tonnes} onChange={(e) => settonnes(e.target.value)} />
                    </div>

                    <Label htmlFor="transportation" className="text-red-500">Transportation</Label>
                    <div className="flex gap-4">
                        <Transportation emission={emission} setemission={setemission} className="py-2" />
                        <Input type="number" placeholder="Distance travelled (in km)" className="py-2" value={km} onChange={(e) => setkm(e.target.value)} />
                    </div>
                    <Label htmlFor="processing" className="text-red-500">Processing</Label>

                    <div>
                        <Processing emission={emission} setemission={setemission} className="py-10" />
                    </div>
                    <Label htmlFor="blasting" className="text-red-500">Blasting</Label>

                    <div>
                        <Blasting emission={emission} setemission={setemission} className="py-10" />
                    </div>
                    <Label htmlFor="handling" className="text-red-500">Handling</Label>

                    <div>
                        <Handling emission={emission} setemission={setemission} className="py-10" />
                    </div>
                    {/* <Label htmlFor="energy" className="text-red-500">Energy usage</Label>

                    <div>
                        <Energy emission={emission} setemission={setemission} className="py-10" />
                    </div> */}
                    <Label htmlFor="duration" className="text-red-500">Duration</Label>

                    <div className="flex gap-5 ">
                        <CalendarEl label="from..." date={date} setdate={setdate} />
                        <CalendarEl label="to..." date={date} setdate={setdate} />
                    </div>
                    <Button type="submit" className="p-10 bg-red-600 hover:bg-red-300 ">RECORD</Button>
                </form>

                <div className="flex flex-col gap-3 p-12 justify-center ">
                    <div className="text-6xl "><div className='text-red-500'>CALCULATING</div> YOUR EMISSIONS...</div>
                    {emissionnum == 0 ? null : (<>
                        <div className="text-3xl mt-3">
                            EMISSIONS: {emissionnum == 0 ? null : `${emissionnum} tonnes`}
                        </div>
                        <div className="text-3xl mt-3">
                            You'd need to plant in total <div className="inline text-red-500">{emissionnum == 0 ? null : `${Math.round((emissionnum) / 0.03)}`}</div>  trees for a period of a year
                        </div>
                        <br />
                        <div className="text-xl">
                            {date.from ? `Date from: ${date.from.toLocaleDateString()}` : null} - {date.to ? `Date to: ${date.to.toLocaleDateString()}` : null}
                            <br />
                            {(date.from && date.to) ? `That's a total of ${Math.abs((date.to - date.from) / (1000 * 3600 * 24)).toLocaleString()} days` : null}
                        </div>
                    </>)}


                    <div className="mt-3">
                        <PieChart emission={emission} tonnes={tonnes} km={km} />
                        {/* {JSON.stringify(emission)} */}
                    </div>
                </div>

            </div>



        </div >


    )
}

export default Calculation


