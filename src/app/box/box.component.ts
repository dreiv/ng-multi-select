import { Component, Input, HostBinding, ElementRef } from '@angular/core';

import { SelectionItem } from '../multi-selection';

@Component({
  selector: 'box',
  template: '<ng-content></ng-content>'
})
export class BoxComponent implements SelectionItem {
  @Input() id!: number;
  @HostBinding('class.active') active = false;

  constructor(private host: ElementRef) {}

  setActive(): void {
    this.active = true;
  }

  setInactive(): void {
    this.active = false;
  }

  isActive(): boolean {
    return this.active;
  }

  getElement(): Element {
    return this.host.nativeElement;
  }
}
