import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { LabContext } from "./LabContextProvider";
import { StudentContext } from "./StudentContextProvider";

export const PcContext = createContext();

const PcContextProvider = ({ children }) => {
    const [pcs, setPcs] = useState([]);
    const [editId, setEditId] = useState(null);
    const { fetchData } = useContext(LabContext);
    const { fetchStudent, deleteStudentsByPc } = useContext(StudentContext);

    useEffect(() => {
        fetchPc();
        fetchStudent();
    }, []);

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

    const fetchPc = async () => {
        try {
            const { docs } = await getDocs(collection(db, "pcs"));
            const pcList = docs.map((pc) => ({ pcId: pc.id, ...pc.data() }));
            setPcs(pcList);
        } catch (error) {
            toast.error("Something went wrong while fetching PCs");
        }
    };

    const addPc = async (pc) => {
        try {
            if (!pc.labId || !pc.status || !pc.name) {
                toast.error("Please fill in all fields before adding PC");
                return;
            }

            await addDoc(collection(db, "pcs"), {
                createdAt: new Date(),
                ...pc,
            });

            if (pc.labId) {
                await updateDoc(doc(db, "labs", pc.labId), {
                    initialCapacity: increment(-1),
                });
            }

            fetchData();
            fetchPc();
            toast.success("PC added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while adding PC");
        }
    };

    const deletePc = async (id) => {
        try {
            const pc = pcs.find((pc) => pc.pcId === id);
            if (!pc) {
                toast.error("PC not found");
                return;
            }

            await deleteStudentsByPc(id);
            await deleteDoc(doc(db, "pcs", id));

            if (pc.labId) {
                const labRef = doc(db, "labs", pc.labId);
                const labSnap = await getDoc(labRef);
                if (labSnap.exists()) {
                    await updateDoc(labRef, { initialCapacity: increment(1) });
                }
            }

            fetchPc();
            fetchData();
            fetchStudent();
            toast.success("PC deleted successfully and related students updated");
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
                toast.error(
                    "This PC is currently assigned and cannot be edited until unassigned."
                );
                return;
            }
            
            if (oldPcData.labId !== input.labId) {
                if (oldPcData.labId) {
                    await updateDoc(doc(db, "labs", oldPcData.labId), {
                        initialCapacity: increment(1),
                    });
                }
                if (input.labId) {
                    await updateDoc(doc(db, "labs", input.labId), {
                        initialCapacity: increment(-1),
                    });
                }
            }

            await updateDoc(pcRef, input);

            toast.success("PC updated successfully");
            fetchPc();
            fetchData();
            setEditId(null);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating PC");
        }
    };

    return (
        <PcContext.Provider
            value={{
                addPc,
                pcs,
                deletePc,
                editId,
                setEditId,
                updatePc,
                fetchPc,
            }}
        >
            {children}
        </PcContext.Provider>
    );
};

export default PcContextProvider;
