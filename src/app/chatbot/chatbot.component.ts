import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chatbot-page',
  templateUrl: 'chatbot.component.html'
})

export class ChatbotComponent implements OnInit {
  public speechRecognizable : boolean = false;

  constructor() { }

  ngOnInit() { }
}