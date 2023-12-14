import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./admin/components/login/login.component";
import {RegisterComponent} from "./admin/components/register/register.component";
import {ConfirmEmailComponent} from "./admin/components/confirm-email/confirm-email.component";
import {UsersComponent} from "./admin/components/users/users.component";
import {AuthGuard} from "./services/auth/auth-guard.service";
import {Role} from "./common/Role";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./admin/components/profile/profile.component";
import {PostComponent} from "./admin/components/post/post.component";
import {CommentComponent} from "./admin/components/comment/comment.component";
import {ParentComponent} from "./admin/components/parent/parent.component";
import {TeacherComponent} from "./admin/components/teacher/teacher.component";
import {EducationComponent} from "./teacher/education/education.component";
import {MeetingsComponent} from "./teacher/meetings/meetings.component";
import {PortfolioComponent} from "./teacher/portfolio/portfolio.component";
import {MessagesComponent} from "./teacher/messages/messages.component";
import {OverviewComponent} from "./teacher/overview/overview.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'confirm-email', component: ConfirmEmailComponent},
  {
    path: '',component: HomeComponent,
    children: [
      {path: '', component: ProfileComponent, pathMatch: 'full'},
      {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'post', component: PostComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'comment', component: CommentComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'parent', component: ParentComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'teacher', component: TeacherComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'user', component: UsersComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_ADMIN]
          }
      },
      {
        path: 'education', component: EducationComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_TEACHER]
          }
      },
      {
        path: 'meeting', component: MeetingsComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_TEACHER]
          }
      },
      {
        path: 'news', component: OverviewComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_TEACHER, Role.ROLE_ADMIN]
          }
      },
      {
        path: 'portfolio', component: PortfolioComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_TEACHER]
          }
      },
      {
        path: 'message', component: MessagesComponent,
        canActivate: [AuthGuard],
        data:
          {
            roles: [Role.ROLE_TEACHER]
          }
      },
    ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
