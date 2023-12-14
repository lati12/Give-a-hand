import { Component } from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {ConfirmationService} from "primeng/api";
import {Post} from "../../../common/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  dialog : boolean = false;
  displayInfoDialog : boolean = false;

  public posts : Post[] = [];
  public post : Post = new Post();

  submitted : boolean = false;
  date: Date | undefined;
  constructor(private postService : PostService
    , private notificationService: NotificationService
    , private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.postService.getAll().subscribe(data =>{
      this.posts = data
    });
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
}
