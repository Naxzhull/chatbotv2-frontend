import { Injectable } from '@angular/core';
import { getWindow } from 'ssr-window';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private synth: any;

  constructor() {
    // 👇 paquete npm because SSR
    this.synth = getWindow().speechSynthesis;
  }

  speakFromUtterance(utterance: string): void {
    const ss = new SpeechSynthesisUtterance(utterance);
    ss.volume = 1;
    ss.rate = 1.0;
    ss.pitch = 0.4;
    ss.lang = 'es-MX';
    ss.voice = this.synth.getVoices()[248];
    this.synth.speak(ss);
  }
}