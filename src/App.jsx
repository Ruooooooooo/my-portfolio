import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Gallery from './pages/Gallery'
import ProjectRenders from './pages/ProjectRenders'

// 我们需要把 Routes 抽离出来，因为 AnimatePresence 需要感知当前的 location
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    // mode="wait" 表示旧页面完全消失后，新页面再进入，极其丝滑
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/project/:id/renders" element={<ProjectRenders />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App