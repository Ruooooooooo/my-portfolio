// src/components/TechStack.jsx
import { SiUnrealengine, SiUnity, SiFigma, SiAdobephotoshop, SiReact, SiTailwindcss } from "react-icons/si";

export default function TechStack() {
  // 这里定义你要展示的图标
  const skills = [
    { name: "Unreal 5", icon: <SiUnrealengine />, color: "hover:text-white" },
    { name: "Figma", icon: <SiFigma />, color: "hover:text-[#F24E1E]" },
    { name: "React", icon: <SiReact />, color: "hover:text-[#61DAFB]" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "hover:text-[#06B6D4]" },
    { name: "Unity", icon: <SiUnity />, color: "hover:text-white" },
    { name: "PS", icon: <SiAdobephotoshop />, color: "hover:text-[#31A8FF]" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className={`
            flex items-center gap-2 px-3 py-1.5 
            border border-gray-700 rounded-full bg-gray-900/50
            text-gray-400 text-xs transition-colors duration-300 cursor-default
            ${skill.color} hover:border-gray-500
          `}
        >
          {/* 图标 */}
          <span className="text-base">{skill.icon}</span>
          {/* 软件名 */}
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  );
}