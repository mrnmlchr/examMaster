import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Pie } from "react-chartjs-2";

export default function Dashboard({ exams = [] }) {
    // State for user stats
    const [stats, setStats] = useState({
        exams_generated: 0,
        modules_uploaded: 0, // Initialize modules count
    });

    // Fetch user stats on component load
    useEffect(() => {
        fetch("/dashboard/modules")
            .then((response) => response.json())
            .then((data) => setStats(data))
            .catch((error) => console.error("Error fetching stats:", error));
    }, []);
    

    // Prepare data for the pie chart
    const pieData = {
        labels: exams.map((exam) => exam.title), // Titles of the exams
        datasets: [
            {
                label: "Exam Counts",
                data: exams.map((exam) => exam.participants || 0), // Example field for number of participants
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col h-full bg-gray-100 p-6">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Exams Generated */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-lg p-9">
                        <h2 className="text-2xl font-bold">Exams Generated</h2>
                        <p className="text-6xl font-bold mt-2  flex flex-col items-center">{stats.exams_generated}</p>
                    </div>

                    {/* Modules Uploaded */}
                    <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-lg shadow-lg p-9">
                        <h2 className="text-2xl font-bold">Modules Uploaded</h2>
                        <p className="text-6xl font-bold mt-2  flex flex-col items-center">{stats.modules_uploaded}</p>
                    </div>
                </div>

                {/* List of Exams */}
                <div className="bg-white shadow rounded-md p-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Exams List</h2>
                    {exams.length > 0 ? (
                        <ul className="space-y-2">
                            {exams.map((exam, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100 transition"
                                >
                                    <span className="text-gray-700 font-medium">{exam.title}</span>
                                    <Link
                                        href={`/exams/${exam.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No exams generated yet.</p>
                    )}
                </div>

                {/* Pie Chart */}
                {exams.length > 0 && (
                    <div className="bg-white shadow rounded-md p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Exam Participation Overview
                        </h2>
                        <Pie data={pieData} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
