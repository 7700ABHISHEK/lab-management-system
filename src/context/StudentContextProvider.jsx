import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchStudent();
    }, [])


    const addStudent = async (std) => {
        try {
            await addDoc(collection(db, "students"), {
                createdAt: new Date(),
                ...std
            })
            fetchStudent();
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error.code);
        }
    }

    const fetchStudent = async () => {
        try {
            const { docs } = await getDocs(collection(db, "students"));
            const studentList = docs.map((std) => {
                return {
                    id: std.id,
                    ...std.data()
                }
            });
            setStudents(studentList);
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

    const deleteStudent = async (id) => {
        try {
            await deleteDoc(doc(db, "students", id));
            fetchStudent();
        } catch (error) {
            toast.error("Something Went Wrong...");
        }
    }

    const updateStudent = async (input) => {
        if (!editId) return;
        try {
            await updateDoc(doc(db, "students", editId), input)
            fetchStudent();
            setEditId(null);
        } catch (error) {
            toast.error("Something went wrong...");
        }

    }

    const data = {updateStudent, deleteStudent, students, addStudent, editId, setEditId}

    return (
        <StudentContext.Provider value={data}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentContextProvider