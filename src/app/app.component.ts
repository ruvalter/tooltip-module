import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Accessible link to skip navigation or coming back to navigation on tab
  skipToMain: string;
  skipToHeader: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.skipToMain= `${this.router.url}home#mainLink`;
    this.skipToHeader= `${this.router.url}home#headerLink`;
  }
}
