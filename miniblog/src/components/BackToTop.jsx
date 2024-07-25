import { useEffect } from 'react';
import styles from './BackToTop.module.css';

const BackToTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      const arrowTop = document.getElementById('arrow-top');
      if (arrowTop) {
        if (window.pageYOffset > 1000) {
          arrowTop.style.opacity = '1';
        } else {
          arrowTop.style.opacity = '0';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="arrow-top" onClick={scrollToTop} className={styles.arrowTop}>
      <span className={styles.arrowIcon}>&uarr;</span>
    </div>
  );
};

export default BackToTop;
