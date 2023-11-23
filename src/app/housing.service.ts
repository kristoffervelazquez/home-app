import { HousingLocation } from './housing-location';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = "http://localhost:3000/locations"

  protected HousingLocationList: HousingLocation[] = []


  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url)
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`)
    return await data.json() ?? undefined;
  }

  async submitApplication(firstName: string, lastName: string, email: string, housingLocationId: number | undefined) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email} for housing location ${housingLocationId}`)
  }
}
