import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Mail, Linkedin, Globe, Crosshair } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import profileData from '../data/profile.json';

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
        // 修改点：min-h改为 screen 确保手机上装饰元素有足够空间展示，防止重叠
        className="relative w-full lg:w-[38%] bg-black text-white min-h-screen lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center p-8 lg:p-16 border-r border-zinc-800 overflow-hidden"
      >
        
        {/* --- INDUSTRIAL FRAME SYSTEM (白色线条框架 - 全部保留) --- */}
        
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
        {/* 修改点：增加了 pb-20 防止手机端文字太长被底部的装饰遮挡 */}
        <div className="relative z-10 max-w-lg mt-10 pb-20 lg:pb-0">
          
          {/* Avatar Area (头像及旁边元素完全保留) */}
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

          {/* Typography (白色文字) */}
          {/* 修改点：text-6xl 改为 text-4xl lg:text-6xl，手机显示更协调 */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-4 text-white">
            {profileData.name}
          </h1>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-zinc-500"></span>
            <p className="text-xl text-zinc-400 font-light tracking-wide">
              {profileData.role}
            </p>
          </div>

          <p className="text-zinc-400 leading-relaxed max-w-sm mb-12 text-sm">
            {profileData.bio}
          </p>

          {/* Social Links (深色背景下的白色图标) */}
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
             {profileData.socialLinks.behance && (
               <a href={profileData.socialLinks.behance} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe size={20}/></a>
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
      {/* 修改点：px-8 lg:px-24 (调整内边距), pt-16 lg:pt-24 (调整顶部距离) */}
      <div className="flex-1 bg-zinc-50 min-h-screen pt-16 px-6 lg:pt-24 lg:px-24 relative">
        
        {/* Header Line & Label */}
        <div className="w-full border-t border-dashed border-zinc-300 mb-16 relative">
           <span className="absolute -top-3 left-0 bg-zinc-50 pr-4 text-[10px] font-mono text-zinc-400 tracking-widest">
             [ PROJECT_INDEX // PHASE_01 ]
           </span>
        </div>

        {/* Grid System */}
        {/* 修改点：gap-y-20 lg:gap-y-32 (手机上卡片间距稍微紧凑一点) */}
        <div className="grid grid-cols-1 gap-y-20 lg:gap-y-32 pb-32">
          {projectsData?.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;