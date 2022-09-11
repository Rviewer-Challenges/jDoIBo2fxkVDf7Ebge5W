import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() inUser: boolean = false;
  @Output() modify: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild('btnDrop') btnDrop: ElementRef;
  @ViewChild('dropdown') dropdown: ElementRef;
  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  clickButton(): void {
    this.dropdown.nativeElement.classList.toggle('show');
  }

  modifySavedWebsites() {
    this.hideDrop();
    if(!this.authService.isAuthenticated()) {
      return this.authService.showModalAuth('login');
    }
    this.modify.emit(true);
  }

  private hideDrop(): void {
    this.dropdown.nativeElement.classList.toggle('show');
    this.btnDrop.nativeElement.blur();
  }



}
