import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mathPuzzle, setMathPuzzle] = useState({ question: "", answer: 0 });
    const [userAnswer, setUserAnswer] = useState("");
    const [hasError, setHasError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockout, setLockout] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();

    const generateMathPuzzle = () => {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        setMathPuzzle({
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
        });
    };

    useEffect(() => {
        generateMathPuzzle();
    }, []);

    useEffect(() => {
        let timer;
        if (lockout && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0 && lockout) {
            setLockout(false);
            setAttempts(0);
        }
        return () => clearInterval(timer);
    }, [lockout, countdown]);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9@.-]*$/.test(value)) {
            setUsername(value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9@.-]*$/.test(value)) {
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (lockout) {
            toast.error(`Please wait ${countdown} seconds before trying again.`);
            return;
        }

        if (!username.trim() || !password.trim()) {
            toast.error("Please fill in both Username and Password.");
            return;
        }

        if (parseInt(userAnswer) !== mathPuzzle.answer) {
            setAttempts((prev) => prev + 1);
            setHasError(true);
            toast.error("Incorrect math puzzle answer. Please try again.");
            generateMathPuzzle();
            setUserAnswer("");

            if (attempts + 1 >= 3) {
                setLockout(true);
                setCountdown(10);
                toast.error("Too many incorrect attempts. Please wait 10 seconds.");
            }
            return;
        }

        try {
            const url = secureLocalStorage.getItem('url') + 'user.php';
            const jsonData = { username: username, password: password };
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "adminLogin");

            const res = await axios.post(url, formData);

            if (res.data === 0) {
                toast.error("Invalid Credentials");
            } else {
                toast.success("Login successful!");
                secureLocalStorage.setItem("adminLogin", "true");
                navigate("/MainDashboard");
            }
        } catch (error) {
            toast.error("Login failed. Please try again later.");
            console.error("Login error:", error);
        }

        setHasError(false);
    };

    useEffect(() => {
        if (secureLocalStorage.getItem("adminLogin") === "true") {
            navigate("/MainDashboard");
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl shadow-lg rounded-xl overflow-hidden">

                {/* Left Section (Hidden on Small Screens) */}
                <div className="hidden sm:flex flex-col justify-center items-center bg-blue-900 text-white p-8 rounded-l-xl">
                    <h1 className="text-3xl md:text-5xl font-bold">HK SMS</h1>
                    <p className="text-lg md:text-xl mt-2">HK Scholars Management System</p>
                </div>

                {/* Right Section (Login Form) */}
                <div className="bg-white p-6 md:p-10 w-full rounded-r-xl">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-6">Sign in</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full p-3 text-base md:text-lg border border-gray-300 rounded-lg"
                                disabled={lockout}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-3 text-base md:text-lg border border-gray-300 rounded-lg"
                                disabled={lockout}
                            />
                        </div>

                        {/* Math Puzzle */}
                        <div className="mt-4 bg-gray-100 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">Security Check</h3>
                            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md mb-3">
                                <p className="text-lg font-bold text-blue-900">{mathPuzzle.question}</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your answer"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={`w-full p-3 text-base md:text-lg border ${hasError ? "border-red-500" : "border-blue-300"} rounded-lg focus:outline-none focus:ring-2 ${hasError ? "focus:ring-red-400" : "focus:ring-blue-400"}`}
                                disabled={lockout}
                            />
                            {hasError && (
                                <p className="mt-2 text-sm text-red-500">Incorrect answer. Please try again.</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">* Solve this puzzle to verify you're human!</p>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 bg-green-500 text-white text-lg md:text-xl rounded-lg font-semibold hover:bg-green-600 transition"
                            disabled={lockout}
                        >
                            {lockout ? `Locked (${countdown}s)` : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
