import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tooltip';
  
  skipLinkPath: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.skipLinkPath = `${this.router.url}home#content`;
  }
}
