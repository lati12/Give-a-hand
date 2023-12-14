import {Component, OnInit} from '@angular/core';
import {RegisterRequest} from "../../../common/register-request";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  counter = 95;
  hideRegFields = false;
  registerRequest = new RegisterRequest();
  email = new FormControl("", [Validators.email, Validators.required])
  password = new FormControl('', [Validators.required, Validators.minLength(3)])
  passwordConfirm = new FormControl('', [Validators.required])

  registerFormGroup: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  });
  constructor(private authService : AuthService,
              private router: Router,
              private notificationService : NotificationService) {
  }
  ngOnInit(): void {
  }
  redirectLogin() {
    this.router.navigate(['login']).catch(console.error);
  }

  async doRegister() {
    window.scroll(0, 0)
    if (this.email.value != null)
      this.registerRequest.email = this.email.value

    if (this.password.value != null)
      this.registerRequest.password = this.password.value;

    try {
      debugger
      await this.authService.register(this.registerRequest).then(() => {
        this.hideRegFields = true;
        this.startCounter()
      }).catch(ex => {
        this.notificationService.notification$.next({severity: 'error', summary: 'Моля попълнете данни', detail: ex.error});
      })
    } catch (ex: any) {
      console.log(ex);
    }
  }
  startCounter() {
    let interval = setInterval(() => {
      this.counter -= 20
      if(this.counter <= 0) {
        clearInterval(interval);
        this.redirectLogin();
      }
    }, 1000);
  }
}
