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

  // --- 🎨 核心修改：智能主题配色系统 (包含新增的绿色适老主题) ---
  const getThemeColors = () => {
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();
    
    // 1. 🔴 恐怖/游戏风格 (Horror / Game)
    // 适用：恐怖游戏 demo
    if (tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return {
        tl: 'from-red-900/20 via-purple-900/10 to-transparent', // 左上冷艳
        br: 'from-gray-800/20 via-red-950/10 to-transparent',   // 右下压抑
        tr: 'from-gray-900/10 via-blue-900/5 to-transparent',   // 点缀
        accent: 'bg-red-900 hover:bg-red-800',                  // 按钮色
        tagBg: 'bg-red-50/80 text-red-900'                      // 标签色
      };
    }
    
    // 2. 🟠 工业/硬朗风格 (Industrial / Compiler)
    // 适用：编译器界面、硬核工具
    if (tags.includes('industrial') || tags.includes('hard') || title.includes('编译')) {
      return {
        tl: 'from-orange-200/50 via-amber-100/30 to-transparent', // 警示橙
        br: 'from-slate-300/50 via-gray-200/30 to-transparent',    // 金属灰
        tr: 'from-zinc-200 via-gray-100/20 to-transparent',
        accent: 'bg-orange-600 hover:bg-orange-700',
        tagBg: 'bg-orange-50/80 text-orange-800'
      };
    }

    // 3. 🟢 适老化/疗愈风格 (Elderly / Care / Green)
    // 适用：拾光 (Memory Anchor) 老人APP
    if (tags.includes('elderly') || tags.includes('care') || tags.includes('green') || title.includes('老人') || title.includes('拾光')) {
      return {
        // 左上：鼠尾草绿/翡翠绿 (生命力与平静)
        tl: 'from-emerald-100/60 via-green-100/40 to-transparent',
        // 右下：暖米色/石灰绿 (纸张纹理感，稳重)
        br: 'from-stone-100/60 via-lime-50/40 to-transparent',
        // 右上：清晨柔光
        tr: 'from-teal-50/40 via-yellow-50/20 to-transparent',
        // 按钮：深翡翠绿 (高对比度，安全感)
        accent: 'bg-emerald-700 hover:bg-emerald-800',
        tagBg: 'bg-emerald-50/80 text-emerald-800'
      };
    }

    // 4. 🔵 默认/科技风格 (Tech / Default)
    // 适用：打卡APP，通用项目
    return {
      tl: 'from-blue-100/60 via-purple-100/40 to-transparent',
      br: 'from-indigo-100/60 via-teal-100/40 to-transparent',
      tr: 'from-gray-100 via-pink-50/30 to-transparent',
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
    // 外层容器：相对定位 + 隐藏溢出 (防止光晕撑开滚动条)
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden">
      
      {/* --- 背景环境光层 (底层 z-0) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ease-in-out">
        {/* 左上角主光源 */}
        <div className={`absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br ${theme.tl} blur-[100px] opacity-70`} />
        
        {/* 右下角辅助光源 */}
        <div className={`absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl ${theme.br} blur-[100px] opacity-70`} />
        
        {/* 右上角高光点缀 */}
        <div className={`absolute top-[10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-bl ${theme.tr} blur-[80px] opacity-50`} />
      </div>

      {/* --- 导航栏 (z-10) --- */}
      <div className="relative z-10">
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