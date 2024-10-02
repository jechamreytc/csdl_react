import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

const GetScholarshipType = () => {
    const [formData, setFormData] = useState({
        scholarshipType: "",
    });

    const [scholarshipTypes, setScholarshipTypes] = useState([]);

    useEffect(() => {
        const getScholarshipTypes = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getscholarship_type");
                const res = await axios.post(url, formData);
                setScholarshipTypes(res.data);

                toast.success("Scholarship types loaded successfully");
                console.log('Scholarship Types:', res.data);
            } catch (error) {
                console.log('Failed to load scholarship types:', error);
                toast.error("Failed to load scholarship types");
            }
        };
        getScholarshipTypes();
    }, []);

    const handleTypeClick = (scholarshipType) => {
        setFormData({ ...formData, scholarshipType });
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Scholarship Type List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {scholarshipTypes.length > 0 ? (
                    scholarshipTypes.map((scholarshipType) => (
                        <div
                            key={scholarshipType.type_id}
                            className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                            onClick={() => handleTypeClick(scholarshipType.type_name)}
                        >
                            <span className="text-lg">{'>'}</span>
                            <span className="text-lg font-medium">{scholarshipType.type_name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">Loading scholarship types...</p>
                )}
            </div>
        </div>
    );
};

export default GetScholarshipType;
