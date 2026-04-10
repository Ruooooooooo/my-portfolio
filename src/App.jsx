import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Gallery from './pages/Gallery' // 👈 1. 新增：引入刚才写的摄影画廊页面

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-zinc-800 selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} /> {/* 👈 2. 新增：把画廊加进路由列表里 */}
        </Routes>
      </div>
    </Router>
  )
}

export default App