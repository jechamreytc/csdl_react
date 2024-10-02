import React, { useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

const AddOfficeMaster = () => {
    const [formData, setFormData] = useState({
        offSubjectCode: "",
        offDescriptivTitle: "",
        offSection: "",
        offRoom: "",
        offTypeId: "",
        offTimeIn: "",
        offTimeOut: "",
        offdayRemote: "",
        remoteOffTimeIn: "",
        remoteOffTimeOut: ""
    });

    const [activeTab, setActiveTab] = useState('offices');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleAdd = async () => {
        try {
            const url = secureLocalStorage.getItem('url') + 'CSDL.php';

            const jsonData = {
                off_subject_code: formData.offSubjectCode,
                off_descriptive_title: formData.offDescriptivTitle,
                off_section: formData.offSection,
                off_room: formData.offRoom,
                off_type_id: formData.offTypeId,
                off_timeIn: formData.offTimeIn,
                off_timeOut: formData.offTimeOut,
                off_dayRemote: formData.offdayRemote,
                off_remoteTimeIn: formData.remoteOffTimeIn,
                off_remoteTimeOut: formData.remoteOffTimeOut
            };


            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append('operation', 'addOfficeMaster');

            const res = await axios.post(url, formDataToSend);

            if (res.data !== 0) {
                toast.success("Office Master added successfully");
                console.log("Office Master added successfully", res.data);
            } else {
                toast.error("Failed to add Office Master");
                console.log("Failed to add Office Master", res.data);
            }
        } catch (error) {
            toast.error("Failed to add Office Master");
            console.log("Failed to add Office Master", error);
        }
    };

    return (
        <>
            <div className="bg-blue-600 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    {/* Add any content here */}
                </div>

                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`py-2 px-4 rounded-lg text-white font-bold ${activeTab === 'offices' ? 'bg-green-500' : 'bg-blue-700 hover:bg-blue-600'}`}
                        onClick={() => handleTabChange('offices')}
                    >
                        Offices
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg text-white font-bold ${activeTab === 'classes' ? 'bg-green-500' : 'bg-blue-700 hover:bg-blue-600'}`}
                        onClick={() => handleTabChange('classes')}
                    >
                        Classes
                    </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
                    <div>
                        <input
                            type="text"
                            name="offSubjectCode"
                            value={formData.offSubjectCode}
                            onChange={handleInputChange}
                            placeholder="Subject Code:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="offDescriptivTitle"
                            value={formData.offDescriptivTitle}
                            onChange={handleInputChange}
                            placeholder="Descriptive Title:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="offSection"
                            value={formData.offSection}
                            onChange={handleInputChange}
                            placeholder="Section:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            name="offRoom"
                            value={formData.offRoom}
                            onChange={handleInputChange}
                            placeholder="Day Face-to-Face:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <input
                                type="time"
                                name="offTimeIn"
                                value={formData.offTimeIn}
                                onChange={handleInputChange}
                                placeholder="Starting Time Face to Face:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="time"
                                name="offTimeOut"
                                value={formData.offTimeOut}
                                onChange={handleInputChange}
                                placeholder="Ending Time Face to Face:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            name="offdayRemote"
                            value={formData.offdayRemote}
                            onChange={handleInputChange}
                            placeholder="Day Remote Coaching:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <input
                                type="time"
                                name="remoteOffTimeIn"
                                value={formData.remoteOffTimeIn}
                                onChange={handleInputChange}
                                placeholder="Starting Time Remote Coaching:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="time"
                                name="remoteOffTimeOut"
                                value={formData.remoteOffTimeOut}
                                onChange={handleInputChange}
                                placeholder="Ending Time Remote Coaching:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="offRoom"
                            value={formData.offRoom}
                            onChange={handleInputChange}
                            placeholder="Room:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1e88e5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddOfficeMaster;
