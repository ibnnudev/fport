"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, FileWarning, Lock } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkPreview } from "@/components/ui/link-preview";

export default function Portfolio({
  portfolios,
}: {
  portfolios: {
    id: string;
    letter: string;
    dateRange: string;
    title: string;
    location: string;
    description: string;
    sourceUrl: string;
    isForbidden: boolean;
    movingDirection: string;
  }[];
}) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter portfolios based on active tab
  const filteredPortfolios = () => {
    switch (activeTab) {
      case "open":
        return portfolios.filter((item) => !item.isForbidden);
      case "nda":
        return portfolios.filter((item) => item.isForbidden);
      default:
        return portfolios;
    }
  };

  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleProjectClick = (id: string) => {
    if (activeProject === id) {
      setActiveProject(null);
    } else {
      setActiveProject(id);
    }
  };

  const Tab = ({
    id,
    label,
    icon,
  }: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        activeTab === id
          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );

  return (
    <div className="">
      <div className="w-full max-w-6xl mx-auto px-4 pt-16 text-center mb-16">
        <motion.h1
          className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Proyek yang pernah saya kerjakan
        </motion.h1>
        <motion.p
          className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Berikut adalah beberapa proyek yang pernah saya kerjakan, mulai dari
          website, aplikasi, desain grafis, dan lainnya.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Portfolio Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Selection of projects I've worked on throughout my professional
            career
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
          <Tab id="all" label={`All Projects (${portfolios.length})`} />
          <Tab
            id="open"
            label={`Open Projects (${
              portfolios.filter((p) => !p.isForbidden).length
            })`}
            icon={<ArrowUpRight size={16} />}
          />
          <Tab
            id="nda"
            label={`NDA Projects (${
              portfolios.filter((p) => p.isForbidden).length
            })`}
            icon={<Lock size={16} />}
          />
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios().map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Status Badge - Only for NDA projects */}
              {project.isForbidden && (
                <div className="absolute top-3 right-3 z-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium px-2 py-1 rounded-md flex items-center">
                  <Lock size={12} className="mr-1" />
                  NDA
                </div>
              )}

              {/* Image Placeholder */}
              {/* <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={project.letter}
                    alt={project.title}
                    className="object-cover w-16 h-16"
                  />
                </div>
              </div> */}

              <div className="flex items-center justify-center">
                <Image
                  src={project.letter}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="h-18 w-18 flex items-center justify-center object-contain transition-transform duration-300 group-hover:scale-105 p-4 pb-0 mb-4"
                />
              </div>

              <div className="p-5 pt-0">
                {/* Date Tag */}
                <div className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {project.dateRange}
                </div>

                {/* Title & Location */}
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white line-clamp-1 group-hover:line-clamp-none">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {project.location}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none">
                  {project.description}
                </p>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  {project.sourceUrl && !project.isForbidden ? (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Lihat project
                      <ArrowUpRight className="ml-1 w-4 h-4" />
                    </a>
                  ) : project.isForbidden ? (
                    <div className="flex items-center text-sm text-red-500 dark:text-red-400">
                      <FileWarning className="mr-1 w-4 h-4" />
                      Project Terbatas
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">
                      No link available
                    </span>
                  )}

                  {/* Project Type Badge */}
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {project.movingDirection === "right"
                      ? "Design"
                      : "Development"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - When no projects match the filter */}
        {filteredPortfolios().length === 0 && (
          <div className="text-center py-12">
            <FileWarning className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No projects match your current filter. Try selecting a different
              category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
