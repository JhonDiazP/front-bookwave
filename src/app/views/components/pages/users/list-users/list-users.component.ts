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
        // console.log(rowData);
        return `${rowData.firstname} ${rowData.lastname}`;
      },
    },
    email: new Columns('Email', 'string'),
    phone: new Columns('Teléfono', 'string'),
  },['fullName', 'email', 'phone']);

  public users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().then(users => {
      this.users = users;
      // console.log(this.users);
    }).catch(err => {
      console.log(err);
    });
  }
}
