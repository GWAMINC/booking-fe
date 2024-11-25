import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {NgIf, NgFor, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PropertyService} from "../../admin/admin-sidebar/property/property.service";
import {PropertyDto} from "../../model/property.model";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import properties = _default.defaults.animations.numbers.properties;
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-room-info',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, CommonModule, NgFor],
  templateUrl: './room-info.component.html',
  styleUrl: './room-info.component.scss'
})
export class RoomInfoComponent implements OnInit, OnDestroy {



  private subscription: Subscription = new Subscription();
  property!: PropertyDto;
  id!: number;
  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Lấy id từ URL
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Chuyển id sang kiểu number
    console.log('ID from URL:', id);  // Thêm log này để kiểm tra giá trị của id

    if (id) {
      this.getPropertyById(id);  // Gọi hàm getPropertyById với id lấy được
    } else {
      console.error('Invalid ID');
    }
  }



  getPropertyById(id: number) {
    this.subscription.add(
      this.propertyService.getPropertyById(id)
        .subscribe(
          (property: PropertyDto) => {
            // Lưu thông tin property vào biến của component
            this.property = property;  // Cập nhật biến property trong component
            console.log('Fetched Property:', this.property);
          },
          (error) => {
            // Xử lý lỗi nếu có
            console.error('Error fetching property details:', error);
          }
        )
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }





}
