import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../column';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent implements OnInit {
  
  @Input() column: Column;

  constructor() { }

  ngOnInit() {
  }

}
