import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OpenaiService } from '../services/openai.service';
import { SpeechService } from '../services/speech.service';
import { RecognitionService } from '../services/recognition.service';

import { ChatbotCardComponent } from './components/chatbot-card/chatbot-card.component';
import { ChatbotPromptComponent } from './components/chatbot-prompt/chatbot-prompt.component';
import { ChatbotComponent } from './chatbot.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ChatbotCardComponent,
    ChatbotPromptComponent,
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ChatbotComponent
  ],
  providers: [
    SpeechService,
    RecognitionService,
    OpenaiService,
  ],
})
export class ChatbotModule { }
