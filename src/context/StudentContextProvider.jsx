import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchStudent();
    }, []);

    const addStudent = async (std) => {
        try {
            const pcRef = doc(db, "pcs", std.pcId);
            const pcSnap = await getDoc(pcRef);

            if (!pcSnap.exists()) {
                toast.error("Selected PC does not exist");
                return;
            }

            const pcData = pcSnap.data();
            if (pcData.status === "assigned") {
                toast.error("This PC is already assigned to another student");
                return;
            }

            await addDoc(collection(db, "students"), {
                createdAt: new Date(),
                ...std,
            });

            await updateDoc(pcRef, { status: "assigned" });

            fetchStudent();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while adding student");
        }
    };

    const fetchStudent = async () => {
        try {
            const { docs } = await getDocs(collection(db, "students"));
            const studentList = docs.map((std) => ({
                id: std.id,
                ...std.data(),
            }));
            setStudents(studentList);
        } catch (error) {
            toast.error("Something went wrong while fetching students");
        }
    };

    const deleteStudent = async (id) => {
        try {
            const student = students.find((std) => std.id === id);

            if (student?.pcId) {
                await updateDoc(doc(db, "pcs", student.pcId), { status: "available" });
            }

            await deleteDoc(doc(db, "students", id));
            fetchStudent();
            toast.success("Student deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting student");
        }
    };

    const updateStudent = async (input) => {
        if (!editId) {
            toast.error("No student selected for update");
            return;
        }

        try {
            const studentRef = doc(db, "students", editId);
            const oldStudent = students.find((std) => std.id === editId);

            if (oldStudent && oldStudent.pcId !== input.pcId) {
                if (oldStudent.pcId) {
                    const oldPcRef = doc(db, "pcs", oldStudent.pcId);
                    const oldPcSnap = await getDoc(oldPcRef);
                    if (oldPcSnap.exists()) {
                        await updateDoc(oldPcRef, { status: "available" });
                    }
                }

                if (input.pcId) {
                    const newPcRef = doc(db, "pcs", input.pcId);
                    await updateDoc(newPcRef, { status: "assigned" });
                }
            }

            await updateDoc(studentRef, input);
            fetchStudent();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating student");
        }
    };


    const data = {
        addStudent,
        fetchStudent,
        deleteStudent,
        updateStudent,
        students,
        editId,
        setEditId,
    };

    return (
        <StudentContext.Provider value={data}>
            {children}
        </StudentContext.Provider>
    );
};

export default StudentContextProvider;
