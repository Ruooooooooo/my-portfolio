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

  // --- 🎨 核心修改：极致光感 + 强差异化主题系统 ---
  const getThemeColors = () => {
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();

    // 1. 🔴 恐怖/游戏风格 (Horror / Game)
    // 特征：血红与暗紫的强冲突，四周压迫感
    if (tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return {
        // 顶部强光（血红）
        top: 'from-red-600 via-red-900/80 to-transparent',
        // 底部强光（幽紫）
        bottom: 'from-purple-900 via-red-950/80 to-transparent',
        // 左侧侧光
        left: 'from-red-800/90 via-transparent to-transparent',
        // 右侧侧光
        right: 'from-purple-900/90 via-transparent to-transparent',
        // 按钮高亮
        accent: 'bg-red-800 hover:bg-red-700 shadow-[0_0_30px_rgba(153,27,27,0.6)]',
        tagBg: 'bg-red-100 text-red-900 border border-red-200'
      };
    }

    // 2. 🟠 工业/硬朗风格 (Industrial / Compiler)
    // 特征：高亮警示橙，如同工厂钠灯直射，极度醒目
    if (tags.includes('industrial') || tags.includes('hard') || title.includes('编译')) {
      return {
        top: 'from-orange-500 via-amber-500/80 to-transparent',
        bottom: 'from-amber-600 via-orange-700/80 to-transparent',
        left: 'from-orange-500/80 via-transparent to-transparent',
        right: 'from-amber-500/80 via-transparent to-transparent',
        accent: 'bg-orange-600 hover:bg-orange-500 shadow-[0_0_30px_rgba(234,88,12,0.6)]',
        tagBg: 'bg-orange-100 text-orange-900 border border-orange-200'
      };
    }

    // 3. 🟢 适老化/疗愈风格 (Elderly / Care / Green)
    // 特征：强烈的翡翠绿辉光，充满生命力
    if (tags.includes('elderly') || tags.includes('care') || tags.includes('green') || title.includes('老人') || title.includes('拾光')) {
      return {
        top: 'from-emerald-400 via-green-300/80 to-transparent',
        bottom: 'from-teal-600 via-emerald-600/80 to-transparent',
        left: 'from-emerald-400/80 via-transparent to-transparent',
        right: 'from-teal-400/80 via-transparent to-transparent',
        accent: 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_30px_rgba(5,150,105,0.6)]',
        tagBg: 'bg-emerald-100 text-emerald-900 border border-emerald-200'
      };
    }

    // 4. 🔵 默认/科技风格 (Tech / Default)
    // 特征：激光蓝与赛博紫
    return {
      top: 'from-blue-600 via-indigo-500/80 to-transparent',
      bottom: 'from-indigo-700 via-blue-800/80 to-transparent',
      left: 'from-blue-500/80 via-transparent to-transparent',
      right: 'from-indigo-500/80 via-transparent to-transparent',
      accent: 'bg-blue-700 hover:bg-blue-600 shadow-[0_0_30px_rgba(29,78,216,0.6)]',
      tagBg: 'bg-blue-50 text-blue-900 border border-blue-200'
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
    // 外层容器：背景设为极淡的灰，增强光效对比
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 relative overflow-hidden">
      
      {/* --- 🌟 强光环境层 (z-0) --- */}
      {/* 关键修改：使用 mix-blend-screen 滤色模式，让光叠加更亮 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* 1. 顶部直射光墙 (Top Wall) - 强度拉满 */}
        <div className={`absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b ${theme.top} blur-[60px] opacity-100 mix-blend-screen`} />
        
        {/* 2. 底部直射光墙 (Bottom Wall) */}
        <div className={`absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t ${theme.bottom} blur-[60px] opacity-100 mix-blend-screen`} />
        
        {/* 3. 左侧侧溢光 (Left Spill) */}
        <div className={`absolute top-0 bottom-0 left-0 w-[35vw] bg-gradient-to-r ${theme.left} blur-[80px] opacity-90 mix-blend-screen`} />
        
        {/* 4. 右侧侧溢光 (Right Spill) */}
        <div className={`absolute top-0 bottom-0 right-0 w-[35vw] bg-gradient-to-l ${theme.right} blur-[80px] opacity-90 mix-blend-screen`} />

        {/* 5. 中心通透层 (让中间的内容区保持干净，但带有环境色偏) */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      </div>

      {/* --- 导航栏 (z-50) --- */}
      {/* 🔴 关键修复：z-50 确保 Navbar 里的“Portfolio”按钮浮在所有光效之上，绝对可点 */}
      <div className="relative z-50 shadow-sm">
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
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group bg-white/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/50 shadow-sm">
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
                <span key={index} className={`text-sm px-3 py-1 rounded-full font-mono backdrop-blur-md shadow-sm ${theme.tagBg}`}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 italic drop-shadow-sm">{project.title}</h1>
          </motion.div>

          {/* 项目描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-line border-l-4 border-white/50 pl-6 bg-white/30 p-4 rounded-r-xl backdrop-blur-sm">
              {project.description}
            </p>
          </motion.div>

          {/* Tab 切换按钮 */}
          {showTabs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-10 border-b border-gray-200/50 pb-6 sticky top-20 z-20 pt-4"
            >
              {/* 背景条单独处理，防止遮挡 */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl -z-10 rounded-xl shadow-sm" />
              
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-6 py-2 rounded-full text-sm transition-all duration-300 font-medium ${
                    activeTab === cat 
                      ? `${theme.accent} text-white shadow-lg scale-105` 
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
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
                    <div className="overflow-hidden rounded-xl shadow-2xl shadow-gray-400/20 border border-white/60 bg-white">
                      <ImageComponent
                        src={imageUrl}
                        alt={`${project.title} - ${index}`}
                        aspectRatio="16/9"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {caption && (
                      <div className="flex items-start gap-3 px-2">
                        <span className="text-xs font-mono text-gray-500 mt-1">[{String(index + 1).padStart(2, '0')}]</span>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{caption}</p>
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
              className="mt-20 pt-20 border-t border-gray-200/50 flex flex-col items-center relative"
            >
              {/* 原型区背景光晕增强 */}
              <div className={`absolute inset-0 bg-gradient-to-t ${theme.bottom} opacity-30 blur-3xl -z-10`} />

              <div className="mb-10 text-center relative z-10">
                <h3 className="text-2xl font-light italic mb-2 flex items-center justify-center gap-2">
                  <Smartphone className="w-6 h-6" /> 
                  可交互原型演示
                </h3>
                <p className="text-gray-900 font-bold mt-2">
                    当前预览: {activeTab === 'all' ? '默认版本' : activeTab}
                </p>
                <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">Interactive Prototype</p>
              </div>

              {/* 手机外壳容器 */}
              <div className="relative w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden z-10">
                <iframe 
                  className="w-full h-full border-none bg-black"
                  src={figmaEmbedUrl}
                  allowFullScreen
                ></iframe>
              </div>

              {/* 全屏体验按钮 */}
              <button 
                onClick={openFullScreen}
                className={`mt-8 flex items-center gap-2 px-8 py-4 ${theme.accent} text-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-bold tracking-wide relative z-10`}
              >
                <Maximize2 className="w-5 h-5" />
                在独立窗口中全屏体验
              </button>
            </motion.div>
          )}

        </div>
      </main>
      
      {/* --- Footer (z-50) --- */}
      <div className="relative z-50">
        <Footer />
      </div>

    </div>
  )
}

export default ProjectDetail