import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() config: any;
  constructor() { }

  ngOnInit() {
  }
  
  onClickAction(tooltip) {
    // This is only for showing an possible custom action we might need to pass in
    this.config.click();

    // Brings up the tooltip
    tooltip.show();
  }

}
