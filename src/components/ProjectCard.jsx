import React from 'react';
import { motion } from 'framer-motion';
// 1. 补回了 Link 组件，这才是能点进去的关键
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  // 判断是否为偶数项，用于桌面端左右交替布局
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      
      {/* --- IMAGE SECTION --- */}
      <div className="w-full lg:w-3/5 relative order-1">
        {/* 装饰框 */}
        <div className="absolute -inset-2 border border-zinc-200/50 border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-zinc-800 z-10"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-zinc-800 z-10"></div>

        {/* 2. 这里加了 Link，点击图片也能跳转详情页 */}
        <Link to={`/project/${project.id}`} className="block relative overflow-hidden bg-zinc-200 aspect-video group-hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <img 
            // 3. 修复图片路径：优先读 coverImage，读不到再读 image
            src={project.coverImage || project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        </Link>
      </div>

      {/* --- TEXT SECTION --- */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center order-2">
        <div className="flex items-center gap-4 mb-4">
           <span className="text-4xl lg:text-5xl font-bold font-mono text-zinc-200 select-none">
             {String(index + 1).padStart(2, '0')}
           </span>
           <div className="h-[1px] bg-zinc-300 flex-1"></div>
        </div>

        {/* 4. 这里也加了 Link，点击标题也能跳转 */}
        <Link to={`/project/${project.id}`}>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors cursor-pointer">
            {project.title}
            </h3>
        </Link>

        {/* 标签显示 - 加了保险，防止没有tech报错 */}
        <div className="flex flex-wrap gap-2 mb-6">
           {(project.tech || project.tags || []).map((tech) => (
            <span key={tech} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-wider font-mono border border-zinc-200">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-zinc-500 leading-relaxed mb-8 text-sm">
          {project.description}
        </p>

        {/* 底部按钮区域 */}
        <div className="flex gap-4 items-center">
          {/* 这个按钮通常去详情页，我也帮你改成去详情页 */}
          <Link 
            to={`/project/${project.id}`}
            className="flex items-center gap-2 px-5 py-2 bg-zinc-900 text-white text-xs font-bold tracking-widest hover:bg-zinc-700 transition-colors"
          >
             VIEW_PROJECT <ArrowUpRight size={14} />
          </Link>
          
          {project.links?.github && (
            <a 
              href={project.links?.github} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>

    </motion.div>
  );
};

export default ProjectCard;