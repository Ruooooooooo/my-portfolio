import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Maximize2, Smartphone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageComponent from '../components/ImageComponent'
import projectsData from '../data/projects.json'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const project = projectsData.find((p) => String(p.id) === id)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    window.scrollTo(0, 0);
    // 默认选中第一个有分类的图片的分类
    if (project && project.images && project.images[0]?.category) {
      setActiveTab(project.images[0].category)
    }
  }, [id, project]);

  if (!project) {
    navigate('/')
    return null
  }

  // 1. 提取所有分类
  const categories = project.images 
    ? [...new Set(project.images.map(img => img.category).filter(Boolean))]
    : [];
  const showTabs = categories.length > 1;

  // 2. 过滤图片
  const filteredImages = project.images.filter(item => {
    if (typeof item === 'string') return activeTab === 'all';
    return activeTab === 'all' || !item.category || item.category === activeTab;
  });

  // --- 核心修改：智能获取当前应该显示的 Figma 链接 ---
  const getCurrentFigmaUrl = () => {
    // 情况A: 新版结构，有 prototypes 数组
    if (project.prototypes && project.prototypes.length > 0) {
      // 尝试找和当前 activeTab 匹配的链接
      const matched = project.prototypes.find(p => p.category === activeTab);
      // 如果找到了就用匹配的，找不到（比如activeTab是all）就默认用数组第一个
      return matched ? matched.url : project.prototypes[0].url;
    }
    // 情况B: 旧版结构，只有 figmaUrl 字符串
    return project.figmaUrl || '';
  };

  const currentRawUrl = getCurrentFigmaUrl();

  // 处理链接，强制隐藏UI
  const getCleanFigmaUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed.figma.com')) {
        return url.includes('hide_ui=1') ? url : `${url}&hide_ui=1`;
    }
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}&hide_ui=1&chrome=0`;
  };

  const figmaEmbedUrl = getCleanFigmaUrl(currentRawUrl);

  const openFullScreen = () => {
    if (currentRawUrl) {
      window.open(
        currentRawUrl.replace('design', 'proto') + '&scaling=scale-down-width&hide_ui=1', 
        'FigmaPrototype', 
        'width=450,height=900,menubar=no,toolbar=no,location=no,status=no'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              返回作品集
            </Link>
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tags || []).map((tag, index) => (
                <span key={index} className="text-sm text-gray-500 px-3 py-1 bg-gray-50 rounded-full font-mono">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 italic">{project.title}</h1>
          </motion.div>

          {/* 描述 */}
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

          {/* Tab 切换按钮 */}
          {showTabs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-10 border-b border-gray-100 pb-6 sticky top-20 bg-white/90 backdrop-blur-sm z-10 pt-4"
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

          {/* 图片展示区 */}
          <div className="space-y-20 mb-20">
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

          {/* 交互原型区 (会自动根据 Tab 变化) */}
          {currentRawUrl && (
            <motion.div 
              key={currentRawUrl} // 加这个key，确保链接变了组件会重绘
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-20 border-t border-gray-100 flex flex-col items-center"
            >
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-light italic mb-2 flex items-center justify-center gap-2">
                  <Smartphone className="w-6 h-6" /> 
                  可交互原型演示
                </h3>
                {/* 显示当前正在预览的版本名，让用户知道换了 */}
                <p className="text-gray-900 font-bold mt-2">
                    当前预览: {activeTab === 'all' ? '默认版本' : activeTab}
                </p>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-1">Interactive Prototype</p>
              </div>

              {/* 模拟手机容器 */}
              <div className="relative w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                <iframe 
                  className="w-full h-full border-none bg-black"
                  src={figmaEmbedUrl}
                  allowFullScreen
                ></iframe>
              </div>

              <button 
                onClick={openFullScreen}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Maximize2 className="w-4 h-4" />
                在独立窗口中全屏体验
              </button>

              <p className="text-center text-xs text-gray-400 mt-4 font-mono">
                 * 切换上方 Tab 按钮，此处的演示版本也会同步切换
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