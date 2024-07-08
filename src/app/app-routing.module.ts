// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from '../auth.guard';
import { OrderComponent } from './order/order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { DealsComponent } from './deals/deals.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';


const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: LandingPageComponent},
  {path:'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path:'products', component: ProductListComponent},
  {path:'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path:'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path:'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path:'deals', component: DealsComponent},
  {path:'order-dashboard', component: OrdersDashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}