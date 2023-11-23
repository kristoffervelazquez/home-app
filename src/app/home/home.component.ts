import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from './../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="content">
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="button" type="button" (click)="filterResult(filter.value)">Search</button>
      </form>
      <section class="results">
        <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResult(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation.city.toLowerCase().includes(text.toLowerCase());
    })
  }
}
