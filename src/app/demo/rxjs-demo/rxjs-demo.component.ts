import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.component.html',
  styleUrls: ['./rxjs-demo.component.less'],
})
export class RxjsDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  users = [
    { name: 'John', id: 1 },
    { name: 'Andrew', id: 2 },
    { name: 'Anna', id: 3 },
    { name: 'Iris', id: 4 },
  ];

  blackListedUsers = [];

  selectedUserId = null;
  isUserBlackListed = false;
  allowBlackListedUsers = false;

  changeUser() {
    this.isUserBlackListed = !!this.blackListedUsers.find(
      (blackListedUserId) => this.selectedUserId === blackListedUserId
    );
  }
}
