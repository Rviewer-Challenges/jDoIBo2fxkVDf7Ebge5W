import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.css']
})
export class CardNavigationComponent implements OnInit {

  @Input() titles: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
