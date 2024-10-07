import { Component, OnDestroy } from '@angular/core';
import { RegionService } from './region.service';
import { RegionDto } from '../../model/region.model';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-region',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './create-region.component.html',
  styleUrls: ['./create-region.component.scss']
})
export class CreateRegionComponent implements OnDestroy {
  region: RegionDto = {
    name: '',
  };

  private subscription: Subscription = new Subscription();

  constructor(private regionService: RegionService) {}

  onSubmit() {
    this.subscription.add(
      this.regionService.createRegion(this.region).pipe(
        tap(response => {
          console.log('Region created successfully', response);
          alert('Region created successfully!');
        })
      ).subscribe({
        error: (error) => {
          console.error('Error creating region', error);
          alert('Error creating region');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
