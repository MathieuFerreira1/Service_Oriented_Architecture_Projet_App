import { Component, Input } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [UserComponent, NgForOf],
})
export class UserListComponent {
  @Input() users: any[] = [];
}
