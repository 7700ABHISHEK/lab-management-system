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

const App = () => {

    return (
        <BrowserRouter>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/add-lab" element={<ProtectedRoute Component={AddLab} />} />
                <Route path="/edit-lab/:id" element={<ProtectedRoute Component={EditLab} />} />
                <Route path="/lab-table" element={<ProtectedRoute Component={LabTable} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App