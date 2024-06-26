export interface Rating {
    rate: number;
    count: number;
  }

  export interface Product {
    id: number;
    title: string;
    price: number;
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