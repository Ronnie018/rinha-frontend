import React, { useRef, useEffect } from 'react';

const Observable = ({ cb, children }) => {
  const observer_obj = useRef(null);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb();
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }
  );

  useEffect(() => {
    if (window && observer_obj.current) {
      observer.observe(observer_obj.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return <span ref={observer_obj}>{children}</span>;
};

export default Observable;
