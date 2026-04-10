import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Mail, Linkedin, Globe, Crosshair, Camera } from 'lucide-react'; // 新增引入 Camera 图标
import { Link } from 'react-router-dom'; // 新增引入 Link 组件
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import profileData from '../data/profile.json';
import TechStack from "../components/TechStack";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-black">
      
      {/* =======================
          LEFT HERO SECTION 
          (黑色区域 - 暗黑控制台)
         ======================= */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        // min-h-screen 确保手机上装饰元素有足够空间展示
        className="relative w-full lg:w-[38%] bg-black text-white min-h-screen lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center p-8 lg:p-16 border-r border-zinc-800 overflow-hidden"
      >
        
        {/* --- INDUSTRIAL FRAME SYSTEM (白色线条框架) --- */}
        
        {/* Top-Left Corner */}
        <div className="absolute top-20 left-6 w-8 h-8 border-l-2 border-t-2 border-white/80"></div>
        <div className="absolute top-20 left-16 text-[10px] font-mono tracking-widest text-zinc-500 mt-1">
          RAW_DATA // V.2.0
        </div>

        {/* Top-Right Corner */}
        <div className="absolute top-20 right-6 w-8 h-8 border-r-2 border-t-2 border-white/80">
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white"></div>
        </div>

        {/* Bottom-Left Corner */}
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/80"></div>

        {/* Bottom-Right Corner */}
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/80">
          <div className="absolute bottom-1 right-2 text-[10px] font-mono text-zinc-500">
            X: 001 Y: 004
          </div>
        </div>

        {/* Right Edge Ruler (深灰色刻度尺) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-end opacity-30">
           {[...Array(10)].map((_, i) => (
             <div key={i} className={`h-[1px] bg-white ${i % 2 === 0 ? 'w-4' : 'w-2'}`}></div>
           ))}
        </div>

        {/* --- CONTENT --- */}
        <div className="relative z-10 max-w-lg mt-10 pb-20 lg:pb-0">
          
          {/* Avatar Area */}
          <div className="mb-8 relative inline-block">
             <img 
               src={profileData.avatar} 
               alt="Profile" 
               className="w-24 h-24 object-cover grayscale border border-zinc-700 p-1 bg-zinc-900"
             />
             <div className="absolute -bottom-2 -right-2 text-[10px] bg-white text-black px-2 py-0.5 font-bold font-mono">
               IMG_01
             </div>
          </div>

          {/* Typography */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-4 text-white">
            {profileData.name}
          </h1>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-zinc-500"></span>
            <p className="text-xl text-zinc-400 font-light tracking-wide">
              {profileData.role}
            </p>
          </div>

          {/* 自我介绍 (间距改为 mb-6) */}
          <p className="text-zinc-400 leading-relaxed max-w-sm mb-6 text-sm">
            {profileData.bio}
          </p>

          {/* 技能图标组件 (带间距) */}
          <div className="mb-10">
            <TechStack />
          </div>

          {/* Social Links */}
          <div className="flex gap-5 text-zinc-500">
             {profileData.socialLinks.email && (
               <a href={`mailto:${profileData.socialLinks.email}`} className="hover:text-white transition-colors"><Mail size={20}/></a>
             )}
             {profileData.socialLinks.github && (
               <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={20}/></a>
             )}
             {profileData.socialLinks.linkedin && (
               <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={20}/></a>
             )}
          </div>
        </div>

        {/* Bottom Decor */}
        <div className="absolute bottom-10 left-16 flex items-center gap-2 text-zinc-600 animate-pulse">
           <Crosshair size={14} />
           <span className="text-[10px] tracking-widest font-mono">SCROLL TO EXPLORE</span>
           <ArrowDown size={14} />
        </div>

      </motion.div>


      {/* =======================
          RIGHT PROJECTS SECTION 
          (保持亮灰色 - 形成黑白切割)
         ======================= */}
      <div className="flex-1 bg-zinc-50 min-h-screen pt-16 px-6 lg:pt-24 lg:px-24 relative">
        
        {/* Header Line & Label */}
        <div className="w-full border-t border-dashed border-zinc-300 mb-16 relative">
           <span className="absolute -top-3 left-0 bg-zinc-50 pr-4 text-[10px] font-mono text-zinc-400 tracking-widest">
             [ PROJECT_INDEX // PHASE_01 ]
           </span>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 gap-y-20 lg:gap-y-32 pb-20">
          {projectsData?.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* 🔥 新增：摄影画廊入口彩蛋 🔥 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pb-32 flex justify-center"
        >
          <Link 
            to="/gallery" 
            className="group flex flex-col items-center p-6 md:p-8 rounded-3xl bg-white border border-gray-200 hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-500 shadow-sm hover:shadow-xl w-full max-w-sm"
          >
            <div className="w-14 h-14 rounded-full bg-zinc-50 flex items-center justify-center mb-4 group-hover:bg-zinc-800 transition-colors">
              <Camera className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-white transition-colors">
              探寻 B 面：光影日常
            </h3>
            <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-400 transition-colors">
              Photography Collection →
            </p>
          </Link>
        </motion.div>

      </div>

    </div>
  );
};

export default Home;