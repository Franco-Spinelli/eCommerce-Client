// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: LandingPageComponent},
  {path:'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path:'products', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}