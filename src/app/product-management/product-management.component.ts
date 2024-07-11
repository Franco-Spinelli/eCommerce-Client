import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../models';
import { ProductService } from '../services/product/product.service';
import { CartService } from '../services/cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit{

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

   categoryForm: FormGroup;
   productForm: FormGroup;
   ngOnInit(): void {
    this.loadProducts();
  }
  constructor(private productService: ProductService, private cartService:CartService,private formBuilder: FormBuilder) {
    this.productForm =  this.formBuilder.group({
      id:'',
      title: ['',[Validators.required]],
      price:  ['',[Validators.required]],
      description:  ['',[Validators.required]],
      image:  ['',[Validators.required]],
      category:  ['',[Validators.required]],
      stock: ['',[Validators.required]],
    });
    this.categoryForm =  this.formBuilder.group({
      newCategoryValue: ['',[Validators.required]]
    });
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
  openModal(product: any) {
    this.selectedProduct = product;

    this.productForm.patchValue({
      id:this.selectedProduct.id,
      title: this.selectedProduct.title,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
      image: this.selectedProduct.image,
      category: this.selectedProduct.category,
      stock:  this.selectedProduct.stock,
    });
  }

  closeModal() {
    this.selectedProduct = null;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  update(){
    if (this.productForm.get('category')?.value === 'newCategory' && this.categoryForm.get('newCategoryValue')?.value) {
      
      this.productForm.get('category')?.setValue(this.categoryForm.get('newCategoryValue')?.value);
    }
    
    this.productService.updateProduct(this.productForm.value).subscribe((data)=>{
      console.log(data);
      
    })
  }
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe((data)=>{
      console.log(data);
      
    })
    }
}
