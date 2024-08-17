export interface Rating {
    rate: number;
    count: number;
  }

  export interface Product {
    id: number;
    title: string;
    price: number;
    discount:number;
    discountPrice:any;
    description: string;
    rating: Rating;
    image: string;
    category: string;
    stock: number;
  }
  export interface Category {
    id: number;
    name: string;
  }
  export interface Address {
    id: number;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    street: string;
    number: string;
    floor: string;
  }

  export interface CartItem {
    id: number,
    quantity: number;
    title: string;
    img:string;
    price: number;
    totalPriceItem: number;
  }
  export interface Cart {
    customer: string;
    cartItems: Set<CartItem>;
    totalItems: number;
    totalPrice: number;
  }
  export interface OrderItem {
    id: number;
    quantity: number;
    product: Product;
    totalPrice: number;
  }
  export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    RETURNED = 'RETURNED'
  }
  export interface Order {
    id: number;
    code:string;
    hasDelivery: boolean;
    deliveryAddress: Address;
    date: Date;
    totalItems: number;
    totalPrice: number;
    orderItems: Set<OrderItem>;
    customer: string;
    status: OrderStatus;
  }