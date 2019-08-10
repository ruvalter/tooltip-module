import { ButtonType } from './../../_shared/app-constants';
import { Button } from './../../_shared/button.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() config: any;
  @Output() buttonClick: EventEmitter<ButtonType> = new EventEmitter<ButtonType>();

  constructor() { }

  ngOnInit() {
  }

  onClickAction(tooltip) {
    // This is only for showing an possible custom action we might need to pass in
    this.buttonClick.emit(this.config.type);

    // Brings up the tooltip
    tooltip.show();
  }

}
