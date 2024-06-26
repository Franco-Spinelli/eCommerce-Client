import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService){}
    products: Product[];
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
  }