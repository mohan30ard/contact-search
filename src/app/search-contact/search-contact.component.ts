import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import flatpickr from 'flatpickr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css'
})
export class SearchContactComponent {



  contactForm: FormGroup;
  contacts: {
    name: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string; }[] = [];
  states = ['AK', 'CA', 'NY', 'TX', 'WA']; // Example states

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      email: [''],
      phone: [''],
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    });
  }

  onSearch() {
    // Mock data for demonstration
    this.contacts = [
      {
        name: 'Rajeev Sharma',
        dob: '1986-02-12',
        address: '1001 NOBLE ST STE 1',
        city: 'FAIRBANKS',
        state: 'AK',
        zip: '99701',
        email: 'rajeevsharma@gmail.com',
        phone: '2582528582'
      },
      {
        name: 'Eesha Sharma',
        dob: '1995-07-04',
        address: '4821 RIDGE TOP CIR',
        city: 'ANCHORAGE',
        state: 'AK',
        zip: '99508',
        email: 'eeshasharma@gmail.com',
        phone: '2582528582'
      }
    ];
  }

}
