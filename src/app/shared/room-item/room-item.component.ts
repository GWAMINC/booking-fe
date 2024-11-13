import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {RoomItem} from './room-item.model';
import {PropertyService} from "../../admin/admin-sidebar/property/property.service";
import {Subscription} from "rxjs";
import {PropertyDto} from "../../model/property.model";
import {LocationService} from "../../admin/admin-sidebar/location/location.service";
import {LocationDTO} from "../../model/location.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-room-item',
  standalone: true,
  imports: [NgFor, DatePipe, CurrencyPipe, NgIf, RouterLink],
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  properties: PropertyDto[] = [];
  locations: LocationDTO[] = [];
  items: RoomItem[] = [];
  displayItems: RoomItem[] = [];

  constructor(private propertyService: PropertyService,
              private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Hàm load dữ liệu từ BE và chuyển đổi sang RoomItem
  loadProperties(): void {
    this.subscription.add(
      this.propertyService.getProperties().subscribe((properties: PropertyDto[]) => {
        this.properties = properties;
        this.mapPropertiesToRoomItems();
      })
    );
  }

  // Hàm map từ PropertyDto sang RoomItem
  private mapPropertiesToRoomItems(): void {
    this.items = this.properties.map((property: PropertyDto) => {
      let image: string='';

      // Dựa vào trạng thái phòng để gán hình ảnh
      if (property.id <= 4) {
        image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThfuyUYgiaW_yU_bcxS_CfB49dwSLPCvtEMoIQ8NSlpKBUxzRUxenuhMXT7FwVGgItE28&usqp=CAU';
      } else if (property.id>3&&property.id <= 8) {
        image = 'https://vcnet.vn/upload/20893/20191107/11e5cc90835af1ba2cdda015172e6896.jpg';
      } else if (property.id>8&&property.id <= 12) {
        image = 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720';
      }

      return {
        id: property.id,
        title: property.propertyName,
        location: property.location ? property.location.name : 'Unknown Location',
        price: property.nightlyPrice,
        description: property.description,
        image: image,
        date: new Date()
      };
    });

    console.log("items ", this.items);
    this.displayItems = this.items.slice(0, 12);
  }


  // Hàm để tải thêm sản phẩm
  loadMoreItems(): void {
    const currentLength = this.displayItems.length;
    const nextItems = this.items.slice(currentLength, currentLength + 3);
    this.displayItems = [...this.displayItems, ...nextItems];
  }
}
