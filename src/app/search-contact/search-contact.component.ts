import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Validators } from '@angular/forms';
import { ContactModel } from '../models/contactModel';
import { ELEMENT_DATA } from '../../../public/mock-data/mock-data';

export class CustomPaginatorIntl extends MatPaginatorIntl {
  // Override method for range label to hide it

  override getRangeLabel = (page: number, pageSize: number, length: number): string => '';
}

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
  contacts: ContactModel[] = [];
  states = ['AK', 'CA', 'NY', 'TX', 'WA', 'ON', 'IL', 'WI', 'FL', 'MI'];

  // Define the paginator here
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource: MatTableDataSource<ContactModel> = new MatTableDataSource<ContactModel>();
   lastName: string ='';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [''],
      lastName: ['', Validators.required],
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

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.contacts.length;
  //   return numSelected === numRows;
  // }

  onRowSelected(row: ContactModel) {
    // Toggle the selection of the row
    this.selection.toggle(row);

    if (this.selection.isSelected(row)) {
      // If selected, populate the form with the selected contact's data
      this.contactForm.setValue({
        firstName: row.FirstName,
        lastName: row.LastName,
        dob: row.DOB,
        email: row.Email,
        phone: row.Phone,
        street: row.Address,  // Assuming Address is the street
        city: row.City,
        state: row.State,
        zip: row.Zip
      });
    } else {
      // If unselected, clear the form fields
      this.contactForm.reset();
    }
  }

  onSearch() {

    const formValues = this.contactForm.value;
    this.lastName = formValues.lastName;
    if (this.contactForm.invalid) {
      // Check if lastName is required and not filled
      if (this.contactForm.get('lastName')?.hasError('required')) {
        alert('Please enter a last name');
      }
      // Mark all fields as touched to trigger validation messages
      this.contactForm.markAllAsTouched();
      return; // Stop further execution if the form is invalid
    }
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

    if (this.contacts.length === 0) {
      alert('No contacts found');
      this.contactForm.reset();
    }

    // After the search, re-assign the data to dataSource to refresh the table
    this.dataSource.data = this.contacts;
    this.lastName = '';
  }
}
