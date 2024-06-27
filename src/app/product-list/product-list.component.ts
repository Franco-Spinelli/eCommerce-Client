import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Category, Product } from '../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  selectedRating: number = 0;
  selectedCategory: string;
  minPrice: any;
  maxPrice: any;
  constructor(private productService: ProductService) { }
  products: Product[];
  categories: Category[];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedProduct: any;
  currentPage = 1;
  productsPerPage = 12;
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
    this.currentPage = 1;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}