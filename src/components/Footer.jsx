import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import profileData from '../data/profile.json'

function Footer() {
  const { socialLinks } = profileData

  // 社交图标映射
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-zinc-800 bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* 版权信息 - 浅灰色文字 */}
          <div className="text-sm text-zinc-400 text-center md:text-left">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>

          {/* 社交链接 - 浅灰色文字 */}
          <div className="flex items-center space-x-6">
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                {getSocialIcon('email')}
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                {getSocialIcon('linkedin')}
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                {getSocialIcon('github')}
              </a>
            )}
            {socialLinks.behance && (
              <a
                href={socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                aria-label="Behance"
              >
                Behance
              </a>
            )}
            {socialLinks.dribbble && (
              <a
                href={socialLinks.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                aria-label="Dribbble"
              >
                Dribbble
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
