import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmEmailService} from "./confirm-email.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {
  hash: string = "";
  confirmationMessage: string = "Waiting for confirmation!";
  counter = 95;

  constructor(private activatedRoute: ActivatedRoute, private confirmEmailService: ConfirmEmailService,
              private router: Router) {
  }

  async confirmEmail() {
    console.log(await this.confirmEmailService.doConfirmation(this.hash, this.confirmationMessage));
  }

  ngOnInit(): void {
    debugger
    this.activatedRoute.queryParams
      .subscribe(({hash: hash}) => {
        this.hash = hash;
        console.log(this.hash);
        this.confirmEmail().then(() => {
          this.startCounter();
        }).catch((ex) => {
          console.log(ex);
        })
      });
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

  redirectLogin() {
    this.router.navigate(['login']).catch(console.error);
  }
}
