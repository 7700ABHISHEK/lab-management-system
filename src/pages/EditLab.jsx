import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LabContext } from "../context/LabContextProvider";
import { toast } from "react-toastify";

const EditLab = () => {
    const [labData, setLabData] = useState({
        name: "",
        location: "",
        capacity: "",
    });
    const [errors, setErrors] = useState({})

    const { id } = useParams();
    const navigate = useNavigate()

    const { updateLab, labs, editId } = useContext(LabContext);

    useEffect(() => {
        if (id && labs.length > 0) {
            const labEdit = labs.find((lab) => lab.id === id);
            if (labEdit) {
                setLabData({
                    name: labEdit.name,
                    location: labEdit.location,
                    capacity: labEdit.capacity
                });
            }
        }
    }, [id, labs]);



    const handleChange = (e) => {
        setLabData({ ...labData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = {};

        if (labData.name.trim() == '') {
            validationError.name = "Enter Valid name...";
        }

        if (labData.location.trim() == '') {
            validationError.location = "Enter Valid Location...";
        }

        if (labData.capacity == '') {
            validationError.capacity = "Enter Valid Capacity...";
        }

        setErrors(validationError);

        if (Object.keys(validationError).length > 0) return;

            try {
                if (labData.capacity <= 0) {
                    toast.error("Capacity should not be in negative or zero...");
                    return;
                }
                await updateLab(labData.name, labData.location, labData.capacity)
                navigate("/lab-table");
            } catch (error) {
                toast.error("Something went Wrong");
            }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Edit Lab
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Lab Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={labData.name}
                            onChange={handleChange}
                            placeholder="Enter lab name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {
                            errors && <p className="text-red-500 font-semibold" >{errors.name}</p>
                        }
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={labData.location}
                            onChange={handleChange}
                            placeholder="Enter lab location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"

                        />
                        {
                            errors && <p className="text-red-500 font-semibold">{errors.location}</p>
                        }
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Capacity
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            value={labData.capacity}
                            onChange={handleChange}
                            placeholder="Enter Capacity"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"

                        />
                        {
                            errors && <p className="text-red-500 font-semibold">{errors.capacity}</p>
                        }
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/lab-table")
                            }
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            View Lab
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Update Lab
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLab;
