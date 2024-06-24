import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService){}
    products: Product[];
    ngOnInit(): void {
      this.productService.getAllProducts().subscribe((data)=>{
        this.products = data;
        console.log(data);
      })
    }
  }