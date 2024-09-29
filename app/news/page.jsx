// "use client"
// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';

// const API_KEY = 'YOUR_NEWSAPI_KEY'; // Replace with your actual NewsAPI key

// const MiningNews = () => {
//     const [articles, setArticles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // useEffect hook to fetch news data when the component mounts
//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 const response = await fetch(
//                     `https://newsapi.org/v2/everything?q=mining&apiKey=a2aa00785e1f4321bc0ce60a73b74e56`
//                 );

//                 if (!response.ok) {
//                     throw new Error('Error fetching the news');
//                 }

//                 const data = await response.json();
//                 setArticles(data.articles); // Set fetched articles
//                 setLoading(false); // Set loading to false
//             } catch (error) {
//                 setError('Error fetching the news');
//                 setLoading(false);
//             }
//         };

//         fetchNews(); // Fetch the news when the component mounts
//     }, []); // Empty dependency array ensures this runs only once

//     // Conditional rendering: show loading, error, or news articles
//     return (
//         <div>
//             <h1>Latest Mining News</h1>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {!loading && !error && (
//                 <ul>
//                     {articles.map((article, index) => (
//                         <div className="flex gap-3 " key={index}>
//                             {/* <Image src={article.urlToImage} width={300} height={300} alt={article.title} /> */}
//                             <div className="flex flex-col gap-4">
//                                 <div>
//                                     <div className="text-3xl">{article.title}</div>
//                                     <div className="text-gray-400">{article.description}</div>
//                                     <div>{article.source.name}</div>
//                                     <a href={article.url} target="_blank" rel="noopener noreferrer">

//                                         Read more
//                                     </a>
//                                 </div></div>
//                         </div>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };




// export default MiningNews

"use client"
// src/MiningNews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {

                const respons = await axios.get("https://newsapi.org/v2/everything?q=coal+mining+india&apiKey=a2aa00785e1f4321bc0ce60a73b74e56");
                console.log("hbehjw is ", respons.data.articles);

                const response = respons.data.articles;

                // response.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                response.map((el) => {
                    if (el.title == "[Removed]") {
                        response.splice(response.indexOf(el), 1)
                    }
                    // const regex = new RegExp('.', 'g');
                    // if ((str.match(regex) || []).length >= 1) { }
                    // else {
                    //     response.splice(response.indexOf(el), 1)
                    // }
                    if (el.description.length > 200) {
                        el.description = el.description.slice(0, 200) + "..."
                    } else if (el.description.length < 30) {
                        response.splice(response.indexOf(el), 1)
                    }

                })
                setNews(response);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-cover bg-center ">
            <h1 className="text-whit text-4xl text-red-500 font-bold text-center mt-5 mb-5 bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
                Mining News
            </h1>
            <div className="max-w-7xl mx-auto p-5 bg-whit bg-opacity-80 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-5 justify-center">
                    {/* <div className="p-3 rounded-xl flex flex-col w-100 h-100  transition-transform transform hover:scale-105 hover:shadow-2xl dution-300"> */}

                    {news.map((article, index) => (
                        <div key={index} className="flex-1 sm:flex-initial max-w-sm bg-gray-100 p-5 rounded-lg shadow-md">
                            <div className="w-100 h-100 overflow-clip">

                                <img src={article.urlToImage || 'placeholder.jpg'} alt={article.title} width={100} height={100} className="w-full h-auto rounded-lg mb-4" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {article.title}
                                </a>
                            </h2>
                            <p className="text-gray-700">{article.description}</p>
                        </div>
                    ))}

                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default News;
