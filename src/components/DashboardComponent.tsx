import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAdmin, isTeacher } from "../service/AuthService"; // Import role-checking functions

export const DashboardComponent = () => {
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate(); // For programmatic navigation

    // Check if the current route is the Dashboard
    const isDashboard = location.pathname === "/dashboard";

    // Check if the current route is Create Course
    const isCreateCourse = location.pathname === "/dashboard/create-course";

    // Check if the current route is Course Management
    const isCourseManagement = location.pathname === "/dashboard/course-management";

    // Check user role
    const isUserAdmin = isAdmin();
    const isUserTeacher = isTeacher();

    // If the user is an admin and tries to access Create Course, show an error message
    if (isUserAdmin && isCreateCourse) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
                <div className="container-fluid">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="sidebar col-md-3 col-lg-2 p-0 bg-purple-800">
                            <div className="offcanvas-md offcanvas-end bg-purple-800" id="sidebarMenu"
                                 aria-labelledby="sidebarMenuLabel">
                                <div className="offcanvas-header bg-purple-900">
                                    <h5 className="offcanvas-title text-white font-bold" id="sidebarMenuLabel">
                                        Nova Learn
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="offcanvas"
                                        data-bs-target="#sidebarMenu"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                    {/* Sidebar Links */}
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard"
                                                className={`nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3 ${
                                                    isDashboard ? "bg-purple-700" : ""
                                                }`}
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                                                    <path
                                                        d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                                                </svg>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard/create-course"
                                                className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                                Create Course
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard/course-management"
                                                className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                    <path
                                                        d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                                </svg>
                                                Course Management
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <h1 className="h2 text-white">Dashboard</h1>
                            </div>

                            {/* Enhanced Error Message for Admins */}
                            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                                <div className="text-center p-5 bg-white rounded-lg shadow-lg">
                                    <div className="text-danger mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="64"
                                            fill="currentColor"
                                            className="bi bi-lock-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    </div>
                                    <h2 className="h3 text-danger mb-3">Access Denied</h2>
                                    <p className="lead text-muted mb-4">
                                        Only instructors are allowed to create courses.
                                    </p>
                                    <button
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Go Back to Dashboard
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    // If the user is an instructor and tries to access Course Management, show an error message
    if (isUserTeacher && isCourseManagement) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
                <div className="container-fluid">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="sidebar col-md-3 col-lg-2 p-0 bg-purple-800">
                            <div className="offcanvas-md offcanvas-end bg-purple-800" id="sidebarMenu"
                                 aria-labelledby="sidebarMenuLabel">
                                <div className="offcanvas-header bg-purple-900">
                                    <h5 className="offcanvas-title text-white font-bold" id="sidebarMenuLabel">
                                        Nova Learn
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="offcanvas"
                                        data-bs-target="#sidebarMenu"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                    {/* Sidebar Links */}
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard"
                                                className={`nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3 ${
                                                    isDashboard ? "bg-purple-700" : ""
                                                }`}
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                                                    <path
                                                        d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                                                </svg>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard/create-course"
                                                className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                                Create Course
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/dashboard/course-management"
                                                className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                            >
                                                <svg
                                                    className="bi"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                    <path
                                                        d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                                </svg>
                                                Course Management
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <h1 className="h2 text-white">Dashboard</h1>
                            </div>

                            {/* Enhanced Error Message for Instructors */}
                            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                                <div className="text-center p-5 bg-white rounded-lg shadow-lg">
                                    <div className="text-danger mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="64"
                                            fill="currentColor"
                                            className="bi bi-lock-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    </div>
                                    <h2 className="h3 text-danger mb-3">Access Denied</h2>
                                    <p className="lead text-muted mb-4">
                                        Only admins are allowed to manage courses.
                                    </p>
                                    <button
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Go Back to Dashboard
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    // Default rendering for other cases
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="sidebar col-md-3 col-lg-2 p-0 bg-purple-800">
                        <div className="offcanvas-md offcanvas-end bg-purple-800" id="sidebarMenu"
                             aria-labelledby="sidebarMenuLabel">
                            <div className="offcanvas-header bg-purple-900">
                                <h5 className="offcanvas-title text-white font-bold" id="sidebarMenuLabel">
                                    Nova Learn
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                {/* Sidebar Links */}
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link
                                            to="/dashboard"
                                            className={`nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3 ${
                                                isDashboard ? "bg-purple-700" : ""
                                            }`}
                                        >
                                            <svg
                                                className="bi"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                                                <path
                                                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                                            </svg>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/dashboard/create-course"
                                            className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                        >
                                            <svg
                                                className="bi"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path
                                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                            Create Course
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/dashboard/course-management"
                                            className="nav-link d-flex align-items-center gap-2 text-white hover:bg-purple-700 transition-all p-3"
                                        >
                                            <svg
                                                className="bi"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                                <path
                                                    d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            </svg>
                                            Course Management
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h1 className="h2 text-white">Dashboard</h1>
                        </div>

                        {/* Conditionally Render White Container */}
                        {!isDashboard ? (
                            <div className="container bg-white p-4 rounded-lg shadow-lg">
                                <Outlet />
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};