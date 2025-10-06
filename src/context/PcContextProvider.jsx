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
    const { students } = useContext(StudentContext);

    useEffect(() => {
        fetchPc();
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
        const pc = pcs?.find((pc) => pc.pcId === id)
        const stu = students?.find((std) => {
            return std.pcId === id;
        });

        if (!pc) {
            toast.error("PC not found");
            return;
        }

        try {
            await deleteDoc(doc(db, "pcs", id));
            await updateDoc(doc(db, "labs", pc.labId), { initialCapacity: increment(1) });

            if (stu) {
                await updateDoc(doc(db, "students", stu.id), { pcId: null });
            }

            fetchPc();
            fetchData();
            toast.success("Pc Deleted Successfully...");
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

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