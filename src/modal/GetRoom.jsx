import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GetRoom = () => {
    const [rooms, setRooms] = useState([]);  // Initialize rooms as an empty array
    const [expandedRoom, setExpandedRoom] = useState(null);

    useEffect(() => {
        const getRoom = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getRoom");
                const res = await axios.post(url, formData);

                console.log(res.data);  // Log the response data to inspect its structure

                // Ensure res.data is an array before setting it to state
                if (Array.isArray(res.data)) {
                    setRooms(res.data);
                    toast.success("Rooms loaded successfully");
                } else {
                    console.log('Unexpected response format:', res.data);
                    toast.error("Unexpected data format");
                }
            } catch (error) {
                console.log('Failed to load Rooms:', error);
                toast.error("Failed to load Rooms");
            }
        };
        getRoom();
    }, []);

    const deleteRoom = async (room_id) => {
        console.log("hahaha1T", room_id);
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const jsonData = {
                room_id: room_id
            };
            console.log("hahaha2T", jsonData);
            const formData = new FormData();
            formData.append("operation", "deleteRoom");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            if (res.data === 1) {
                setRooms((prevRooms) =>
                    prevRooms.filter(room => room.room_id !== room_id)
                );
                toast.success("Room deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete Room");
            }
        } catch (error) {
            console.log('Failed to delete room:', error);
            toast.error("Failed to delete room");
        }
    };

    const handleRoomClick = (room) => {
        setExpandedRoom(expandedRoom === room ? null : room);
    };

    const handleDelete = (roomId) => {

        console.log("hahaha", roomId);
        if (window.confirm("Are you sure you want to delete this room?")) {
            deleteRoom(roomId);
        }
    };

    const handleUpdate = (roomId) => {
        toast.success(`Room ${roomId} updated successfully`);
    };

    return (
        <div className="bg-blue-700 w-full max-w-md mx-auto rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white text-xl font-bold text-center flex-1">Room List</span>
            </div>
            <div className="flex flex-col space-y-4">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.room_id}>
                            <div
                                className="flex items-center justify-between bg-blue-800 rounded-md py-3 px-5 text-white cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300"
                                onClick={() => handleRoomClick(room.room_name )}
                            >
                                <span className="text-lg">{expandedRoom === room.room_name ? '▼' : '▲ '}</span>
                                <span className="text-lg font-medium flex-1">{room.room_name }</span>
                                {expandedRoom === room.room_name  && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(room.room_id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:bg-yellow-600 hover:text-white p-1 rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(room.room_id);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
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

export default GetRoom;
