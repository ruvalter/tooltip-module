import { TooltipModule } from './../tooltip/tooltip.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonsComponent, ButtonComponent],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [ButtonsComponent, ButtonComponent]
})
export class ButtonsModule { }
