import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import TaskBoard from '@/components/pages/TaskBoard'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<TaskBoard />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/today" element={<TaskBoard />} />
        <Route path="/week" element={<TaskBoard />} />
        <Route path="/all" element={<TaskBoard />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App