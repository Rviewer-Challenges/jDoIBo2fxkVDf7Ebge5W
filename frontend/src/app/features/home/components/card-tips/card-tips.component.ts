import { Component, OnInit, Input } from '@angular/core';
import { Website } from '@models/website.model';

@Component({
  selector: 'app-card-tips',
  templateUrl: './card-tips.component.html',
  styleUrls: ['./card-tips.component.css']
})
export class CardTipsComponent implements OnInit {

  @Input() websites: Website[]

  constructor() { }

  ngOnInit(): void {
  }

}
