import { Monitor, Users, FlaskRound, Plus } from "lucide-react";
import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/pcContextProvider";
import { StudentContext } from "../context/StudentContextProvider";
import { useActivity } from "./ActivityContext";

const Dashboard = () => {
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { students } = useContext(StudentContext);
  const { activities } = useActivity();

  const navigate = useNavigate();
  const listRef = useRef();

  const stats = [
    { id: 1, title: "Labs", value: labs.length, icon: <FlaskRound className="w-8 h-8 text-indigo-600" />, color: "bg-indigo-100" },
    { id: 2, title: "Computers", value: pcs.length, icon: <Monitor className="w-8 h-8 text-green-600" />, color: "bg-green-100" },
    { id: 3, title: "Students", value: students.length, icon: <Users className="w-8 h-8 text-pink-600" />, color: "bg-pink-100" },
  ];

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [activities]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-start min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-10 p-6 border border-gray-200 shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => navigate("/add-lab")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"><Plus size={18}/> Add Lab</button>
          <button onClick={() => navigate("/add-pc")} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"><Plus size={18}/> Add PC</button>
          <button onClick={() => navigate("/add-student")} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition"><Plus size={18}/> Add Student</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map(item => (
            <div key={item.id} className="rounded-2xl shadow-md hover:shadow-lg transition bg-white border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>
              <div className={`p-4 rounded-xl ${item.color}`}>{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-2xl shadow-md bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
            <div className="max-h-80 overflow-y-auto" ref={listRef}>
              <ul className="space-y-3">
                {activities.map((activity, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                    <span className={`p-2 rounded-full ${activity.color}`}>{activity.icon}</span>
                    <div>
                      <p className="text-gray-800 font-medium">{activity.text}</p>
                      <p className="text-gray-400 text-sm">{activity.time.toLocaleTimeString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl shadow-md bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Tasks</h2>
            <ul className="space-y-3 text-gray-600">
              <li>📌 Maintenance in Lab 2</li>
              <li>📌 Software update for 40 computers</li>
              <li>📌 Student assessment results upload</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
