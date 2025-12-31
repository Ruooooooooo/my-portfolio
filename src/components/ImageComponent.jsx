import { useState, useRef, useEffect } from 'react'

/**
 * 图片组件 - 支持懒加载、骨架屏、避免布局抖动
 * @param {string} src - 图片路径
 * @param {string} alt - 图片描述
 * @param {string} aspectRatio - 宽高比，如 "16/9", "4/3", "1/1"
 * @param {string} className - 额外的 CSS 类名
 */
function ImageComponent({ src, alt = '', aspectRatio = '16/9', className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // 提前50px开始加载
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // 将 aspectRatio 字符串转换为 padding-bottom 百分比
  const getAspectRatioStyle = () => {
    const [width, height] = aspectRatio.split('/').map(Number)
    const ratio = (height / width) * 100
    return { paddingBottom: `${ratio}%` }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
      style={getAspectRatioStyle()}
    >
      {/* 骨架屏 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* 实际图片 */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default ImageComponent

