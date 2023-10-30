import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormSpace]'
})
export class FormSpaceDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement | HTMLTextAreaElement;
    const trimmedValue = inputElement.value.trim();
    this.renderer.setProperty(inputElement, 'value', trimmedValue);
  }

}
