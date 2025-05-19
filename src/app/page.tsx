import { AboutMe, AnimatedTitle, Border, ContactForm, Container, FadeIn, GridPattern, MyWork, Section, SectionHeader, Skills, SmoothScrollLink, Socials, Stars, WorkExperience } from '@/components';
import { Archive, BookOpen, BriefCase, Envelope } from '@/icons';

export const metadata = {
  title: 'Ritik Mohapatra',
  description: 'My personal portfolio.',
};

export const sections = [
  { index: 0, title: 'About Me', id: 'about-me' },
  { index: 1, title: 'Work Experience', id: 'work-experience' },
  { index: 2, title: 'Skills', id: 'skills' },
  { index: 3, title: 'My Work', id: 'my-work' },
  { index: 4, title: 'Contact Me', id: 'contact' },
];

interface contentSection {
  id: string;
  sectionHeader: {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
  };
  mainContent: React.ReactNode;
}

const content: contentSection[] = [
  {
    id: sections[1].id,
    sectionHeader: {
      icon: (
        <>
          <BriefCase height="28" width="28" />
          <span className="bg-work_experience_orange icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: 'Work Experience',
      description: (
        <div>
          <span className="text-work_experience_orange">Self Taught Developer</span> with <span className="text-work_experience_orange">1.5 years</span> of experience in the Web Development
        </div>
      ),
    },
    mainContent: <WorkExperience />,
  },
  {
    id: sections[2].id,
    sectionHeader: {
      icon: (
        <>
          <BookOpen height="28" width="28" />
          <span className="bg-skills_purple icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: 'Skills',
      description: (
        <div>
          <span className="text-skills_purple">Web developer</span> with hands-on experience in <span className="text-skills_purple">Frontend Technologies</span> and currently expanding skills into{' '}
          <span className="text-skills_purple">Backend</span>
        </div>
      ),
    },
    mainContent: <Skills />,
  },
  {
    id: sections[3].id,
    sectionHeader: {
      icon: (
        <>
          <Archive height="28" width="28" />
          <span className="bg-my_work_yellow icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: 'My Work',
      description: (
        <div>
          Some of <span className="text-my_work_yellow">my work</span> as a <span className="text-my_work_yellow">Web</span> Developer
        </div>
      ),
    },
    mainContent: <MyWork />,
  },
  {
    id: sections[4].id,
    sectionHeader: {
      icon: (
        <>
          <Envelope height="28" width="28" />
          <span className="bg-blue-400 icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: 'Contact Me',
      description: (
        <div>
          Get in <span className="text-blue-400">contact</span> and let&apos;s <span className="text-blue-400">work together</span>
        </div>
      ),
    },
    mainContent: <ContactForm />,
  },
];

export default function Index() {
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden">
      <GridPattern />
      <Section id={sections[0].id}>
        <Container>
          <div className="min-h-screen relative">
            <FadeIn className="max-w-5xl pt-40 md:pt-[20vh] 2xl:pt-[30vh]">
              <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] sm:text-6xl">
                Ritik Mohapatra<span className="wave">👋</span>
              </h1>
              <div className="flex mt-3 mb-1">
                Looking for Open Source Contributions{' '}
                <span className="relative flex h-2 w-2 self-center mx-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>{' '}
                / &#8205; <AnimatedTitle />
              </div>
              <p className="max-w-3xl">I'm a 22-year-old Computer Science and Technology graduate with hands-on experience in Frontend Development. I have a strong passion for coding and love expressing creativity through clean, user-focused design and interaction. I'm always eager to learn new technologies that inspire me to build even more innovative solutions. In my free time, I dive into coding, conduct research, and actively contribute to open-source projects.</p>
            </FadeIn>

            <Socials />
            <SmoothScrollLink to="work-experience" className="scroll-down">
              <span></span>
              <span></span>
              <span></span>
            </SmoothScrollLink>
          </div>{' '}
          <Border />
          <AboutMe />
        </Container>
      </Section>

      <div id="stars-container" className="relative">
        <Container>
          <Stars id="stars-container" />
          {content.map((section: contentSection) => (
            <Section key={section.id} id={section.id} className="pt-24 mt-28">
              <Border />
              <SectionHeader {...section.sectionHeader} />
              {section.mainContent}
            </Section>
          ))}
        </Container>
      </div>
    </div>
  );
}
