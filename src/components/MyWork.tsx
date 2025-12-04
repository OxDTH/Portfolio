'use client';
import { ExpandArrowLink, GlowCard } from '@/components';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { DTHAapale, AapaleShopping, AapaleIndia, DTHInstagram, DTHTunes } from '../../public/projects/';

interface Project {
  href: string;
  name: string;
  description: string;
  full: boolean;
  image: {
    src: StaticImageData;
  };
}

const projects: Project[] = [
  {
    href: '/apps/AapaleIndia',
    name: 'Aapale India',
    full: true,
    description: ' a fully responsive eCommerce website with product listings, user login, detailed pages, checkout features etc. Built with a focus on clean UI, smooth user experience, and frontend best practices.',
    image: { src: AapaleIndia },
  },
  {
    href: '/apps/AapaleShopping',
    name: 'Aapale Shopping',
    full: true,
    description: ' a responsive eCommerce website with product listings, detailed pages, checkout features with order summary and receipt. Focoused on clean UI, smooth user experience.',
    image: { src: AapaleShopping },
  },
  {
    href: '/apps/DTHTunes',
    name: 'DTH Tunes',
    full: false,
    description: ' is a music streaming platform offering curated tracks, smooth playback, and responsive design.',
    image: { src: DTHTunes },
  },
  {
    href: '/apps/DTHInstagram',
    name: 'DTH Instagram (Under Construction)',
    full: false,
    description: ' is a social media platform to share posts, explore content, and connect—built with modern web technologies.',
    image: { src: DTHInstagram },
  },
  {
    href: '/apps/DTHAapale',
    name: 'DTH Aapale',
    full: true,
    description: ' is static website showcasing over-ear headphones with smooth animations, responsive layout, and user-focused design.',
    image: { src: DTHAapale },
  },
  //{
    //href: '',
    //name: '',
    //full: false,
    //description: ' ',
    //image: { src: impulseux },
  //},
  //{
    //href: '',
    //name: '',
    //full: false,
    //description: ' ',
    //image: { src: leenithIos },
  //},
];

export default function MyWork() {
  return (
    <div className="relative z-10 mt-20 @container">
      <div className="grid grid-cols-1 gap-8 pt-10 @3xl:grid-cols-2">
        {projects.map((project) => (
          <GlowCard
            key={project.name}
            className={clsx('hover:shadow-my_work_yellow/90', project.full ? 'h-[60vh] @2xl:h-[50vh] @3xl:col-span-2' : 'h-[60vh] @3xl:col-span-1')}
            glowClassName="from-[#ffdc8b] to-[#ffdc8b]"
          >
            <div className={clsx('flex-col justify-between h-full', project.full && '@2xl:flex')}>
              <h3 className={clsx('text-xl @2xl:text-3xl text-white dark:text-white/90', project.full && '@4xl:w-[40%]')}>
                <span className="text-xl @2xl:text-4xl text-my_work_yellow">{project.name}</span>
                <span className="text-base font-light">{project.description}</span>
              </h3>
              <ExpandArrowLink href={project.href} className="before:bg-my_work_yellow " />
            </div>
            <Image
              placeholder="blur"
              className={clsx(
                'z-10 my-work-img-shadow absolute w-full',
                project.full ? '@md:w-[80%] @xl:w-[70%] @2xl:w-[55%] @md:rounded-tl-md bottom-0 right-0' : 'bottom-0 @xl:right-0 @xl:w-[70%] @3xl:w-full'
              )}
              src={project.image.src}
              alt=""
            />
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
