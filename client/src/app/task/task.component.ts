import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private taskService: TaskService) { }

  toogleTaskCompletion(): void {
    const newState = !this.task.data.attributes.done;
    this.task.data.attributes.done = newState;
    this.taskService.updateTask(this.task).subscribe(task => {});
  }

  ngOnInit() {
  }

}
