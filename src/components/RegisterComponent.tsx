import { useState } from "react";
import { registerCall } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export function RegisterComponent() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const [experties, setExperties] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>(''); // For typing errors
    const navigator = useNavigate();

    const usernameHandler = (e) => setUsername(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const passwordHandler = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword); // Validate password while typing
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
        if (e.target.value === "instructor") {
            setIsInstructor(true);
        }
        if (e.target.value === "student") {
            setIsInstructor(false);
        }
    };

    const expertiesHandler = (e) => setExperties(e.target.value);

    // Password validation function
    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/; // At least 8 chars and one special character
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long and include at least one special character.");
        } else {
            setPasswordError(""); // Clear error if valid
        }
    };

    const registerHandler = (e) => {
        e.preventDefault();

        // Validate password before submitting
        if (passwordError) {
            alert("Password must be at least 8 characters long and include at least one special character.");
            return; // Stop form submission
        }

        const registerDto = {
            username,
            email,
            password,
            status,
            experties
        };

        registerCall(registerDto)
            .then(response => {
                console.log(response.data);
                navigator("/login");
            })
            .catch(error => {
                // Handle the error response
                if (error.response && error.response.data) {
                    // Check if the error message indicates a duplicate username
                    if (error.response.data.includes("already registered")) {
                        setErrorMessage("Username already exists or registered.");
                    } else {
                        setErrorMessage("Registration failed. Please try again.");
                    }
                } else {
                    setErrorMessage("Registration failed. Please try again.");
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">Register</h2>
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                <form>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={usernameHandler}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your username"
                        />
                    </div>
                    {isInstructor && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experties">
                                Expertise
                            </label>
                            <input
                                id="experties"
                                type="text"
                                value={experties}
                                onChange={expertiesHandler}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter your expertise"
                            />
                        </div>
                    )}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={emailHandler}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={passwordHandler}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        {/* Show error message under the password input */}
                        {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <div className="flex items-center">
                            <input
                                id="student"
                                type="radio"
                                value="student"
                                name="status"
                                onChange={statusHandler}
                                className="mr-2"
                            />
                            <label htmlFor="student" className="mr-4 text-gray-700">Student</label>
                            <input
                                id="instructor"
                                type="radio"
                                value="instructor"
                                name="status"
                                onChange={statusHandler}
                                className="mr-2"
                            />
                            <label htmlFor="instructor" className="text-gray-700">Instructor</label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            onClick={registerHandler}
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 w-full"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}