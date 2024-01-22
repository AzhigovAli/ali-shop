export type CartItemsType = [
  {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    color: string;
    lifeBattery: string;
    timeCharging: string;
    rating: number;
    reviews: string;
    discount: number;
    count: number;
  },
];
type Status = 'loading' | 'success' | 'error';

export interface InitialStateType {
  items: CartItemsType[];
  status: Status | any;
  totalPrice: number;
}
