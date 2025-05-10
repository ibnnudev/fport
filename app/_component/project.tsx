import Image from "next/image";
import React from "react";
import VisitIcon from "../_icon/visit";

export interface ProjectInterface {
  title: string;
  image: string;
  category: string;
  skills: string[];
  link?: string;
}

const ProjectComponent = ({ projects }: { projects: ProjectInterface[] }) => {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-16 mt-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="card-container h-fit">
              <Image
                src={project.image}
                alt={project.title}
                className=" w-full object-cover h-48"
                width={800}
                height={800}
                objectFit="cover"
              />

              <div className="p-4">
                <h2 className="text-[#718096] font-medium text-sm">
                  {project.category}
                </h2>
                <h1 className="text-gray-800 text-lg font-bold">
                  {project.title}
                </h1>
                <div className="flex flex-wrap mt-2 space-x-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className=" text-[#718096] text-base font-medium rounded-full"
                    >
                      {skill} {index + 1 !== project.skills.length && "."}
                    </span>
                  ))}
                </div>

                <button className="text-xs mt-12 px-2 py-1.5 rounded-md border border-[#2b6cb0] flex items-center space-x-1 text-[#2b6cb0] font-semibold justify-center w-full ">
                  <VisitIcon className="w-3 h-3 mr-1" />
                  <span>Visit Site</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-800  text-lg font-medium justify-center w-full">
            <Image
              src={
                "https://temanlab.com/wp-content/plugins/tutor/assets/images/emptystate.svg"
              }
              alt="Empty State"
              width={200}
              height={200}
              className="mx-auto w-full h-48 object-contain mt-6"
            />
            <p className="mt-12 text-gray-600">Bakal diupdate nanti 😄</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectComponent;
