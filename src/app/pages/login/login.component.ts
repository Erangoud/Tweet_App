import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private api : ApiService, private router: Router){}

  login() {
    if (!this.username || !this.password) {
      alert('Please enter username and password.');
      return;
    }
  
    this.api.login(this.username, this.password).subscribe(users => {
      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.router.navigate(['/home']);
      } else {
        alert('Invalid username or password');
      }
    });
  }
}  
