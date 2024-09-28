import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCourse from '../modal/AddCourse';
import AddAdministrator from '../components/AddAdmin';
import AddScholar from '../components/AddScholar';
import { ArrowLeftCircle, ArrowLeftIcon } from 'lucide-react';
import AddDepartment from '../modal/AddDepartment';
import AddSchoolYear from '../modal/AddSchoolYear';
import AddScholarshipType from '../modal/AddScholarshipType';
import AddOfficeMaster from '../components/AddOfficeMaster';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { toast } from 'sonner';
import AddScholarshipSubType from '../modal/AddScholarshipSubType';

const MasterFiles = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [datalist, setDatalist] = useState();
    const [isOpenListModal, setIsOpenListModal] = useState(false);

    const handleAddClick = (route) => {
        navigate(route);
    };

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title);
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setModalContent(null);
        setModalTitle('');
    };

    const openListModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title);
        setIsOpenListModal(true);
    };

    const closeListModal = () => {
        setIsOpenListModal(false);
        setModalContent(null);
        setModalTitle('');
    };

    const getAllList = async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "CSDL.php";
            const formData = new FormData();
            formData.append("operation", "getAllList");
            const res = await axios.post(url, formData);
            console.log("res ni get all list", res.data);
            setDatalist(res.data);

        } catch (error) {
            toast.error("Network error");
            console.log(error);
        }
    }
    useEffect(() => {
        getAllList();
    }, [])


    return (
        <div className="flex h-screen bg-blue-800">
            <div className="w-64 bg-green-800 text-white flex flex-col justify-between">
                <div className="p-4">
                    <h1 className="text-xl font-bold">HK SMS</h1>
                    <p className="text-sm">HK Scholars Management System</p>
                </div>
                <nav className="flex-grow mt-10">
                    {['Dashboard', 'Scholar List', 'QR Code', 'Assigned Student', 'Master Files'].map(item => (
                        <a key={item} href="#" className="block py-2 px-4 hover:bg-green-600 transition duration-200 ease-in-out">
                            {item}
                        </a>
                    ))}
                    <div className="mt-6">
                        {['Account', 'Notification', 'Messages', 'Logout'].map(item => (
                            <a key={item} href="#" className="block py-2 px-4 hover:bg-green-600 transition duration-200 ease-in-out">
                                {item}
                            </a>
                        ))}
                    </div>
                </nav>
                <footer className="p-4">
                    <p className="text-xs">Powered by PHINMA coc</p>
                </footer>
            </div>

            <div className="flex-grow p-10 bg-blue-500">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-left mb-8">
                        <h1 className="text-5xl font-mono text-blue-500 mb-2">Master Files</h1>
                    </div>

                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-normal text-white mb-2">Master Files</h1>
                            <p className="text-white text-lg">Maintain and reference master files for centralized and accurate data management.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: 'Admin', buttonText: 'Add Administrator', route: '/addAdministrator', content: <AddAdministrator />, },
                                { title: 'Department', buttonText: 'Add Department', route: '/addDepartment', content: <AddDepartment /> },
                                { title: 'School Year', buttonText: 'Add School Year', route: '/addSchoolYear', content: <AddSchoolYear /> },
                                { title: 'Course', buttonText: 'Add Course', route: '/addCourse', content: <AddCourse /> },
                                { title: 'Scholarship Type', buttonText: 'Add Scholarship Type', route: '/addScholarshipType', content: <AddScholarshipType /> },
                                { title: 'Office Master', buttonText: 'Add Office Master', route: '/addOfficeMaster', content: <AddOfficeMaster /> },
                                { title: 'Scholar', buttonText: 'Add Scholar', route: '/addScholar', content: <AddScholar /> },
                                { title: 'Supervisor', buttonText: 'Add Supervisor', route: '/addSupervisor', content: <addSupervisor /> },
                                { title: 'Scholarship Sub Type', buttonText: 'Add Scholarship Sub Type', route: '/addScholarshipSubType', content: <AddScholarshipSubType /> },
                            ].map(({ title, buttonText, route, content }, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
                                    <div className="bg-blue-700 p-4 rounded-lg shadow-lg flex flex-col items-center">
                                        <h3 className="text-white text-base font-semibold mb-2">{buttonText}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                className="w-16 py-1 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 ease-in-out text-xs"
                                                onClick={() => openModal(content, buttonText)}
                                            >
                                                Add
                                            </button>
                                            <button className="w-16 py-1 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 ease-in-out text-xs">
                                                Get List
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isOpenModal && (
                <div className='fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center w-full'>
                    <div className='bg-blue-800 p-8 rounded-lg shadow-lg relative max-w-md w-full'>
                        <div className='grid grid-cols-3 text-xl font-bold md-4 text-black'>
                            <div className=''>
                                <ArrowLeftCircle className='cursor-pointer h-7 w-7 text-white' onClick={closeModal} />
                            </div>
                            <p className='text-center text-white'>{modalTitle}</p>
                        </div>
                        <div>

                            {modalContent}
                        </div>

                    </div>
                </div>
            )}
            {isOpenListModal && (
                <div className='fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center w-full'>
                    <div className='bg-blue-800 p-8 rounded-lg shadow-lg relative max-w-md w-full'>
                        <div className='grid grid-cols-3 text-xl font-bold md-4 text-black'>
                            <div className=''>
                                <ArrowLeftCircle className='cursor-pointer h-7 w-7 text-white' onClick={closeModal} />
                            </div>
                            <p className='text-center text-white'>{modalTitle}</p>
                        </div>
                        <div>

                            {modalContent}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterFiles;
