import ScrollFloat from '../components/ui/ScrollFloat';
import Beams from '../components/ui/Beams';
import RotatingText from '../components/ui/RotatingText';
import ScrambledText from '../components/ui/ScrambledText';
import SplitText from '../components/ui/SplitText';

function Home() {
  return (
    <div className='h-screen w-full text-white font-mono'>
      <section>
        <div className='relative flex items-center justify-center h-svh md:h-140 bg-gradient-to-br from-black to-neutral-800'>
          <div className='absolute inset-0 z-0'>
            <Beams
              beamWidth={1}
              beamHeight={30}
              beamNumber={30}
              lightColor='#ffffff'
              speed={1.1}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          <p className='flex items-center gap-2 z-1 text-2xl sm:text-3xl md:text-4xl font-semibold text-center'>
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
      <section className='flex items-center justify-center bg-black h-90 w-full'>
        <div className=''>
          {/* <SplitText
            text=''
            className='text-2xl font-semibold text-center'
            delay={30}
            duration={2}
            ease='power3.out'
            splitType='chars'
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            // rootMargin='-100px'
            textAlign='center'
          /> */}
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.06}
            className='text-xl font-semibold '
          >
            Let's build something amazing together!
          </ScrollFloat>
        </div>
      </section>
      <section>
        <div className='flex items-center justify-center h-svh md:h-140 bg-gradient-to-br from-black to-neutral-800'>
          <div className='max-w-3xl text-center p-4'>
            <ScrambledText
              className='text-2xl sm:text-3xl md:text-4xl font-semibold'
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
              while maintaining technical excellence.
            </ScrambledText>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
