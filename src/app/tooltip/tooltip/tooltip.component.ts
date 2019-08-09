import { Component, OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subscription, BehaviorSubject} from 'rxjs';
import { merge, tap, delay} from 'rxjs/operators';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {

  $isShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subscription: Subscription = new Subscription();
  constructor(private renderer: Renderer2, private elementRef:ElementRef) { 
    
  }

  ngOnInit() {
    const clickSource = fromEvent(document, 'click');
    const keyups = fromEvent(document, 'keyup');
    const keydowns = fromEvent(document, 'keydown');
    const scroll = fromEvent(window, 'scroll');

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
      ).subscribe();

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
          if(event.keyCode === 27) {
            this.$isShown.next(false);
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
    setTimeout(() => {
      this.$isShown.next(true)
    }, 0);
  }


}
