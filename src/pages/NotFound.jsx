import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NotFoundPage = () => {
  const containerRef = useRef(null);
  const errorCodeRef = useRef(null);
  const messageRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const starsRef = useRef(null);
  const floatingObjectsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Create stars
    createStars();

    // Create floating objects
    createFloatingObjects();

    // Main animation sequence
    tl.to(errorCodeRef.current, {
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      delay: 0.5,
    })
      .to(
        messageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

    // Glitch effect on 404
    const glitchTl = gsap.timeline({ repeat: -1, delay: 2 });
    glitchTl
      .to(errorCodeRef.current, {
        x: -2,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(errorCodeRef.current, {
        x: 2,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(errorCodeRef.current, {
        x: 0,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to({}, { duration: 3 }); // Pause between glitches

    // Floating animation for objects
    floatingObjectsRef.current.forEach((obj, index) => {
      if (obj) {
        gsap.to(obj, {
          y: 'random(-20, 20)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(2, 4)',
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      }
    });

    // Stars twinkling
    const stars = starsRef.current?.children;
    if (stars) {
      Array.from(stars).forEach((star, index) => {
        gsap.to(star, {
          opacity: 'random(0.3, 1)',
          duration: 'random(1, 3)',
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      });
    }

    return () => {
      tl.kill();
      glitchTl.kill();
    };
  }, []);

  const createStars = () => {
    const starContainer = starsRef.current;
    if (!starContainer) return;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      starContainer.appendChild(star);
    }
  };

  const createFloatingObjects = () => {
    const objects = ['💫', '⭐', '🌟', '✨', '🚀', '🛸', '🌙', '☄️'];
    const container = containerRef.current;
    if (!container) return;

    objects.forEach((emoji, index) => {
      const obj = document.createElement('div');
      obj.className = 'floating-object';
      obj.textContent = emoji;
      obj.style.left = Math.random() * 80 + 10 + '%';
      obj.style.top = Math.random() * 80 + 10 + '%';
      obj.style.fontSize = Math.random() * 2 + 1 + 'rem';
      container.appendChild(obj);
      floatingObjectsRef.current[index] = obj;
    });
  };

  const handleButtonHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.01,
      duration: 0.2,
      ease: 'power4.InOut',
    });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'back.out(1.7)',
        });
      },
    });
    // Add your navigation logic here
    console.log('Navigate to home');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center overflow-hidden relative'>
      {/* Stars background */}
      <div ref={starsRef} className='absolute inset-0 overflow-hidden'>
        <style jsx>{`
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            animation: twinkle 2s ease-in-out infinite;
          }
          @keyframes twinkle {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
          .floating-object {
            position: absolute;
            opacity: 0.1;
            pointer-events: none;
            user-select: none;
          }
        `}</style>
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className='text-center text-white z-10 relative px-4'
      >
        {/* 404 Error Code */}
        <div
          ref={errorCodeRef}
          className='text-8xl md:text-9xl font-bold mb-4 relative'
          style={{
            transform: 'scale(0)',
            textShadow:
              '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
          }}
        >
          <span className='relative z-10'>404</span>
          <div
            className='absolute inset-0 text-pink-400 opacity-50'
            style={{ transform: 'translate(-2px, 2px)' }}
          >
            404
          </div>
          <div
            className='absolute inset-0 text-cyan-400 opacity-50'
            style={{ transform: 'translate(2px, -2px)' }}
          >
            404
          </div>
        </div>

        {/* Error Message */}
        <h1
          ref={messageRef}
          className='text-3xl md:text-4xl font-bold mb-4'
          style={{ opacity: 0, transform: 'translateY(50px)' }}
        >
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className='text-lg md:text-xl mb-8 text-gray-200 max-w-md mx-auto'
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          The page you're looking for seems to have drifted into outer space.
          Let's get you back to safety!
        </p>

        {/* Home Button */}
        <button
          ref={buttonRef}
          className='bg-gradient-to-r from-violet-500/70 to-fuchsia-500/70 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform active:scale-95'
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={handleButtonClick}
        >
          🚀 Take Me Home
        </button>
      </div>

      {/* Pulse circles */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-white opacity-20 animate-pulse'></div>
        <div
          className='absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border-2 border-pink-400 opacity-30 animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-1/2 right-1/3 w-16 h-16 rounded-full border-2 border-cyan-400 opacity-25 animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
