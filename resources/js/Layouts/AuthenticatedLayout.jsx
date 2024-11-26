import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props?.auth?.user || { name: "Guest" };
    const currentUrl = usePage().url;  // Get the current URL
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Helper function to determine if the current page is active
    const isActive = (href) => currentUrl === href ? 'bg-green-600' : '';  // Apply active styles based on the current URL

    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            {/* Header */}
            <header className="w-full bg-green-800 text-white shadow">
    <div className="flex items-center justify-between px-6 py-8">
        {/* Logo and Title aligned to the left */}
        <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-14 w-auto" /> {/* Increased size */}
            <span className="ml-3 text-lg font-bold">ExamMaster: Exam Creator with TOS Generator</span>
        </div>
        {/* User Dropdown aligned to the right */}
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center text-white"
            >
                <span>{user.name}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isDropdownOpen && (
                <div className="absolute top-16 right-0 bg-white text-green-800 rounded-md shadow-lg z-10">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        {/* Edit Profile button */}
                        <NavLink
                            href="/profile/edit"
                            className="px-4 py-2 text-green-800 hover:bg-green-200 rounded-md"
                        >
                            Edit Profile
                        </NavLink>
                        {/* Logout button */}
                        <NavLink
                            href="/logout"
                            method="post"
                            className="px-4 py-2 text-green-800 hover:bg-green-200 rounded-md"
                        >
                            Logout
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    </div>
</header>


            {/* Main Layout */}
            <div className="flex-1 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-green-800 text-white p-4">
                    <nav className="space-y-6">
                        <NavLink
                            href="/dashboard"
                            className={`px-6 py-2 text-white hover:bg-green-600 rounded-md w-full text-left text-base ${isActive('/dashboard')}`}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            href="/module"
                            className={`px-4 py-2 text-white hover:bg-green-600 rounded-md w-full text-left ${isActive('/module')}`}
                        >
                            Modules
                        </NavLink>
                        <NavLink
                            href="/TOS"
                            className={`px-4 py-2 text-white hover:bg-green-600 rounded-md w-full text-left ${isActive('/tos')}`}
                        >
                            Table of Specifications
                        </NavLink>
                        <NavLink
                            href="/exams"
                            className={`px-4 py-2 text-white hover:bg-green-600 rounded-md w-full text-left ${isActive('/exams')}`}
                        >
                            Exams
                        </NavLink>
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                    {header && (
                        <header className="bg-white shadow p-4">{header}</header>
                    )}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
