import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import LabContextProvider from './context/LabContextProvider.jsx'
import StudentContextProvider from './context/StudentContextProvider.jsx'
import PcContextProvider from './context/PcContextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <LabContextProvider>
            <StudentContextProvider>
                <PcContextProvider>
                    <App />
                </PcContextProvider>
            </StudentContextProvider>
        </LabContextProvider>
    </AuthContextProvider>
)