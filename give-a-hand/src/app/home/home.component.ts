import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Users} from "../common/users";
import {Event, Router} from "@angular/router";
import {TokenStorageService} from "../services/auth/token-storage.service";
import {AuthService} from "../services/auth/auth.service";
import {Role} from "../common/Role";
import {Profile} from "../common/profile";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [];
  isTokenExpired = false;
  roles: string[] = [];
  loggedUser: Users | undefined;
  showDialog : boolean = false;

  slideDisplay: boolean = true;
  userVisible: boolean = false;
  profileVisible: boolean = false;
  parentVisible: boolean = false;
  teacherVisible: boolean = false;
  commentVisible: boolean = false;
  postVisible: boolean = false;
  newsVisible: boolean = false;
  portfolioVisible: boolean = false;
  educationVisible: boolean = false;
  meetingVisible: boolean = false;
  messageVisible: boolean = false;
  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, public router: Router) { }

  ngOnInit(): void {
    this.isTokenExpired = this.authService.isTokenExpired(this.tokenStorageService.getAccessToken());

    if (!this.isTokenExpired) {
      let user = this.authService.getUser();
      if (user == null) {
        return;
      }

      this.roles = user.roles;
      this.loggedUser = user;

      this.setVisibleItems()
      let self = this;

      this.items = [{
        items: [
          {
            label:"Потребител",
            visible: this.userVisible,
            command:(_event: Event) =>{
              this.router.navigate(['user']).catch(console.error);
            }
          },
          {
            label: "Профил",
            visible: this.profileVisible,
            command:(_event: Event) =>{
              this.router.navigate(['profile']).catch(console.error);
            }
          },
          {
            label:"Родител",
            visible: this.parentVisible,
            command:(_event: Event) =>{
              this.router.navigate(['parent']).catch(console.error);
            }
          },
          {
            label:"Учител",
            visible: this.teacherVisible,
            command:(_event: Event) =>{
              this.router.navigate(['teacher']).catch(console.error);
            }
          },
          {
            label:"Пост",
            visible: this.postVisible,
            command:(_event: Event) =>{
              this.router.navigate(['post']).catch(console.error);
            }
          },
          {
            label:"Коментар",
            visible: this.commentVisible,
            command:(_event: Event) =>{
              this.router.navigate(['comment']).catch(console.error)
            }
          },
          {
            label:"Новини",
            visible: this.newsVisible,
            command:(_event: Event) =>{
              this.router.navigate(['news']).catch(console.error)
            }
          },
          {
            label:"Портфолио",
            visible: this.portfolioVisible,
            command:(_event: Event) =>{
              this.router.navigate(['portfolio']).catch(console.error)
            }
          },
          {
            label:"Образование",
            visible: this.educationVisible,
            command:(_event: Event) =>{
              this.router.navigate(['education']).catch(console.error)
            }
          },
          {
            label:"Разговор",
            visible: this.meetingVisible,
            command:(_event: Event) =>{
              this.router.navigate(['meeting']).catch(console.error)
            }
          },
          {
            label:"Чат",
            visible: this.messageVisible,
            command:(_event: Event) =>{
              this.router.navigate(['message']).catch(console.error)
            }
          },
        ]
      }];

    }
}

  private setVisibleItems() {
    this.postVisible = false;
    this.commentVisible = false;
    this.parentVisible = false;
    this.profileVisible = false;
    this.userVisible = false;
    this.teacherVisible = false;
    this.messageVisible = false;
    this.meetingVisible = false;
    this.educationVisible = false;
    this.portfolioVisible = false;
    this.newsVisible = false;
    if (this.roles == null || this.isTokenExpired) {
      this.slideDisplay = false;
      return;
    }

    let self = this;
    this.roles.forEach(function (role) {
    if (role === Role.ROLE_ADMIN){
      self.userVisible = true;
      self.profileVisible = true;
      self.teacherVisible = true;
      self.parentVisible = true;
      self.postVisible = true;
      self.commentVisible = true;
      self.newsVisible = true;
    } else if(role === Role.ROLE_TEACHER){
      self.newsVisible = true;
      self.portfolioVisible = true;
      self.messageVisible = true;
      self.educationVisible = true;
      self.meetingVisible = true;
    }

    })
  }
  logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }

  showInfoDialog() {
    this.showDialog = true;
  }
}

