import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { toast } from 'sonner';

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
        // Fetch user data from the backend when the component mounts
        axios.get('YOUR_BACKEND_API_URL/get-user-data')
            .then(response => {
                setUserData({
                    fullName: response.data.fullName,
                    cu: response.data.username,
                    password: response.data.password,
                    confirmPassword: response.data.password, // You may handle this better for security
                    email: response.data.email,
                    confirmEmail: response.data.email
                });
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    const handleLogOut = () => {
        secureLocalStorage.clear();
        navigateTo("/");
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }

        try {
            const url = secureLocalStorage.getItem("url") + "user.php";
            const userId = secureLocalStorage.getItem("userId");
            const jsonData = { userId: userId }
            const formData = new FormData();
            formData.append("operation", "updateImage");
            formData.append("json", JSON.stringify(jsonData));
            formData.append('file', selectedFile);

            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            switch (res.data) {
                case 1:
                    // File uploaded successfully
                    toast.success("Photo uploaded successfully");
                    break;
                case 2:
                    // You cannot Upload files of this type!
                    toast.error("You cannot Upload files of this type!");
                    break;
                case 3:
                    // There was an error uploading your file!
                    toast.error("There was an error uploading your file!");
                    break;
                case 4:
                    // Your file is too big (25mb maximum)
                    toast.error("Your file is too big (25mb maximum)");
                    break;
                case 0:
                    break;
                default:
                    toast.success("Photo uploaded successfully");
                    secureLocalStorage.setItem("userImage", res.data);
                    break;
            }
            console.log("res ni upload", res);

        } catch (error) {
            toast.error("Failed to upload photo");
            console.log(error);
        }
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
        // Send the updated data to the backend
        axios.post('YOUR_BACKEND_API_URL/update-user-data', userData)
            .then(response => {
                console.log('User data updated successfully', response.data);
                // Optionally show a success message or toast
            })
            .catch(error => {
                console.error('There was an error updating the user data!', error);
                // Optionally show an error message
            });
    };

    return (
        <div
            className={`flex h-screen ${darkMode ? 'bg-gray-950' : ''}`}
            style={!darkMode ? { backgroundColor: "rgb(8, 54, 100)" } : {}}
        >


            <aside className="w-1/6 p-4 flex flex-col justify-between" style={{ backgroundColor: "#109315" }}>
                <div className="text-white mb-6">
                    <div className="flex items-center mb-6">
                        <img
                            src="images/csdl.jpg"
                            alt="CSDL Logo"
                            className="w-24 h-24 rounded-full mr-3"
                        />
                        <div>
                            <br />
                            <h1 className="text-xl font-bold">HK SMS</h1>
                            <p className="text-xl">HK Scholars Management System</p>
                        </div>
                    </div>

                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/MainDashboard")}
                                >
                                    <PanelsRightBottom className="mr-2" />
                                    <span className="text-sm">Dashboard</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/ScholarList")}
                                >
                                    <List className="mr-2" />
                                    <span className="text-sm">Scholar List</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/qrcode")}
                                >
                                    <QrCodeIcon className="mr-2" />
                                    <span className="text-sm">QR Code</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AssignStudent")}
                                >
                                    <User className="mr-2" />
                                    <span className="text-sm">Assigned Student</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/AdminDashboard")}
                                >
                                    <FolderClosed className="mr-2" />
                                    <span className="text-sm">Master Files</span>
                                </button>
                            </li>
                            <h2 className="text-lg font-semibold mt-6 mb-2">Account</h2>
                            <li>
                                <button
                                    className="flex items-center p-3 hover:bg-green-700 rounded-md w-full transition-all duration-200"
                                    onClick={() => navigateTo("/Account")}
                                >
                                    <CircleUser className="mr-2" />
                                    <span className="text-sm">Account</span>
                                </button>
                            </li>
                            <li className="mt-4">
                                <button
                                    className="flex items-center p-3 bg-red-600 hover:bg-red-700 rounded-md w-full transition-all duration-200"
                                    onClick={handleLogOut}
                                >
                                    <LogOutIcon className="mr-2" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="text-white text-xs mt-4">Powered by PHINMA</p>
            </aside >
            <div className="flex-1 p-10">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-normal mb-6 text-blue-900">General Info</h2>
                    <p className="mb-4 text-blue-800">Setup your profile account and edit profile details.</p>

                    {/* Profile Image Section */}
                    <div className="flex items-center mb-8 bg-blue-900 rounded-md p-4 w-full h-16">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <img src={`http://localhost/csdl/images/${secureLocalStorage.getItem("userImage")}`} alt="Profile" className="object-cover w-full h-full" />
                            )}
                        </div>
                        <input
                            type="file"
                            id="photo-upload"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 ml-auto"
                            onClick={handlePhotoUpload}
                        >
                            Update Photo
                        </button>
                    </div>

                    {/* Account Info Form */}
                    <div className="bg-blue-900 text-white p-6 rounded-lg">
                        <h3 className="text-xl mb-4">Account Info</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2">Full Name*</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Username*</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Password*</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={userData.password}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded bg-blue-600 text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Password*</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={userData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded bg-blue-600 text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2">Email Address*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Email Address*</label>
                                    <input
                                        type="email"
                                        name="confirmEmail"
                                        value={userData.confirmEmail}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-blue-600 text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white text-sm px-4 py-2 mt-6 rounded hover:bg-green-700"
                            >
                                Update Info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Account;
