import { Component, OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subscription} from 'rxjs';
import { map, merge, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {

  isShown = false;
  subscription: Subscription = new Subscription();
  constructor(private renderer: Renderer2, private elementRef:ElementRef) { 
    
  }

  ngOnInit() {
    const clickSource = fromEvent(document, 'click');
    const keyups = fromEvent(document, 'keyup');
    const keydowns = fromEvent(document, 'keydown');
    const scroll = fromEvent(window, 'scroll');

    const scrollSource = scroll
      .pipe(tap(val => {
        const elPosition = this.elementRef.nativeElement.getBoundingClientRect().top;
        if(elPosition < 50) {
          this.renderer.addClass(this.elementRef.nativeElement, 'flip')
          console.log('below');
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, 'flip')
          console.log('above');
        }
      }))

    const clicks = clickSource
      .pipe(
        map(event => {
          const clickedInside = this.elementRef.nativeElement.contains(event.target);
          if(clickedInside) {
              this.isShown = true;
          } else {
              this.isShown = false;
          }
      }));

    const keyPresses = keyups
      .pipe(
        merge(keydowns),
        tap((event: KeyboardEvent) => {
          if(event.keyCode === 27) {
            this.isShown = false;
          }
      }));

    this.subscription.add(keyPresses.subscribe());
    this.subscription.add(clicks.subscribe());
    this.subscription.add(scrollSource.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show() {
    setTimeout(() => {this.isShown = true}, 0);
  }


}
