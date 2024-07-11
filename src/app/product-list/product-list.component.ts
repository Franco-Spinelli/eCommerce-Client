import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Cart, Category, Product } from '../models';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  //productList
  products: Product[];
  //filters
  selectedProduct: any;
  selectedRating: number = 0;
  selectedCategory: string;
  minPrice: any;
  maxPrice: any;
  categories: Category[];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortOrder: string; 
  //page
  currentPage = 1;
  productsPerPage = 12;
  //stock
  quantity: number = 1;
  maxQuantitytoBuy: number;
  constructor(private productService: ProductService, private cartService:CartService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }


  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  hideProductDetails() {
    this.selectedProduct = null;
  }
  getStockInfo(stock: number) {
    if (stock <= 0) {
      return { text: 'Out of stock', color: 'red' };
    }
    if (stock <= 10) {
      return { text: 'Low', color: 'orange' };
    }
    if (stock <= 20) {
      return { text: 'Medium', color: '#ffc107' };
    }
    return { text: 'High', color: 'green' };
  }
  searchProducts(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }
  previousPage() {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }
  getStarsArray(rate: number): number[] {
    const filledStars = Math.floor(rate);
    const halfStars = rate % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStars;

    return [
      ...Array(filledStars).fill(1),
      ...Array(halfStars).fill(0.5),
      ...Array(emptyStars).fill(0)
    ];
  }

  advancedSearch(): void {
    
    const searchTerm = this.searchTerm.toLowerCase();
    const selectedRating = this.selectedRating ? this.selectedRating : null;
    const selectedCategory = this.selectedCategory;
    const minPrice = this.minPrice !== undefined ? this.minPrice : null;
    const maxPrice = this.maxPrice !== undefined ? this.maxPrice : null;
    const tolerance = 0.1;
    this.filteredProducts = this.products.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(searchTerm);
      const ratingMatch = selectedRating !== null ? product.rating.rate < selectedRating : true;
      const categoryMatch = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
      const priceMatch = (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice);
      return titleMatch && ratingMatch && categoryMatch && priceMatch;
    });
    if (this.sortOrder) {
      this.filteredProducts = this.filteredProducts.sort((a, b) => {
        const finalPriceA = a.price - (a.price * (a.discount / 100));
        const finalPriceB = b.price - (b.price * (b.discount / 100));
      
        if (this.sortOrder === 'asc') {
          return finalPriceA - finalPriceB;
        } else {
          return finalPriceB - finalPriceA;
        }
      });
    }
    this.currentPage = 1;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  
  getQuantityMessage(): string {
    const maxQuantity = Math.floor(this.selectedProduct?.stock * 0.25);
    const available = this.selectedProduct?.stock - maxQuantity;
    return `(+${available} available)`;
  }
  getQuantityOptions() {
    // Calculate the maximum quantity to buy as 40% of the available stock, rounded down
    this.maxQuantitytoBuy = Math.floor(this.selectedProduct?.stock * 0.4);
  
    // Create an empty array to store the quantity options
    const options = [];
  
    // If the maximum quantity to buy is less than 1, set the maximum quantity to 1
    if (this.maxQuantitytoBuy < 1) {
      this.maxQuantitytoBuy = 1;
    }
    // If the maximum quantity to buy exceeds 20, cap it at 20
    if (this.maxQuantitytoBuy > 20) {
      this.maxQuantitytoBuy = 20;
    }
  
    // Fill the options array with values from 1 to the maximum quantity to buy
    for (let i = 1; i <= this.maxQuantitytoBuy; i++) {
      options.push(i);
    }
  
    // Return the array of quantity options
    return options;
  }
  addToCart(product: Product, quantity: number) {
    if (this.authService.isUserLoggedIn()) {
      this.cartService.addProductToCart(product.id, quantity).subscribe(
        (cart: Cart) => {
          console.log('Product added to cart');
          this.quantity = 1;
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          alert('Insufficient stock of the product');
          this.quantity = 1;
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}