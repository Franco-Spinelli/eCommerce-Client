import { Component, OnInit } from '@angular/core';
import { Order } from '../models';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  userOrders:Order[]
  constructor(private orderService: OrderService){}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(
        (orders: Order[]) => {
          this.userOrders = orders;
          console.log(this.userOrders);
          
        },
        (error) => {
          console.error('Error fetching orders:', error);
          // Handle error as needed
        }
      );
  }
}
