import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseCartContext } from "../App";
import { CheckoutDto } from "../ds/checkout.dto";
import { getLoggedInUser } from "../service/AuthService";
import { enRollCourse } from "../service/CourseService";
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import { FaCcVisa } from "react-icons/fa"; // For Visa icon

export function CartViewComponent() {
    const [courseItem, setCourseItem] = useState<any>();
    const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({}); // Object to store field-specific errors
    const [showCheckoutPopup, setShowCheckoutPopup] = useState<boolean>(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false); // For loading state
    const { cartItem, clearCart } = useContext(CourseCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setCourseItem(cartItem);
    }, [cartItem]);

    const checkOutHandler = () => {
        setShowCheckoutPopup(true);
    };

    const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            // Remove all non-digit characters
            const cleanedValue = value.replace(/\D/g, '');

            // Add spaces every 4 digits
            const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

            setCardDetails(prevState => ({
                ...prevState,
                [name]: formattedValue
            }));
        } else if (name === "expiryDate") {
            // Remove all non-digit characters
            const cleanedValue = value.replace(/\D/g, '');

            // Add a slash after the first two digits
            const formattedValue = cleanedValue.replace(/^(\d{2})(\d{0,2})/, '$1/$2');

            setCardDetails(prevState => ({
                ...prevState,
                [name]: formattedValue
            }));
        } else {
            setCardDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        // Clear error message for the field being edited
        setErrorMessage(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateCardDetails = () => {
        const { cardNumber, expiryDate, cvv } = cardDetails;
        const errors: { [key: string]: string } = {};

        // Check for required fields
        if (!cardNumber.trim()) {
            errors.cardNumber = "Card number is required.";
        } else {
            // Remove spaces from card number for validation
            const cleanedCardNumber = cardNumber.replace(/\s/g, '');

            // Card number validation (16 digits, Visa starts with 4)
            if (!/^4[0-9]{15}$/.test(cleanedCardNumber)) {
                errors.cardNumber = "Invalid Visa card number. Must be 16 digits and start with 4.";
            }
        }

        if (!expiryDate.trim()) {
            errors.expiryDate = "Expiry date is required.";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            errors.expiryDate = "Invalid expiry date. Use MM/YY format.";
        }

        if (!cvv.trim()) {
            errors.cvv = "CVV is required.";
        } else if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = "Invalid CVV. Must be 3 digits.";
        }

        // Set error messages
        setErrorMessage(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    const handleCheckoutSubmit = () => {
        if (!validateCardDetails()) return;

        setIsProcessing(true); // Show loading spinner
        setTimeout(() => {
            if (!courseItem) return;
            const checkoutDto: CheckoutDto = {
                courseId: courseItem.courseId,
                studentName: getLoggedInUser()
            };
            enRollCourse(checkoutDto)
                .then(res => {
                    console.log(res);
                    clearCart();
                    setCourseItem(null);
                    setShowCheckoutPopup(false);
                    navigate("/my-learning"); // Redirect to My Learning page
                    setIsProcessing(false); // Hide loading spinner
                })
                .catch(error => {
                    const msg = error.response?.data || "An error occurred";
                    const errorMessage = msg.match(/"([^\"]+)"/)?.[1] || msg;
                    setErrorMessage({ general: errorMessage }); // General error message
                    setIsProcessing(false); // Hide loading spinner
                });
        }, 3000); // Simulate 3 seconds of payment processing
    };

    const clearCartHandler = () => {
        clearCart();
        setCourseItem(null);
        navigate("/course");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-900 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                {courseItem ? (
                    <div className="text-center">
                        <img src={courseItem.linkImg} alt={courseItem.title} className="w-full h-40 object-cover rounded-md mb-2" />
                        <h3 className="text-lg font-bold text-purple-800">{courseItem.title}</h3>
                        <p className="text-gray-600">{courseItem.categoryName}</p>
                        <p className="text-gray-600">Instructor: {courseItem.instructorName}</p>
                        <p className="text-gray-600">Price: ${courseItem.price}</p>
                        <button
                            onClick={checkOutHandler}
                            className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={clearCartHandler}
                            className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                        >
                            Clear Cart
                        </button>
                    </div>
                ) : (
                    <p className="text-white text-center">Your cart is empty.</p>
                )}

                {showCheckoutPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">Enter Card Details</h2>
                            <form>
                                {/* Card Number Field */}
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardDetailsChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="1304 5678 9012 3456"
                                        maxLength={19} // 16 digits + 3 spaces
                                        required
                                    />
                                    <FaCcVisa className="absolute right-3 top-9 text-2xl text-blue-900" /> {/* Visa icon */}
                                    {errorMessage.cardNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errorMessage.cardNumber}</p>
                                    )}
                                </div>

                                {/* Expiry Date Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardDetailsChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                    />
                                    {errorMessage.expiryDate && (
                                        <p className="text-red-500 text-sm mt-1">{errorMessage.expiryDate}</p>
                                    )}
                                </div>

                                {/* CVV Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleCardDetailsChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="123"
                                        maxLength={3}
                                        required
                                    />
                                    {errorMessage.cvv && (
                                        <p className="text-red-500 text-sm mt-1">{errorMessage.cvv}</p>
                                    )}
                                </div>

                                {/* General Error Message */}
                                {errorMessage.general && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                                        {errorMessage.general}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleCheckoutSubmit}
                                    disabled={isProcessing}
                                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center"
                                >
                                    {isProcessing ? (
                                        <FaSpinner className="animate-spin mr-2" /> // Loading spinner
                                    ) : (
                                        "Submit Payment"
                                    )}
                                </button>

                                {/* Cancel Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowCheckoutPopup(false)}
                                    className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}