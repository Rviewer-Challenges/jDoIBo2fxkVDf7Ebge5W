import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-more-features',
  templateUrl: './more-features.component.html',
  styleUrls: ['./more-features.component.css']
})
export class MoreFeaturesComponent implements OnInit {
  @Output() changeView: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  change(value: boolean): void {
    this.changeView.emit(value);
  }

}
