import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LabContext } from '../context/LabContextProvider';
import { PcContext } from '../context/PcContextProvider';

const PcTable = () => {
    const navigate = useNavigate();

    const { labs } = useContext(LabContext);
    const { pcs, deletePc, setEditId } = useContext(PcContext);

    const getPcId = (id) => {
        deletePc(id);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-16">

                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Pc Details
                    </h1>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md transition" onClick={() => navigate("/add-pc")}>
                        + Add pc
                    </button>
                </div>

                {
                    pcs.length > 0 ?
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Number</th>
                                        <th className="px-4 py-3 text-left font-medium">Pc Name</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-left font-medium">Assigned to</th>
                                        <th className="px-4 py-3 text-left font-medium">Creation Date</th>
                                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    {
                                        pcs.map((pc, idx) =>
                                            <tr key={pc.pcId} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3">{idx + 1}</td>
                                                <td className="px-4 py-3">{pc.name}</td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full
                                                    ${pc.status === "available" ?
                                                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                :
                                                                pc.status === "assigned" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                                                    pc.status === "repair" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                                                                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                            }
                                                `}
                                                    >
                                                        {pc.status || "Unknown"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {labs.find((lab) => lab.id === pc.labId)?.name || "N/A"}
                                                </td>
                                                <td className="px-4 py-3">{
                                                    pc.createdAt
                                                        ? (pc.createdAt.toDate ? pc.createdAt.toDate() : pc.createdAt)
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
                                                        setEditId(pc.pcId)
                                                        navigate(`/edit-pc/${pc.pcId}`)
                                                    }}>
                                                        Edit
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800 transition font-medium" onClick={() => getPcId(pc.pcId)}>
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
                            <h1 className="text-center mt-4 text-2xl font-semibold">No PC's Found💻</h1>
                        </div>
                }

            </div>
        </div>
    )
}

export default PcTable