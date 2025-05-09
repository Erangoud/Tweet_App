import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // selectedView: 'global' | 'personal' = 'global';

  constructor(private router:Router){}
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // switchView(view: 'global' | 'personal') {
  //   this.selectedView = view;
  // }

}
