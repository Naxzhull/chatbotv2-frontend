import { Injectable, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecognitionService {
  /* @ts-ignore */
  public rs = new webkitSpeechRecognition();

  constructor() {
    this.rs.continuous = true;
    this.rs.lang = 'es-MX';
    this.rs.interimResults = false;
  }

  startRecording = () => this.rs.start();
  abortRecording = () => this.rs.abort();
}
