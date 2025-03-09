import {RegisterDto} from "../ds/register.dto";
import axios from "axios";
import {LoginDto} from "../ds/login.dto";


const AUTH_BACKEND_URL = 'http://localhost:8080/api/auth';

export const registerCall =
    (registerDto:RegisterDto) => axios.post(AUTH_BACKEND_URL + '/register', registerDto);



export const loginCall =
    (loginDto:LoginDto)=> axios.post(AUTH_BACKEND_URL + '/login', loginDto);

export const storeToken = (token) => localStorage.setItem("token",token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser =
    (username,role) =>{
        sessionStorage.setItem("authenticatedUser",username);
        sessionStorage.setItem("role",role);
    }
export const getLoggedInUserRole = () => sessionStorage.getItem("role");

export const getLoggedInUser = () =>{
   const username=sessionStorage.getItem("authenticatedUser");
   return username;
}

export const isAdmin = () =>{
    return getLoggedInUserRole() === "ROLE_ADMIN";
}

export const saveLoggedInUserRole = (role:string) =>
    sessionStorage.setItem("role",role);


export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if(username===null){
        return false;
    }else{
        return true;
    }
}

export const isTeacher = () =>{
    const role = sessionStorage.getItem("role");
    if(role==="ROLE_TEACHER"){
        return true;
    }else{
        return false;
    }
}