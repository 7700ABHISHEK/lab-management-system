import React, { createContext, useState, useEffect } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

export const LabContext = createContext();

const LabContextProvider = ({ children }) => {
  const [labs, setLabs] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const labSnapshot = await getDocs(collection(db, "labs"));
      const data = labSnapshot.docs.map(lab => ({ id: lab.id, ...lab.data() }));
      setLabs(data);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const addLab = async (labData) => {

    const { capacity, ...data } = labData;
    console.log(capacity);

    try {
      await addDoc(collection(db, "labs"), { createdAt: new Date(), ...data, initialCapacity: parseInt(capacity), capacity: parseInt(capacity) });
      fetchData()
      toast.success("Lab added successfully");
    } catch (err) {
      toast.error("Error adding lab");
    }
  };

  const deleteLab = async (labId) => {
    try {
      await deleteDoc(doc(db, "labs", labId));
      fetchData();
      toast.success("Lab Deleted Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateLab = async (labData) => {

    const { capacity, initialCapacity ,...data } = labData;

    if (!editId) return;
    try {
      await updateDoc(doc(db, "labs", editId), { ...labData, initialCapacity: parseInt(capacity), capacity: parseInt(capacity) });
      fetchData();
      toast.success("Lab Updated Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <LabContext.Provider value={{ labs, addLab, deleteLab, updateLab, setEditId, fetchData }}>
      {children}
    </LabContext.Provider>
  );
};

export default LabContextProvider;
