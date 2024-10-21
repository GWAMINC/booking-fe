// src/app/country/country.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from './country.service';
import { CountryDto } from '../../../model/country.model';
import { RegionDto } from '../../../model/region.model'; 
import { RegionService } from '../region/region.service'; 
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule ],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: CountryDto[] = [];
  regions: RegionDto[] = [];
  
  private subscription: Subscription = new Subscription();

  constructor(private countryService: CountryService, private regionService: RegionService) {}

  ngOnInit() {
    this.getCountries();
    this.getRegions(); 
  }

  getCountries() {
    this.subscription.add(
      this.countryService.getCountries().subscribe({
        next: (response) => {
          this.countries = response.map((country:CountryDto) => ({ ...country, isEditing: false, isUpdating: false }));
        },
        error: (error) => {
          console.error('Error fetching countries', error);
        }
      })
    );
  }

  getRegions() {
    this.subscription.add(
      this.regionService.getRegions().subscribe({
        next: (response) => {
          this.regions = response.map((region:any)=>({
            ...region,
            isEditing: false,
            isUpdating: false
          }));
        },
        error: (error) => {
          console.error('Error fetching regions', error);
        }
      })
    );
  }

  addCountry() {
    this.countries.push({ id: 0, name: '', region: { id: 0, name: '' }, isEditing: true, isUpdating: false });
  }

  createCountry(index: number) {
    if (this.countries[index].name.trim() === '') {
      alert('Tên quốc gia không được để trống');
      return;
    }
    this.subscription.add(
      this.countryService.createCountry(this.countries[index]).subscribe({
        next: (response) => {
          this.countries[index] = response;
          this.countries[index].isEditing = false;
        },
        error: (error) => {
          console.error('Error creating country', error);
        }
      })
    );
  }

  updateCountry(index: number) {
    this.countries[index].isEditing = true;
    this.countries[index].isUpdating = true;
  }

  saveCountry(index: number) {
    if (this.countries[index].name.trim() === '') {
      alert('Tên quốc gia không được để trống');
      return;
    }
    this.subscription.add(
      this.countryService.updateCountry(this.countries[index].id, this.countries[index]).subscribe({
        next: (response) => {
          this.countries[index].isEditing = false;
          this.countries[index].isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating country', error);
        }
      })
    );
  }

  deleteCountry(index: number) {
    this.subscription.add(
      this.countryService.deleteCountry(this.countries[index].id).subscribe({
        next: () => {
          this.countries.splice(index, 1);
        },
        error: (error) => {
          console.error('Error deleting country', error);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
