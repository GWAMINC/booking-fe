import { CountryComponent } from './admin/admin-sidebar/country/country.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AttributeDashboardComponent } from './admin/admin-sidebar/attribute-dashboard/attribute-dashboard.component';
import { AttributeCategoryDashboardComponent } from './admin/admin-sidebar/attribute-category-dashboard/attribute-category-dashboard.component';
import { RegionComponent } from './admin/admin-sidebar/region/region.component';
import { CategoryDashboardComponent } from './admin/admin-sidebar/category-dashboard/category-dashboard.component';
import { PlaceTypeDashboardComponent } from './admin/admin-sidebar/place-type-dashboard/place-type-dashboard.component';
import { PropertyTypeComponent } from "./admin/admin-sidebar/property-type/property-type.component";
import { PropertyComponent } from "./admin/admin-sidebar/property/property.component";
import { ReviewComponent } from './admin/admin-sidebar/review/review.component';
import { BookingDashboardComponent } from './admin/admin-sidebar/booking-dashboard/booking-dashboard.component'; 
import { LocationComponent } from './admin/admin-sidebar/location/location.component';


export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // Các route khác của user
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'region', component: RegionComponent },
      { path: 'attribute', component: AttributeDashboardComponent },
      {
        path: 'attribute-category',
        component: AttributeCategoryDashboardComponent,
      },
      { path: 'country', component: CountryComponent },
      {path:'location',component:LocationComponent},
      { path: 'category', component: CategoryDashboardComponent },
      { path: 'place-type', component: PlaceTypeDashboardComponent },
      { path: 'property-type', component: PropertyTypeComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'bookings', component: BookingDashboardComponent } 
      // Các route khác của admin
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect khi URL không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
