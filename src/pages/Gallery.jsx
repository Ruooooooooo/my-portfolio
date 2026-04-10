import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. 如果你有一张特别震撼的“横版大片”，把它放在这里作为镇楼图
  const heroImage = '/images/gallery/hero.jpg'; 

  // 2. 这里填入你所有的照片文件名
  const photos = [
    '/images/gallery/1.jpg',
    '/images/gallery/2.jpg',
    '/images/gallery/3.jpg',
    '/images/gallery/4.jpg',
    '/images/gallery/5.jpg',
    '/images/gallery/6.jpg',
    '/images/gallery/7.jpg',
    '/images/gallery/8.jpg',
    '/images/gallery/9.jpg',
    '/images/gallery/10.jpg',
    '/images/gallery/11.jpg',
    '/images/gallery/12.jpg',
    '/images/gallery/13.jpg',
    '/images/gallery/14.jpg',
    '/images/gallery/15.jpg',
    '/images/gallery/16.jpg',
    '/images/gallery/17.jpg',
    '/images/gallery/18.jpg',
    '/images/gallery/19.jpg',
    '/images/gallery/20.jpg',
    '/images/gallery/21.jpg',
    '/images/gallery/22.jpg',
    '/images/gallery/23.jpg',
    '/images/gallery/24.jpg',
    '/images/gallery/25.jpg',
    '/images/gallery/26.jpg',
    '/images/gallery/27.jpg',
    '/images/gallery/28.jpg',
    '/images/gallery/29.jpg',
    '/images/gallery/30.jpg',
    '/images/gallery/31.jpg',
    '/images/gallery/32.jpg',
    '/images/gallery/33.jpg',
    '/images/gallery/34.jpg',
    '/images/gallery/35.jpg',
    '/images/gallery/36.jpg',
    '/images/gallery/37.jpg',
    '/images/gallery/38.jpg',
    '/images/gallery/39.jpg',
    '/images/gallery/40.jpg',
    '/images/gallery/41.jpg',
    '/images/gallery/42.jpg',
    '/images/gallery/43.jpg',
    '/images/gallery/44.jpg',
    '/images/gallery/45.jpg',
    '/images/gallery/46.jpg',
    '/images/gallery/47.jpg',
    '/images/gallery/48.jpg',
    '/images/gallery/49.jpg',
    '/images/gallery/50.jpg',
    '/images/gallery/51.jpg',
    '/images/gallery/52.jpg',
    '/images/gallery/53.jpg',
    '/images/gallery/54.jpg',
    '/images/gallery/55.jpg',
    '/images/gallery/56.jpg',
    '/images/gallery/57.jpg',
    '/images/gallery/58.jpg',
    '/images/gallery/59.jpg',
    '/images/gallery/60.jpg',
    '/images/gallery/61.jpg',
    '/images/gallery/62.jpg',
    '/images/gallery/63.jpg',
    '/images/gallery/64.jpg',
    '/images/gallery/65.jpg',
    '/images/gallery/66.jpg',
    '/images/gallery/67.jpg',
    '/images/gallery/68.jpg',
    '/images/gallery/69.jpg',
    '/images/gallery/70.jpg',
    '/images/gallery/71.jpg',
    '/images/gallery/72.jpg',
    '/images/gallery/73.jpg',
    '/images/gallery/74.jpg',
    '/images/gallery/75.jpg',
    '/images/gallery/76.jpg',
    '/images/gallery/77.jpg',
    '/images/gallery/78.jpg',
    '/images/gallery/79.jpg',
    '/images/gallery/80.jpg',
    '/images/gallery/81.jpg',
    '/images/gallery/82.jpg',
    '/images/gallery/83.jpg',
    '/images/gallery/84.jpg',
    '/images/gallery/85.jpg',
    '/images/gallery/86.jpg',
    '/images/gallery/87.jpg',
    '/images/gallery/88.jpg',
    '/images/gallery/89.jpg',
    '/images/gallery/90.jpg',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-gray-900">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ================= 返回与标题区 ================= */}
          <div className="mb-12 md:mb-20">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              返回首页
            </Link>
            <h1 className="text-3xl md:text-5xl font-light italic text-gray-900 flex items-center gap-4">
              <Camera className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              光影日常 / Photography
            </h1>
            <p className="mt-4 text-gray-500 text-sm md:text-base max-w-2xl">
              这里没有复杂的交互逻辑，只有我平时记录的一些瞬间。构图、色彩与光影的练习场。
            </p>
          </div>

          {/* 🔥 顶部横幅“镇楼图”展示区 🔥 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-8 overflow-hidden rounded-2xl shadow-sm"
          >
            <img
              src={heroImage}
              alt="Featured Landscape"
              className="w-full max-h-[60vh] object-cover"
            />
          </motion.div>

          {/* ================= 纯 CSS 瀑布流排版 (Masonry) ================= */}
          {/* 1. 删除了坑人的 space-y，单纯只控制列数和列间距 gap */}
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6">
            {photos.map((src, index) => (
              <motion.div
                key={index}
                // 2. 优化动画：稍微缩短移动距离 (y:15)，去掉杂乱的延迟，增加缓冲动画曲线
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                // margin: "50px" 可以让图片还没完全滑进屏幕时就提前触发加载动画，避免突然闪现
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                // 3. 关键修复：把上下间距改用 mb-3 sm:mb-6 加在每个子元素身上。
                // 同时加上 inline-block w-full，这是防止瀑布流图片被腰斩、乱跳的终极防线
                className="break-inside-avoid inline-block w-full mb-3 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 group bg-white"
              >
                <img 
                  src={src} 
                  alt={`Photography ${index + 1}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Gallery;