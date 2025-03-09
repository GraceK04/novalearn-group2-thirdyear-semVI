import axios from "axios";
import {CourseDetailsInfoDto} from "../ds/course.details.info";
import {getToken} from "./AuthService";
import {CheckoutDto} from "../ds/checkout.dto";
import {CourseLessonsDetailsDto} from "../ds/course.lessons.details.dto";
import {StudentDetails} from "../ds/student.details";
import {InstructorIdDto} from "../ds/instructor.id.dto";



axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers["Authorization"]=getToken();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


const COURSE_BACKEND_URI = "http://localhost:8080/api/nova-learn";
const COURSE_UPDATE_URI ="http://localhost:8080/api/courses";

export const getInstructorIdByName =(username:string) =>
    axios.get<InstructorIdDto>(`${COURSE_BACKEND_URI}/instructor-id/${username}`);

export const getTotalFeesForInstructor = (username:string) =>
    axios.get(`${COURSE_BACKEND_URI}/instructor/fees/${username}`);

export const getTotalFeesForAdmin = (username:string) =>
    axios.get(`${COURSE_BACKEND_URI}/admin/fees/${username}`);

export const getAllStudentDetails = () =>
    axios.get<StudentDetails[]>(`${COURSE_BACKEND_URI}/student-details-info`);

export const getAllCourseSummary = (instructorName:string) =>
    axios.get(`${COURSE_UPDATE_URI}/course-summary/${instructorName}`);

export const updateCourse = (course:CourseDetailsInfoDto) =>
    axios.put(`${COURSE_UPDATE_URI}/update`, course);


export const createCourse = (course:any) =>
    axios.post(`http://localhost:8080/api/courses`, course);
export const createCourseLessons = (courseLesson:CourseLessonsDetailsDto,courseId:number)=>
    axios.post(`${COURSE_UPDATE_URI}/course-lessons/${courseId}`,courseLesson);

export const getAllCategories = () =>
    axios.get('http://localhost:8080/api/courses/category');
export const getAllInstructors = () =>
    axios.get('http://localhost:8080/api/courses/instructors');

export const getAllCourseDetailsInfo = () => axios
    .get<CourseDetailsInfoDto[]>(`${COURSE_BACKEND_URI}/course-details-info`);



export const enRollCourse = (checkoutDto: CheckoutDto) =>
    axios.post(`${COURSE_BACKEND_URI}/enroll`, checkoutDto);


export const getEnrolledCoursesByLoggedInUser    = (username:string) =>
    axios.get(`${COURSE_BACKEND_URI}/my-learning/${username}`);

export const getCourseDetailsByCourseId =  (courseId:number) =>
    axios.get(`${COURSE_BACKEND_URI}/course-details/${courseId}`);
