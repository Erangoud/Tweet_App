import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-global-tweets',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './global-tweets.component.html',
  styleUrl: './global-tweets.component.css'
})
export class GlobalTweetsComponent implements OnInit {
  user: any;
  globalTweets: any[] = [];
  allUsers: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadTweets();
      this.loadUsers();
    }
  }

  loadTweets(): void {
    this.api.getAllTweets().subscribe((tweets) => {
      this.globalTweets = tweets.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });
  }

  loadUsers(): void {
    this.api.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  getUsernameById(userId: string): string {
    const foundUser = this.allUsers.find(u => u.id === userId);
    return foundUser ? foundUser.username : 'Unknown';
  }
}
