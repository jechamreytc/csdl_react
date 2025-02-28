import React, { useState, useEffect } from 'react';
import { Sun, Moon, CircleUser, FolderClosed, LogOutIcon, PanelsRightBottom, QrCodeIcon, User, List, Mail, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import Navigator from './navigator';

const MainDashboard = () => {
    const [formData, setFormData] = useState({
        course: "",
        yearLevel: "",
    });
    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const itemsPerPage = 4;
    const navigateTo = useNavigate();


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = assignments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(assignments.length / itemsPerPage);

    // Navigation functions
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'CSDL.php';
                const formData = new FormData();
                formData.append('operation', 'getAddScholarDropDown');
                const res = await axios.post(url, formData);
                setCourses(res.data.course);
                setYearLevels(res.data.yearLevel);
                toast.success('Form data loaded successfully');
            } catch (error) {
                toast.error('Failed to load form data');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getAssignmentList = async () => {
            try {
                const url = secureLocalStorage.getItem('url') + 'assign.php';
                const formData = new FormData();
                formData.append('operation', 'getAssignmentList');
                const res = await axios.post(url, formData);
                setAssignments(res.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to fetch data');
            }
        };
        getAssignmentList();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogOut = () => {
        navigateTo("/");
    };

    return (
        <div
            className={`flex h-screen ${darkMode ? 'bg-gray-950' : ''}`}

        >
            <Navigator />
        </div>
    );
};

export default MainDashboard;