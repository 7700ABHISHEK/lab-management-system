import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LabContext } from '../context/LabContextProvider'
import { toast } from 'react-toastify'
import { StudentContext } from '../context/StudentContextProvider'
import { PcContext } from '../context/PcContextProvider'

const ManageStudent = () => {
    const [input, setInput] = useState({
        name: '', email: '', grid: '', labId: '', pcId: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { id } = useParams();

    const { labs } = useContext(LabContext);
    const { pcs, fetchPc } = useContext(PcContext)
    const { students, addStudent, updateStudent, editId, setEditId } = useContext(StudentContext);

    useEffect(() => {
        if (id) {
            const studentToEdit = students.find(std => std.id === id);
            if (studentToEdit) {
                setInput({
                    name: studentToEdit.name || '',
                    email: studentToEdit.email || '',
                    grid: studentToEdit.grid || '',
                    labId: studentToEdit.labId || '',
                    pcId: studentToEdit.pcId || ''
                });
                setEditId(id);
            }
        } else {
            setEditId(null);
            setInput({ name: '', email: '', grid: '', labId: '', pcId: '' });
        }
    }, [id, students, editId]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
        setErrors({ ...errors, [e.target.id]: "" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationError = {}
        if (input.name.trim() === '') validationError.name = "Enter valid name..."
        if (input.email.trim() === '') validationError.email = "Enter valid email..."
        if (input.grid.trim() === '') validationError.grid = "Enter valid GRID..."
        if (input.labId.trim() === '') validationError.labId = "Select valid lab..."
        if (input.pcId.trim() === '') validationError.pcId = "Select valid PC..."

        const selectedPc = pcs.find(pc => pc.pcId === input.pcId)
        if (selectedPc && selectedPc.status === "repair") {
            validationError.pcId = "This PC is under repair. Please select another one."
        }

        setErrors(validationError)
        if (Object.keys(validationError).length > 0) return

        try {
            if (editId) {
                await updateStudent(input);
            } else {
                await addStudent(input);
                await fetchPc();
            }
            navigate("/student-table");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {id ? "Edit" : "Add New"} Student
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={input.name}
                            onChange={handleChange}
                            placeholder="Enter Student name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Student Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            onChange={handleChange}
                            placeholder="Enter Student email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 font-semibold">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="grid" className="block text-gray-700 font-medium mb-2">
                            Student GRID
                        </label>
                        <input
                            type="text"
                            id="grid"
                            value={input.grid}
                            onChange={handleChange}
                            placeholder="Enter Student GRID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.grid && <p className="text-red-500 font-semibold">{errors.grid}</p>}
                    </div>

                    <div>
                        <label htmlFor="labId" className="block text-gray-700 font-medium mb-2">
                            Lab Assigned
                        </label>
                        <select
                            id="labId"
                            value={input.labId}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select Lab</option>
                            {labs && labs.map((lab) => (
                                <option key={lab.id} value={lab.id}>{lab.name}</option>
                            ))}
                        </select>
                        {errors.labId && <p className="text-red-500 font-semibold">{errors.labId}</p>}
                    </div>

                    <div>
                        <label htmlFor="pcId" className="block text-gray-700 font-medium mb-2">
                            PC Assigned
                        </label>
                        <select
                            id="pcId"
                            value={input.pcId || ""}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select PC</option>

                            {pcs
                                .filter(pc => pc.labId && pc.labId === input.labId)
                                .map(pc => {
                                    const isAssignedToOther = pc.status === "assigned" && pc.pcId !== input.pcId;
                                    const isInRepair = pc.status === "repair"; // ✅ Check repair status
                                    const isDisabled = isAssignedToOther || isInRepair;

                                    return (
                                        <option
                                            key={pc.pcId}
                                            value={pc.pcId}
                                            disabled={isDisabled}
                                            className={isDisabled ? "text-gray-400" : "text-black"}
                                        >
                                            {pc.name}
                                            {isAssignedToOther ? " (Already Assigned)" : ""}
                                            {isInRepair ? " (Under Repair)" : ""}
                                        </option>
                                    );
                                })}
                        </select>
                        {errors.pcId && <p className="text-red-500 font-semibold">{errors.pcId}</p>}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/student-table")
                                setEditId(null)
                            }}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            View Students
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            {id ? "Update" : "Add"} Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageStudent
