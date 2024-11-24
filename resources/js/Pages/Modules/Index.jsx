import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
    const [modules, setModules] = useState([]); // State to hold modules data
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        file: null,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch modules data
    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await axios.get("/modules"); // Adjust endpoint as needed
            setModules(response.data); // Populate modules data
        } catch (error) {
            console.error("Error fetching modules:", error);
            toast.error("Failed to fetch modules. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        if (formData.file) {
            data.append("file", formData.file);
        }

        try {
            await axios.post("/uploadModule", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Module uploaded successfully!");
            setShowForm(false);
            setFormData({ name: "", description: "", file: null });
            fetchModules(); // Refresh module list
        } catch (error) {
            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors || {});
                toast.error("Validation error! Check your inputs.");
            } else {
                console.error("Unexpected error:", error);
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/searchModules?query=${searchQuery}`);
            setModules(response.data); // Display search results
            toast.info("Search executed successfully!");
        } catch (error) {
            console.error("Error during search:", error);
            toast.error("An error occurred while searching. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Modules</h2>
                <div className="flex justify-end items-center space-x-2 mb-4">
                    {/* Search Section */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modules..."
                        className="px-4 py-2 border rounded-lg w-64"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Add Module
                    </button>
                </div>

                {/* Modules List */}
                {modules.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Description</th>
                                <th className="border border-gray-300 px-4 py-2">View</th>
                                <th className="border border-gray-300 px-4 py-2">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modules.map((module) => (
                                <tr key={module.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{module.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{module.description}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a
                                            href={`/view/${module.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a
                                            href={`/download/${module.file}`}
                                            className="text-green-600 hover:underline"
                                        >
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No modules available.</p>
                )}

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Add New Module</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Module Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg ${
                                            validationErrors.name ? "border-red-500" : ""
                                        }`}
                                        placeholder="Module Name"
                                        required
                                    />
                                    {validationErrors.name && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.name[0]}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg ${
                                            validationErrors.description ? "border-red-500" : ""
                                        }`}
                                        placeholder="Module Description"
                                        rows="4"
                                        required
                                    ></textarea>
                                    {validationErrors.description && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.description[0]}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Upload File</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full"
                                    />
                                    {validationErrors.file && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.file[0]}</p>
                                    )}
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 rounded-lg text-white ${
                                            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                        disabled={loading}
                                    >
                                        {loading ? "Uploading..." : "Upload"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <ToastContainer position="bottom-right" />
        </AuthenticatedLayout>
    );
}
