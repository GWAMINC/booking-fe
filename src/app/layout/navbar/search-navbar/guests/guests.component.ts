import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent {
  adultCount: number = 0;
  childCount: number = 0;
  infantCount: number = 0;
  petCount: number = 0;

  increment(type: string) {
    switch(type) {
      case 'adults':
        this.adultCount++;
        break;
      case 'children':
        this.childCount++;
        break;
      case 'infants':
        this.infantCount++;
        break;
      case 'pets':
        this.petCount++;
        break;
    }
  }

  decrement(type: string) {
    switch(type) {
      case 'adults':
        if (this.adultCount > 0) this.adultCount--;
        break;
      case 'children':
        if (this.childCount > 0) this.childCount--;
        break;
      case 'infants':
        if (this.infantCount > 0) this.infantCount--;
        break;
      case 'pets':
        if (this.petCount > 0) this.petCount--;
        break;
    }
  }
}
