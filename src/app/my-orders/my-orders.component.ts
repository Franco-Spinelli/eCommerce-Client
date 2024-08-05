import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../models';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  userOrders:Order[];
  filteredOrders: Order[] = [];
  searchTerm = '';
  selectedOrder: any;
  currentPage = 1;
  pageSize = 8; 
  totalPages = 0;
  constructor(private orderService: OrderService){}
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(
        (orders: Order[]) => {
          this.userOrders = orders;
          this.filteredOrders =  this.userOrders;
          this.totalPages = Math.ceil(this.userOrders.length / this.pageSize);
          
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
  searchOrders(): void {
    this.filteredOrders = this.userOrders.filter(order => {
      const searchTermLower = this.searchTerm.toLowerCase();
      return (
        order.id.toString().toLowerCase().includes(searchTermLower) ||
        order.code.toLowerCase().includes(searchTermLower) ||
        order.customer.toLowerCase().includes(searchTermLower)
      );
    });
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
    this.currentPage = 1;
  }

  openModal(order: any) {
    this.selectedOrder = order;
  }

  closeModal() {
    this.selectedOrder = null;
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}
