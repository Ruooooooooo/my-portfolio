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

  const getThemeColors = () => {
    // 1. 预处理数据
    const pTheme = (project.theme || '').toLowerCase(); 
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();

    // --- 🏳️ 风格 0: Minimal/极简黑白 (保持不动) ---
    if (pTheme === 'minimal' || tags.includes('minimal') || tags.includes('simple')) {
      return {
        tl: 'bg-zinc-200/50',      
        tr: 'bg-gray-200/50',      
        bl: 'bg-stone-200/50',     
        br: 'bg-slate-200/50',     
        accent: 'bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-200',
        tagBg: 'bg-white text-gray-800 border border-gray-200 shadow-sm'
      };
    }

    // --- 🟣 风格 1: Cyberpunk/赛博工业 (Project 4 - 修正版：通透不脏) ---
    // 🎨 配色：深紫(#510074) + 荧光绿(#84FF6B)
    if (pTheme === 'industrial' || tags.includes('cyberpunk') || title.includes('echo')) {
      return {
        // 🔧 关键修改：背景透明度降到 /5 或 /10，保证网页看起来干净清爽
        tl: 'bg-[#510074]/5',    // 左上：几乎透明的紫气
        tr: 'bg-[#84FF6B]/15',   // 右上：淡淡的绿光
        bl: 'bg-[#84FF6B]/10',   // 左下
        br: 'bg-[#510074]/10',   // 右下
        
        // 按钮：保留你的“初号机”高饱和配色
        accent: 'bg-[#510074] hover:bg-[#3d0058] text-[#84FF6B] shadow-lg shadow-purple-900/20',
        // 标签：非常淡的紫色背景
        tagBg: 'bg-[#510074]/5 text-[#510074] border border-[#510074]/20'
      };
    }

    // --- 🩸 风格 3: Horror/恐怖游戏 (Project 3 - 修正版：压抑血腥) ---
    // 之前的 rose 太粉了，改为 red-900 (深红) + stone-800 (深灰)
    if (pTheme === 'horror' || pTheme === 'game' || 
        tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return {
        // 💀 氛围：左上是血红色，右下是阴森的黑灰色
        tl: 'bg-red-800/30',      // 左上：干涸的血迹感
        tr: 'bg-stone-800/30',    // 右上：阴影/黑暗
        bl: 'bg-red-600/20',      // 左下：新鲜血迹感
        br: 'bg-stone-900/40',    // 右下：沉重的压迫感
        
        // 按钮：深红底色，像警告牌
        accent: 'bg-red-950 hover:bg-red-900 text-red-50 shadow-lg shadow-red-900/20',
        // 标签：带红色的灰底
        tagBg: 'bg-stone-100 text-red-900 border border-red-200'
      };
    }

    // --- 🟢 风格 2: Elderly/适老疗愈 (Project 2 - 保持不动) ---
    if (pTheme === 'elderly' || pTheme === 'care' || 
        tags.includes('elderly') || tags.includes('care') || title.includes('老人')) {
      return {
        tl: 'bg-emerald-100/40',
        tr: 'bg-teal-100/40',
        bl: 'bg-green-50/60',
        br: 'bg-emerald-200/30',
        accent: 'bg-emerald-700 hover:bg-emerald-600 text-white',
        tagBg: 'bg-emerald-50 text-emerald-800 border border-emerald-100'
      };
    }

    // --- 🔵 默认/科技风格 ---
    return {
      tl: 'bg-blue-100/50',
      tr: 'bg-indigo-100/40',
      bl: 'bg-slate-100/60',
      br: 'bg-blue-200/30',
      accent: 'bg-slate-800 hover:bg-slate-700 text-white',
      tagBg: 'bg-slate-50 text-slate-600 border border-slate-200'
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
    // 外层容器：纯白底色，确保干净
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden">
      
      {/* --- 🌟 氛围层：模仿 COD 受伤的四周光晕 (Vignette) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* 左上角光晕 */}
        <div className={`absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] mix-blend-multiply transition-colors duration-1000 ${theme.tl}`} />
        
        {/* 右上角光晕 */}
        <div className={`absolute -top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply transition-colors duration-1000 ${theme.tr}`} />
        
        {/* 左下角光晕 */}
        <div className={`absolute -bottom-[20%] -left-[20%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply transition-colors duration-1000 ${theme.bl}`} />
        
        {/* 右下角光晕 */}
        <div className={`absolute -bottom-[20%] -right-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] mix-blend-multiply transition-colors duration-1000 ${theme.br}`} />

        {/* 整体噪点纹理 (增加一点质感，不让颜色看起来太“平”) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- 导航栏 (z-50) --- */}
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
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group bg-white/40 px-4 py-2 rounded-full border border-white/60 shadow-sm backdrop-blur-sm hover:bg-white/60">
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
            {/* 标题加了点混合模式，让它更好地融入背景 */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 italic text-gray-900 drop-shadow-sm">
                {project.title}
            </h1>
          </motion.div>

          {/* 项目描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            {/* 描述框改为更加通透的毛玻璃 */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-gray-200 pl-6 py-2">
              {project.description}
            </p>
          </motion.div>

          {/* Tab 切换按钮 */}
          {showTabs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-10 border-b border-gray-100 pb-6 sticky top-20 z-20 pt-4"
            >
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xl -z-10 rounded-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" />
              
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-6 py-2 rounded-full text-sm transition-all duration-300 font-medium ${
                    activeTab === cat 
                      ? `${theme.accent} shadow-lg scale-105` 
                      : 'bg-white/50 text-gray-500 hover:bg-gray-100 border border-transparent hover:border-gray-200'
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
                    {/* 图片容器：加了一个很干净的白色底座 */}
                    <div className="overflow-hidden rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white bg-white ring-1 ring-gray-100">
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
              className="mt-20 pt-20 border-t border-gray-100 flex flex-col items-center relative"
            >
              <div className="mb-10 text-center relative z-10">
                <h3 className="text-2xl font-light italic mb-2 flex items-center justify-center gap-2 text-gray-800">
                  <Smartphone className="w-6 h-6" /> 
                  可交互原型演示
                </h3>
                <p className="text-gray-900 font-bold mt-2">
                    当前预览: {activeTab === 'all' ? '默认版本' : activeTab}
                </p>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-1">Interactive Prototype</p>
              </div>

              {/* 手机外壳 */}
              <div className="relative w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden z-10">
                <iframe 
                  className="w-full h-full border-none bg-black"
                  src={figmaEmbedUrl}
                  allowFullScreen
                ></iframe>
              </div>

              {/* 全屏按钮 */}
              <button 
                onClick={openFullScreen}
                className={`mt-8 flex items-center gap-2 px-8 py-3 ${theme.accent} rounded-full transition-all shadow-md hover:shadow-xl hover:-translate-y-1 font-medium tracking-wide relative z-10`}
              >
                <Maximize2 className="w-4 h-4" />
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