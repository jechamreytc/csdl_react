import React, { useEffect, useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

const AddOfficeMaster = () => {
    const [activeTab, setActiveTab] = useState('offices');


    const [formData, setFormData] = useState({
        // offName: '',
        offSubjectCode: '',
        offDescriptivTitle: '',
        offSection: '',
        offRoom: '',
        offTypeId: '',
        offTimeIn: '',
        offTimeOut: '',
        offdayRemote: '',
        remoteOffTimeIn: '',
        remoteOffTimeOut: ''
    });

    // const [offName, setOffName] = useState([]);
    const [offSubjectCode, setOffSubjectCode] = useState([]);
    const [offDescriptivTitle, setOffDescriptivTitle] = useState([]);
    const [offSection, setOffSection] = useState([]);
    const [offRoom, setOffRoom] = useState([]);
    const [offTypeId, setOffTypeId] = useState([]);
    const [offTimeIn, setoffTimeIn] = useState([]);
    const [offTimeOut, setoffTimeOut] = useState([]);
    const [offdayRemote, setoffdayRemote] = useState([]);
    const [remoteOffTimeIn, setRemoteOffTimeIn] = useState([]);
    const [remoteOffTimeOut, setRemoteOffTimeOut] = useState([]);

    useEffect(() => {
        const addOfficeMaster = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';

                const formData = new FormData();
                formData.append('operation', 'addOfficeMaster');
                const res = await axios.post(url, formData);
                // setOffName(res.data.yearLevel);
                setOffSubjectCode(res.data.offSubjectCode);
                setOffDescriptivTitle(res.data.offDescriptivTitle);
                setOffSection(res.data.offSection);
                setOffRoom(res.data.offRoom);
                setOffTypeId(res.data.offTypeId);
                setoffTimeIn(res.data.offTimeIn);
                setoffTimeOut(res.data.offTimeOut);
                setoffdayRemote(res.data.offdayRemote);
                setRemoteOffTimeIn(res.data.remoteOffTimeIn);
                setRemoteOffTimeOut(res.data.remoteOffTimeOut);

                console.log("res.data ni fetch Data", res);

            } catch (error) {
                toast.error('Failed to load form data');
            }
        };

        addOfficeMaster();
    }, []);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('url', formData);
            // console.log('Response:', response.data);
            toast.success('Form submitted successfully!');
        } catch (error) {
            // console.error('Error submitting the form:', error);
            toast.error('Failed to submit the form.');
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

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <input
                            type="text"
                            name="offSubjectCode"
                            value={formData.offSubjectCode}
                            onChange={handleChange}
                            placeholder="Subject Code:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="offDescriptivTitle"
                            value={formData.offDescriptivTitle}
                            onChange={handleChange}
                            placeholder="Descriptive Title:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="offSection"
                            value={formData.offSection}
                            onChange={handleChange}
                            placeholder="Section:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            name="offRoom"
                            value={formData.offRoom}
                            onChange={handleChange}
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
                                onChange={handleChange}
                                placeholder="Starting Time Face to Face:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="time"
                                name="offTimeOut"
                                value={formData.offTimeOut}
                                onChange={handleChange}
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
                            onChange={handleChange}
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
                                onChange={handleChange}
                                placeholder="Starting Time Remote Coaching:"
                                className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="time"
                                name="remoteOffTimeOut"
                                value={formData.remoteOffTimeOut}
                                onChange={handleChange}
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
                            onChange={handleChange}
                            placeholder="Room:"
                            className="w-full p-2 mt-1 rounded-lg bg-blue-900 text-white placeholder-white border-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>


        </>



    );
};

export default AddOfficeMaster;
