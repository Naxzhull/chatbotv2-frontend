import { Component, OnInit, inject, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ChatbotModule } from './chatbot/chatbot.module';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ChatbotModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    if (isDevMode()) {
      console.log('Development running!');
    } else {
      console.log('Production running!');
    }
  }
}
