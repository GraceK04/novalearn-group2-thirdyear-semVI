import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseDetailsByCourseId } from "../service/CourseService";
import { getLoggedInUser } from "../service/AuthService";

export const CourseDetailsComponent = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState<any[]>([]);
    const [completedLessons, setCompletedLessons] = useState<number>(0);
    const navigate = useNavigate();
    const userName = getLoggedInUser(); // Get the logged-in user

    useEffect(() => {
        getCourseDetailsByCourseId(parseInt(id))
            .then(res => {
                console.log("Fetched course details:", res.data); // Log the fetched data
                setCourseDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        const savedCompletedLessons = localStorage.getItem(`course-${id}-completedLessons-${userName}`);
        if (savedCompletedLessons) {
            setCompletedLessons(parseInt(savedCompletedLessons, 10));
        }
    }, [id, userName]);

    useEffect(() => {
        localStorage.setItem(`course-${id}-completedLessons-${userName}`, completedLessons.toString());
    }, [completedLessons, id, userName]);

    const totalLessons = courseDetails.length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const markLessonAsCompleted = (lessonId: number) => {
        if (completedLessons < totalLessons) {
            setCompletedLessons(prev => prev + 1);
        }
        if (completedLessons + 1 === totalLessons) {
            // Mark the course as completed in local storage
            localStorage.setItem(`course-${id}-completed-${userName}`, "true");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-900 py-8">
                <div className="container mx-auto">
                    <h1 className="text-center text-white text-4xl font-bold mb-8">Course Lessons</h1>
                    <div className="mb-8">
                        <div className="text-white text-lg mb-2">
                            Progress: {completedLessons}/{totalLessons} lessons completed ({progressPercentage.toFixed(0)}%)
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-pink-400 h-4 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {courseDetails && courseDetails.length > 0 ? (
                            courseDetails.map((c, index) => (
                                <div
                                    key={c.title}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-purple-800 mb-2">{c.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <a
                                                href={c.movieLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300"
                                            >
                                                Watch Lesson
                                            </a>
                                            <button
                                                onClick={() => markLessonAsCompleted(index)}
                                                className={`${
                                                    completedLessons > index
                                                        ? "bg-green-600 cursor-not-allowed"
                                                        : "bg-green-600 hover:bg-green-700"
                                                } text-white py-2 px-4 rounded-lg transition-all duration-300`}
                                                disabled={completedLessons > index}
                                            >
                                                {completedLessons > index ? "Completed" : "Mark as Completed"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white">No lessons available for this course.</p>
                        )}
                    </div>
                    {completedLessons === totalLessons && totalLessons > 0 && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                <h2 className="text-2xl font-bold text-purple-800 mb-4">Course Completed!</h2>
                                <p className="text-gray-600 mb-6">You have successfully completed the course.</p>
                                <button
                                    onClick={() => navigate("/my-learning")}
                                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300"
                                >
                                    Go to My Learning
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};