import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageComponent from '../components/ImageComponent'
import projectsData from '../data/projects.json'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // 查找项目
  const project = projectsData.find((p) => String(p.id) === id)

  // 控制分类状态
  const [activeTab, setActiveTab] = useState('all')

  // 每次进入页面自动回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
    if (project && project.images && project.images[0]?.category) {
      setActiveTab(project.images[0].category)
    }
  }, [id, project]);

  if (!project) {
    navigate('/')
    return null
  }

  // 提取分类
  const categories = project.images 
    ? [...new Set(project.images.map(img => img.category).filter(Boolean))]
    : [];
  
  const showTabs = categories.length > 1;

  // 过滤图片
  const filteredImages = project.images.filter(item => {
    if (typeof item === 'string') return activeTab === 'all';
    return activeTab === 'all' || !item.category || item.category === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          
          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              返回作品集
            </Link>
          </motion.div>

          {/* 项目标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tags || project.tech || []).map((tag, index) => (
                <span key={index} className="text-sm text-gray-500 px-3 py-1 bg-gray-50 rounded-full font-mono">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 italic">{project.title}</h1>
          </motion.div>

          {/* 项目描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line border-l-2 border-gray-100 pl-6">
              {project.description}
            </p>
          </motion.div>

          {/* --- Tab 切换按钮 --- */}
          {showTabs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-10 border-b border-gray-100 pb-6"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeTab === cat 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {/* 图片展示区域 */}
          <div className="space-y-20 mb-12">
            <AnimatePresence mode="wait">
              {filteredImages.map((item, index) => {
                const imageUrl = typeof item === 'string' ? item : item.url;
                const caption = typeof item === 'string' ? null : item.caption;

                return (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="overflow-hidden rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100">
                      <ImageComponent
                        src={imageUrl}
                        alt={`${project.title} - ${index}`}
                        aspectRatio="16/9"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {caption && (
                      <div className="flex items-start gap-3 px-2">
                        <span className="text-xs font-mono text-gray-300 mt-1">[{String(index + 1).padStart(2, '0')}]</span>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{caption}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ✨ 新增：Figma 交互原型演示区 (自动检测是否有链接) */}
          {project.figmaUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-20 border-t border-gray-100"
            >
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-light italic mb-2">可交互原型演示</h3>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Interactive Prototype</p>
              </div>

              {/* 模拟手机外壳容器 */}
              <div className="relative mx-auto w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                <iframe 
                  className="w-full h-full border-none"
                  src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(project.figmaUrl)}`} 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center text-xs text-gray-400 mt-8 font-mono">
                * 提示：可以在上方手机模型中直接点击体验完整跳转逻辑
              </p>
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProjectDetail