import {Component, SimpleChanges} from '@angular/core';
import {LocationDTO} from "../../../model/location.model";
import {LocationService} from "./location.service";
import {Subscription} from "rxjs";
import {NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CountryDto} from '../../../model/country.model';
import {RegionDto} from '../../../model/region.model';
import {RegionService} from "../region/region.service";
import {CountryService} from "../country/country.service";


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locations: LocationDTO[] = [];
  regions: RegionDto[] = [];
  countries: { [key: number]: CountryDto[] } = {};
  allCountries: CountryDto[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private locationService: LocationService,
    private regionService: RegionService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.getLocations();
    this.loadRegions();
    this.loadAllCountries();
  }

  getLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (response) => {
        this.locations = response.map((location: LocationDTO) => ({ ...location, isEditing: false, isUpdating: false }));
        this.populateCountriesForLocations();
      },
      error: (error) => {
        console.error('Error fetching locations', error);
      }
    });
  }

  loadRegions(): void {
    this.regionService.getRegions().subscribe({
      next: (data) => {
        this.regions = data;
      },
      error: (error) => {
        console.error('Error fetching regions', error);
      }
    });
  }

  loadAllCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.allCountries = data;
        this.populateCountriesForLocations();
      },
      error: (error) => {
        console.error('Error fetching countries', error);
      }
    });
  }

  populateCountriesForLocations(): void {
    if (this.locations.length && this.allCountries.length) {
      this.locations.forEach((location, index) => {
        this.countries[index] = this.allCountries.filter(country => country.region.id === location.country.region.id);
      });
    }
  }

  onRegionChange(regionId: number, index: number): void {
    console.log(this.allCountries)
    this.countries[index] = this.allCountries.filter(country => country.region.id == regionId);
  }

  addLocation() {
    this.locations.push({
      id: 0,
      name: '',
      country: {id: 0, name: '', region: {id: 0, name: ''}},
      isEditing: true,
      isUpdating: false
    });
  }

  createLocation(index: number): void {
    if (this.locations[index].name.trim() === '') {
      alert('Location name cannot be empty');
      return;
    }
    this.subscription.add(
      this.locationService.createLocation(this.locations[index]).subscribe({
        next: (response) => {
          this.locations[index] = response;
          this.locations[index].isEditing = false;
          alert("Tạo thành công!")
        },
        error: (error) => {
          console.error('Error creating location', error);
          alert(error.message)
        }
      })
    );
  }

  updateLocation(index: number): void {
    this.locations[index].isEditing = true;
    this.locations[index].isUpdating=true;
  }

  saveLocation(index: number): void {
    if (this.locations[index].name.trim() === '') {
      alert('Location name cannot be empty');
      return;
    }
    this.subscription.add(
      this.locationService.updateLocation(this.locations[index].id, this.locations[index]).subscribe({
        next: (response) => {
          this.locations[index].isUpdating = false;
          this.locations[index].isEditing = false;
          alert("Sửa thành công!");
        },
        error: (error) => {
          console.error('Error updating location', error);
          alert(error.message)
        }
      })
    );
  }

  deleteLocation(index: number): void {
    this.subscription.add(
      this.locationService.deleteLocation(this.locations[index].id).subscribe({
        next: () => {
          this.locations.splice(index, 1);
          alert("Xóa thành công!")
        },
        error: (error) => {
          console.error('Error deleting location', error);
          alert(error.message)
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
