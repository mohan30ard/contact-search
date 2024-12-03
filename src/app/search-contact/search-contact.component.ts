import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

export interface MockData {
  FirstName: string;
  LastName: string;
  DOB: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;
  Email: string;
  Phone: string;
}

export class CustomPaginatorIntl extends MatPaginatorIntl {
  // Override method for range label to hide it
  
  override getRangeLabel = (page: number, pageSize: number, length: number): string => '';
}

const ELEMENT_DATA: MockData[] = [
  {
    FirstName: 'John',
    LastName: 'Doe',
    DOB: '1985-06-15',
    Address: '123 Elm Street',
    City: 'Springfield',
    State: 'IL',
    Zip: '62704',
    Email: 'johndoe@example.com',
    Phone: '(555) 123-4567',
  },
  {
    FirstName: 'Jane',
    LastName: 'Smith',
    DOB: '1990-08-22',
    Address: '456 Oak Avenue',
    City: 'Madison',
    State: 'WI',
    Zip: '53703',
    Email: 'janesmith@example.com',
    Phone: '(555) 987-6543',
  },
  {
    FirstName: 'Bob',
    LastName: 'Johnson',
    DOB: '1978-12-05',
    Address: '789 Pine Road',
    City: 'Chicago',
    State: 'IL',
    Zip: '60614',
    Email: 'bobjohnson@example.com',
    Phone: '(555) 654-3210',
  }
];

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css'
})
export class SearchContactComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'Name', 'DOB', 'Address', 'City', 'State', 'Zip', 'Email', 'Phone'];
  contactForm: FormGroup;
  contacts: MockData[] = [];
  states = ['AK', 'CA', 'NY', 'TX', 'WA'];

  // Define the paginator here
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource: MatTableDataSource<MockData> = new MatTableDataSource<MockData>();

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

  ngOnInit() {
    // Assign the contacts data to the MatTableDataSource
    this.dataSource.data = this.contacts;
  }

  ngAfterViewInit() {
    // After view initialization, assign paginator to the dataSource
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  selection = new SelectionModel<any>(true, []);

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.contacts.forEach(row => this.selection.select(row));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contacts.length;
    return numSelected === numRows;
  }

  onSearch() {
    console.log("onSearch Reached");
    console.log(this.contactForm.value);
    const formValues = this.contactForm.value;
    // Filter based on form values
    this.contacts = ELEMENT_DATA.filter(contact => {
      return (!formValues.firstName || contact.FirstName.includes(formValues.firstName)) &&
        (!formValues.lastName || contact.LastName.includes(formValues.lastName)) &&
        (!formValues.dob || contact.DOB === formValues.dob) &&
        (!formValues.email || contact.Email.includes(formValues.email)) &&
        (!formValues.phone || contact.Phone.includes(formValues.phone)) &&
        (!formValues.city || contact.City.includes(formValues.city)) &&
        (!formValues.state || contact.State === formValues.state) &&
        (!formValues.zip || contact.Zip === formValues.zip);
    });

    // After the search, re-assign the data to dataSource to refresh the table
    this.dataSource.data = this.contacts;
  }
}
