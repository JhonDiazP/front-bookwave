import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/business-controller/user.service';
import { Columns } from 'src/app/models/common/table/columns';
import { Settings } from 'src/app/models/common/table/settings';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  public settings: Settings = new Settings({
    fullName: {
      title: 'Nombre',
      type: 'string',
      valuePrepareFunction: (value: any, rowData: any) => {
        return `${rowData.first_name} ${rowData.last_name}`;
      },
    },
    email: new Columns('Email', 'string'),
    phone: new Columns('Teléfono', 'string'),
  },['fullName', 'email', 'phone']);

  public users: User[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;
  public maxPagesToShow: number = 5;
  public pages: number[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = 1) {
    let params: any = {
      // 'search': this.searchValue || '',
      'page': page,
    };

    this.userService.getUsers(params).then((users: any) => {
      this.users = users.data;
      this.currentPage = users.current_page;
      this.totalPages = users.last_page;
      this.updatePages();
    }).catch(err => {
      console.log(err);
    });
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
  }

  deleteUser(user: User) {
    if(user.id){
      this.userService.Delete(user.id).then(x => {
        this.getUsers();
      }).catch(err => {
  
      })
    }
  }

  enableUser(user: User) {
    if(user.id){
      this.userService.Enable(user.id).then(x => {
        this.getUsers();
      }).catch(err => {
  
      })
    }
  }

  onPageChange(page: number) {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.getUsers(page);
    }
  }

  updatePages() {
    const half = Math.floor(this.maxPagesToShow / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxPagesToShow - 1);

    if (end - start < this.maxPagesToShow) {
      start = Math.max(1, end - this.maxPagesToShow + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }
}
