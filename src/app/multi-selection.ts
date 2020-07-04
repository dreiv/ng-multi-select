import { QueryList } from '@angular/core';
import { fromEvent, Subscription, merge, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

export interface SelectionItem {
  getElement: () => Element;
  isActive: () => boolean;
  setActive: () => void;
  setInactive: () => void;
}

interface ClickInfo<T> {
  index: number;
  isShift: boolean | undefined;
  item: T;
}

export class MultiSelection<T extends SelectionItem> {
  private lastIndex!: number;
  private subscription!: Subscription;
  private activeChanges = new Subject();
  activeChanges$ = this.activeChanges.asObservable();

  private shouldSkip: (item: T) => boolean = () => false;

  constructor(private items: QueryList<T>) {
    this.init();
  }

  skipPredicate(cb: (item: T) => boolean): MultiSelection<T> {
    this.shouldSkip = cb;

    return this;
  }

  init(): void {
    const clicks$ = this.getListeners();

    this.subscription = clicks$.subscribe(
      ({ item, isShift, index }: ClickInfo<T>) => {
        if (isShift === false) {
          if (this.shouldSkip(item)) {
            return;
          }

          this.lastIndex = index;
          item.isActive() ? item.setInactive() : item.setActive();
        } else {
          const start = index;
          const end = this.lastIndex;
          const range = [Math.min(start, end), Math.max(start, end) + 1];
          const inRange = this.items.toArray().slice(...range);

          const isActive = item.isActive();
          for (const current of inRange) {
            if (this.shouldSkip(current)) {
              continue;
            }

            isActive ? current.setInactive() : current.setActive();
          }
        }

        this.activeChanges.next(this.getActives());
      }
    );
  }

  getActives(): SelectionItem[] {
    return this.items.filter((item) => item.isActive());
  }

  destroy(): void {
    this.subscription.unsubscribe();
  }

  private getListeners(): Observable<ClickInfo<T>> {
    return this.items.changes.pipe(
      startWith(this.items),
      switchMap((items: T[]) => {
        const clicks$ = items.map((item, index) => {
          return fromEvent(item.getElement(), 'click').pipe(
            map(
              (event: Partial<MouseEvent>): ClickInfo<T> => {
                return {
                  index,
                  isShift: event.shiftKey,
                  item
                };
              }
            )
          );
        });

        return merge(...clicks$);
      })
    );
  }
}
