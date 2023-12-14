import { Component } from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {ConfirmationService} from "primeng/api";
import {Teacher} from "../../../common/teacher";
import {TeacherService} from "../../../services/teacher.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  dialog : boolean = false;
  displayInfoDialog : boolean = false;

  public teachers : Teacher[] = [];
  public teacher : Teacher = new Teacher();

  submitted : boolean = false;
  date: Date | undefined;
  constructor(private teacherService : TeacherService
    , private notificationService: NotificationService
    , private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.teacherService.getAll().subscribe(data =>{
      this.teachers = data
    });
  }

  openNewDialog()  {
    this.teacher = new Teacher();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog(){
    this.submitted = false;
    this.dialog = false;
  }

  OpenEditDialog(teacher : Teacher){
    this.teacher = teacher;
    this.dialog = true;
  }

  showInfoDialog() {
    this.displayInfoDialog = true;
  }

  save() {
    this.submitted = true;
    debugger
    this.teacherService.save(this.teacher).then(() => {
      this.teacherService.getAll().subscribe(data => {
        this.teachers = data;
        this.dialog = false;
        this.teacher = new Teacher();
        console.log("Done with save");
      });
    }).catch(ex=>{
      this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
    })
  }

  delete(teacher : Teacher){
    this.confirmationService.confirm({
      message: 'Наистина ли искате да изтриете? ' + teacher.users_id + '?',
      header: 'Потвърждаване',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teacherService.delete(teacher).then(() =>{
          this.teacherService.getAll().subscribe(data => {
            this.teachers = data;
            this.teacher = new Teacher();
            console.log("Done with delete");
          })
        }).catch(ex => {
          this.notificationService.notification$.next({severity: 'error', summary: 'Грешка', detail: ex.error});
        });
      }
    });
  }
}
