import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { BoxComponent } from './box/box.component';
import { MultiSelection } from './multi-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(BoxComponent) boxes!: QueryList<BoxComponent>;

  ngAfterViewInit(): void {
    const boxes = new MultiSelection<BoxComponent>(this.boxes);
  }
}
