'use client'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {NavbarComponent} from './components/NavbarComponent.js';
import {HomeComponent} from './components/HomeComponent.js';
import {LoginComponent} from "./components/LoginComponent";
import {RegisterComponent} from "./components/RegisterComponent";
import {TestComponent} from "./components/TestComponent";
import {isUserLoggedIn} from "./service/AuthService";
import {CourseComponent} from "./components/CourseComponent";
import {createContext, useContext, useState} from "react";
import {CourseDetailsInfoDto} from "./ds/course.details.info";
import {CartViewComponent} from "./components/CartViewComponent";
import StripeCheckout from "./components/StripCheckoutForm";
import {MyLearningComponent} from "./components/MyLearningComponent";
import {CourseDetailsComponent} from "./components/CourseDetailsComponent";
import {DashboardComponent} from "./components/DashboardComponent";
import {CreateCourseComponent} from "./components/CreateCourseComponent";
import {CourseManagementComponent} from "./components/CourseManagementComponent";
import {NovaLearnReportComponent} from "./components/NovaLearnReportComponent";
import  QuizComponent  from './components/QuizComponent'; // Import the QuizComponent

export const CourseCartContext = createContext(
    {
        cartItem: {},
        addToCart: (cartItem: CourseDetailsInfoDto) => {
        },
        removeFromCart: (cartItem: CourseDetailsInfoDto) => {
        },
        clearCart: () => {
        }
    }
)

function App() {

    const [cartItem, setCartItem] = useState<CourseDetailsInfoDto>();

    function AuthenticatedRoute({children}: any) {
        const isAuth = isUserLoggedIn();
        if (isAuth) {
            return children;
        }
        return <Navigate to="/login"/>
    }

    const addToCart = (cartItem: CourseDetailsInfoDto) => {
        setCartItem(cartItem);
    }

    const removeFromCart = (cartItem: CourseDetailsInfoDto) => {
        setCartItem(null);
    }

    const clearCart = () => {
        setCartItem(null);
    }

    const contextValue = {
        cartItem,
        addToCart,
        removeFromCart,
        clearCart
    }


    return (
        <>
            <CourseCartContext.Provider value={contextValue}>
                <BrowserRouter>
                    <NavbarComponent/>
                    <Routes>
                        <Route path="/" element={<HomeComponent/>}></Route>
                        <Route path="/login" element={<LoginComponent/>}></Route>
                        <Route path="/register" element={<RegisterComponent/>}></Route>
                        <Route path="/course" element={
                            <AuthenticatedRoute>
                                <CourseComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path="/course/details/:id" element={
                            <AuthenticatedRoute>
                                <CourseDetailsComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path="/my-learning" element={
                            <AuthenticatedRoute>
                                <MyLearningComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path="/quiz" element={
                            <AuthenticatedRoute>
                                <QuizComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path="/checkout" element={<StripeCheckout/>}></Route>
                        <Route path="/cart-view" element={
                            <AuthenticatedRoute>
                                <CartViewComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path="/dashboard" element={
                            <AuthenticatedRoute>
                                <DashboardComponent>
                                </DashboardComponent>
                            </AuthenticatedRoute>
                        } >
                            <Route path="create-course" element={<CreateCourseComponent />} ></Route>
                            <Route path="course-management" element={<CourseManagementComponent />} ></Route>
                            <Route path="admin" element={<NovaLearnReportComponent />}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CourseCartContext.Provider>
        </>
    )
}

export default App;