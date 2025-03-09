import { useEffect, useState } from "react";
import { CourseDetailsInfoDto } from "../ds/course.details.info";
import { getEnrolledCoursesByLoggedInUser } from "../service/CourseService";
import { getLoggedInUser } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

// Define the extended type
interface CourseDetailsInfoWithCompletion extends CourseDetailsInfoDto {
    completed: boolean;
}

export const MyLearningComponent = () => {
    const [courseDetailsInfo, setCourseDetailsInfo] = useState<CourseDetailsInfoWithCompletion[]>([]);
    const navigator = useNavigate();
    const userName = getLoggedInUser();

    useEffect(() => {
        getEnrolledCoursesByLoggedInUser(userName)
            .then(res => {
                // Fetch completion status from local storage using the user-specific key
                const coursesWithCompletionStatus = res.data.map(course => ({
                    ...course,
                    completed: localStorage.getItem(`course-${course.courseId}-completed-${userName}`) === "true",
                }));
                setCourseDetailsInfo(coursesWithCompletionStatus);
            })
            .catch(error => console.log(error));
    }, [userName]);

    const courseDetailsHandler = (courseId: number) => {
        navigator(`/course/details/${courseId}`);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-900 py-8">
                <div className="container mx-auto">
                    <h1 className="text-center text-white text-4xl font-bold mb-8">My Learning</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseDetailsInfo && courseDetailsInfo.length > 0 ? (
                            courseDetailsInfo.map(course => (
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
                                        {course.completed && (
                                            <p className="text-green-600 font-semibold">Course Completed</p>
                                        )}
                                    </div>
                                    <button
                                        className={`mt-4 w-full ${
                                            course.completed
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-purple-600 hover:bg-purple-700"
                                        } text-white py-2 px-4 rounded-lg transition-all duration-300`}
                                        onClick={() => courseDetailsHandler(course.courseId)}
                                    >
                                        {course.completed ? "Learn Again" : "Learn"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center col-span-full">No courses enrolled yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};