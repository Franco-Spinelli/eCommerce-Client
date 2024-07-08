import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../models';
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
        }
      );
  }
  getProgressBarWidth(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return '20%';
      case OrderStatus.PROCESSING:
        return '40%';
      case OrderStatus.SHIPPED:
        return '80%';
      case OrderStatus.DELIVERED:
        return '100%';
      case OrderStatus.CANCELLED:
      case OrderStatus.RETURNED:
        return '0%';
      default:
        return '0%';
    }
  }
  
  getOrderStatusText(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Pending';
      case OrderStatus.PROCESSING:
        return 'Processing';
      case OrderStatus.SHIPPED:
        return 'Shipped';
      case OrderStatus.DELIVERED:
        return 'Delivered';
      case OrderStatus.CANCELLED:
        return 'Cancelled';
      case OrderStatus.RETURNED:
        return 'Returned';
      default:
        return 'Unknown';
    }
  }
}
