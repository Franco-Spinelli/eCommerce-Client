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
    selectedProduct: any;
    ngOnInit(): void {
      this.productService.getAllProducts().subscribe((data)=>{
        this.products = data;
        console.log(data);
      })
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
  
  }