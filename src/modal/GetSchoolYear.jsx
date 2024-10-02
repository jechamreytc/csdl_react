import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const GetYear = () => {
    const [formData, setFormData] = useState({
        year: "",
    });

    const [years, setYears] = useState([]);

    useEffect(() => {
        const getYears = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getschoolyear"); // Ensure operation matches backend

                const res = await axios.post(url, formData);

                // Log the response to check the structure
                console.log('API Response:', res.data);

                if (Array.isArray(res.data)) {
                    setYears(res.data); // Ensure it's an array
                    toast.success("Years loaded successfully");
                } else {
                    console.log('Unexpected data format:', res.data);
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                console.log('Failed to load years:', error);
                toast.error("Failed to load years");
            }
        };
        getYears();
    }, []);

    const handleYearClick = (year) => {
        setFormData({ ...formData, year });
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Year List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {years.length > 0 ? (
                    years.map((year) => (
                        <div
                            key={year.sy_id} // Assuming the structure of your API response
                            className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                            onClick={() => handleYearClick(year.sy_name)}
                        >
                            <span className="text-lg">{'>'}</span>
                            <span className="text-lg font-medium">{year.sy_name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">Loading years...</p>
                )}
            </div>
        </div>
    );
};

export default GetYear;
