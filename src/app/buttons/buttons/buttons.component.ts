import { ButtonType } from './../../_shared/app-constants';
import { Button } from './../../_shared/button.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() buttons: Button[];
  @Output() onButtonClick: EventEmitter<ButtonType> = new EventEmitter<ButtonType>();

  constructor() { }

  ngOnInit() {}

  buttonClick(buttonInfo: ButtonType): void {
    this.onButtonClick.emit(buttonInfo);
  }

}
