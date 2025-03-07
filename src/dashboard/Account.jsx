import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { toast } from 'sonner';
import Navigator from './navigator';

const Account = () => {
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: ''
    });
    const navigateTo = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        axios.get('YOUR_BACKEND_API_URL/get-user-data')
            .then(response => {
                setUserData({
                    fullName: response.data.fullName,
                    username: response.data.username,
                    password: '',
                    confirmPassword: '',
                    email: response.data.email,
                    confirmEmail: response.data.email
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogOut = () => {
        secureLocalStorage.clear();
        navigateTo("/");
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
    };

    const handlePhotoUpload = () => {
        document.getElementById('photo-upload').click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("User data updated successfully");
    };

    return (
        <div className={`flex h-screen w-screen ${darkMode ? 'bg-green-900' : 'bg-gray-100'}`}>
            <Navigator />
            <div className="flex-1 flex justify-center items-center p-10">
                <div className="bg-green-900 text-white w-full max-w-1xl p-10 rounded-xl shadow-xl"> {/* Change width here */}
                    <h2 className="text-3xl font-semibold mb-4">General Info</h2>
                    <p className="text-white mb-6 text-lg">Setup your profile account and edit profile details.</p>

                    <div className="flex items-center bg-white p-4 rounded-lg mb-6 w-full">
                        <div className="w-20 h-20 bg-gray-500 rounded-full overflow-hidden"> {/* Change height and width here */}
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <img src={`http://localhost/csdl/images/${secureLocalStorage.getItem("userImage")}`} alt="Profile" className="object-cover w-full h-full" />
                            )}
                        </div>
                        <input type="file" id="photo-upload" className="hidden" onChange={handleFileChange} />
                        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm" onClick={handlePhotoUpload}>
                            Update Photo
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Account Info</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6"> {/* Adjust grid for width */}
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Full Name*</label>
                                <input type="text" name="fullName" value={userData.fullName} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-white text-lg" />
                            </div>
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Username*</label>
                                <input type="text" name="username" value={userData.username} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-gray-600 text-lg" />
                            </div>
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Password*</label>
                                <input type="password" name="password" value={userData.password} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-gray-600 text-lg" />
                            </div>
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Confirm Password*</label>
                                <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-gray-600 text-lg" />
                            </div>
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Email*</label>
                                <input type="email" name="email" value={userData.email} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-gray-600 text-lg" />
                            </div>
                            <div>
                                <label className="block text-green-900 mb-2 text-lg">Confirm Email*</label>
                                <input type="email" name="confirmEmail" value={userData.confirmEmail} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-green-700 text-white border border-gray-600 text-lg" />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg">
                                    Update Info
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
