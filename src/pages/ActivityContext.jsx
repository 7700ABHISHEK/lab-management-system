import { createContext, useContext, useState } from "react";
import { FlaskRound, Monitor, Users } from "lucide-react";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = (text, type) => {
    const icons = {
      lab: <FlaskRound size={16} className="text-indigo-600" />,
      pc: <Monitor size={16} className="text-green-600" />,
      student: <Users size={16} className="text-pink-600" />,
    };
    const colors = {
      lab: "bg-indigo-100",
      pc: "bg-green-100",
      student: "bg-pink-100",
    };

    setActivities(prev => [
      { text, type, icon: icons[type], color: colors[type], time: new Date() },
      ...prev,
    ]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
