import { NgFor, NgIf } from '@angular/common';
import { CountryService } from '../../../../admin/admin-sidebar/country/country.service';
import { LocationService } from '../../../../admin/admin-sidebar/location/location.service';
import { RegionService } from '../../../../admin/admin-sidebar/region/region.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anywhere',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule ],
  templateUrl: './anywhere.component.html',
  styleUrl: './anywhere.component.scss'
})
export class AnywhereComponent implements OnInit {
  regions: any[]=[];
  // countries: any[]=[];
  locations: any[]=[];
  searchTerm: string = '';
  constructor(
    private regionService: RegionService,
    private countryService:CountryService,
    private locationService:LocationService
  ){}

  ngOnInit(): void {
    // this.regionService.getRegions().subscribe(regions => {
    //   this.regions = regions;
    //   this.regions.forEach(region => {
    //     this.countryService.getCountriesByRegionId(region.id).subscribe(countries => {
    //       region.countries = countries;
    //       region.countries.forEach((country: any) => {
    //         this.locationService.getLocationsByCountryId(country.id).subscribe(locations => {
    //           country.locations = locations;
    //         });
    //       });
    //     });
    //   });
    // });
    this.loadLocations();
    this.loadRegions();

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
  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error fetching regions', error);
      }
    });
  }

  filteredLocations() {
    if (this.searchTerm.trim() === '') {
      return [];
    }
    return this.locations.filter(location =>
      location.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  topRegions() {
    return this.regions.slice(0, 6);
  }
}
