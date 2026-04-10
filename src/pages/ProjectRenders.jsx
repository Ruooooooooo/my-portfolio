import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera } from 'lucide-react';
import projectsData from '../data/projects.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProjectRenders() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 如果找不到项目或者没有附加渲染图，显示提示
  if (!project || !project.extraRenders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-500">暂无幕后渲染图数据</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-gray-900">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ================= 返回与标题区 ================= */}
          <div className="mb-12 md:mb-20">
            <Link to={`/project/${project.id}`} className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              返回项目正文
            </Link>
            
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-4 mb-4">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              幕后渲染与概念探索
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl font-mono">
              PROJECT // {project.title}
            </p>
          </div>

          {/* ================= 瀑布流排版 ================= */}
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6">
            {project.extraRenders.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="break-inside-avoid inline-block w-full mb-3 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 group bg-white"
              >
                <img 
                  src={src} 
                  alt={`${project.title} Render ${index + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProjectRenders;