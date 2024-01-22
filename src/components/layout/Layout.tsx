import React from 'react';
import Header from '../Header/index';
import styles from './layout.module.scss';

export const Layout = ({ children }: any) => {
  return (
    <div className={styles.main}>
      <Header />
      <div>{children}</div>
    </div>
  );
};
