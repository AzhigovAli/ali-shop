import { fetchAddItems } from '../redux/cart/slice';
import { useAppDispatch } from '@/redux/store';
import { obj } from './type';

const useAddProduct = () => {
  const dispatch = useAppDispatch();

  const addProduct = async (obj: obj) => {
    try {
      dispatch(fetchAddItems({ obj }));
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товар в корзину');
    }
  };

  return { addProduct };
};

export default useAddProduct;
