import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentContext } from '../context/StudentContextProvider'
import { LabContext } from '../context/LabContextProvider'
import { PcContext } from '../context/PcContextProvider'

const StudentTable = () => {
    const navigate = useNavigate();

    const { students, deleteStudent, setEditId } = useContext(StudentContext)
    const { labs } = useContext(LabContext)
    const { pcs } = useContext(PcContext)
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-16">

                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Student Details
                    </h1>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md transition"
                        onClick={() => navigate("/add-student")}>
                        + Add Student
                    </button>
                </div>

                {
                    students.length > 0 ?
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">#</th>
                                        <th className="px-4 py-3 text-left font-medium">Name</th>
                                        <th className="px-4 py-3 text-left font-medium">Email</th>
                                        <th className="px-4 py-3 text-left font-medium">Grid</th>
                                        <th className="px-4 py-3 text-left font-medium">Lab Assigned</th>
                                        <th className="px-4 py-3 text-left font-medium">PC Assigned</th>
                                        <th className="px-4 py-3 text-left font-medium">Creation Date</th>
                                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    {students.map((std, idx) => {
                                        const labName = labs.find((lab) => lab.id === std.labId)?.name || "N/A"
                                        const pcName = pcs.find((pc) => pc.pcId === std.pcId)?.name || "N/A"
                                        return (
                                            <tr key={std.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3">{idx + 1}</td>
                                                <td className="px-4 py-3">{std.name}</td>
                                                <td className="px-4 py-3">{std.email}</td>
                                                <td className="px-4 py-3">{std.grid}</td>
                                                <td className="px-4 py-3">{labName}</td>
                                                <td className="px-4 py-3">{pcName}</td>
                                                <td className="px-4 py-3">
                                                    {std.createdAt
                                                        ? (std.createdAt.toDate ? std.createdAt.toDate() : std.createdAt)
                                                            .toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                            .replace(/ /g, "-")
                                                        : "N/A"}
                                                </td>
                                                <td className="px-4 py-3 flex flex-col sm:flex-row justify-center gap-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 transition font-medium"
                                                        onClick={() => {
                                                            setEditId(std.id)
                                                            navigate(`/edit-student/${std.id}`)
                                                        }}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 transition font-medium"
                                                        onClick={() => deleteStudent(std.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div> :
                        <div>
                            <div className="flex justify-center">
                                <img src="public/no-lab.webp" alt="no-lab" />
                            </div>
                            <h1 className="text-center mt-4 text-2xl font-semibold">No Student Found🙍</h1>
                        </div>
                }

            </div>
        </div>
    )
}

export default StudentTable
