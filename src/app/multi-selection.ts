import { QueryList } from '@angular/core';
import { fromEvent, Subscription, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SelectionItem {
  getElement: () => Element;
  isActive: () => boolean;
  setActive: () => void;
  setInactive: () => void;
}

interface ClickInfo {
  index: number;
  isShift: boolean | undefined;
  item: SelectionItem;
}

export class MultiSelection<T extends SelectionItem> {
  private subscription!: Subscription;
  private lastIndex!: number;

  constructor(private items: QueryList<T>) {
    this.init();
  }

  init(): void {
    const clicks$ = this.getListeners();

    this.subscription = merge(...clicks$).subscribe(
      ({ item, isShift, index }: ClickInfo) => {
        if (isShift === false) {
          item.isActive() ? item.setInactive() : item.setActive();

          this.lastIndex = index;
        } else {
          const start = index;
          const end = this.lastIndex;
          const range = [Math.min(start, end), Math.max(start, end) + 1];
          const inRange = this.items.toArray().slice(...range);

          const isActive = item.isActive();
          inRange.forEach((current) =>
            isActive ? current.setInactive() : current.setActive()
          );
        }
      }
    );
  }

  private getListeners(): Observable<ClickInfo>[] {
    return this.items.map((item, index) =>
      fromEvent(item.getElement(), 'click').pipe(
        map(
          (event: Partial<MouseEvent>): ClickInfo => ({
            index,
            isShift: event.shiftKey,
            item
          })
        )
      )
    );
  }
}
