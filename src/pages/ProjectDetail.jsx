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
  const project = projectsData.find((p) => p.id === id)

  // 如果项目不存在，返回首页
  if (!project) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 主内容区 */}
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
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-500 px-3 py-1 bg-gray-50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg md:text-xl text-gray-600">
                {project.subtitle}
              </p>
            )}
            {project.date && (
              <p className="text-sm text-gray-500 mt-2">{project.date}</p>
            )}
          </motion.div>

          {/* 项目描述 */}
          {project.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </motion.div>
          )}

          {/* 项目图片 */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-6 md:space-y-12 mb-12">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                  }}
                  className="overflow-hidden rounded-lg"
                >
                  <ImageComponent
                    src={image}
                    alt={`${project.title} - 图片 ${index + 1}`}
                    aspectRatio="16/9"
                    className="rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* 项目视频 */}
          {project.videos && project.videos.length > 0 && (
            <div className="space-y-6 md:space-y-12 mb-12">
              {project.videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="overflow-hidden rounded-lg bg-gray-100"
                >
                  <div className="aspect-video">
                    <video
                      src={video.url}
                      controls
                      className="w-full h-full object-contain"
                      poster={video.thumbnail}
                    >
                      您的浏览器不支持视频播放。
                    </video>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail

