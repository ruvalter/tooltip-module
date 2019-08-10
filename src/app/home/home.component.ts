import { ButtonType } from './../_shared/app-constants';
import { Button } from './../_shared/button.model';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('tooltipA') tooltipA;
  @ViewChild('tooltipB') tooltipB;

  buttons: Button[] = [
    {
      label: 'Tooltip A', 
      tooltip: 'Hi, I am button A!', 
      type: 'a'
    },
    {
      label: 'Tooltip B', 
      tooltip: 'Hey, I am B!', 
      type: 'b'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  buttonClicked(buttonInfo: ButtonType) {
    if(buttonInfo === ButtonType.a) {
      console.log('A has been called!');
    } else if(buttonInfo === ButtonType.b) {
      console.log('B has been called!');
    }
  }

}
