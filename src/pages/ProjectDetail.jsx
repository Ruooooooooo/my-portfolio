import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Maximize2, Smartphone, Camera } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageComponent from '../components/ImageComponent'
import projectsData from '../data/projects.json'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const project = projectsData.find((p) => String(p.id) === id)
  const [activeTab, setActiveTab] = useState('all')

  // 1. 灵敏进度条（去除了滞后的阻尼，完全跟手）
  const { scrollYProgress } = useScroll();

  // 2. 上下篇逻辑
  const currentIndex = projectsData.findIndex((p) => String(p.id) === id);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

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
    const pTheme = (project.theme || '').toLowerCase();
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();

    if (pTheme === 'minimal' || tags.includes('minimal') || tags.includes('simple')) {
      return {
        tl: 'bg-zinc-200/50', tr: 'bg-gray-200/50', bl: 'bg-stone-200/50', br: 'bg-slate-200/50',     
        accent: 'bg-zinc-900 hover:bg-black text-white shadow-md shadow-gray-200/50', tagBg: 'bg-white text-zinc-600 border border-zinc-200'
      };
    }
    if (pTheme === 'industrial' || tags.includes('cyberpunk') || title.includes('echo')) {
      return {
        tl: 'bg-[#510074]/5', tr: 'bg-[#84FF6B]/15', bl: 'bg-[#84FF6B]/10', br: 'bg-[#510074]/10',   
        accent: 'bg-[#510074] hover:bg-[#3d0058] text-[#84FF6B] shadow-md shadow-purple-900/20', tagBg: 'bg-[#510074]/5 text-[#510074] border border-[#510074]/20'
      };
    }
    if (pTheme === 'horror' || pTheme === 'game' || tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return {
        tl: 'bg-red-800/20', tr: 'bg-stone-800/20', bl: 'bg-red-600/10', br: 'bg-stone-900/30',    
        accent: 'bg-red-950 hover:bg-red-900 text-red-50 shadow-md shadow-red-900/20', tagBg: 'bg-stone-100 text-red-900 border border-red-200'
      };
    }
    if (pTheme === 'elderly' || pTheme === 'care' || tags.includes('elderly') || tags.includes('care') || title.includes('老人')) {
      return {
        tl: 'bg-emerald-100/40', tr: 'bg-teal-100/40', bl: 'bg-green-50/60', br: 'bg-emerald-200/30',
        accent: 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md', tagBg: 'bg-emerald-50 text-emerald-800 border border-emerald-100'
      };
    }
    return {
      tl: 'bg-blue-100/50', tr: 'bg-indigo-100/40', bl: 'bg-slate-100/60', br: 'bg-blue-200/30',
      accent: 'bg-slate-800 hover:bg-slate-700 text-white shadow-md', tagBg: 'bg-slate-50 text-slate-600 border border-slate-200'
    };
  };

  const theme = getThemeColors();
  const categories = project.images ? [...new Set(project.images.map(img => img.category).filter(Boolean))] : [];
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
    if (url.includes('embed.figma.com')) return url.includes('hide_ui=1') ? url : `${url}&hide_ui=1`;
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}&hide_ui=1&chrome=0`;
  };

  const figmaEmbedUrl = getCleanFigmaUrl(currentRawUrl);
  const openFullScreen = () => {
    if (currentRawUrl) {
      window.open(currentRawUrl.replace('design', 'proto') + '&scaling=scale-down-width&hide_ui=1', 'FigmaPrototype', 'width=450,height=900,menubar=no,toolbar=no,location=no,status=no');
    }
  };

  return (
    <>
      {/* 极简进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-900 origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 主页面包装 */}
      <motion.div 
        key={id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen flex flex-col bg-white text-gray-900 relative"
      >
        
        {/* 🔥 关键修复：加入 overflow-hidden 彻底解决背景光晕漏出、白边和双滚动条问题 🔥 */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] mix-blend-multiply transition-colors duration-1000 ${theme.tl}`} />
          <div className={`absolute -top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply transition-colors duration-1000 ${theme.tr}`} />
          <div className={`absolute -bottom-[20%] -left-[20%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply transition-colors duration-1000 ${theme.bl}`} />
          <div className={`absolute -bottom-[20%] -right-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] mix-blend-multiply transition-colors duration-1000 ${theme.br}`} />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        <div className="relative z-50">
          <Navbar />
        </div>

        {/* 页面正文 */}
        <main className="flex-1 w-full pt-20 md:pt-24 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            
            {/* 顶部优雅返回按钮 */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="mb-8 md:mb-12">
              <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                返回作品集
              </Link>
            </motion.div>

            {/* 标题与标签 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {(project.tags || []).map((tag, index) => (
                  <span key={index} className={`text-sm px-3 py-1 rounded-full font-mono backdrop-blur-sm ${theme.tagBg}`}>{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 italic text-zinc-900 drop-shadow-sm">{project.title}</h1>
            </motion.div>

            {/* 描述与操作按钮 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-12">
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed whitespace-pre-line border-l-4 border-zinc-200 pl-5 py-1">{project.description}</p>
              
              {/* 🔥 修复：变回优雅中文圆角按钮 🔥 */}
              <div className="mt-8 ml-5 flex flex-wrap gap-4">
                {project.links && project.links.live && project.links.live !== "#" && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-zinc-900 rounded-full transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5">
                    ✨ 在线体验 Demo
                  </a>
                )}
                {project.extraRenders && project.extraRenders.length > 0 && (
                  <Link to={`/project/${project.id}/renders`} className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-full transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-lg hover:-translate-y-0.5">
                    <Camera className="w-4 h-4 mr-2 text-zinc-500" />
                    幕后概念与渲染画廊
                  </Link>
                )}
              </div>
            </motion.div>

            {/* 版本切换 Tab */}
            {showTabs && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mb-10 border-b border-zinc-100 pb-6 sticky top-20 z-20 pt-4 bg-white/80 backdrop-blur-md overflow-x-auto whitespace-nowrap">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setActiveTab(cat)} className={`relative px-5 py-2 rounded-full text-sm transition-all duration-300 font-medium ${activeTab === cat ? `${theme.accent} shadow-md scale-105` : 'bg-white/50 text-zinc-500 hover:bg-zinc-100 border border-transparent hover:border-zinc-200'}`}>
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* 图片展示区 */}
            <div className="space-y-16 mb-20">
              <AnimatePresence mode="wait">
                {filteredImages.map((item, index) => {
                  const imageUrl = typeof item === 'string' ? item : item.url;
                  const caption = typeof item === 'string' ? null : item.caption;
                  return (
                    <motion.div key={`${activeTab}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex flex-col gap-3">
                      <div className="overflow-hidden rounded-xl shadow-sm border border-zinc-100 bg-zinc-50">
                        <ImageComponent src={imageUrl} alt={`${project.title} - ${index}`} aspectRatio="16/9" className="w-full h-auto object-cover" />
                      </div>
                      {caption && (
                        <div className="flex items-start gap-3 px-1 mt-1">
                          <span className="text-xs font-mono text-zinc-400 mt-0.5">[{String(index + 1).padStart(2, '0')}]</span>
                          <p className="text-sm text-zinc-500 leading-relaxed">{caption}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* 可交互原型区 */}
            {currentRawUrl && (
              <motion.div key={currentRawUrl} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 pt-20 border-t border-zinc-100 flex flex-col items-center relative">
                <div className="mb-10 text-center relative z-10">
                  <h3 className="text-2xl font-light italic mb-2 flex items-center justify-center gap-2 text-zinc-800">
                    <Smartphone className="w-6 h-6" /> 可交互原型演示
                  </h3>
                  <p className="text-zinc-500 text-sm mt-2">当前预览版本: {activeTab === 'all' ? '默认' : activeTab}</p>
                </div>
                <div className="relative w-full max-w-[375px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-zinc-900 shadow-xl overflow-hidden z-10">
                  <iframe className="w-full h-full border-none bg-black" src={figmaEmbedUrl} allowFullScreen></iframe>
                </div>
                <button onClick={openFullScreen} className={`mt-10 flex items-center gap-2 px-8 py-3.5 ${theme.accent} rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 font-medium tracking-wide relative z-10`}>
                  <Maximize2 className="w-4 h-4" />
                  在独立窗口中全屏体验
                </button>
              </motion.div>
            )}

          </div>
        </main>

        {/* 🔥 修复：底部极简网格导航（中文） 🔥 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 border-t border-zinc-100 bg-zinc-50/50 mt-auto">
          <Link to={`/project/${prevProject.id}`} className="group p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col items-start justify-center transition-colors hover:bg-white">
            <span className="text-zinc-400 text-xs font-medium tracking-wider mb-2 flex items-center gap-1 group-hover:text-zinc-500 transition-colors">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 上一篇
            </span>
            <span className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">{prevProject.title}</span>
          </Link>
          
          <Link to={`/project/${nextProject.id}`} className="group p-8 md:p-12 flex flex-col items-end justify-center transition-colors hover:bg-white">
            <span className="text-zinc-400 text-xs font-medium tracking-wider mb-2 flex items-center gap-1 group-hover:text-zinc-500 transition-colors">
              下一篇 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">{nextProject.title}</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="relative z-50 border-t border-zinc-200">
          <Footer />
        </div>

      </motion.div>
    </>
  )
}

export default ProjectDetail