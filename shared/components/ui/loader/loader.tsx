'use client';

import styles from './Loader.module.css';

interface LoaderProps {
  width?: number; 
  height?: number; 
  size?: number; 
}

export const Loader: React.FC<LoaderProps> = ({ width, height, size = 48 }) => {
  const loaderStyle = {
    width: `${width || size}px`,
    height: `${height || size}px`,
  };

  return <span className={styles.loader} style={loaderStyle} />;
};