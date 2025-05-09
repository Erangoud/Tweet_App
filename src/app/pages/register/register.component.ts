import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private api: ApiService, private router: Router) {}

  // Register function for the user
  register() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Generate a unique ID
    this.generateUniqueId().then((uniqueId) => {
      const newUser = {
        id: uniqueId,
        username: this.username,
        password: this.password,
        name: this.username
      };

      this.api.register(newUser).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.message || 'Registration failed');
        }
      });
    });
  }

  // Generate unique ID
  private async generateUniqueId(): Promise<string> {
    let unique = false;
    let newId = '';
    
    while (!unique) {
      newId = Math.random().toString(36).substring(2, 8); // Generate a random ID
      
      let users = await firstValueFrom(this.api.checkUserIdExists(newId));
      
      if (!users) {
        users = []; 
      }
  
      unique = users.length === 0; // Make sure the ID doesn't already exist
    }
  
    return newId;
  }
  
}