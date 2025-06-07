import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from '../components/ui/ScrollFloat';
import Beams from '../components/ui/Beams';
import RotatingText from '../components/ui/RotatingText';
import ScrambledText from '../components/ui/ScrambledText';
import SplitText from '../components/ui/SplitText';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section fade in on load
      gsap.fromTo(heroRef.current, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        }
      );

      // Second section scroll reveal
      gsap.set(secondSectionRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95
      });
      
      ScrollTrigger.create({
        trigger: secondSectionRef.current,
        start: "top 85%",
        end: "top 50%",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(secondSectionRef.current, {
            opacity: self.progress,
            y: 80 * (1 - self.progress),
            scale: 0.95 + (0.05 * self.progress),
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Second section background color change
      ScrollTrigger.create({
        trigger: secondSectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: "#111111",
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: "#000000",
            duration: 0.5
          });
        }
      });

      // Third section scroll reveal with staggered elements
      const thirdSectionContainer = thirdSectionRef.current.querySelector('.max-w-3xl');
      
      gsap.set(thirdSectionContainer, {
        opacity: 0,
        y: 100,
        scale: 0.9
      });

      // Container reveal
      ScrollTrigger.create({
        trigger: thirdSectionRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(thirdSectionContainer, {
            opacity: self.progress,
            y: 100 * (1 - self.progress),
            scale: 0.9 + (0.1 * self.progress),
            duration: 0.4,
            ease: "power3.out"
          });
        }
      });

      // Additional third section background reveal
      gsap.fromTo(thirdSectionRef.current,
        {
          backgroundPosition: "50% 100%"
        },
        {
          backgroundPosition: "50% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: thirdSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Parallax effect for beams
      gsap.to(heroRef.current.querySelector('.absolute.inset-0'), {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className='h-screen w-full text-white font-mono'>
      <section ref={heroRef}>
        <div className='relative flex items-center justify-center h-svh md:h-140'>
          <p className='flex items-center gap-2 z-1 text-xl sm:text-3xl md:text-4xl font-semibold text-center'>
            Transforming ideas into
            <RotatingText
              texts={[
                'Code',
                'Interfaces',
                'Solutions',
                'Experiences',
                'Reality',
              ]}
              mainClassName='px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg'
              staggerFrom={'last'}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </p>
        </div>
      </section>
      
      <section ref={secondSectionRef} className='flex items-center justify-center bg-black h-90 w-full overflow-hidden'>
        <div className='transform-gpu'>
          <ScrollFloat
            animationDuration={1.5}
            ease='back.inOut(2)'
            scrollStart='top 75%'
            scrollEnd='center 50%'
            stagger={0.08}
            className='text-xl font-semibold'
          >
            Let's build something amazing together!
          </ScrollFloat>
        </div>
      </section>
      
      <section ref={thirdSectionRef} className='overflow-hidden'>
        <div className='flex items-center justify-center h-svh md:h-140'>
          <div className='max-w-3xl text-center p-4 transform-gpu backdrop-blur-sm'>
            <ScrambledText
              className='text-2xl sm:text-3xl md:text-4xl text-pretty font-semibold'
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars='.:'
            >
              A Web and Full-Stack Developer based in Mumbai, India, with
              hands-on experience in designing and developing secure, scalable,
              and performance-driven applications. I specialize in creating
              seamless user interfaces and backend systems using modern
              frameworks and cloud-based infrastructure. My focus is on
              delivering real-world solutions that align with business goals
              while maintaining technical excellence...
            </ScrambledText>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;