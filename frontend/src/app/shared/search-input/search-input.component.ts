import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  private textChanged: Subject<string> = new Subject<string>();
  @Input() findName: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.textChanged.pipe(debounceTime(500)).subscribe(title => this.emitText(title));
  }

  changeText(text: string) {
    this.textChanged.next(text.trim());
  }

  emitText(text: string) {
    this.search.emit(text.trim());
  }

}
