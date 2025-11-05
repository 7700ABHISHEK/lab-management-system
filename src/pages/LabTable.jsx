import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LabContext } from "../context/LabContextProvider";

const LabTable = () => {

    const navigate = useNavigate(); 

    const { labs, deleteLab, setEditId } = useContext(LabContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-16">

                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Lab Details
                    </h1>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md transition" onClick={() => navigate("/add-lab")}>
                        + Add Lab
                    </button>
                </div>

                {
                    labs.length > 0 ?
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Number</th>
                                        <th className="px-4 py-3 text-left font-medium">Lab Name</th>
                                        <th className="px-4 py-3 text-left font-medium">Location</th>
                                        <th className="px-4 py-3 text-left font-medium">Capacity</th>
                                        <th className="px-4 py-3 text-left font-medium">Updated Capacity</th>
                                        <th className="px-4 py-3 text-left font-medium">Creation Date</th>
                                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    {
                                        labs.map((lab, idx) =>
                                            <tr key={lab.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3">{idx + 1}</td>
                                                <td className="px-4 py-3">{lab.name}</td>
                                                <td className="px-4 py-3">{lab.location}</td>
                                                <td className="px-4 py-3">{lab.capacity}</td>
                                                <td className="px-4 py-3">{lab.initialCapacity}</td>
                                                <td className="px-4 py-3">{
                                                    lab.createdAt
                                                        ? (lab.createdAt.toDate ? lab.createdAt.toDate() : lab.createdAt)
                                                            .toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                            .replace(/ /g, "-")
                                                        : "N/A"
                                                }
                                                </td>
                                                <td className="px-4 py-3 flex flex-col sm:flex-row justify-center gap-2">
                                                    <button className="text-blue-600 hover:text-blue-800 transition font-medium" onClick={() => {
                                                        setEditId(lab.id)
                                                        navigate(`/edit-lab/${lab.id}`)
                                                    }}>
                                                        Edit
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800 transition font-medium" onClick={() => deleteLab(lab.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div>
                            <div className="flex justify-center">
                                <img src="public/no-lab.webp" alt="no-lab" />
                            </div>
                            <h1 className="text-center mt-4 text-2xl font-semibold">No Lab Found🔬</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default LabTable;
