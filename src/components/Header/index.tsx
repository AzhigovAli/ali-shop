import React from 'react';
import styles from './header.module.scss';
import { Title, Image } from '@mantine/core';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/home/slice';
import { RootState, useAppDispatch } from '../../redux/store';

const Header = () => {
  const router = useRouter();
  const { searchValue } = useSelector((state: RootState) => state.home);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.header}>
      <div className={styles.searchProduct}>
        {router.pathname === '/' ? (
          <Title className={styles.titleShop} fw={400} order={1}>
            Ali Shop
          </Title>
        ) : (
          <Link style={{ textDecoration: 'none', color: 'black' }} href="/">
            <Title className={styles.titleShop} fw={400} order={1}>
              Ali Shop
            </Title>
          </Link>
        )}
        <input
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          className={styles.searchInput}
          placeholder="Введите товар..."
        />
      </div>
      <div className={styles.menu}>
        <Link href="/cart">
          <button className={styles.btnCart}>
            <Image
              radius="md"
              width={34}
              height={34}
              src="https://cdn-icons-png.flaticon.com/128/2636/2636890.png"
            />
          </button>
        </Link>
        <Link href="/profile">
          <button className={styles.btnProfile}>
            <Image
              radius="md"
              width={34}
              height={34}
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
