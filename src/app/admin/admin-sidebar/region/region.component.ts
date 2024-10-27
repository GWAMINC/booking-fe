// src/app/region/region.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegionService } from './region.service';
import { RegionDto } from '../../../model/region.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule ],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {
  regions: RegionDto[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.getRegions();
  }

  getRegions() {
    this.subscription.add(
      this.regionService.getRegions().subscribe({
        next: (response) => {
          this.regions = response.map(region => ({ ...region, isEditing: false, isUpdating: false }));
        },
        error: (error) => {
          console.error('Error fetching regions', error);
        }
      })
    );
  }

  addRegion() {
    this.regions.push({ id: 0, name: '', isEditing: true, isUpdating: false });
  }

  createRegion(index: number) {
    if (this.regions[index].name.trim() === '') {
      alert('Tên vùng không được để trống');
      return;
    }
    this.subscription.add(
      this.regionService.createRegion(this.regions[index])
        .subscribe({
        next: (response) => {
          this.regions[index] = response;
          this.regions[index].isEditing = false;
        },
        error: (error) => {
          console.error('Error creating region', error);
        }
      })
    );
  }

  updateRegion(index: number) {
    this.regions[index].isEditing = true;
    this.regions[index].isUpdating = true;
  }

  saveRegion(index: number) {
    if (this.regions[index].name.trim() === '') {
      alert('Tên vùng không được để trống');
      return;
    }
    this.subscription.add(
      this.regionService.updateRegion(this.regions[index].id,
        this.regions[index]).subscribe({
        next: (response) => {
          this.regions[index].isEditing = false;
          this.regions[index].isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating region', error);
        }
      })
    );
  }

  deleteRegion(index: number) {
    this.subscription.add(
      this.regionService.deleteRegion(this.regions[index].id).subscribe({
        next: () => {
          this.regions.splice(index, 1);
        },
        error: (error) => {
          console.error('Error deleting region', error);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
