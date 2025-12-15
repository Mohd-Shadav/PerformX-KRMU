import React from "react";

const Loader = ({ type = "spinner", message = "Fetching Data..." })=> {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-6 w-full max-w-md text-center">
                {type === "spinner" && (
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {type === "skeleton" && (
                    <div className="space-y-4 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                )}

                {type === "dots" && (
                    <div className="flex justify-center mb-4">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mx-2"></span>
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    </div>
                )}

                <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
                <p className="text-sm text-gray-500">Please wait while we load the information</p>
            </div>
        </div>
    );
};

export default Loader;