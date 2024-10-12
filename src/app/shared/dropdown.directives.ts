import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive ({
  selector: '[appDropdown]'
})

//when true is attached and when false will be removed
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; //bind open class to isOpen

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
