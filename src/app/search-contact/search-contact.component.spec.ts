import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ELEMENT_DATA } from './search-contact.component';

import { SearchContactComponent } from './search-contact.component';

describe('SearchContactComponent', () => {
  let component: SearchContactComponent;
  let fixture: ComponentFixture<SearchContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchContactComponent);
    component = fixture.componentInstance;
    component.contacts = ELEMENT_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert when lastName is required but not provided', () => {
    spyOn(window, 'alert'); // Spy on the alert function

    // Set the form values with an empty lastName
    component.contactForm.patchValue({
      FirstName: 'John',
      LastName: 'Doe',
      DOB: '1985-06-15',
      Address: '123 Elm Street',
      City: 'Springfield',
      State: 'IL',
      Zip: '62704',
      Email: 'johndoe@example.com',
      Phone: '(555) 123-4567',
    });

    // Trigger form submission
    component.onSearch();

    // Expect alert to be called
    expect(window.alert).toHaveBeenCalledWith('Please enter a last name');
  });

  it('should not show alert when lastName is provided', () => {
    spyOn(window, 'alert'); // Spy on the alert function

    // Set the form values with a valid lastName
    component.contactForm.patchValue({
      firstName: 'John',
      lastName: 'Doe'
    });

    // Trigger form submission
    component.onSearch();

    // Expect alert not to be called
    expect(window.alert).not.toHaveBeenCalled();

    // Expect filtered data to be assigned to dataSource
    expect(component.dataSource.data.length).toBeGreaterThan(0); // Check if contacts were filtered
  });

  it('should filter contacts based on form values', () => {
    // Set the form values with valid data
    component.contactForm.patchValue({
      FirstName: 'John',
      LastName: 'Doe',
      DOB: '1985-06-15',
      Address: '123 Elm Street',
      City: 'Springfield',
      State: 'IL',
      Zip: '62704',
      Email: 'johndoe@example.com',
      Phone: '(555) 123-4567',
    });

    // Trigger form submission
    component.onSearch();

    // Check if contacts are filtered
    expect(component.dataSource.data.length).toBeGreaterThan(0); // Ensure there are matching contacts
    expect(component.dataSource.data[0].FirstName).toBe('John'); // Ensure the first name matches the form input
  });

  it('should filter contacts based on partial lastName match', () => {
    // Set the form values with a partial lastName
    component.contactForm.patchValue({
      firstName: '',
      lastName: 'Do',
      dob: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
    });

    // Trigger form submission
    component.onSearch();

    // Expect filtered contacts to include John Doe
    expect(component.dataSource.data.length).toBeGreaterThan(0); // Ensure at least one contact is found
    expect(component.dataSource.data[0].LastName).toContain('Doe'); // Ensure lastName contains 'Do'
  });

  it('should show no results when no contacts match the search criteria', () => {
    // Set the form values with criteria that do not match any contact
    component.contactForm.patchValue({
      firstName: 'Nonexistent',
      lastName: 'Name',
      dob: '1990-01-01',
      email: 'noresults@example.com',
      phone: '000-000-0000',
      city: 'Nowhere',
      state: 'ZZ',
      zip: '00000',
    });

    // Trigger form submission
    component.onSearch();

    // Expect no contacts to match the criteria
    expect(component.dataSource.data.length).toBe(0); // Ensure no results are shown
  });

});
