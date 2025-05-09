import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalTweetsComponent } from "./pages/global-tweets/global-tweets.component";
import { HeaderComponent } from "./pages/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalTweetsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
}
