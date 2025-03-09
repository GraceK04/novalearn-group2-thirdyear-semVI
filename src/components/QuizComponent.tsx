import { useState } from 'react';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface Quiz {
    [key: string]: Question[];
}

const quizzes: Quiz = {
    programming: [
        { question: 'What does HTML stand for?', options: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Markup Language'], correctAnswer: 'Hyper Text Markup Language' },
        { question: 'Which language is used for styling web pages?', options: ['HTML', 'CSS', 'JavaScript'], correctAnswer: 'CSS' },
        { question: 'Which of the following is not a programming language?', options: ['Python', 'Java', 'HTTP'], correctAnswer: 'HTTP' },
        { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets'], correctAnswer: 'Cascading Style Sheets' },
        { question: 'Which language is used to add interactivity to a website?', options: ['HTML', 'CSS', 'JavaScript'], correctAnswer: 'JavaScript' },
        { question: 'What is React primarily used for?', options: ['Backend development', 'Database management', 'Building user interfaces'], correctAnswer: 'Building user interfaces' },
        { question: 'What does API stand for?', options: ['Application Programming Interface', 'Automated Processing Information', 'Advanced Program Integration'], correctAnswer: 'Application Programming Interface' },
        { question: 'What is Git used for?', options: ['Version control', 'Designing UI', 'Managing servers'], correctAnswer: 'Version control' },
        { question: 'Which of the following is a front-end framework?', options: ['Django', 'React', 'Flask'], correctAnswer: 'React' },
        { question: 'Which company developed Java?', options: ['Microsoft', 'Sun Microsystems', 'Google'], correctAnswer: 'Sun Microsystems' },
    ],
    finance: [
        { question: 'What is a 401(k)?', options: ['A type of loan', 'A retirement savings plan', 'A stock market index'], correctAnswer: 'A retirement savings plan' },
        { question: 'What does ROI stand for?', options: ['Return on Investment', 'Rate of Interest', 'Risk of Inflation'], correctAnswer: 'Return on Investment' },
        { question: 'Which financial document summarizes a company’s revenues and expenses?', options: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement'], correctAnswer: 'Income Statement' },
        { question: 'What is compound interest?', options: ['Interest on the initial principal', 'Interest calculated on both principal and accumulated interest', 'Interest paid yearly'], correctAnswer: 'Interest calculated on both principal and accumulated interest' },
        { question: 'What is the stock market index?', options: ['A list of banks', 'An indicator of stock market performance', 'A type of bond'], correctAnswer: 'An indicator of stock market performance' },
        { question: 'What does inflation measure?', options: ['Decrease in prices', 'Increase in prices', 'Stock market trends'], correctAnswer: 'Increase in prices' },
        { question: 'What is a mutual fund?', options: ['A single stock', 'A portfolio of stocks and bonds managed by professionals', 'A type of savings account'], correctAnswer: 'A portfolio of stocks and bonds managed by professionals' },
        { question: 'What is diversification in investing?', options: ['Buying the same stock repeatedly', 'Spreading investments across different assets', 'Avoiding stock investments'], correctAnswer: 'Spreading investments across different assets' },
        { question: 'What is an asset?', options: ['Anything owned that has value', 'A type of tax', 'A financial liability'], correctAnswer: 'Anything owned that has value' },
        { question: 'What is liquidity in finance?', options: ['How easily an asset can be converted into cash', 'A type of investment', 'A measure of debt'], correctAnswer: 'How easily an asset can be converted into cash' },
    ],
    maths: [
        { question: 'What is the value of π (pi) approximately?', options: ['3.14', '2.71', '1.61'], correctAnswer: '3.14' },
        { question: 'What is the square root of 64?', options: ['6', '8', '10'], correctAnswer: '8' },
        { question: 'What is the area of a circle with radius 3?', options: ['9π', '6π', '3π'], correctAnswer: '9π' },
        { question: 'What is the derivative of x²?', options: ['2x', 'x', '2'], correctAnswer: '2x' },
        { question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '360°'], correctAnswer: '180°' },
        { question: 'What is the Pythagorean theorem?', options: ['a² + b² = c²', 'a + b = c', 'a² - b² = c²'], correctAnswer: 'a² + b² = c²' },
        { question: 'What is the value of 5! (5 factorial)?', options: ['120', '60', '20'], correctAnswer: '120' },
        { question: 'What is the integral of 2x?', options: ['x²', 'x', '2x²'], correctAnswer: 'x²' },
        { question: 'What is the slope of the line y = 2x + 3?', options: ['2', '3', '5'], correctAnswer: '2' },
        { question: 'What is the value of e (Euler\'s number) approximately?', options: ['2.71', '3.14', '1.61'], correctAnswer: '2.71' },
    ],
    'java and python': [
        { question: 'Which language uses indentation to define code blocks?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Python' },
        { question: 'Which language is statically typed?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Java' },
        { question: 'Which language uses the print function to output text?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Python' },
        { question: 'Which language uses the System.out.println method to output text?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Java' },
        { question: 'Which language is interpreted?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Python' },
        { question: 'Which language is compiled?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Java' },
        { question: 'Which language uses the class keyword to define classes?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Both' },
        { question: 'Which language uses the def keyword to define functions?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Python' },
        { question: 'Which language uses the public static void main(String[] args) method as the entry point?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Java' },
        { question: 'Which language uses the import keyword to include libraries?', options: ['Java', 'Python', 'Both'], correctAnswer: 'Both' },
    ],
};

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const QuizComponent: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
        shuffleArray(quizzes[category]); // Shuffle questions
    };

    const handleAnswerSelect = (answer: string) => {
        if (selectedCategory) {
            const currentQuestion = quizzes[selectedCategory][currentQuestionIndex];
            if (answer === currentQuestion.correctAnswer) {
                setScore(score + 1);
            }
            if (currentQuestionIndex < quizzes[selectedCategory].length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setQuizCompleted(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 p-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto">
                {!selectedCategory ? (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Select a Quiz Category</h1>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(quizzes).map((category) => (
                                <button key={category} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300" onClick={() => handleCategorySelect(category)}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : quizCompleted ? (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
                        <p className="mb-4">Your score: {score} / {quizzes[selectedCategory].length}</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300" onClick={() => setSelectedCategory(null)}>Retake Quiz</button>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold mb-4">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Quiz</h1>
                        <p className="mb-4 font-semibold">{quizzes[selectedCategory][currentQuestionIndex].question}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {quizzes[selectedCategory][currentQuestionIndex].options.map((option, index) => (
                                <button key={index} className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300" onClick={() => handleAnswerSelect(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p className="mt-4 text-gray-700">Score: {score}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;