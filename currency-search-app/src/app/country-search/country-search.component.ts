import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Country } from '../Model/CountryModel';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent {
  currencyCode: string = '';
  countries: Country[] = [];
  sorted : string[] = ["None", "By Alphabetical", "By Population(ascending)", "By Population(descending)"];
  option : string = 'None';
  isDropDownActive : boolean = false;
  isBttonDisabled : boolean = false;

  constructor(private currencyService: CurrencyService) {}

  check() {
    console.log(this.option);
    if(this.isDropDownActive){
      this.isDropDownActive = false;
    }
    else{
      this.isDropDownActive = true;
    }
  }

  searchCountries() {
    console.log("searched");
    this.isBttonDisabled = true;
    if (this.currencyCode) {
      this.currencyService.getCountriesByCurrency(this.currencyCode).subscribe(
        (data) => {
          this.sortCountries(data);
        },
        (error) => {
          console.error(error);
          this.countries = [];
        }
      );
    }
  }

  sortCountries(data: Country[]) {
    switch (this.option) {
      case 'By Alphabetical':
        this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'By Population(ascending)':
        this.countries = data.sort((a, b) => a.population - b.population);
        break;
      case 'By Population(descending)':
        this.countries = data.sort((a, b) => b.population - a.population);
        break;
      default:
        this.countries = data;
        break;
    }
  }
}
