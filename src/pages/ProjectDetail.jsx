import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
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
  const { scrollYProgress } = useScroll();

  const currentIndex = projectsData.findIndex((p) => String(p.id) === id);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // 🔥 核心逻辑：默认永远是 normal（优雅），点击后变为 extreme（夸张） 🔥
  const [animMode, setAnimMode] = useState('normal'); 
  const [replayKey, setReplayKey] = useState(0);

  // 路由变化时，强制重置为优雅模式，滚动到顶部
  useEffect(() => {
    setAnimMode('normal');
    window.scrollTo(0, 0);
    if (project && project.images && project.images[0]?.category) {
      setActiveTab(project.images[0].category)
    }
  }, [id, project]);

  // 点击按钮：触发极端动效并刷新容器 Key
  const handlePlayExtreme = () => {
    setAnimMode('extreme');
    setReplayKey(prev => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') navigate(`/project/${nextProject.id}`);
      else if (e.key === 'ArrowLeft') navigate(`/project/${prevProject.id}`);
      else if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, nextProject.id, prevProject.id]);

  if (!project) {
    navigate('/')
    return null
  }

  const getThemeColors = () => {
    const pTheme = (project.theme || '').toLowerCase();
    const tags = (project.tags || []).join(' ').toLowerCase();
    const title = (project.title || '').toLowerCase();

    if (pTheme === 'minimal' || tags.includes('minimal') || tags.includes('simple')) {
      return { tl: 'bg-zinc-200/50', tr: 'bg-gray-200/50', bl: 'bg-stone-200/50', br: 'bg-slate-200/50', accent: 'bg-zinc-900 hover:bg-black text-white shadow-md shadow-gray-200/50', tagBg: 'bg-white text-zinc-600 border border-zinc-200' };
    }
    if (pTheme === 'industrial' || tags.includes('cyberpunk') || title.includes('echo')) {
      return { tl: 'bg-[#510074]/5', tr: 'bg-[#84FF6B]/15', bl: 'bg-[#84FF6B]/10', br: 'bg-[#510074]/10', accent: 'bg-[#510074] hover:bg-[#3d0058] text-[#84FF6B] shadow-md shadow-purple-900/20', tagBg: 'bg-[#510074]/5 text-[#510074] border border-[#510074]/20' };
    }
    if (pTheme === 'horror' || pTheme === 'game' || tags.includes('horror') || tags.includes('game') || title.includes('恐怖')) {
      return { tl: 'bg-red-800/20', tr: 'bg-stone-800/20', bl: 'bg-red-600/10', br: 'bg-stone-900/30', accent: 'bg-red-950 hover:bg-red-900 text-red-50 shadow-md shadow-red-900/20', tagBg: 'bg-stone-100 text-red-900 border border-red-200' };
    }
    if (pTheme === 'elderly' || pTheme === 'care' || tags.includes('elderly') || tags.includes('care') || title.includes('老人')) {
      return { tl: 'bg-emerald-100/40', tr: 'bg-teal-100/40', bl: 'bg-green-50/60', br: 'bg-emerald-200/30', accent: 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md', tagBg: 'bg-emerald-50 text-emerald-800 border border-emerald-100' };
    }
    return { tl: 'bg-blue-100/50', tr: 'bg-indigo-100/40', bl: 'bg-slate-100/60', br: 'bg-blue-200/30', accent: 'bg-slate-800 hover:bg-slate-700 text-white shadow-md', tagBg: 'bg-slate-50 text-slate-600 border border-slate-200' };
  };
  const theme = getThemeColors();

  // 🔥 动画控制中心：根据模式吐出不同配置 🔥
  const getVariants = (mode, effect) => {
    // 优雅模式：教科书级别的瀑布流交错下落
    if (mode === 'normal') {
      return {
        container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } },
        item: { hidden: { opacity: 0, y: -25 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }
      };
    }

    // 极端模式：根据代号执行强视觉冲击的暴力重构
    switch (effect) {
      case 'gravity': // 真正的重物砸地：零回弹，极速下坠，沉重触底
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } },
          item: {
            hidden: { opacity: 0, y: -1000, rotate: -8 }, // 从极高处，带着轻微随机倾斜下落
            show: { 
              opacity: 1, 
              y: 0, 
              rotate: 0, 
              // 弃用 spring，改用极其凌厉的自定义阻尼曲线，模拟“砰”的一声砸实
              transition: { duration: 0.6, ease: [0.75, 0, 0.25, 1] } 
            }
          }
        };
      case 'z-depth': // 极致的空间推门：巨大的缩放落差和透视感
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.25 } } },
          item: {
            // 初始状态极大且模糊，就像你紧贴着门板，然后猛地推开拉远
            hidden: { opacity: 0, scale: 5, filter: 'blur(50px)', y: 100 },
            show: { 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)', 
              y: 0,
              // 使用极其舒缓的减速曲线，营造巨大的空间跨度感
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
            }
          }
        };
      case 'breathe': // 濒死心跳
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } },
          item: {
            hidden: { opacity: 0, scale: 1.1, filter: 'contrast(200%) brightness(150%)' },
            show: { 
              opacity: [0, 1, 0.6, 1], 
              scale: [1.1, 0.95, 1], 
              filter: ['contrast(200%) brightness(150%)', 'contrast(100%) brightness(100%)'], 
              transition: { duration: 1.6, times: [0, 0.4, 0.7, 1], ease: "easeInOut" } 
            }
          }
        };
      case 'glitch': // 🔥 惊悚坍塌重构：多段掉帧、负片反转、强烈抽搐 🔥
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } },
          item: {
            hidden: { opacity: 0, scale: 1.05, filter: 'invert(100%) hue-rotate(90deg)' },
            show: {
              opacity: [0, 1, 0, 1, 0.8, 1],
              x: [-20, 30, -15, 20, -5, 0],
              y: [10, -20, 15, -10, 5, 0],
              filter: [
                'invert(100%) hue-rotate(90deg) blur(5px)',
                'invert(0%) hue-rotate(0deg) blur(0px)',
                'invert(100%) blur(10px)',
                'invert(0%) blur(0px)'
              ],
              transition: { duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.6, 1], ease: "easeInOut" }
            }
          }
        };
      case 'grid-snap': // 机械铡刀
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } },
          item: {
            hidden: { opacity: 0, x: -80, y: -80, clipPath: 'inset(100% 100% 0 0)' },
            show: { opacity: 1, x: 0, y: 0, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] } }
          }
        };
      case 'terminal': // 🔥 逻辑开机重构：CRT显示器通电闪屏启动 🔥
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } },
          item: {
            hidden: { opacity: 0, scaleY: 0.01, scaleX: 0.5, filter: 'brightness(400%) contrast(200%)' },
            show: {
              opacity: 1,
              scaleY: [0.01, 0.01, 1], // 先挤成一条横线，再瞬间垂直展开
              scaleX: [0.5, 1.05, 1],
              filter: ['brightness(400%) contrast(200%)', 'brightness(400%) contrast(200%)', 'brightness(100%) contrast(100%)'],
              transition: { duration: 0.7, times: [0, 0.4, 1], ease: "circOut" }
            }
          }
        };
      default:
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } },
          item: { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
        };
    }
  };

  const { container: activeContainer, item: activeItem } = getVariants(animMode, project.entranceEffect);

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-900 origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">
        
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

        <main className="flex-1 w-full pt-20 md:pt-24 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            
            <div className="mb-8 md:mb-12 flex flex-wrap gap-4 items-center justify-between">
              <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                返回作品集
              </Link>
              
              {/* 🔥 中文化且概念感极强的触发按钮 🔥 */}
              <button 
                onClick={handlePlayExtreme} 
                className="font-mono text-xs text-zinc-500 hover:text-zinc-900 transition-colors tracking-widest uppercase cursor-pointer border px-3 py-1.5 border-zinc-200 rounded hover:border-zinc-400 bg-white/50 backdrop-blur active:scale-95 flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full group-hover:bg-zinc-800 transition-colors"></span>
                [ 运行实验动效 ]
              </button>
            </div>

            {/* 注入控制中心计算出的 activeContainer */}
            <motion.div 
              key={`${id}-${replayKey}`}
              variants={activeContainer}
              initial="hidden"
              animate="show"
            >
              
              <motion.div variants={activeItem} className="flex flex-wrap gap-2 mb-4">
                {(project.tags || []).map((tag, index) => (
                  <span key={index} className={`text-sm px-3 py-1 rounded-full font-mono backdrop-blur-sm ${theme.tagBg}`}>{tag}</span>
                ))}
              </motion.div>

              <motion.h1 variants={activeItem} className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 italic text-zinc-900 drop-shadow-sm">
                {project.title}
              </motion.h1>

              <motion.div variants={activeItem} className="mb-12 mt-8">
                <p className="text-base md:text-lg text-zinc-700 leading-relaxed whitespace-pre-line border-l-4 border-zinc-200 pl-5 py-1">
                  {project.description}
                </p>
                
                <motion.div variants={activeItem} className="mt-8 ml-5 flex flex-wrap gap-4">
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
                </motion.div>
              </motion.div>

              {showTabs && (
                <div className="flex gap-4 mb-10 border-b border-zinc-100 pb-6 sticky top-20 z-20 pt-4 bg-white/80 backdrop-blur-md overflow-x-auto whitespace-nowrap">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveTab(cat)} className={`relative px-5 py-2 rounded-full text-sm transition-all duration-300 font-medium ${activeTab === cat ? `${theme.accent} shadow-md scale-105` : 'bg-white/50 text-zinc-500 hover:bg-zinc-100 border border-transparent hover:border-zinc-200'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-16 mb-20">
                <AnimatePresence mode="wait">
                  {filteredImages.map((item, index) => {
                    const imageUrl = typeof item === 'string' ? item : item.url;
                    const caption = typeof item === 'string' ? null : item.caption;
                    return (
                      <motion.div 
                        key={`${activeTab}-${index}`} 
                        variants={activeItem} // 👈 使用同款 item 动画配置
                        className="flex flex-col gap-3"
                      >
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

              {currentRawUrl && (
                <motion.div variants={activeItem} className="mt-24 pt-20 border-t border-zinc-100 flex flex-col items-center relative">
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

            </motion.div>
          </div>
        </main>

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

        <div className="relative z-50 border-t border-zinc-200">
          <Footer />
        </div>

      </div>
    </>
  )
}

export default ProjectDetail