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
  // 请确保 public/images/gallery/ 目录下有这张名为 hero.jpg 的图
  // (如果你不想单独展示大图，可以把下方的对应代码删掉)
  const heroImage = '/images/gallery/hero.jpg'; 

  // 2. 这里填入你所有的照片文件名（竖图、横图都可以混搭放在这里）
  const photos = [
    '/images/gallery/1.jpg',
    '/images/gallery/2.jpg',
    '/images/gallery/3.jpg',
    '/images/gallery/4.jpg',
    '/images/gallery/5.jpg',
    '/images/gallery/6.jpg',
    '/images/gallery/7.jpg',
    '/images/gallery/8.jpg',
    // 将你刚才上传的图重命名为 9.jpg 放进文件夹，然后在这里加上:
    // '/images/gallery/9.jpg',
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

          {/* 🔥 新增：顶部横幅“镇楼图”展示区 (非常适合展示 16:9 横版大片) 🔥 */}
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
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {photos.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                className="break-inside-avoid overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 group bg-white"
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