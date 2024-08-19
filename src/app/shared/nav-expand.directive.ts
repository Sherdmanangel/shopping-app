import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appNavExpand]'
})
export class NavExpandDirective {

  @HostBinding('class.navbar-expand') isOpen=false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
