import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '@interfaces/login.interface';
import { AuthService } from '@services/auth.service';
import MatchPassword from '@utils/match-password.util';
import { RegexExpressions } from '@utils/regex.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() showLogin: EventEmitter<boolean> = new EventEmitter();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  private regexExpressions = RegexExpressions;

  public registerForm: FormGroup;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regexExpressions.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(this.regexExpressions.PASSWORD)]],
      password2: ['', [Validators.required]],
    },{
      validators: [
        MatchPassword.match('password', 'password2'),
      ]
    })
  }

  register() {
    if(this.registerForm.valid) {
      const data: ILogin = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      }
      this.authService.signIn(data).subscribe({
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

  changePage(): void{
    this.showLogin.emit(true);
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.registerForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.registerForm.get(field)?.hasError(error));
  }

}
