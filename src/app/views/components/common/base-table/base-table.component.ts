import { Component, Input, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/common/table/settings';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-base-table',
  standalone: false,
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss'
})
export class BaseTableComponent implements OnInit {

  @Input() settings!: Settings;
  @Input() data: any[] = [];

  constructor() { }

  ngOnInit(): void {
      // console.log(this.settings);
      if(this.data.length != 0){
        // console.log(this.data);
      }
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
  }
}
