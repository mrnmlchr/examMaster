import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props?.auth?.user || { name: "Guest" };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            {/* Header */}
            <header className="w-full bg-green-800 text-white shadow">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo and Title aligned to the left */}
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <span className="ml-3 text-lg font-bold">ExamMaster</span>
                    </div>
                    {/* User Dropdown aligned to the right */}
                    <button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="flex items-center"
                    >
                        <span>{user.name}</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-16 right-6 bg-white text-green-800 rounded-md shadow-lg z-10">
                            <NavLink href="/profile/edit" className="block px-4 py-2 hover:bg-green-600">
                                Edit Profile
                            </NavLink>
                            <NavLink href="/logout" method="post" className="block px-4 py-2 hover:bg-green-600">
                                Logout
                            </NavLink>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex-1 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-green-800 text-white p-4">
                    <NavLink href="/dashboard" className="block px-4 py-2 hover:bg-green-600">
                        Dashboard
                    </NavLink>
                    <NavLink href="/module" className="block px-4 py-2 hover:bg-green-600">
                        Module
                    </NavLink>
                    <NavLink href="/settings" className="block px-4 py-2 hover:bg-green-600">
                        Settings
                    </NavLink>
                </aside>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                    {header && (
                        <header className="bg-white shadow p-4">
                            {header}
                        </header>
                    )}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
