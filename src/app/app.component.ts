import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchContactComponent } from "./search-contact/search-contact.component";
import { SearchResultsComponent } from "./search-results/search-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchContactComponent, SearchResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contact-search';
}
