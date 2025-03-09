import { useNavigate } from "react-router-dom";
import { HomeComponent } from "./HomeComponent";
import { CourseDetailsInfoDto } from "../ds/course.details.info";
import { useEffect, useState } from "react";
import { getAllCourseDetailsInfo, getAllStudentDetails } from "../service/CourseService";
import { StudentDetails } from "../ds/student.details";

export const NovaLearnReportComponent = () => {
    const role = sessionStorage.getItem("role");
    const navigator = useNavigate();

    const [courseDetailsInfo, setCourseDetailsInfo] = useState<CourseDetailsInfoDto[]>([]);
    const [studentDetails, setStudentDetails] = useState<StudentDetails[]>([]);

    useEffect(() => {
        getAllCourseDetailsInfo()
            .then(res => setCourseDetailsInfo(res.data))
            .catch(e => console.log(e));
        getAllStudentDetails()
            .then(res => setStudentDetails(res.data))
            .catch(e => console.log(e));
    }, []);

    if (role.trim() !== "ROLE_ADMIN") {
        return (<HomeComponent/>);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">NovaLearn Report</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-center mb-3">Course Details</h2>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Instructor</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courseDetailsInfo.map(course => (
                            <tr key={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.title}</td>
                                <td>${course.price}</td>
                                <td>{course.categoryName}</td>
                                <td>{course.instructorName}</td>
                                <td>{course.rating}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center mb-3">Student Details</h2>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Enrolled Courses</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentDetails.map(student => (
                            <tr key={student.studnetId}>
                                <td>{student.studnetId}</td>
                                <td>{student.name}</td>
                                <td>{student.courseName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}