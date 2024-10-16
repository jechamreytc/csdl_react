import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

const ScholarList = () => {
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        scholarshipType: '',
        yearLevels: '',
        course: '',
        search: ''
    });
    const [scholarshipType, setScholarshipType] = useState([]);
    const [yearLevel, setYearLevel] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredScholars, setFilteredScholars] = useState([]);
    const [allScholars, setAllScholars] = useState([]);

    useEffect(() => {
        const getAllList = async () => {
            try {
                const url = secureLocalStorage.getItem("url") + "CSDL.php";
                const formData = new FormData();
                formData.append("operation", "getAllScholarList");
                const res = await axios.post(url, formData);
                setScholarshipType(res.data.scholarshiptypelist || []);
                setYearLevel(res.data.SchoolYearLevel || []);
                setCourses(res.data.courselist || []);
                setAllScholars(res.data.scholars || []);
                toast.success("Scholar data loaded successfully");
            } catch (error) {
                toast.error("Failed to load scholar data");
            }
        };
        getAllList();
    }, []);

    const handleFilter = () => {
        const { scholarshipType, yearLevels, course, search } = formData;

        const filtered = allScholars.filter(scholar => {
            return (
                (scholarshipType === '' || scholar.scholarshipType === scholarshipType) &&
                (yearLevels === '' || scholar.yearLevels === yearLevels) &&
                (course === '' || scholar.course === course) &&
                (search === '' || scholar.name.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setFilteredScholars(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [formData, allScholars]);

    return (
        <div className="scholar-list-container">
            <h2>Scholar List</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search scholar"
                    value={formData.search}
                    onChange={e => setFormData({ ...formData, search: e.target.value })}
                />
                <select
                    value={formData.scholarshipType}
                    onChange={e => setFormData({ ...formData, scholarshipType: e.target.value })}
                >
                    <option value="">Select Scholarship Type</option>
                    {scholarshipType.map((type, index) => (
                        <option key={index} value={type.type_id}>
                            {type.type_name}
                        </option>
                    ))}
                </select>
                <select
                    value={formData.yearLevels}
                    onChange={e => setFormData({ ...formData, yearLevels: e.target.value })}
                >
                    <option value="">Select Year Level</option>
                    {yearLevel.map((level, index) => (
                        <option key={index} value={level.yearlevel_id}>
                            {level.yearlevel_name}
                        </option>
                    ))}
                </select>
                <select
                    value={formData.course}
                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                >
                    <option value="">Select Course</option>
                    {courses.map((course, index) => (
                        <option key={index} value={course.course_id}>
                            {course.course_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="scholar-list">
                {filteredScholars.length > 0 ? (
                    filteredScholars.map((scholar, index) => (
                        <div key={index}>
                            <p>Name: {scholar.name}</p>
                            <p>Scholarship: {scholar.scholarshipType}</p>
                            <p>Status: {scholar.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No scholars found</p>
                )}
            </div>
        </div>
    );
};

export default ScholarList;
