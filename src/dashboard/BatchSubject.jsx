import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const App = () => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [days, setDays] = useState([]);

    const itemsPerPage = 20;

    // Fetch days on component mount
    useEffect(() => {
        const fetchDays = async () => {
            try {
                const url = `${secureLocalStorage.getItem("url")}CSDL.php`;
                const formdata = new FormData();
                formdata.append("operation", "getDays");
                const response = await axios.post(url, formdata);
                if (response.data) {
                    setDays(response.data);
                } else {
                    alert("Failed to fetch days.");
                }
            } catch (error) {
                console.error("Error fetching days:", error);
                alert("Error fetching days. Check logs for details.");
            }
        };

        fetchDays();
    }, []);

    // Reset page to 1 when data changes
    useEffect(() => {
        if (data.length > 0) setCurrentPage(1);
    }, [data]);

    // Handle file upload and processing
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            setData(jsonData);
        } catch (error) {
            console.error("Error reading the Excel file:", error);
            alert("Error reading the Excel file. Please check the file format.");
        }
    };

    // Save data to backend
    const handleSaveToBackend = async () => {
        if (data.length === 0) {
            alert("No data to save!");
            return;
        }
        console.log("Data to save:", data); // Debugging

        try {
            const jsonData = data.map((row) => {
                const dayRC = days.find((day) => day.day_name === row["DAY (RC)"]);
                const dayF2F = days.find((day) => day.day_name === row["DAY (F2F)"]);

                if (!dayRC) {
                    throw new Error(`Day (RC) not found for row: ${row["DAY (RC)"]}`);
                }

                if (!dayF2F) {
                    throw new Error(`Day (F2F) not found for row: ${row["DAY (F2F)"]}`);
                }

                return {
                    sub_code: row["SUBJECT CODE"],
                    sub_descriptive_title: row["DESCIPTIVE TITLE"],
                    sub_section: row["SECTION"],
                    sub_day_f2f_id: dayF2F.day_id,
                    sub_time: row["TIME (F2F)"],
                    sub_day_rc_id: dayRC.day_id,
                    sub_time_rc: row["TIME (RC)"],
                    sub_room: row["ROOM"],
                    // sub_supM_id: "",
                    // sub_learning_modalities_id: "",
                    // sub_limit: "",
                };
            });

            setLoading(true);
            const url = `${secureLocalStorage.getItem("url")}CSDL.php`;
            const formDataToSend = new FormData();
            formDataToSend.append("json", JSON.stringify(jsonData));
            formDataToSend.append("operation", "AddSubject");
            console.log("API Request (Add Subject):", jsonData);

            const response = await axios.post(url, formDataToSend);
            console.log("RESPONSE ni handleSaveToBackend", response.data);
            if (response.data !== 0) {
                alert("Data saved successfully!");
                setData([]);
                setFileName("");
            } else {
                alert(`Error from backend: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error saving data to backend:", error);
            alert("Error saving data to backend. Check logs for details.");
        } finally {
            setLoading(false);
        }
    };


    // Pagination
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Excel File Uploader</h1>
                <label className="block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 focus:outline-none">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <div className="p-4 text-center">Choose Excel File</div>
                </label>
                {fileName && <p className="text-center text-gray-600 mt-4">Selected File: {fileName}</p>}

                {currentData.length > 0 && (
                    <>
                        <div className="overflow-x-auto mt-6">
                            <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        {Object.keys(currentData[0]).map((key) => (
                                            <th key={key} className="border px-4 py-2 text-gray-800 font-medium">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((row, idx) => (
                                        <tr key={idx} className="even:bg-gray-50">
                                            {Object.values(row).map((value, i) => (
                                                <td key={i} className="border px-6 py-4 text-gray-700">
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
                            >
                                Previous
                            </button>
                            <p className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </p>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                        <button
                            onClick={handleSaveToBackend}
                            disabled={loading}
                            className={`mt-6 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${loading
                                ? "bg-gray-400 text-gray-800"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
                                }`}
                        >
                            {loading ? "Saving..." : "Save to Backend"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;

