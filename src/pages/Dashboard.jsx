import { Monitor, Users, FlaskRound, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const stats = [
        {
            id: 1,
            title: "Labs",
            value: "5",
            icon: <FlaskRound className="w-8 h-8 text-indigo-600" />,
            color: "bg-indigo-100",
        },
        {
            id: 2,
            title: "Computers",
            value: "120",
            icon: <Monitor className="w-8 h-8 text-green-600" />,
            color: "bg-green-100",
        },
        {
            id: 3,
            title: "Students",
            value: "340",
            icon: <Users className="w-8 h-8 text-pink-600" />,
            color: "bg-pink-100",
        },
    ];

    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center min-h-screen">
            <div className="container mx-auto px-10 p-10 border border-gray-200 shadow-md rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition" onClick={() => navigate("/add-lab")}>
                        <Plus size={18} /> Add Lab
                    </button>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
                        <Plus size={18} /> Add Computer
                    </button>
                    <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition">
                        <Plus size={18} /> Add Student
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl shadow-md hover:shadow-lg transition bg-white border border-gray-200 p-6 flex items-center justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
                                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${item.color}`}>{item.icon}</div>
                        </div>
                    ))}
                </div>

                <div>
                    <h1 className="mt-10 font-semibold text-2xl">This is just for showing purpose 👇</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="rounded-2xl shadow-md bg-white border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>✔ Lab 3 computers updated</li>
                            <li>✔ Student registrations completed</li>
                            <li>✔ New lab added</li>
                        </ul>
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
