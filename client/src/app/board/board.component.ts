import { Component, Input, OnInit } from '@angular/core';
import { mockColumns } from '../mock-columns';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  title = 'Board';
  columns = mockColumns;

  constructor() {}

  ngOnInit() {
  }

}
