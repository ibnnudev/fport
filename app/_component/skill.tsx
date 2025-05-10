"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillComponent = ({ skills }: { skills: string[] }) => {
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      {skills.length > 0 && (
        <div className="flex flex-wrap space-x-2 space-y-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="text-gray-800 dark:text-gray-200 text-sm px-2 py-0.5 rounded-md border border-[#e2e8f0] dark:border-gray-700 h-fit font-medium"
              initial="hidden"
              animate="visible"
              variants={skillVariants}
              transition={{ delay: index * 0.1 }} // Menambahkan delay untuk efek stagger
            >
              {skill}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default SkillComponent;
