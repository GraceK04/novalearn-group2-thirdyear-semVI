import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export const Statistics = () => {
    // Data for the charts
    const data = [
        { name: "React Basics", enrollments: 120 },
        { name: "Advanced JavaScript", enrollments: 90 },
        { name: "Node.js Fundamentals", enrollments: 75 },
        { name: "Python for Beginners", enrollments: 60 },
        { name: "Data Structures", enrollments: 50 },
    ];

    // Colors for the pie chart
    const COLORS = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"];

    // Calculate summary statistics
    const totalEnrollments = data.reduce((sum, course) => sum + course.enrollments, 0);
    const averageEnrollments = totalEnrollments / data.length;
    const mostPopularCourse = data.reduce((max, course) =>
        course.enrollments > max.enrollments ? course : max
    );

    return (
        <div className="p-4">
            <h3>Course Enrollment Statistics</h3>

            {/* Summary Statistics */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h4>Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">Total Enrollments</p>
                        <p className="text-2xl font-bold">{totalEnrollments}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">Average Enrollments</p>
                        <p className="text-2xl font-bold">{averageEnrollments.toFixed(1)}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">Most Popular Course</p>
                        <p className="text-2xl font-bold">{mostPopularCourse.name}</p>
                        <p className="text-sm text-gray-600">{mostPopularCourse.enrollments} enrollments</p>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-8">
                <h4>Enrollments by Course</h4>
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                    <div style={{ width: "100%", height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="enrollments" fill="#36A2EB" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mt-8">
                <h4>Enrollment Distribution</h4>
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                    <div style={{ width: "100%", height: 400 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="enrollments"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};