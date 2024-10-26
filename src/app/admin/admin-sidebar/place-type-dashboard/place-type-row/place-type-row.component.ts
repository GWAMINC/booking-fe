import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaceTypeDto } from '../../../../model/place-type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-place-type-row]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './place-type-row.component.html',
  styleUrl: './place-type-row.component.scss',
})
export class PlaceTypeRowComponent {
  @Input() placeType: PlaceTypeDto = {
    id: 0,
    typeName: '',
  };

  @Output() placeTypeDeleted = new EventEmitter<number>();
  @Output() placeTypeUpdated = new EventEmitter<PlaceTypeDto>();

  isEditing = false;
  oldTypeName = '';

  deletePlaceType() {
    this.placeTypeDeleted.emit(this.placeType.id);
  }

  editPlaceType() {
    this.isEditing = true;
    this.oldTypeName = this.placeType.typeName;
  }

  cancelEditPlaceType() {
    this.isEditing = false;
    this.placeType.typeName = this.oldTypeName;
  }

  updatePlaceType() {
    this.placeTypeUpdated.emit(this.placeType);
    this.isEditing = false;
  }
}
