import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Folder } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  // 判断是否为偶数项，用于桌面端左右交替布局
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // Mobile: Flex-col (垂直), Desktop: Flex-row (水平) 或 Flex-row-reverse (反向水平)
      className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      
      {/* --- IMAGE SECTION --- */}
      {/* Mobile: w-full, Order-1 (始终在最前) */}
      <div className="w-full lg:w-3/5 relative order-1">
        {/* 工业风装饰框 - 仅在大屏显示连接线，手机端简化为边框 */}
        <div className="absolute -inset-2 border border-zinc-200/50 border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 装饰角标 */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-zinc-800 z-10"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-zinc-800 z-10"></div>

        <div className="relative overflow-hidden bg-zinc-200 aspect-video group-hover:shadow-2xl transition-all duration-500">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          {/* 图片覆盖层：只有hover时消失 */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        </div>
      </div>

      {/* --- TEXT SECTION --- */}
      {/* Mobile: w-full, Order-2 (始终在后) */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center order-2">
        {/* 序号装饰：在手机端稍微调小一点 */}
        <div className="flex items-center gap-4 mb-4">
           <span className="text-4xl lg:text-5xl font-bold font-mono text-zinc-200 select-none">
             {String(index + 1).padStart(2, '0')}
           </span>
           <div className="h-[1px] bg-zinc-300 flex-1"></div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-wider font-mono border border-zinc-200">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-zinc-500 leading-relaxed mb-8 text-sm">
          {project.description}
        </p>

        <div className="flex gap-4 items-center">
          <a 
            href={project.links.live} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-zinc-900 text-white text-xs font-bold tracking-widest hover:bg-zinc-700 transition-colors"
          >
            VIEW_PROJECT <ArrowUpRight size={14} />
          </a>
          
          {project.links.github && (
            <a 
              href={project.links.github} 
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