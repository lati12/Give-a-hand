import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './admin/components/users/users.component';
import { ChatComponent } from './admin/components/chat/chat.component';
import { CommentComponent } from './admin/components/comment/comment.component';
import { EducationTypeComponent } from './admin/components/education-type/education-type.component';
import { ParentComponent } from './admin/components/parent/parent.component';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { PostComponent } from './admin/components/post/post.component';
import { RatingComponent } from './admin/components/rating/rating.component';
import { TeacherComponent } from './admin/components/teacher/teacher.component';
import { TeacherEducationComponent } from './admin/components/teacher-education/teacher-education.component';
import { RegisterComponent } from './admin/components/register/register.component';
import { ConfirmEmailComponent } from './admin/components/confirm-email/confirm-email.component';
import { LoginComponent } from './admin/components/login/login.component';
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";
import {ImageModule} from "primeng/image";
import {AuthInterceptor, authInterceptorProviders} from "./services/auth/auth.interceptor";
import {ConfirmationService, MessageService} from "primeng/api";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import { HomeComponent } from './home/home.component';
import {ToolbarModule} from "primeng/toolbar";
import {SplitterModule} from "primeng/splitter";
import {MenuModule} from "primeng/menu";
import {DialogModule} from "primeng/dialog";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {TabMenuModule} from "primeng/tabmenu";
import {MessageModule} from "primeng/message";
import {InputNumberModule} from "primeng/inputnumber";
import {RippleModule} from "primeng/ripple";
import {RatingModule} from "primeng/rating";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CalendarModule} from "primeng/calendar";
import { OverviewComponent } from './teacher/overview/overview.component';
import { MeetingComponent } from './parent/meeting/meeting.component';
import { MessagesComponent } from './parent/messages/messages.component';
import { PortfolioComponent } from './teacher/portfolio/portfolio.component';
import { EducationComponent } from './teacher/education/education.component';
import { MeetingsComponent } from './teacher/meetings/meetings.component';
import {CardModule} from "primeng/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {VirtualScrollerModule} from "primeng/virtualscroller";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ChatComponent,
    CommentComponent,
    EducationTypeComponent,
    ParentComponent,
    ProfileComponent,
    PostComponent,
    RatingComponent,
    TeacherComponent,
    TeacherEducationComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    LoginComponent,
    HomeComponent,
    OverviewComponent,
    MeetingComponent,
    MessagesComponent,
    PortfolioComponent,
    EducationComponent,
    MeetingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TabMenuModule,
    MessageModule,
    MenuModule,
    BrowserAnimationsModule,
    SplitterModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputNumberModule,
    ToastModule,
    FileUploadModule,
    RippleModule,
    InputTextModule,
    RatingModule,
    DialogModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    ImageModule,
    CheckboxModule,
    ProgressSpinnerModule,
    CalendarModule,
    CardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    VirtualScrollerModule
  ],
  providers: [authInterceptorProviders,
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
