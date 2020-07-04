import { Directive, Self, ElementRef } from '@angular/core';

import { SelectionItem } from './multi-selection';
import { NgControl, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[multiSelectionCheckbox]'
})
export class MultiSelectionCheckboxDirective implements SelectionItem {
  constructor(
    @Self() private controlDirective: NgControl,
    private host: ElementRef
  ) {}

  get control(): AbstractControl | null {
    return this.controlDirective.control;
  }

  setActive(): void {
    this.control?.patchValue(true);
  }

  setInactive(): void {
    this.control?.patchValue(false);
  }

  isActive(): boolean {
    return !!this.control?.value;
  }

  getElement(): Element {
    return this.host.nativeElement;
  }
}
