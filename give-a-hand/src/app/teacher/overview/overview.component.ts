import { Component, OnInit } from '@angular/core';
import {Post} from "../../common/post";
import {PostService} from "../../services/post.service";
import {NotificationService} from "../../services/notification.service";
import {ConfirmationService} from "primeng/api";
import {Users} from "../../common/users";
import {Profile} from "../../common/profile";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  dialog : boolean = false;
  displayInfoDialog : boolean = false;

  public posts : Post[] = [];
  public post : Post = new Post();

  submitted : boolean = false;
  date: Date | undefined;
  currentUpload: any;
  constructor(private postService : PostService
    , private notificationService: NotificationService
    , private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    let user = new Users();
    user.email = "test@abv.bg";
    user.type = 1;
    let profile = new Profile();
    profile.name = "Ivan";
    profile.last_name = "Petrov";
    profile.users_id = user;

    let post1 = new Post();
    post1.users_id = user;
    post1.title = "Post 1";
    post1.description = "Test description of post";

    let post2 = new Post();
    post2.users_id = user;
    post2.title = "Post 2";
    post2.description = "Test description of post";

    let post3 = new Post();
    post3.users_id = user;
    post3.title = "Post 3";
    post3.description = "Test description of post";

    this.posts.push(post1);
    this.posts.push(post2);
    this.posts.push(post3);

    /*this.postService.getAll().subscribe(data =>{
      this.posts = data
    });*/
  }

  openNewDialog()  {
    this.post = new Post();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog(){
    this.submitted = false;
    this.dialog = false;
  }

  OpenEditDialog(post : Post){
    this.post = post;
    this.dialog = true;
  }

  showInfoDialog() {
    this.displayInfoDialog = true;
  }

  save() {
    this.submitted = true;
    debugger
    this.postService.save(this.post).then(() => {
      this.postService.getAll().subscribe(data => {
        this.posts = data;
        this.dialog = false;
        this.post = new Post();
        console.log("Done with save");
      });
    }).catch(ex=>{
      this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
    })
  }

  delete(post : Post){
    this.confirmationService.confirm({
      message: 'Наистина ли искате да изтриете? ' + post.users_id + '?',
      header: 'Потвърждаване',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.delete(post).then(() =>{
          this.postService.getAll().subscribe(data => {
            this.posts = data;
            this.post = new Post();
            console.log("Done with delete");
          })
        }).catch(ex => {
          this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
        });
      }
    });
  }

  detectFiles($event: Event) {

  }

  uploadSingle() {

  }

  like() {

  }

  comment() {

  }
}
