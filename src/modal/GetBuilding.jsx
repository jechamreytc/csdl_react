import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetBuilding = () => {
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        const getBuildings = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getBuilding");
                const res = await axios.post(url, formData);
                setBuildings(res.data);
                toast.success("Buildings loaded successfully");
            } catch (error) {
                console.log('Failed to load buildings:', error);
                toast.error("Failed to load buildings");
            }
        };
        getBuildings();
    }, []);

    const deleteBuilding = async (build_id) => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = { build_id };
            const formData = new FormData();
            formData.append("operation", "deleteBuilding");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setBuildings((prevBuildings) =>
                    prevBuildings.filter(building => building.build_id !== build_id)
                );
                toast.success("Building deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete building");
            }
        } catch (error) {
            console.log('Failed to delete building:', error);
            toast.error("Failed to delete building");
        }
    };

    const handleDelete = (buildingId) => {
        if (window.confirm("Are you sure you want to delete this building?")) {
            deleteBuilding(buildingId);
        }
    };

    const handleUpdate = (buildingId) => {
        toast.success(`Building ${buildingId} updated successfully`);
    };

    return (
        <div className="bg-blue-900 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Building List</span>
            </div>
            <div className="flex flex-col space-y-5"> {/* Increased space between items */}
                {buildings.length > 0 ? (
                    buildings.map((building) => (
                        <div
                            key={building.building_id}
                            className="flex items-center justify-between bg-blue-800 rounded-lg py-4 px-6 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
                        >
                            <span className="text-lg font-medium">{building.build_name}</span>
                            <div className="flex space-x-3"> {/* Spacing between buttons */}
                                <button
                                    className="text-green-500 hover:bg-green-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleUpdate(building.build_id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-full transition-transform transform hover:scale-105"
                                    onClick={() => handleDelete(building.build_id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No Data Found</p>
                )}
            </div>
        </div>
    );
};

export default GetBuilding;
