import { Component } from '@angular/core';
import {Parent} from "../../../common/parent";
import {ParentService} from "../../../services/parent.service";
import {NotificationService} from "../../../services/notification.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  dialog : boolean = false;
  displayInfoDialog : boolean = false;

  public parents : Parent[] = [];
  public parent : Parent = new Parent();

  submitted : boolean = false;
  constructor(private parentService : ParentService
    , private notificationService: NotificationService
    , private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.parentService.getAll().subscribe(data =>{
      this.parents = data
    });
  }

  openNewDialog()  {
    this.parent = new Parent();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog(){
    this.submitted = false;
    this.dialog = false;
  }

  OpenEditDialog(parent :Parent){
    this.parent = parent;
    this.dialog = true;
  }

  showInfoDialog() {
    this.displayInfoDialog = true;
  }

  save() {
    this.submitted = true;
    debugger
    this.parentService.save(this.parent).then(() => {
      this.parentService.getAll().subscribe(data => {
        this.parents = data;
        this.dialog = false;
        this.parent = new Parent();
        console.log("Done with save");
      });
    }).catch(ex=>{
      this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
    })
  }

  delete(parent : Parent){
    this.confirmationService.confirm({
      message: 'Наистина ли искате да изтриете? ' + parent.users_id + '?',
      header: 'Потвърждаване',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.parentService.delete(parent).then(() =>{
          this.parentService.getAll().subscribe(data => {
            this.parents = data;
            this.parent = new Parent();
            console.log("Done with delete");
          })
        }).catch(ex => {
          this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
        });
      }
    });
  }
}
