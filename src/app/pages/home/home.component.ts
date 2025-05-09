import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  newTweet: string = '';
  personalTweets: any[] = [];
  allUsers: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadTweets();
      this.loadUsers();
    } else {
      this.router.navigate(['/login']);
    }
  }

  postTweet() {
    if (!this.newTweet.trim()) return;

    const tweet = {
      userId: this.user.id,
      content: this.newTweet,
      timestamp: new Date().toISOString()
    };

    this.api.postTweet(tweet).subscribe(() => {
      this.newTweet = '';
      this.loadTweets();
    });
  }

  loadTweets() {
    this.api.getAllTweets().subscribe((tweets) => {
      this.personalTweets = tweets
        .filter(t => t.userId === this.user.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });
  }

  loadUsers() {
    this.api.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  deleteTweet(tweetId:string){
    this.api.deleteUserTweet(tweetId).subscribe(()=>{
      this.loadTweets();
    })
  }


  }

