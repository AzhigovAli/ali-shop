import React from 'react';
import styles from './cart.module.scss';
import { Title } from '@mantine/core';
import CartEmpty from '../../components/СartEmpty/index';
import CardCart from '../../components/CardCart/index';
import { useSelector } from 'react-redux';
import {
  fetchCartItems,
  fetchClearItems,
  fetchPayProduct,
  fetchRemoveItems,
  setItems,
} from '../../redux/cart/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { message } from 'antd';

type obj = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  color: string;
  count: number;
  lifeBattery: string;
  timeCharging: string;
  rating: number;
  reviews: string;
  discount: number;
};

const Cart = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

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
  const removeSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Товар успешно удален!',
    });
  };

  const removeError = () => {
    messageApi.open({
      type: 'error',
      content: 'Не удалось удалить товар:(',
    });
  };
  const clearSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Корзина успешно очищена!',
    });
  };

  const clearError = () => {
    messageApi.open({
      type: 'error',
      content: 'Не удалось очистить корзину:(',
    });
  };
  React.useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const clearAll = async () => {
    try {
      dispatch(fetchClearItems(items));
      clearSuccess();
    } catch (error) {
      console.log(error);
      clearError();
    }
  };

  const removeProduct = async (id: number) => {
    try {
      dispatch(fetchRemoveItems({ id }));
      dispatch(setItems(items.filter((obj: any) => obj.id !== id)));
      removeSuccess();
    } catch (error) {
      console.log(error);
      removeError();
    }
  };

  const payProduct = async (items: obj[]) => {
    try {
      dispatch(fetchPayProduct({ items }));
      paySuccess();
    } catch (error) {
      console.log(error);
      payError();
    }
  };

  return (
    <div className={styles.cart}>
      {contextHolder}
      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className={styles.block}>
            <Title onClick={clearAll} className={styles.clearAll} fw={900} order={2}>
              Очистить всё
            </Title>
            <div className={styles.payBlock}>
              <div className={styles.totalPrice}>
                <span className={styles.total}>Итого</span>
                <span className={styles.price}>: {totalPrice} ₽</span>
              </div>
              <div className={styles.btnPay}>
                <button className={styles.payNow} onClick={() => payProduct(items)}>
                  Оплатить сейчас
                </button>
              </div>
            </div>
          </div>
          <div className={styles.cartItems}>
            {items.map((item: obj) => {
              return <CardCart removeProduct={(id: number) => removeProduct(id)} {...item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
