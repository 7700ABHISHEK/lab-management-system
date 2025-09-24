import React, { createContext, useState, useEffect } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

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

  const addLab = async (name, location, capacity, addActivity) => {
    try {
      const docRef = await addDoc(collection(db, "labs"), { name, location, capacity, createdAt: new Date() });
      const newLab = { id: docRef.id, name, location, capacity };
      setLabs(prev => [...prev, newLab]);

      if (addActivity) addActivity(`Lab "${name}" added`, "lab");

      toast.success("Lab added successfully");
    } catch (err) {
      toast.error("Error adding lab");
    }
  };

  const deleteLab = async (labId) => {
    try {
      await deleteDoc(doc(db, "labs", labId));
      setLabs(prev => prev.filter(l => l.id !== labId));
      toast.success("Lab Deleted Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateLab = async (name, location, capacity) => {
    if (!editId) return;
    try {
      await updateDoc(doc(db, "labs", editId), { name, location, capacity });
      setLabs(prev => prev.map(l => (l.id === editId ? { ...l, name, location, capacity } : l)));
      toast.success("Lab Updated Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <LabContext.Provider value={{ labs, addLab, deleteLab, updateLab, setEditId }}>
      {children}
    </LabContext.Provider>
  );
};

export default LabContextProvider;
