import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LabContext } from "../context/LabContextProvider";
import { toast } from "react-toastify";

const AddLab = () => {
    const [labData, setLabData] = useState({
        name: "",
        location: "",
        capacity: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { addLab } = useContext(LabContext);

    const handleChange = (e) => {
        setLabData({ ...labData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = {};
        if (!labData.name.trim()) validationError.name = "Enter valid name";
        if (!labData.location.trim()) validationError.location = "Enter valid location";
        if (!labData.capacity.trim()) validationError.capacity = "Enter valid capacity";

        setErrors(validationError);
        if (Object.keys(validationError).length > 0) return;

        if (labData.capacity <= 0) {
            toast.error("Capacity should be greater than 0");
            return;
        }

        try {
            await addLab(labData);
            navigate("/lab-table");
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Lab
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Lab Name</label>
                        <input
                            type="text"
                            id="name"
                            value={labData.name}
                            onChange={handleChange}
                            placeholder="Enter lab name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={labData.location}
                            onChange={handleChange}
                            placeholder="Enter lab location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.location && <p className="text-red-500 font-semibold">{errors.location}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Capacity</label>
                        <input
                            type="number"
                            id="capacity"
                            value={labData.capacity}
                            onChange={handleChange}
                            placeholder="Enter Capacity"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.capacity && <p className="text-red-500 font-semibold">{errors.capacity}</p>}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/lab-table")}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            View Labs
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
