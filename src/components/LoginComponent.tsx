import { useState } from "react";
import { LoginDto } from "../ds/login.dto";
import { loginCall, saveLoggedInUser, saveLoggedInUserRole, storeToken } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export function LoginComponent() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigator = useNavigate();

    const usernameHandler = (e) => setUsername(e.target.value);
    const passwordHandler = (e) => setPassword(e.target.value);

    const loginHandler = (e) => {
        e.preventDefault();

        const loginDto: LoginDto = {
            username,
            password
        }
        loginCall(loginDto)
            .then(response => {
                console.log(response.data);
                saveLoggedInUserRole(response.data);
                const token = 'Basic ' + btoa(username + ':' + password);
                const role = response.data.trim();
                saveLoggedInUser(username, role);
                storeToken(token);
                navigator("/");
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">Login</h2>
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
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            onClick={loginHandler}
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}