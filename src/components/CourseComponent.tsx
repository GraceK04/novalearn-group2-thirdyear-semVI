import { useContext, useEffect, useState } from "react";
import { CourseDetailsInfoDto } from "../ds/course.details.info";
import { getAllCourseDetailsInfo } from "../service/CourseService";
import { CourseCartContext } from "../App";
import { isTeacher, isAdmin } from "../service/AuthService"; // Import isTeacher and isAdmin functions

export function CourseComponent() {
    const { addToCart } = useContext(CourseCartContext);

    const [courseDetailsInfo, setCourseDetailsInfo] = useState<CourseDetailsInfoDto[]>([]);
    const [searchName, setSearchName] = useState<string>('');
    const [filteredCourse, setFilteredCourse] = useState<CourseDetailsInfoDto[]>([]);

    useEffect(() => {
        getAllCourseDetailsInfo()
            .then(res => setCourseDetailsInfo(res.data))
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        handleSearch(searchName);
    }, [searchName, courseDetailsInfo]);

    const handleSearch = (searchName: string) => {
        setFilteredCourse(courseDetailsInfo.filter(c =>
            c.title && c.title.toLowerCase().includes(searchName.toLowerCase())
        ));
    };

    const addToCartHandler = (course: CourseDetailsInfoDto) => {
        if (isTeacher() || isAdmin()) {
            alert("Instructors and Admins cannot enroll in courses.");
        } else {
            addToCart(course);
        }
    };

    return (
        <>
            {/* Darker Purple Gradient Background */}
            <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-900 py-8">
                <div className="container mx-auto">
                    {/* Centered Search Bar with Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border-white bg-transparent"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            {/* Search Icon */}
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourse && filteredCourse.length > 0 ? (
                            filteredCourse.map(course => (
                                <div
                                    key={course.courseId}
                                    className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                                >
                                    <img
                                        src={course.linkImg}
                                        alt={course.title}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-purple-800">{course.title}</h3>
                                        <p className="text-gray-700">{course.categoryName}</p>
                                        <p className="text-gray-700">Instructor: {course.instructorName}</p>
                                        <p className="text-gray-700">Price: ${course.price}</p>
                                    </div>
                                    <button
                                        className={`mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ${
                                            isTeacher() || isAdmin() ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        onClick={() => addToCartHandler(course)}
                                        disabled={isTeacher() || isAdmin()} // Disable button for teachers and admins
                                    >
                                        {isTeacher() || isAdmin() ? "Enrollment Restricted" : "Enroll"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center col-span-full">No courses found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}