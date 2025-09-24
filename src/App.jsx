import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword"
import AddLab from "./pages/AddLab"
import LabTable from "./pages/LabTable"
import EditLab from "./pages/EditLab"
import ErrorPage from "./pages/ErrorPage"
import PcTable from "./pages/PcTable"
import ManagePc from "./pages/ManagePc"
import StudentTable from "./pages/StudentTable"
import ManageStudent from "./pages/ManageStudent"

const App = () => {

    return (
        <BrowserRouter>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/add-lab" element={<ProtectedRoute Component={AddLab} />} />
                <Route path="/add-pc" element={<ProtectedRoute Component={ManagePc} />} />
                <Route path="/add-student" element={<ProtectedRoute Component={ManageStudent} />} />
                <Route path="/edit-lab/:id" element={<ProtectedRoute Component={EditLab} />} />
                <Route path="/edit-pc/:id" element={<ProtectedRoute Component={ManagePc} />} />
                <Route path="/edit-student/:id" element={<ProtectedRoute Component={ManageStudent} />} />
                <Route path="/lab-table" element={<ProtectedRoute Component={LabTable} />} />
                <Route path="/student-table" element={<ProtectedRoute Component={StudentTable} />} />
                <Route path="/pc-table" element={<ProtectedRoute Component={PcTable} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App