import { motion } from 'framer-motion';
import CIVICFIXLogo from '../assets/CIVICFIX LOGO.png';
const bgShapes = [
  { top: '-10%', left: '-10%', size: 'home-bg-shape-lg', color: 'home-bg-blue', delay: 0 },
  { bottom: '-12%', right: '-8%', size: 'home-bg-shape-xl', color: 'home-bg-yellow', delay: 0.3 },
  { top: '20%', right: '-6%', size: 'home-bg-shape-md', color: 'home-bg-green', delay: 0.6 },
];

function Home() {
  return (
   
    <div className="home-root">
      
      {/* Animated background shapes */}
      {bgShapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.7 }}
          transition={{ duration: 1.2, delay: shape.delay, type: 'spring', stiffness: 80 }}
          className={`home-bg-shape ${shape.size} ${shape.color}`}
          style={{ ...shape }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="home-content"
      >
        <motion.h1
          initial={{ letterSpacing: '-0.1em' }}
          animate={{ letterSpacing: '0.05em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="home-title"
        >
          <motion.span
            whileHover={{ scale: 1.08, color: '#facc15', textShadow: '0px 0px 16px #facc15' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="home-title-highlight"
          >
            
            Welcome to CivicFix
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="home-desc"
        >
          Empowering citizens to report and resolve public issues in their communities — 
          <motion.span
            whileHover={{ color: '#22c55e', scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="home-desc-highlight"
          >
            {' '}fast, transparent, and impactful.
          </motion.span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="home-tagline"
        >
          Together, we fix the civic gaps — one complaint at a time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="home-btn-row"
        >
          <motion.button onClick={() => window.location.href = '/submit'}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 24px 4px #2563eb55, 0 0 0 8px #facc1533',
              backgroundColor: '#2563eb',
              color: '#fff',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="home-btn"
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
