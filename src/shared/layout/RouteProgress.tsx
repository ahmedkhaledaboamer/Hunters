import { useEffect, useState } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/** Lime progress bar: grows while a lazy route loads, completes on every page change. */
export function RouteProgress() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const [completeKey, setCompleteKey] = useState(0);
  const loading = navigation.state !== 'idle';

  useEffect(() => {
    setCompleteKey((k) => k + 1);
  }, [pathname]);

  const bar = 'fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-lime-500 rtl:origin-right';

  return (
    <div aria-hidden>
      <AnimatePresence>
        {loading &&
        <motion.div
          key="loading"
          className={bar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.8, transition: { duration: 1.6, ease: [0.23, 1, 0.32, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }} />

        }
      </AnimatePresence>
      <motion.div
        key={completeKey}
        className={bar}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }, opacity: { duration: 0.2, delay: 0.3 } }} />
      
    </div>);

}