import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LabContext } from '../context/LabContextProvider'
import { toast } from 'react-toastify'
import { PcContext } from '../context/PcContextProvider'

const ManagePc = () => {
    const [input, setInput] = useState({
        name: '', labId: '', status: ''
    })
    const [errors, setErrors] = useState({})


    const navigate = useNavigate()

    const { labs } = useContext(LabContext);
    const { addPc, editId, updatePc, pcs, setEditId } = useContext(PcContext);

    const { id } = useParams();

    useEffect(() => {
        if (id && pcs.length > 0) {
            const pcEdit = pcs.find((pc) => pc.pcId === id);
            if (pcEdit) {
                setInput({
                    name: pcEdit.name,
                    labId: pcEdit.labId,
                    status: pcEdit.status
                });
            }
        }
    }, [id, pcs])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
        setErrors({ ...errors, [e.target.id]: "" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationError = {}

        if (input.name.trim() === '') {
            validationError.name = "Enter valid name..."
        }
        if (input.labId.trim() === '') {
            validationError.labId = "Select valid lab..."
        }
        if (input.status.trim() === '') {
            validationError.status = "Select valid status..."
        }

        setErrors(validationError)

        if (Object.keys(validationError).length > 0) return

        if (editId) {
            try {
                await updatePc(input);
                navigate("/pc-table")
            } catch (error) {
                toast.error("Something went Wrong");
            }
        } else {
            try {
                await addPc(input);
                toast.success("Pc Added Successfully");
                navigate("/pc-table");

            } catch (error) {
                toast.error("Something went Wrong");
            }
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {id ? "Edit" : "Add New"} PC
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            PC Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={input.name}
                            onChange={handleChange}
                            placeholder="Enter PC name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                            PC Status
                        </label>
                        <select
                            id="status"
                            value={input.status}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="assigned">Assigned</option>
                            <option value="repair">Repair</option>
                        </select>
                        {errors.status && <p className="text-red-500 font-semibold">{errors.status}</p>}
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
                                lab.initialCapacity > 0 && <option key={lab.id} value={lab.id}>{lab.name}</option>
                            ))}
                        </select>
                        {errors.labId && <p className="text-red-500 font-semibold">{errors.labId}</p>}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/pc-table")
                                setEditId(null)
                            }}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            View PC
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            {id ? "Update" : "Add"} PC
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManagePc
