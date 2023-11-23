import { HousingService } from './../housing.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from './../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article >
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">
      <section class="listing-heading">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">
          About this location
        </h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2>Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="onSubmit()">
          <label for="firstName">First name</label>
          <input type="text" id="firstName" formControlName="firstName">
          <label for="lastName">Last name</label>
          <input type="text" id="lastName" formControlName="lastName">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">
          <button type="submit">Submit</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  HousingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.HousingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  onSubmit() {
    this.HousingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.housingLocation?.id)
  }
}
