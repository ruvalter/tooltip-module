import { KeyboardCodes } from './../../_shared/app-constants';
import { Component, OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subscription, BehaviorSubject} from 'rxjs';
import { merge, tap, delay} from 'rxjs/operators';
import { WindowEvents } from 'src/app/_shared/app-constants';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {

  $isShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subscription: Subscription = new Subscription();

  constructor(private renderer: Renderer2, private elementRef:ElementRef) { }

  ngOnInit() {
    // Add event listeners
    const clickSource = fromEvent(document, WindowEvents.click);
    const keyups = fromEvent(document, WindowEvents.keyup);
    const keydowns = fromEvent(document, WindowEvents.keydown);
    const scroll = fromEvent(window, WindowEvents.scroll);


    const tooltipActive = this.$isShown
      .pipe(
        delay(10),
        tap(val => {
          if(val) {
            this.renderer.addClass(this.elementRef.nativeElement, 'active');
          } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'active');
          }
        })
      );

    // This subscription listens to scroll event 
    // to decide whether should show above or below.    
    const scrollSource = scroll
      .pipe(
        tap(val => {
          const elPosition = this.elementRef.nativeElement.getBoundingClientRect().top;
          if(elPosition < 50) {
            this.renderer.addClass(this.elementRef.nativeElement, 'flip')
          } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'flip')
          }
      }))

    const clicks = clickSource
      .pipe(
        tap(event => {
          const clickedInside = this.elementRef.nativeElement.contains(event.target);
          if(clickedInside) {
              this.$isShown.next(true);
          } else {
              this.$isShown.next(false);;
          }
      }));

    const keyPresses = keyups
      .pipe(
        merge(keydowns),
        tap((event: KeyboardEvent) => {
          if(event.keyCode === KeyboardCodes.escape) {
            this.$isShown.next(false);
          }
      }));

    this.subscription.add(tooltipActive.subscribe())
    this.subscription.add(keyPresses.subscribe());
    this.subscription.add(clicks.subscribe());
    this.subscription.add(scrollSource.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show() {
    setTimeout(() => {
      // Waits for the click event action
      this.$isShown.next(true);
    }, 0);
  }


}
