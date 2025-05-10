import FooterComponent from "./_component/footer";
import HeaderComponent from "./_component/header";
import PageDescriptionComponent from "./_component/page-description";
import Portfolio from "./_component/portfolio";
import SkillComponent from "./_component/skill";
import WorkExperience from "./_component/work-experience";
import { skills, workExperience, portfolios } from "./_resource/main";

export default function Home() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-4">
        <HeaderComponent />
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <PageDescriptionComponent
          text="Software Engineer 👨🏻‍💻 berusia 23 berbasis di Jakarta 🇮🇩 membuat produk digital atas nama Moh. Ibnu Abdurrohman Sutio"
          link="mailto:ibnnudev@gmail.com"
        />
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <SkillComponent skills={skills} />
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <WorkExperience items={workExperience} />
      </div>
      <Portfolio portfolios={portfolios} />
      {/* <ProjectComponent projects={projects} /> */}
      <div className="max-w-2xl mx-auto px-4">
        <FooterComponent />
      </div>
    </div>
  );
}
