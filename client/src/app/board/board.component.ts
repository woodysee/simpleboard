import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  title = 'Board';
  action = {
    title: 'New task',
    button: 'Create'
  };
  createTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  newTask = {
    data: {
      id: '',
      attributes: {
        title: '',
        description: '',
        done: false
      }
    }
  };
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  createTask(): void {
    this.newTask.data.attributes.title = this.createTaskForm.value.title;
    this.newTask.data.attributes.description = this.createTaskForm.value.description;
    this.taskService.createTask(this.newTask).subscribe(task => this.tasks.push(task));
  }

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
