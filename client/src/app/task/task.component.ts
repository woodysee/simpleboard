import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Task } from '../task';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {

  @Input() task: Task;

  beingEdited = false;

  updateTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  action = {
    title: 'Update task',
    buttons: {
      update: 'Update',
      edit: 'Edit'
    }
  };

  constructor(private taskService: TaskService) { }

  toogleTaskCompletion(): void {
    const newState = !this.task.data.attributes.done;
    this.task.data.attributes.done = newState;
    this.taskService.updateTask(this.task).subscribe(task => {});
  }

  toggleUpdateTaskForm(): void {
    this.beingEdited = !this.beingEdited;
    if (this.beingEdited) {
      this.updateTaskForm.setValue({
        title: this.task.data.attributes.title,
        description: this.task.data.attributes.description
      });
    }
    this.action.buttons.edit = this.beingEdited ? 'Back' : 'Edit';
  }

  updateTask(): void {
    console.log(this.updateTaskForm.value);
    this.task.data.attributes.title = this.updateTaskForm.value.title;
    this.task.data.attributes.description = this.updateTaskForm.value.description;
    this.taskService.updateTask(this.task).subscribe(task => {});
    this.toggleUpdateTaskForm();
  }

  ngOnInit() {
  }

}
