import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const generateCaptcha = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
};

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const PuzzleAuth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState("");
    const [captchaColors, setCaptchaColors] = useState(Array.from({ length: 5 }, getRandomColor));
    const [showSecurityCheck, setShowSecurityCheck] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (secureLocalStorage.getItem("adminLogin") === "true") {
            navigate("/MainDashboard");
        }
    }, [navigate]);

    const handleEmailChange = (e) => {
        const emailRegex = /^[a-zA-Z.@0-9-]+$/;
        if (emailRegex.test(e.target.value) || e.target.value === "") {
            setUsername(e.target.value);
        }
    };

    const isFormComplete = () => {
        return username.trim() !== "" && password.trim() !== "";
    };

    const handleSubmitCaptcha = () => {
        if (userInput === captcha.join("")) {
            toast.success("Captcha Correct!");
        } else {
            toast.error("Captcha Incorrect, try again.");
            setCaptcha(generateCaptcha());
            setCaptchaColors(Array.from({ length: 5 }, getRandomColor));
            setUserInput("");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.error("Please fill in both Username and Password.");
            return;
        }
        if (userInput !== captcha.join("")) {
            toast.error("Captcha Incorrect, try again.");
            setCaptcha(generateCaptcha());
            setCaptchaColors(Array.from({ length: 5 }, getRandomColor));
            setUserInput("");
            return;
        }

        // if (userInput !== captcha.join("")) {
        //     toast.error("Incorrect Captcha. Try again.");
        //     setCaptcha(generateCaptcha());
        //     setCaptchaColors(Array.from({ length: 5 }, getRandomColor));
        //     setUserInput("");
        //     return;
        // }

        try {
            const url = secureLocalStorage.getItem("url") + "user.php";
            const jsonData = { username: username, password: password };
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "adminLogin");

            const res = await axios.post(url, formData);
            console.log("hahaha", res.data);


            if (res.data === 0) {
                toast.error("Invalid Credentials");
                setUsername("");
                setPassword("");
            } else {
                toast.success("Login successful!");
                secureLocalStorage.setItem("adminLogin", "true");
                navigate("/MainDashboard");
            }
        } catch (error) {
            toast.error("Login failed. Please try again later.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-900 px-4">
            <div className="w-full max-w-4xl shadow-lg rounded-xl bg-white p-8 flex">
                <div className="w-1/2 flex items-center justify-center">
                    <h1 className="text-5xl font-extrabold text-green-800">HK SMS</h1>
                </div>
                <div className="w-1/2">
                    <h2 className="text-3xl font-semibold text-green-900 text-center mb-6">Sign in</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleEmailChange}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                    />
                    <button
                        onClick={() => setShowSecurityCheck(true)}
                        className={`w-full py-3 text-white text-lg rounded-lg font-semibold transition mt-4 ${isFormComplete() ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isFormComplete()}
                    >
                        Verify Security
                    </button>
                    {showSecurityCheck && (
                        <div className="mt-4 bg-gray-100 p-5 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-green-900 mb-3">Captcha Verification</h3>
                            <div className="mb-4 text-2xl">
                                {captcha.map((num, index) => (
                                    <span key={index} style={{ color: captchaColors[index], margin: "0 5px" }}>
                                        {num}
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Captcha"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="w-full p-2 border border-gray-400 rounded-md"
                            />
                            {/* <button
                                onClick={handleSubmitCaptcha}
                                className="w-full mt-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                            >
                                Submit Captcha
                            </button> */}
                        </div>
                    )}
                    {showSecurityCheck && (
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 bg-green-900 text-white text-lg rounded-lg font-semibold hover:bg-green-600 transition mt-4"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PuzzleAuth;
