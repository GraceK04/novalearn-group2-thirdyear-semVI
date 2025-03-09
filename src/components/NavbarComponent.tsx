import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin, isTeacher, isUserLoggedIn } from "../service/AuthService";
import { FaCartShopping } from 'react-icons/fa6';
import { useContext } from "react";
import { CourseCartContext } from "../App";

export function NavbarComponent() {
    const isAuth = isUserLoggedIn();
    const { cartItem } = useContext(CourseCartContext);
    const beTeacher = isTeacher();
    const beAdmin = isAdmin();

    function handleLogout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('role');
        window.location.reload();
    }

    return (
        <>
            <nav className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <NavLink to="/" style={{ textDecoration: 'none' }} className="flex items-center">
                        <img
                            src="/nova-logoo.png" // Reference the image in the public folder
                            alt="Logo"
                            className="h-10 w-auto" // Adjust the height as needed
                        />
                    </NavLink>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {!isAuth && (
                            <>
                                <NavLink
                                    to="/register"
                                    style={{ textDecoration: 'none' }}
                                    className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                                >
                                    Register
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    style={{ textDecoration: 'none' }}
                                    className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                                >
                                    Login
                                </NavLink>
                            </>
                        )}

                        {(beTeacher || beAdmin) && (
                            <NavLink
                                to="/dashboard"
                                style={{ textDecoration: 'none' }}
                                className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                            >
                                Dashboard
                            </NavLink>
                        )}

                        {isAuth && (
                            <>
                                <NavLink
                                    to="/course"
                                    style={{ textDecoration: 'none' }}
                                    className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                                >
                                    Course
                                </NavLink>
                                {!(beTeacher || beAdmin) && (
                                    <>
                                        <NavLink
                                            to="/my-learning"
                                            style={{ textDecoration: 'none' }}
                                            className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                                        >
                                            My Learning
                                        </NavLink>
                                        <NavLink
                                            to="/quiz"
                                            style={{ textDecoration: 'none' }}
                                            className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                                        >
                                            Quiz
                                        </NavLink>
                                    </>
                                )}
                            </>
                        )}

                        {isAuth && (
                            <NavLink
                                to="/login"
                                onClick={handleLogout}
                                style={{ textDecoration: 'none' }}
                                className="px-6 py-2 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:border-transparent transition duration-300 transform hover:scale-105"
                            >
                                Logout
                            </NavLink>
                        )}

                        {/* Cart Icon (only shown when logged in and not a teacher or admin) */}
                        {isAuth && !(beTeacher || beAdmin) && (
                            <NavLink to="/cart-view" style={{ textDecoration: 'none' }} className="flex items-center">
                                <FaCartShopping size={30} className="text-white me-2" />
                                <h3 className="text-white">{cartItem ? '1' : 0}</h3>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}