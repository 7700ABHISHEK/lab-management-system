import { useState } from "react";

const AddLab = () => {
    const [labData, setLabData] = useState({
        name: "",
        location: "",
        computers: "",
        description: "",
    });

    const handleChange = (e) => {
        setLabData({ ...labData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lab Added:", labData);
        // Here you can call API or Firebase function
        alert("Lab added successfully!");
        setLabData({ name: "", location: "", computers: "", description: "" });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Lab
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Lab Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={labData.name}
                            onChange={handleChange}
                            placeholder="Enter lab name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={labData.location}
                            onChange={handleChange}
                            placeholder="Enter lab location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Number of Computers
                        </label>
                        <input
                            type="number"
                            name="computers"
                            value={labData.computers}
                            onChange={handleChange}
                            placeholder="Enter number of computers"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                setLabData({ name: "", location: "", computers: "", description: "" })
                            }
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Add Lab
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLab;
