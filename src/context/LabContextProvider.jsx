import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContextProvider';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import { PcContext } from './pcContextProvider';

export const LabContext = createContext();

const LabContextProvider = ({ children }) => {
    const [labs, setLabs] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const addLab = async (name, location, capacity) => {
        try {
            await addDoc(collection(db, "labs"), { name, location, capacity, createdAt: new Date() })
            fetchData();
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    const fetchData = async () => {
        try {
            const labSnapshot = await getDocs(collection(db, "labs"))
            const querylab = labSnapshot.docs.map((lab) => ({
                id: lab.id,
                ...lab.data()
            }));
            setLabs(querylab)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const deleteLab = async (labId) => {
        try {
            await deleteDoc(doc(db, "labs", labId));
            fetchData();
            toast.success("Lab Deleted Successfully");
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const updateLab = async (name, location, capacity) => {
        if (editId) {
            try {
                await updateDoc(doc(db, "labs", editId), { name, location, capacity })
                fetchData();
                toast.success("Lab Updated Successfully");
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    }

    const data = { addLab, labs, deleteLab, setEditId, setLabs, editId, updateLab };

    return (
        <LabContext.Provider value={data}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider