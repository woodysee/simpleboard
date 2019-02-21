import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  title = 'Board';
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  getMockTasks(): void {
    this.taskService.getMockTasks().subscribe(tasks => this.tasks = tasks);
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
    // this.getMockTasks();
    this.getAllTasks();
  }

}
