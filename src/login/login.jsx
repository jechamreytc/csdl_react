import { useState, useEffect } from "react";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mathPuzzle, setMathPuzzle] = useState({ question: "", answer: 0 });
    const [userAnswer, setUserAnswer] = useState("");
    const [wordPuzzleImg, setWordPuzzleImg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockout, setLockout] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const router = useNavigate();

    const generateMathPuzzle = () => {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        setMathPuzzle({
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
        });
    };

    const loadWordPuzzle = () => {
        setWordPuzzleImg(`http://localhost/csdl/generate_custom_word_puzzle.php?${Math.random()}`);
    };

    useEffect(() => {
        generateMathPuzzle();
        loadWordPuzzle();
    }, []);

    useEffect(() => {
        let timer;
        if (lockout && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setLockout(false);
            setAttempts(0);
        }
        return () => clearInterval(timer);
    }, [lockout, countdown]);

    const handleLogin = (e) => {
        e.preventDefault();

        if (lockout) {
            toast.error(`Please wait ${countdown} seconds before trying again.`);
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
                setCountdown(10); // Lockout period in seconds
                toast.error("Too many incorrect attempts. Please wait 10 seconds.");
            }
            return;
        }

        setHasError(false);
        toast.success("Login successful!");
        router("/MainDashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-green-500">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-lg rounded-xl">
                <div className="hidden md:flex flex-col justify-center items-center bg-blue-900 text-white rounded-l-xl">
                    <h1 className="text-5xl font-bold">HK SMS</h1>
                    <p className="text-lg mt-2">HK Scholars Management System</p>
                </div>
                <div className="bg-white p-8 rounded-r-xl">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sign in</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Login Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email or ID</label>
                            <input
                                type="text"
                                placeholder="Email or ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                disabled={lockout}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                disabled={lockout}
                            />
                        </div>

                        {/* Math Puzzle Section */}
                        <div className="mt-4 bg-gray-100 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">Math Puzzle Challenge</h3>
                            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md mb-3">
                                <p className="text-lg font-bold text-blue-900">{mathPuzzle.question}</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your answer"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={`w-full p-3 border ${hasError ? "border-red-500" : "border-blue-300"
                                    } rounded-lg focus:outline-none focus:ring-2 ${hasError ? "focus:ring-red-400" : "focus:ring-blue-400"
                                    }`}
                                disabled={lockout}
                            />
                            {hasError && (
                                <p className="mt-2 text-sm text-red-500">
                                    Incorrect answer. Please try again.
                                </p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">* Solve this puzzle to verify you're human!</p>
                        </div>

                        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition" disabled={lockout}>
                            {lockout ? `Locked (${countdown}s)` : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
