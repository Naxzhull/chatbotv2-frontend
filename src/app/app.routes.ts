import { Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatbotTextMainComponent } from './chatbot-text/components/chatbot-text-main/chatbot-text-main.component';
import { ChatbotStreamMainComponent } from './chatbot/chatbot-stream/components/chatbot-stream-main/chatbot-stream-main.component';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatbotComponent,
  },
  {
    path: 'chat-text',
    component: ChatbotTextMainComponent,
  },
  {
    path: 'chat-stream',
    component: ChatbotStreamMainComponent,
  },
  {
    path: 'home',
    component: MainPageComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
