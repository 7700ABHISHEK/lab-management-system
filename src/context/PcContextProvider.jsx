import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

export const PcContext = createContext();

const PcContextProvider = ({ children }) => {
    const [pcs, setPcs] = useState([]);
    const [editId, setEditId] = useState(null);
    
    useEffect(() => {
        fetchPc();
    }, [])


    const addPc = async (pc) => {
        try {
            await addDoc(collection(db, "pcs"), {
                createdAt: new Date(),
                ...pc
            })
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
                    ...pc.data()
                }
            });
            setPcs(pcList);
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

    const deletePc = async (id) => {
        try {
            await deleteDoc(doc(db, "pcs", id));
            fetchPc();
            toast.success("Pc Deleted Successfully...");
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

    const updatePc = async (input) => {
            if(!editId) return;
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