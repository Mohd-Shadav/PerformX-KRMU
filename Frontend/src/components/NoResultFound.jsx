import React from "react";

const NoResultFound = ({ title = "No Results Found", message = "We couldn’t find any records matching your search or filters.", onReset }) => {
    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-white  p-8 text-center max-w-md w-full animate-fade-in">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <svg
                        className="w-16 h-16 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16l-4-4m0 0l4-4m-4 4h16M16 8l4 4m0 0l-4 4m4-4H4"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

                {/* Description */}
                <p className="text-gray-500 mt-2">{message}</p>

                {/* Actions */}
                {onReset && (
                    <div className="mt-6">
                        <button
                            onClick={onReset}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoResultFound;