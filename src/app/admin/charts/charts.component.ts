import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: 'charts.component.html',
  styleUrls: ['charts.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('pieChart', { static: false }) pieChartRef: ElementRef | undefined;
  @ViewChild('barChart', { static: false }) barChartRef: ElementRef | undefined;
  @ViewChild('lineChart', { static: false }) lineChartRef: ElementRef | undefined;
  @ViewChild('radarChart', { static: false }) radarChartRef: ElementRef | undefined;
  @ViewChild('doughnutChart', { static: false }) doughnutChartRef: ElementRef | undefined;

  constructor() {
    Chart.register(...registerables); // Đảm bảo các phần tử của Chart.js được đăng ký
  }

  ngAfterViewInit(): void {
    this.createPieChart();
    this.createBarChart();
    this.createLineChart();
    this.createRadarChart();
    this.createDoughnutChart();
  }

  createPieChart(): void {
    const ctx = (this.pieChartRef?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Online', 'Offline'],
          datasets: [{
            label: 'Customer Status',
            data: [200, 50],
            backgroundColor: ['#FF6384', '#36A2EB'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  createBarChart(): void {
    const ctx = (this.barChartRef?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Bookings per Month',
            data: [150, 200, 180, 220, 300, 250],
            backgroundColor: '#FF9F40',
            borderColor: '#FF9F40',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  createLineChart(): void {
    const ctx = (this.lineChartRef?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue over Time',
            data: [5000, 10000, 8000, 12000, 15000, 17000],
            fill: false,
            borderColor: '#4BC0C0',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  createRadarChart(): void {
    const ctx = (this.radarChartRef?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Ease of Use', 'Features', 'Support', 'Pricing', 'Satisfaction'],
          datasets: [{
            label: 'Customer Feedback',
            data: [8, 7, 9, 6, 7],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }

  createDoughnutChart(): void {
    const ctx = (this.doughnutChartRef?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Available', 'Booked', 'Maintenance'],
          datasets: [{
            label: 'Room Status',
            data: [30, 10, 5],
            backgroundColor: ['#FFCD56', '#36A2EB', '#FF9F40'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }
}
