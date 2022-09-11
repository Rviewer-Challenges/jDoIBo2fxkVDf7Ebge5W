import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '@models/resource.model';

@Component({
  selector: 'app-card-resources',
  templateUrl: './card-resources.component.html',
  styleUrls: ['./card-resources.component.css']
})
export class CardResourcesComponent implements OnInit {

  @Input() resources: Resource[];

  constructor() { }

  ngOnInit(): void { }

}
