import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[disableCursor]',
})
export class DisableCursorDirective {
  constructor(private el: ElementRef) {}
  @Input() disableCursor = false;
  @HostListener('mouseenter') onMouseEnter() {
    if (this.disableCursor) {
      this.el.nativeElement.style.cursor = 'not-allowed';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.disableCursor) {
      this.el.nativeElement.style.cursor = 'default';
    }
  }
}