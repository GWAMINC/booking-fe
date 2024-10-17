import { Component } from '@angular/core';
import {ChartComponent} from "../charts/charts.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
