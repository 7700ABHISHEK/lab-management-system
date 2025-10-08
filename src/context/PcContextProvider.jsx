import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, onSnapshot, updateDoc } from 'firebase/firestore';
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
    }, [])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "pcs"), (snapshot) => {
            const pcList = snapshot.docs.map((pc) => ({
                pcId: pc.id,
                ...pc.data(),
            }));
            setPcs(pcList);
        });

        return () => unsubscribe();
    }, []);

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
        const pc = pcs?.find((pc) => pc.pcId === id || pc.status != "available");

        // if (!pc) {
        //     toast.error("PC not found");
        //     return;
        // }

        try {
            const stdnt = students.find((std) => std.pcId === id);
            await deleteDoc(doc(db, "pcs", id));
            await updateDoc(doc(db, "labs", pc.labId), { initialCapacity: increment(1) });

            if (stdnt) {
                await updateDoc(doc(db, "students", stdnt.id), { pcId: null });
            }

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
            toast.error("No PC selected for update");
            return;
        }

        try {
            const pcRef = doc(db, "pcs", editId);
            const oldPcSnap = await getDoc(pcRef);

            if (!oldPcSnap.exists()) {
                toast.error("PC not found");
                return;
            }

            const oldPcData = oldPcSnap.data();

            if (oldPcData.status === "assigned" && input.status !== "assigned") {
                toast.error("This PC is currently assigned and cannot be edited until unassigned.");
                return;
            }

            if (oldPcData.labId !== input.labId) {
                await updateDoc(doc(db, "labs", oldPcData.labId), {
                    initialCapacity: increment(1),
                });
                await updateDoc(doc(db, "labs", input.labId), {
                    initialCapacity: increment(-1),
                });
            }

            await updateDoc(pcRef, input);

            toast.success("PC updated successfully...");
            fetchPc();
            fetchData();
            setEditId(null);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong...");
        }
    };



    const data = { addPc, pcs, deletePc, editId, setEditId, updatePc, fetchPc }

    return (
        <PcContext.Provider value={data}>
            {children}
        </PcContext.Provider>
    )
}

export default PcContextProvider