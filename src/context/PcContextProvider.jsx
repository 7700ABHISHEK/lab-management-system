import { addDoc, collection, deleteDoc, doc, getDocs, increment, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import { LabContext } from './LabContextProvider';
import { StudentContext } from './StudentContextProvider';

export const PcContext = createContext();

const PcContextProvider = ({ children }) => {
    const [pcs, setPcs] = useState([]);
    const [editId, setEditId] = useState(null);
    const { fetchData } = useContext(LabContext);
    const { students, fetchStudent } = useContext(StudentContext);

    useEffect(() => {
        fetchPc();
        fetchStudent();
    }, [students])


    const addPc = async (pc) => {
        try {
            await addDoc(collection(db, "pcs"), {
                createdAt: new Date(),
                ...pc
            })
            await updateDoc(doc(db, "labs", pc.labId), { initialCapacity: increment(-1) });
            fetchData();
            fetchPc();
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error.code);
        }
    }

    const fetchPc = async () => {
        try {
            const { docs } = await getDocs(collection(db, "pcs"));
            const pcList = docs.map((pc) => {
                return {
                    pcId: pc.id,
                    ...pc.data(),
                }
            });
            setPcs(pcList);
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

    const deletePc = async (id) => {
        const pc = pcs?.find((pc) => pc.pcId === id);
        if (!pc) {
            toast.error("PC not found");
            return;
        }

        try {
            const affectedStudents = students.filter((std) => std.pcId === id);

            for (const student of affectedStudents) {
                await updateDoc(doc(db, "students", student.id), { pcId: null });
            }

            await deleteDoc(doc(db, "pcs", id));

            await updateDoc(doc(db, "labs", pc.labId), { initialCapacity: increment(1) });

            fetchPc();
            fetchData();
            fetchStudent();
            toast.success("PC deleted successfully and assigned students updated");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting PC");
        }
    };


    const updatePc = async (input) => {
        if (!editId) {
            toast.error("No PC selected for update")
            return
        };
        try {
            await updateDoc(doc(db, "pcs", editId), input)
            toast.success("PC updated successfully...");
            fetchPc();
            setEditId(null);
        } catch (error) {
            toast.error("Something went wrong...");
        }

    }

    const data = { addPc, pcs, deletePc, editId, setEditId, updatePc }

    return (
        <PcContext.Provider value={data}>
            {children}
        </PcContext.Provider>
    )
}

export default PcContextProvider