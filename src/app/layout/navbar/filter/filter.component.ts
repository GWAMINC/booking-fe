import { Component } from '@angular/core';
import { FilterService } from './filter.service';
import { NgFor , NgIf } from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor, NgIf ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  attributes: any = [];
  selectedAttributes: string[] = [];
  isModalOpen = true;
  constructor(private filterService : FilterService) {}

  ngOnInit() {
    this.fetchAttributes();
  }

  fetchAttributes() {
    this.filterService.getAttributes().subscribe((data: any) => {
      this.attributes = data;
    });
  }

  toggleAttribute(attribute: string) {
    const index = this.selectedAttributes.indexOf(attribute);
    if (index > -1) {
      this.selectedAttributes.splice(index, 1);
    } else {
      this.selectedAttributes.push(attribute);
    }
  }

  isSelected(attribute: string): boolean {
    return this.selectedAttributes.includes(attribute);
  }

  clearSelection() {
    this.selectedAttributes = [];
  }

  showSelectedAttributes() {
    console.log(this.selectedAttributes);
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
