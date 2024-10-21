import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CreateRegionComponent } from './admin/admin-sidebar/region/create-region/create-region.component';
import { AttributeDashboardComponent } from './admin/admin-sidebar/attribute-dashboard/attribute-dashboard.component';
import { AttributeCategoryDashboardComponent } from './admin/admin-sidebar/attribute-category-dashboard/attribute-category-dashboard.component';
import { CategoryDashboardComponent } from './admin/admin-sidebar/category-dashboard/category-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // Các route khác của user
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'create-region', component: CreateRegionComponent },
      { path: 'attribute', component: AttributeDashboardComponent },
      { path: 'attribute-category', component: AttributeCategoryDashboardComponent },
      { path: 'category', component: CategoryDashboardComponent }
      // Các route khác của admin
    ]
  },
  { path: '**', redirectTo: '' }  // Redirect khi URL không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
