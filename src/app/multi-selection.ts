import { QueryList } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SelectionItem {
  getElement: () => Element;
  isActive: () => boolean;
  setActive: () => void;
  setInactive: () => void;
}

export class MultiSelection<T extends SelectionItem> {
  constructor(private items: QueryList<T>) {
    this.init();
  }

  init(): void {
    const clicks$ = this.getListeners();
  }

  private getListeners(): any {
    return this.items.map((item, index) => {
      return fromEvent(item.getElement(), 'click').pipe(
        map((event: any) => {
          return {
            index,
            isShift: event.shiftKey,
            comp: item
          };
        })
      );
    });
  }
}
