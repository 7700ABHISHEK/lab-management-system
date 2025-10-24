import { Monitor, Users, FlaskRound, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { StudentContext } from "../context/StudentContextProvider";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { useContext, useEffect, useRef } from "react";

const DashboardChart = ({ labs, pcs }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!labs.length) return;

        const data = labs.map(lab => ({
            lab: lab.name,
            pcs: pcs.filter(pc => pc.labId === lab.id).length
        }));

        d3.select(chartRef.current).selectAll("*").remove();

        const containerWidth = chartRef.current.offsetWidth;
        const width = containerWidth || 600;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 60, left: 50 };

        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3
            .scaleBand()
            .domain(data.map(d => d.lab))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.pcs) || 1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.lab))
            .attr("y", d => y(d.pcs))
            .attr("width", x.bandwidth())
            .attr("height", d => y(0) - y(d.pcs))
            .attr("fill", "url(#bar-gradient)")
            .attr("rx", 6);

        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "bar-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#4f46e5").attr("stop-opacity", 1);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#a78bfa").attr("stop-opacity", 1);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-35)")
            .style("text-anchor", "end")
            .style("font-weight", "500");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5))
            .selectAll("text")
            .style("font-weight", "500");
    }, [labs, pcs]);

    return <div ref={chartRef} className="mt-8 w-full bg-white p-4 rounded-2xl shadow-lg"></div>;
};

const Dashboard = () => {
    const { labs } = useContext(LabContext);
    const { pcs } = useContext(PcContext);
    const { students } = useContext(StudentContext);

    const navigate = useNavigate();

    const stats = [
        { id: 1, title: "Labs", value: labs.length, icon: <FlaskRound className="w-8 h-8 text-indigo-600" />, color: "from-indigo-100 to-indigo-200" },
        { id: 2, title: "Computers", value: pcs.length, icon: <Monitor className="w-8 h-8 text-green-600" />, color: "from-green-100 to-green-200" },
        { id: 3, title: "Students", value: students.length, icon: <Users className="w-8 h-8 text-pink-600" />, color: "from-pink-100 to-pink-200" },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center py-24">
            <div className="container mx-auto px-4 md:px-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Dashboard</h1>

                <div className="flex flex-wrap gap-4 mb-10">
                    <button
                        onClick={() => navigate("/add-lab")}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                    >
                        <Plus size={18} /> Add Lab
                    </button>
                    <button
                        onClick={() => navigate("/add-pc")}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1"
                    >
                        <Plus size={18} /> Add PC
                    </button>
                    <button
                        onClick={() => navigate("/add-student")}
                        className="flex items-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-pink-700 transition-all transform hover:-translate-y-1"
                    >
                        <Plus size={18} /> Add Student
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {stats.map(item => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-6 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1`}
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
                                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-inner">{item.icon}</div>
                        </div>
                    ))}
                </div>

                <DashboardChart labs={labs} pcs={pcs} />
            </div>
        </div>
    );
};

export default Dashboard;
