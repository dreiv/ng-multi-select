import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl
} from '@angular/forms';

import { BoxComponent } from './box/box.component';
import { MultiSelection } from './multi-selection';
import { MultiSelectionCheckboxDirective } from './multi-selection-checkbox.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(BoxComponent) boxes!: QueryList<BoxComponent>;
  @ViewChildren(MultiSelectionCheckboxDirective) checkboxes!: QueryList<
    MultiSelectionCheckboxDirective
  >;

  skillsList = [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
    { name: 'F' },
    { name: 'G' },
    { name: 'H' }
  ];

  group = new FormGroup({
    skills: new FormArray(this.skillsList.map(() => new FormControl(false)))
  });

  get skills(): any {
    return this.group.get('skills');
  }

  ngAfterViewInit(): void {
    const boxes = new MultiSelection<BoxComponent>(this.boxes);
    const checkboxes = new MultiSelection<MultiSelectionCheckboxDirective>(
      this.checkboxes
    );

    boxes.activeChanges$.subscribe(console.log);
    checkboxes.activeChanges$.subscribe(console.log);
  }
}
