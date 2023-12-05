import { motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';

const SectionComponentThree = () => {
  return (
    <Element name="section4" className="element">
      <motion.section
        initial={{ opacity: 0, y: '-100vh' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100vh' }}
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        .
      </motion.section>
      <Link to="section5" smooth={true} duration={500}></Link>
    </Element>
  );
};

export default SectionComponentThree;
