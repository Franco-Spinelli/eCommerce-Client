import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order, OrderStatus } from '../../models';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrl: './orders-dashboard.component.css'
})
export class OrdersDashboardComponent  implements OnInit{
  myOrders:Order[]
  filteredOrders: Order[] = [];
  searchTerm = '';
  selectedOrder: any;
  currentPage = 1;
  pageSize = 8; 
  totalPages = 0;
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderService.getAllOrders().subscribe((data)=>{
      this.myOrders = data;
      this.filteredOrders =  this.myOrders;
      this.totalPages = Math.ceil(this.myOrders.length / this.pageSize);
    })
  }
  updateOrderStatus(order: any): void {
    this.orderService.changeOrderStatus(order.id, order.status).subscribe((response: any) => {
      console.log(`Order status updated to ${order.status}`);
    });
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
  searchOrders(): void {
    this.filteredOrders = this.myOrders.filter(order => {
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

}
