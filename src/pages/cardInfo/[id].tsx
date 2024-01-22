import React from 'react';
import styles from './cardInfo.module.scss';
import { Image, Title } from '@mantine/core';
import { Rate } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchCardInfo } from '../../redux/cardInfo/slice';
import { fetchAddItems, fetchPayProduct } from '../../redux/cart/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { message } from 'antd';
import { obj } from './type';

const CardInfo = () => {
  const { items } = useSelector((state: RootState) => state.cardInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const paySuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Товар успешно оформлен!',
    });
  };

  const payError = () => {
    messageApi.open({
      type: 'error',
      content: 'Не удалось оформить товар:(',
    });
  };

  const addToCartSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Товар успешно добавлен!',
    });
  };

  const addToCartError = () => {
    messageApi.open({
      type: 'error',
      content: 'Не удалось добавить товар:(',
    });
  };
  React.useEffect(() => {
    const id = router.query.id;
    dispatch(fetchCardInfo({ id }));
  }, []);
  const addToCart = (obj: obj) => {
    try {
      dispatch(fetchAddItems({ obj }));
      addToCartSuccess();
      router.push('/');
    } catch (error) {
      console.log(error);
      addToCartError();
    }
  };

  const payProduct = async (items: obj) => {
    try {
      //@ts-ignore
      dispatch(fetchPayProduct(items));
      paySuccess();
      router.push('/');
    } catch (error) {
      payError();
    }
  };

  return (
    <div className={styles.cardInfo}>
      {contextHolder}
      {items.map((item: obj) => {
        return (
          <>
            <Title order={2}>{item.title}</Title>
            <div className={styles.cardBlock}>
              <div className={styles.productImage}>
                <Image width={328} height={329} src={item.imageUrl} />
              </div>
              <div className={styles.productPrice}>
                <div className={styles.price}>
                  <Title style={{ fontSize: 44 }}>{item.price} ₽</Title>
                  <Title className={styles.noDiscount} style={{ color: 'grey' }} order={2}>
                    {item.fullPrice} ₽
                  </Title>
                </div>
                <div className={styles.addToCart}>
                  <button className={styles.addBtn} onClick={() => addToCart({ ...item })}>
                    Добавить в корзину
                  </button>
                  <button className={styles.payNow} onClick={() => payProduct(item)}>
                    Купить сейчас
                  </button>
                </div>
                <div className={styles.reviews}>
                  <Title className={styles.review} order={3}>
                    {item.reviews}
                  </Title>
                  <p className={styles.point}>•</p>
                  <Rate className={styles.rate} defaultValue={item.rating} />
                </div>
              </div>
            </div>
            <div className={styles.describe}>
              <Title order={3}>Цвет: {item.color}</Title>
              <Title order={3}>Питание</Title>
              <Title order={3}>
                Время зарядки <div className={styles.line}></div>
                {item.timeCharging}
              </Title>
              <Title order={3}>
                Время работы от аккумулятора <div className={styles.line}></div>
                {item.lifeBattery}
              </Title>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CardInfo;
