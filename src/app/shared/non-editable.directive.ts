import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[readonlyTextarea]'
})
export class ReadonlyTextareaDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    event.preventDefault();
  }

  ngOnInit() {
    this.formatContent();
  }

  formatContent() {
    const text = this.el.nativeElement.value;
    const formattedText = text.replace(/#(Hi|first_name)#/g, '<span class="non-editable">$&</span>');
    this.el.nativeElement.innerHTML = formattedText;
  }
}
