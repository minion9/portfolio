import React, { useState, useEffect } from 'react';
import { useTrail, useSpring, animated, config, a } from '@react-spring/web';
import { Link } from 'react-router-dom';
import ShinyText from './ui/ShinyText';
import FlowingMenu from './ui/FlowingMenu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTrail, setShowTrail] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      // Start trail animation after background appears (300ms delay)
      setTimeout(() => {
        setShowTrail(true);
      }, 300);
    } else {
      setShowTrail(false);
      // Close menu after trail disappears
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 200);
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      link: '/',
      text: 'Home',
    },
    {
      link: '/works',
      text: 'Works',
    },
    {
      link: '/blog',
      text: 'Blog',
    },
    {
      link: '/about',
      text: 'About',
    },
    {
      link: '/contact',
      text: 'Contact',
    },
  ];

  // Spring animation for the overlay background
  const overlaySpring = useSpring({
    config: config.slow,
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? 'scale(1)' : 'scale(0.95)',
  });

  // Hamburger menu animation
  const hamburgerSpring = useSpring({
    config: config.wobbly,
    // transform: isMenuOpen ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
  });

  return (
    <>
      <header className='flex items-center font-mono justify-between h-20 w-full bg-black/75 backdrop-blue-sm text-white p-4 relative z-50'>
        <Link to='/'>
          <ShinyText text='Ashutosh Gajjar' speed={4} />
        </Link>

        {/* Desktop Navigation */}
        <nav className='items-center hidden md:block'>
          <ul className='flex gap-4'>
            <li>
              <Link to='/' className='hover:underline hover:underline-offset-4'>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='hover:underline hover:underline-offset-4'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='hover:underline hover:underline-offset-4'
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <animated.button
          onClick={toggleMenu}
          style={hamburgerSpring}
          className='md:hidden p-2 hover:bg-gray-800 rounded transition-all duration-300'
          aria-label='Toggle menu'
        >
          <div className='w-6 h-6 flex flex-col justify-center items-center'>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </div>
        </animated.button>
      </header>

      {/* Full-Screen Menu Overlay */}
      {(isMenuOpen || overlaySpring.opacity.get() > 0) && (
        <animated.div
          style={{
            opacity: overlaySpring.opacity,
            transform: overlaySpring.transform,
            pointerEvents: isMenuOpen ? 'auto' : 'none'
          }}
          className='fixed inset-0 z-40 bg-black overflow-y-auto'
        >
          {/* Menu Content - positioned below header */}
          <div className='relative h-full flex items-center justify-center pt-20 pb-10'>
            <nav className='text-center w-full'>
              
              {/* FlowingMenu with Trail */}
              <div className='space-y-8 h-full relative w-full'>
                <FlowingMenu
                  items={menuItems}
                  isOpen={isMenuOpen}
                  showTrail={showTrail}
                  onItemClick={toggleMenu}
                />
              </div>

            </nav>
          </div>

          {/* Close on background click */}
          <div
            className='absolute inset-0 -z-10'
            onClick={toggleMenu}
            aria-label='Close menu'
          />
        </animated.div>
      )}
    </>
  );
}

export default Header;