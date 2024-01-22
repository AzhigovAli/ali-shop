import axios from 'axios';
import React from 'react';
import styles from './profile.module.scss';
import Card from '../../components/Card/index';
import { useSelector } from 'react-redux';
import { fetchProfileItems } from '../../redux/profile/slice';
import { RootState, useAppDispatch } from '../../redux/store';
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
  isAdded: boolean;
};
const Profile = () => {
  const { items } = useSelector((state: RootState) => state.profile);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    //@ts-ignore
    dispatch(fetchProfileItems());
  }, []);
  return (
    <div className={styles.profilePage}>
      <div className={styles.decoratedProduct}>
        {items.map((item: obj) => {
          return <Card {...item} />;
        })}
      </div>
    </div>
  );
};
export default Profile;
