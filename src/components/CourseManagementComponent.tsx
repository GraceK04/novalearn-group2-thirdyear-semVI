import { useEffect, useState } from "react";
import { CourseDetailsInfoDto } from "../ds/course.details.info";
import { getAllCourseDetailsInfo, getTotalFeesForAdmin, updateCourse } from "../service/CourseService";
import { getLoggedInUser, getLoggedInUserRole } from "../service/AuthService";
import { HomeComponent } from "./HomeComponent";
import { AdminTotalFees } from "../ds/admin.total.fees";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const CourseManagementComponent = () => {
    const [courseDetailsInfo, setCourseDetailsInfo] = useState<CourseDetailsInfoDto[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<CourseDetailsInfoDto | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [adminInfo, setAdminInfo] = useState<AdminTotalFees>({ username: "", fees: 0 });

    const loggedInUserRole = getLoggedInUserRole();
    if (loggedInUserRole.trim() !== 'ROLE_ADMIN') {
        return <HomeComponent />;
    }
    const loggedInName = getLoggedInUser();

    useEffect(() => {
        fetchAllCourseDetailsInfo();
        getTotalFeesForAdmin(loggedInName)
            .then(res => setAdminInfo(res.data))
            .catch(err => console.log(err));
    }, []);

    const fetchAllCourseDetailsInfo = () => {
        getAllCourseDetailsInfo()
            .then(res => setCourseDetailsInfo(res.data))
            .catch(err => console.log(err));
    };

    const handleEditClick = (course: CourseDetailsInfoDto) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCourse) {
            updateCourse(selectedCourse)
                .then(res => {
                    console.log(res);
                    fetchAllCourseDetailsInfo();
                    setShowModal(false);
                    setSelectedCourse(null);
                })
                .catch(err => console.log(err));
        }
    };

    // Prepare data for the chart
    const chartData = {
        labels: courseDetailsInfo.map(course => course.title),
        datasets: [
            {
                label: 'Popularity',
                data: courseDetailsInfo.map(course => course.rating), // Assuming rating represents popularity
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Course Popularity',
            },
        },
    };

    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="row">
                    <div className="col">
                        <h3 className="my-3 text-muted">Hi! <span className="text-capitalize">{loggedInName}</span>. You have earned ${adminInfo.fees}.</h3>
                        <div className="card">
                            <div className="card-header">
                                <h5>Course Management</h5>
                            </div>
                            <div className="card-body">
                                {/* Chart Section */}
                                <div className="mb-4">
                                    <Bar data={chartData} options={chartOptions} />
                                </div>

                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>CategoryName</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courseDetailsInfo && courseDetailsInfo.length > 0 && courseDetailsInfo.map(course => (
                                        <tr key={course.courseId}>
                                            <td>{course.courseId}</td>
                                            <td>{course.title}</td>
                                            <td>${course.price}</td>
                                            <td>{course.categoryName}</td>
                                            <td>
                                                <button className="btn btn-primary bg-purple-500 hover:bg-purple-700 text-white" onClick={() => handleEditClick(course)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleModalClose}></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h5 className="text-xl mb-4">Edit Course</h5>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={selectedCourse.title}
                                    onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    value={selectedCourse.price}
                                    onChange={(e) => setSelectedCourse({ ...selectedCourse, price: Number(e.target.value) })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-gray-700">Category</label>
                                <input
                                    id="categoryName"
                                    type="text"
                                    value={selectedCourse.categoryName}
                                    onChange={(e) => setSelectedCourse({ ...selectedCourse, categoryName: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-gray-700">Rating</label>
                                <input
                                    id="rating"
                                    type="number"
                                    value={selectedCourse.rating}
                                    onChange={(e) => setSelectedCourse({ ...selectedCourse, rating: Number(e.target.value) })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="btn btn-secondary me-2 bg-gray-500 hover:bg-gray-700 text-white" onClick={handleModalClose}>Close</button>
                                <button type="submit" className="btn btn-primary bg-purple-500 hover:bg-purple-700 text-white">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};