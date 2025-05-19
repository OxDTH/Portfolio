import { Border, FadeIn, FadeInStagger } from '@/components';
import clsx from 'clsx';
import { default as Image } from 'next/image';

const experience = [
  {
    title: 'Daytonaio | Contributor',
    date: 'May 2025 - Present',
    description: [
      'I\'m an active open-source contributor, currently contributing to projects focused on web development using React and TypeScript.',
      'I enjoy collaborating with developers from around the world to build scalable and efficient solutions, while following best practices in modern frontend development.',
      'Open-source not only allows me to give back to the developer community but also helps me sharpen my skills and stay up-to-date with the latest technologies.',
    ],
    image: { url: '/work/daytonaio.jpg', height: 96, width: 96, className: 'rounded-none' },
  },
  {
    title: 'Built projects using React and its supporting packages',
    date: 'May 2024 - Dec 2024',
    description: [
      'Built modern web applications using React and TypeScript, leveraging tools and frameworks like Next.js for server-side rendering, Tailwind CSS and shadcn/ui for efficient UI development, and Chakra UI for accessible component styling.',
      'Integrated Node.js for backend logic and API routes, ensuring full-stack capabilities.',
      'Focused on clean architecture, component reusability, and performance optimization across the application lifecycle.',
    ],
    image: { url: '/logos/react-logo.png', height: 80, width: 90, className: '' },
  },
  {
    title: 'Began foundational training in HTML, CSS, and JavaScript',
    date: 'May 2022 - Jan 2024',
    description: [
      'Started self-learning journey in web development with a focus on HTML, CSS, and JavaScript to build static and interactive web pages.',
      'Built small projects like landing pages, forms, and UI components to strengthen understanding of semantic structure, styling, and DOM manipulation.',
      'Developed problem-solving and debugging skills by experimenting with code, referencing documentation, and learning through hands-on practice.',
    ],
    image: { url: '/logos/html5-logo.png', height: 96, width: 96, className: '' },
  },
];

export default function WorkExperience() {
  return (
    <div className="mt-24 text-gray-500 relative z-10 @container">
      <FadeIn
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        viewportProp={{ once: true }}
      >
        <div className="border-l border-gray-500/30 absolute bottom-0 top-0"></div>
      </FadeIn>
      <FadeInStagger>
        {experience.map((item, index) => (
          <WorkRole key={index} title={item.title} date={item.date} image={item.image}>
            {item.description.map((desc, index) => (
              <li key={index} className="py-1">
                {desc}
              </li>
            ))}
          </WorkRole>
        ))}
      </FadeInStagger>
    </div>
  );
}

function WorkRole({ children, title, date, image }: { children: React.ReactNode; title: string; date?: string; image: { url: string; className: string; height: number; width: number } }) {
  return (
    <FadeIn className="flex group mt-8 first:mt-0 px-3">
      <div className="hidden @lg:flex @lg:flex-col">
        <p className="px-4 pt-8 group-first:pt-0 text-white text-sm leading-7 min-w-[180px] max-w-[180px] @lg:min-w-[195px] @lg:max-w-[195px] @xl:max-w-[215px] @xl:min-w-[215px] flex-none">{date}</p>
        <div className={clsx('flex-none rounded-md overflow-hidden self-center mx-4 mt-auto mb-auto', image.className)}>
          <Image
            src={image.url}
            alt=""
            height={image.height}
            width={image.width}
            style={{
              width: image.width || 'auto',
              height: image.height || 'auto',
            }}
          />
        </div>
      </div>
      <Border className="pt-8 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
        <div className="flex mb-4">
          <div className={clsx('flex-none rounded-md overflow-hidden self-center ml-2 mr-4 @lg:hidden', image.className)}>
            <Image
              src={image.url}
              alt=""
              height={image.height}
              width={image.width}
              style={{
                width: image.width || 'auto',
                height: image.height || 'auto',
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-work_experience_orange text-lg">{title}</p>
            <p className="@lg:hidden mt-2 text-white text-sm">{date}</p>
          </div>
        </div>
        <ul className="list-disc pl-10">{children}</ul>
      </Border>
    </FadeIn>
  );
}
