import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() showRegister: EventEmitter<boolean> = new EventEmitter();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  public loginForm: FormGroup;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.loginForm = this.fb.group({
      email: ['marco24cruz8@gmail.com', Validators.required],
      password: ['Mysecret123$', Validators.required]
    });
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.closeModal.emit(true);
        },
        error: (e) => {
          if(e.status === 400) {
            const error = e.error;
            const message = error?.msg;
            this.message = message;
          }
        }
      })
    }
  }

  changePage(): void {
    this.showRegister.emit(false);
  }

}
