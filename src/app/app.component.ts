import { Component } from '@angular/core';
import { SearchContactComponent } from "./search-contact/search-contact.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ SearchContactComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contact-search';
}
