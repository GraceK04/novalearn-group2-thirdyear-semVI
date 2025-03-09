import { useEffect, useState } from "react";
import {
    createCourse,
    createCourseLessons,
    getAllCategories,
    getAllCourseSummary,
    getAllInstructors,
    getInstructorIdByName,
    getTotalFeesForInstructor
} from "../service/CourseService";
import { CourseDetails } from "../ds/CourseDetails";
import { CourseDetailsInfoDto } from "../ds/course.details.info";
import { CourseLessonsDetailsDto } from "../ds/course.lessons.details.dto";
import { CourseSummary } from "../ds/course.summary";
import { getLoggedInUser } from "../service/AuthService";
import { InstructorTotalFees } from "../ds/instructor.total.fees";

export const CreateCourseComponent = () => {
    const [instructorId, setInstructorId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [linkImage, setLinkImage] = useState('');
    const [movieLink, setMovieLink] = useState('');
    const [coursetitleDetails, setCourseTitleDetails] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [courseSummary, setCourseSummary] = useState<CourseSummary[]>([]);
    const [instructorInfo, setInstructorInfo] = useState<InstructorTotalFees>({ fees: 0, username: "" });

    const username = getLoggedInUser();

    useEffect(() => {
        getInstructorIdByName(username)
            .then(res => setInstructorId(res.data.id))
            .catch(err => console.log(err));

        getTotalFeesForInstructor(username)
            .then(res => setInstructorInfo(res.data))
            .catch(err => console.log(err));

        getAllCategories()
            .then(res => setCategoryList(res.data))
            .catch(err => console.log(err));

        getAllInstructors()
            .then(res => setInstructorList(res.data))
            .catch(err => console.log(err));

        const loginUserName = getLoggedInUser();
        getAllCourseSummary(loginUserName)
            .then(res => setCourseSummary(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCourse = {
            title,
            price,
            rating: 4, // Always set rating to 4
            categoryName,
            instructorId,
            linkImg: linkImage,
            description: "Default course description" // Set a default description
        };

        createCourse(newCourse)
            .then(res => {
                console.log(res);
                setTitle('');
                setPrice(0);
                setCategoryName('');
                setInstructorId(0);
                setLinkImage('');
            })
            .catch(err => console.log(err));
    };

    const handleCreateLessons = (e) => {
        e.preventDefault();
        const courseLessons: CourseLessonsDetailsDto = {
            coursetitleDetails,
            movieLink,
            description: "Default lesson description" // Set a default description for lessons
        };
        createCourseLessons(courseLessons, courseId)
            .then(res => {
                console.log(res);
                setCourseTitleDetails('');
                setMovieLink('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-3">Create Course</h1>
            <h5 className="text-center text-muted mb-4">
                Hello, Instructor {username}! You have earned ${instructorInfo.fees} so far.
            </h5>
            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body p-3">
                            <h6 className="card-title mb-3">Course Details</h6>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-control form-control-sm"
                                        placeholder="Enter course title"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        step="any"
                                        id="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="form-control form-control-sm"
                                        placeholder="Enter course price"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Link Image</label>
                                    <input
                                        type="text"
                                        value={linkImage}
                                        onChange={(e) => setLinkImage(e.target.value)}
                                        className="form-control form-control-sm"
                                        placeholder="Provide the image link"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        id="category"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="form-select form-select-sm"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categoryList.map((category) => (
                                            <option key={category.id} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instructor" className="form-label">Instructor</label>
                                    <input
                                        type="text"
                                        value={username}
                                        className="form-control form-control-sm"
                                        readOnly
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-sm" style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}>
                                        Create Course
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body p-3">
                            <h6 className="card-title mb-3">Course Lessons</h6>
                            <form>
                                <div className="mb-2">
                                    <label className="form-label">Lesson Title</label>
                                    <input
                                        type="text"
                                        value={coursetitleDetails}
                                        onChange={(e) => setCourseTitleDetails(e.target.value)}
                                        className="form-control form-control-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Lesson Video Link</label>
                                    <input
                                        type="text"
                                        value={movieLink}
                                        onChange={(e) => setMovieLink(e.target.value)}
                                        className="form-control form-control-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseSummary" className="form-label">Choose Course</label>
                                    <select
                                        id="courseSummary"
                                        value={courseId}
                                        onChange={(e) => setCourseId(parseInt(e.target.value))}
                                        className="form-select form-select-sm"
                                        required
                                    >
                                        <option value="">Choose course</option>
                                        {courseSummary.map((summary) => (
                                            <option key={summary.id} value={summary.id}>
                                                {summary.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-grid">
                                    <button
                                        onClick={handleCreateLessons}
                                        className="btn btn-primary btn-sm"
                                        style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
                                    >
                                        Create Course Lessons
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};