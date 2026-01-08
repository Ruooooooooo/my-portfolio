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
    if (project && project.images && project.images[0]?.category) {
      setActiveTab(project.images[0].category)
    }
  }, [id, project]);

  if (!project) {
    navigate('/')
    return null
  }

  // --- 🎨 核心修改：四周向内强光主题系统 ---
  const getThemeColors = () => {
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();

    // 1. 🔴 恐怖/游戏风格 (Horror / Game)
    if (tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return {
        // 四周光晕颜色：使用高饱和度的红色/紫色，配合混合模式制造压迫感
        glow: 'from-red-600/40 via-purple-900/20 to-transparent',
        accent: 'bg-red-900 hover:bg-red-800',
        tagBg: 'bg-red-50/80 text-red-900'
      };
    }

    // 2. 🟠 工业/硬朗风格 (Industrial / Compiler)
    if (tags.includes('industrial') || tags.includes('hard') || title.includes('编译')) {
      return {
        // 四周光晕颜色：强烈的橙色警示光
        glow: 'from-orange-500/40 via-amber-500/20 to-transparent',
        accent: 'bg-orange-600 hover:bg-orange-700',
        tagBg: 'bg-orange-50/80 text-orange-800'
      };
    }

    // 3. 🟢 适老化/疗愈风格 (Elderly / Care / Green)
    if (tags.includes('elderly') || tags.includes('care') || tags.includes('green') || title.includes('老人') || title.includes('拾光')) {
      return {
        // 四周光晕颜色：柔和的翡翠绿，像晨光
        glow: 'from-emerald-400/30 via-teal-300/10 to-transparent',
        accent: 'bg-emerald-700 hover:bg-emerald-800',
        tagBg: 'bg-emerald-50/80 text-emerald-800'
      };
    }

    // 4. 🔵 默认/科技风格 (Tech / Default)
    return {
      // 四周光晕颜色：科技蓝光
      glow: 'from-blue-500/30 via-indigo-400/10 to-transparent',
      accent: 'bg-gray-900 hover:bg-gray-800',
      tagBg: 'bg-gray-50/80 text-gray-500'
    };
  };

  const theme = getThemeColors();

  // -----------------------------------------------------------

  const categories = project.images 
    ? [...new Set(project.images.map(img => img.category).filter(Boolean))]
    : [];
  
  const showTabs = categories.length > 1;

  const filteredImages = project.images.filter(item => {
    if (typeof item === 'string') return activeTab === 'all';
    return activeTab === 'all' || !item.category || item.category === activeTab;
  });

  const getCurrentFigmaUrl = () => {
    if (project.prototypes && project.prototypes.length > 0) {
      const matched = project.prototypes.find(p => p.category === activeTab);
      return matched ? matched.url : project.prototypes[0].url;
    }
    return project.figmaUrl || '';
  };

  const currentRawUrl = getCurrentFigmaUrl();

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
    // 外层容器
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden">
      
      {/* --- 背景环境光层 (底层 z-0) --- */}
      {/* 修改：改为四周向内投射的强光，并使用 mix-blend-screen 增强光感 */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gray-50/50">
        
        {/* 顶部向下投射的光 */}
        <div className={`absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b ${theme.glow} mix-blend-screen opacity-80 transition-colors duration-1000`} />
        
        {/* 底部向上投射的光 */}
        <div className={`absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t ${theme.glow} mix-blend-screen opacity-80 transition-colors duration-1000`} />
        
        {/* 左侧向右投射的光 */}
        <div className={`absolute top-0 bottom-0 left-0 w-[30vw] bg-gradient-to-r ${theme.glow} mix-blend-screen opacity-60 transition-colors duration-1000`} />
        
        {/* 右侧向左投射的光 */}
        <div className={`absolute top-0 bottom-0 right-0 w-[30vw] bg-gradient-to-l ${theme.glow} mix-blend-screen opacity-60 transition-colors duration-1000`} />
        
      </div>

      {/* --- 导航栏 (z-50) --- */}
      {/* 修改：层级提升到 z-50，确保“回到首页”一定可以点击 */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- 主内容区 (z-10) --- */}
      <main className="flex-1 pt-20 md:pt-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          
          {/* 返回按钮 */}
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

          {/* 标题与标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tags || []).map((tag, index) => (
                <span key={index} className={`text-sm px-3 py-1 rounded-full font-mono backdrop-blur-sm ${theme.tagBg}`}>
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

          {/* Tab 切换按钮 (吸顶 + 毛玻璃) */}
          {showTabs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-10 border-b border-gray-100 pb-6 sticky top-20 bg-white/80 backdrop-blur-md z-20 pt-4"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeTab === cat 
                      ? `${theme.accent} text-white shadow-md` 
                      : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {/* 图片展示区 (带白色背景卡片) */}
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
                    {/* 图片容器：加bg-white确保图片在半透明背景上显示正常 */}
                    <div className="overflow-hidden rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 bg-white">
                      <ImageComponent
                        src={imageUrl}
                        alt={`${project.title} - ${index}`}
                        aspectRatio="16/9"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {caption && (
                      <div className="flex items-start gap-3 px-2">
                        <span className="text-xs font-mono text-gray-400 mt-1">[{String(index + 1).padStart(2, '0')}]</span>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{caption}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* 交互原型区 */}
          {currentRawUrl && (
            <motion.div 
              key={currentRawUrl}
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
                <p className="text-gray-900 font-bold mt-2">
                    当前预览: {activeTab === 'all' ? '默认版本' : activeTab}
                </p>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-1">Interactive Prototype</p>
              </div>

              {/* 手机外壳容器 */}
              <div className="relative w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                <iframe 
                  className="w-full h-full border-none bg-black"
                  src={figmaEmbedUrl}
                  allowFullScreen
                ></iframe>
              </div>

              {/* 全屏体验按钮 (跟随主题色) */}
              <button 
                onClick={openFullScreen}
                className={`mt-8 flex items-center gap-2 px-6 py-3 ${theme.accent} text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1`}
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
      
      {/* --- Footer (z-10) --- */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  )
}

export default ProjectDetail