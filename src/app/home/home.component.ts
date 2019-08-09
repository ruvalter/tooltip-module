import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('tooltipA') tooltipA;
  @ViewChild('tooltipB') tooltipB;
  buttons = [
    {
      label: 'Tooltip A', 
      template: 'Hi, I am button A!', 
      click: () => console.log('A')
    },
    {
      label: 'Tooltip B', 
      template: 'Hey, I am B!', 
      click: () => console.log('B')
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
