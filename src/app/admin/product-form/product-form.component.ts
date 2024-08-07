import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  product: Product;
  categories: Category[];
  isNewCategorySelected = false;
  productForm: FormGroup;
  categoryForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(private formBuilder: FormBuilder, private productService: ProductService ){}
  ngOnInit(): void {
    this.productForm =  this.formBuilder.group({
      id:'',
      title: [,[Validators.required]],
      price:  ['',[Validators.required]],
      description:  ['',[Validators.required]],
      image:  ['',[Validators.required]],
      category:  ['',[Validators.required]],
      stock: ['',[Validators.required]],
    });
    this.categoryForm =  this.formBuilder.group({
      newCategoryValue: ['',[Validators.required]]
    });
    
    this.getCategories();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        const base64String = reader.result?.toString().split(',')[1];
        this.productForm.patchValue({
          image: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }
  getCategories(){
    this.productService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }
  onSubmit() {
    if (this.productForm.get('category')?.value === 'newCategory' && this.categoryForm.get('newCategoryValue')?.value) {
      
      this.productForm.get('category')?.setValue(this.categoryForm.get('newCategoryValue')?.value);
    }
  
  
   
    this.productService.createProduct(this.productForm.value)
      .subscribe(
        (response) => {
          console.log(response);
         
        },
        (error) => {
          console.error( error);
         
        }
      );
  }
  
 
}
