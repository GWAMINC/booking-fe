import { Component, ViewEncapsulation } from '@angular/core';
import { PlaceTypeDto } from '../../../model/place-type.model';
import { PlaceTypeRowComponent } from './place-type-row/place-type-row.component';
import { PlaceTypeService } from './place-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-place-type-dashboard',
  standalone: true,
  imports: [PlaceTypeRowComponent, FormsModule],
  templateUrl: './place-type-dashboard.component.html',
  styleUrl: './place-type-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PlaceTypeDashboardComponent {
  placeTypes!: PlaceTypeDto[];

  placeType: PlaceTypeDto = {
    id: 0,
    typeName: '',
  };

  constructor(private placeTypeService: PlaceTypeService) {}

  ngOnInit(): void {
    this.placeTypeService
      .getPlaceTypes()
      .subscribe((placeTypes) => (this.placeTypes = placeTypes));
  }

  addPlaceType() {
    if (this.placeType.typeName.trim().length === 0)
      alert('Please enter type name!');
    else {
      this.placeTypeService
        .addPlaceType(this.placeType)
        .subscribe((newPlaceType) => {
          this.placeTypes = [...this.placeTypes, newPlaceType];
        });
    }

    this.placeType.typeName = '';
  }

  deletePlaceType(id: number) {
    let confirmDelete: boolean = confirm('Confirm delete place type with?');

    if (confirmDelete) {
      this.placeTypeService.deletePlaceType(id).subscribe((res) => {
        console.log(res);
      });

      this.placeTypes = this.placeTypes.filter(
        (placeType) => placeType.id !== id
      );
    }

    this.placeTypeService.deletePlaceType(id);
  }

  updatePlaceType(newPlaceType: PlaceTypeDto) {
    let confirmUpdate: boolean = confirm('Confirm updating place type?');

    if (confirmUpdate) {
      this.placeTypeService
        .updatePlaceType(newPlaceType)
        .subscribe((res) => console.log(res));

      this.placeTypes = this.placeTypes.map((placeType) => {
        if (placeType.id === newPlaceType.id) return newPlaceType;
        return placeType;
      });
    }
  }
}
