import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ImageComponent from './ImageComponent'

function ProjectCard({ project, index }) {
  // 格式化序号：01, 02, 03...
  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Stagger 动画：每个卡片延迟递增
        ease: 'easeOut',
      }}
      className="group relative overflow-visible"
    >
      <Link to={`/project/${project.id}`} className="block h-full">
        <div className="relative h-full overflow-visible bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-300">
          {/* 巨大的背景水印序号 - 强制"破格"，彻底出圈 */}
          <div className="absolute -top-24 -right-16 z-0 pointer-events-none">
            <span className="text-[12rem] leading-none font-black text-zinc-200/50 select-none font-sans-en">
              {formattedIndex}
            </span>
          </div>

          {/* 内容容器 - 包含图片和文字，确保在数字之上 */}
          <div className="relative z-10">
            {/* 图片区域 - 占满卡片 */}
            <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
              <ImageComponent
                src={project.coverImage}
                alt={project.title}
                aspectRatio="4/3"
                className="group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              {/* 悬停遮罩层 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              
              {/* View Project 箭头 - 悬停时显示 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute bottom-4 right-4 hidden md:flex items-center space-x-2 text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded z-20"
              >
                <span className="text-xs font-medium">View</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>

            {/* 文字内容区域 - 灰色背景面 */}
            <div className="p-4 md:p-5 bg-zinc-50 border-t border-zinc-200">
              {/* 标签 - 胶囊形状，浅灰色 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs font-medium text-zinc-400 px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 标题 - 精致字重，深灰色 */}
              <h2 className="text-base md:text-lg font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors leading-tight">
                {project.title}
              </h2>

              {/* 副标题 - 中灰色 */}
              {project.subtitle && (
                <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard
