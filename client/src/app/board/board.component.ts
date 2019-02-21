import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../column';
import { ColumnService } from '../column.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  title = 'Board';
  columns: Column[];

  constructor(private columnService: ColumnService) {}

  getMockColumns(): void {
    this.columnService.getMockColumns().subscribe(columns => this.columns = columns);
  }

  getAllColumns(): void {
    this.columnService.getAllColumns().subscribe(columns => {
      this.columns = columns;
    });
  }

  ngOnInit() {
    // this.getMockColumns();
    this.getAllColumns();
  }

}
