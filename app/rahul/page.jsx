// import React from 'react'

// const Rahul = () => {
//     return (
//         <div className="w-full h-screen flex justify-between items-center p-10 ">
//             <iframe title="SIH" width="1920" height="700.25" className="rounded-t-2xl overflow-clip" src="https://app.powerbi.com/reportEmbed?reportId=ef62c522-1ea3-457a-a3f6-974e8ae1b419&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen={true}></iframe>
//         </div>
//     )
// }

// export default Rahul

// Ihatevit@100
"use client"
import React from 'react';

const Rahul = () => {
    // Define the Power BI report base URL
    const baseUrl = "https://app.powerbi.com/reportEmbed?reportId=ef62c522-1ea3-457a-a3f6-974e8ae1b419&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d";

    // State to track the current page
    // const [currentPage, setCurrentPage] = useState("ReportSection");

    // Function to handle page change
    // const changePage = (page) => {
    //     setCurrentPage(page);
    // };

    return (

        <div className="w-full h-screen flex justify-center items-center">
            {/* <iframe
                title="Power BI Report"
                width="1800"
                height="1300"
                className=" shadow-lg"
                src={`${baseUrl}&pageName=${"Page 1"}`}
                frameBorder="0"
                allowFullScreen={true}>
            </iframe> */}
            <iframe
                title="SIH app final" width="1800" height="900" src="https://app.powerbi.com/reportEmbed?reportId=aba18c6e-0b54-4ffa-8f55-39a8fe512876&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen="true"></iframe>
            {/* <iframe title="SIH app final" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=aba18c6e-0b54-4ffa-8f55-39a8fe512876&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen="true"></iframe> */}
            {/* <iframe
                title="Power BI Report"
                width="1920"
                height="700"
                className=" shadow-lg"
                src={`${baseUrl}&pageName=${"Page 2"}`}
                frameBorder="0"
                allowFullScreen={true}>
            </iframe>
            <iframe
                title="Power BI Report"
                width="1920"
                height="700"
                className=" shadow-lg"
                src={`${baseUrl}&pageName=${"Page 3"}`}
                frameBorder="0"
                allowFullScreen={true}>
            </iframe> */}
            {/* <iframe title="SIH" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=ef62c522-1ea3-457a-a3f6-974e8ae1b419&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen="true"></iframe> */}
            {/* <iframe title="SIH" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=ef62c522-1ea3-457a-a3f6-974e8ae1b419&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen="true"></iframe> */}
        </div>);
    {/* </div> */ }

}

export default Rahul;
