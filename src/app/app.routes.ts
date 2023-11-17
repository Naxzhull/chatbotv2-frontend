import { Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatbotComponent,
  },
  {
    path: 'home',
    component: MainPageComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
