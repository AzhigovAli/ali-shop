import React from 'react';
import styles from './cartEmpty.module.scss';
import { Image, Title } from '@mantine/core';
import Link from 'next/link';

const CartEmpty = () => {
  return (
    <>
      <div className={styles.titleCartEmpty}>
        <Title className={styles.cartEmptyTitle} order={1}>
          В корзине пусто
        </Title>
        <Image
          width={42}
          height={42}
          src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-128.png"
        />
      </div>
      <p className={styles.description}>
        Вероятней всего, вы не заказывали ещё товар. Для <br /> того, чтобы заказать товар,
        перейдите на главную
        <br /> страницу.
      </p>

      <div className={styles.comeBackBlock}>
        <Image
          className={styles.emptyMenIcon}
          width={344}
          height={344}
          src="https://i.pinimg.com/474x/42/b5/9e/42b59e70d2e0138365eb9ea2e3742339.jpg"
        />
        <Link href="/">
          <button className={styles.backHome}>Вернуться назад</button>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
