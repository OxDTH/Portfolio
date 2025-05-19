'use client';
import { AnimationControls, motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { sleep } from '../lib/sleep';

const list = {
  visible: {
    display: 'flex',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
  hidden: {
    display: 'none',
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

export default function AnimatedTitle() {
  const frontEnd = useAnimationControls();
  const web = useAnimationControls();
  const transform = useAnimationControls();
  const optimize = useAnimationControls();
  const build = useAnimationControls();
  const debug = useAnimationControls();

  useEffect(() => {
    let hasCanceled_ = false;
    const animationActions = [
      { controller: web as AnimationControls, value: 'visible' },
      { controller: frontEnd, value: 'visible' },
      { controller: web, value: 1500 },
      { controller: frontEnd, value: 'hidden' },
      { controller: web, value: 'hidden' },
      { controller: web, value: 700 },
      { controller: web, value: 'visible' },
      { controller: transform, value: 'visible' },
      { controller: web, value: 1000 },
      { controller: transform, value: 'hidden' },
      { controller: web, value: 'hidden' },
      { controller: web, value: 700 },
      { controller: web, value: 'visible' },
      { controller: optimize, value: 'visible' },
      { controller: web, value: 1000 },
      { controller: optimize, value: 'hidden' },
      { controller: web, value: 'hidden' },
      { controller: web, value: 700 },
      { controller: web, value: 'visible' },
      { controller: build, value: 'visible' },
      { controller: web, value: 1000 },
      { controller: build, value: 'hidden' },
      { controller: web, value: 'hidden' },
      { controller: web, value: 700 },
      { controller: web, value: 'visible' },
      { controller: debug, value: 'visible' },
      { controller: web, value: 1000 },
      { controller: debug, value: 'hidden' },
      { controller: web, value: 'hidden' },
      { controller: web, value: 700 },
    ];

    const animateWords = async () => {
      for (const action of animationActions) {
        if (hasCanceled_) {
          return;
        }
        if (typeof action.value === 'number') {
          await sleep(action.value);
        } else if (!hasCanceled_) {
          await action.controller.start(action.value);
        }
      }
      animateWords();
    };
    animateWords();
    return () => {
      hasCanceled_ = true;
    };
  }, [frontEnd, web, transform, optimize, build, debug]);

  return (
    <div className="flex text-blue-100">
      {/*<motion.div variants={list} initial="hidden" animate={web}>
        <WriteWord word="Web " />
      </motion.div>*/}
      <motion.div variants={list} initial="hidden" animate={frontEnd}>
        <WriteWord word="Front-End " />
      </motion.div>
      <motion.div variants={list} initial="hidden" animate={transform}>
        <WriteWord word="Transforming-designs-into-code " />
      </motion.div>
      <motion.div variants={list} initial="hidden" animate={optimize}>
        <WriteWord word="I-optimize-UIs-for-speed-and-accessibility " />
      </motion.div>
      <motion.div variants={list} initial="hidden" animate={build}>
        <WriteWord word="I-build-interfaces-with-React " />
      </motion.div>
      <motion.div variants={list} initial="hidden" animate={debug}>
        <WriteWord word="I-debug-refactor-and-repeat " />
      </motion.div>
    </div>
  );
}

const item = {
  hidden: { display: 'none', x: 0 },
  visible: { display: 'flex', x: 0 },
};

function WriteWord({ word, ...props }: React.ComponentPropsWithoutRef<typeof motion.div> & { word: string }) {
  return word.split('').map((letter, index) => (
    <motion.div key={index} variants={item} {...props}>
      {letter}
    </motion.div>
  ));
}
