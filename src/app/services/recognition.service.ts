import { Injectable, WritableSignal } from '@angular/core';
import { getWindow } from 'ssr-window';
import { environment } from '../../environments/environment';

type webkitSpeechRecognition = any;

@Injectable({
  providedIn: 'root',
})
export class RecognitionService {
  
  public rs:webkitSpeechRecognition;

  public init() {
    if (!('webkitSpeechRecognition' in getWindow())) {
      throw 'webkitSpeechRecognition no está presente. Vea https://developer.chrome.com/blog/voice-driven-web-apps-introduction-to-the-web-speech-api'
    } else {
      //@ts-ignore
      this.rs = new webkitSpeechRecognition();
      this.rs.continuous = true;
      this.rs.lang = 'es-MX';
      this.rs.interimResults = false;

      this.rs.onstart = function() { console.log('webkitSpeechRecognition started.'); }
      this.rs.onresult = function(event:any) { console.log(event); }
      this.rs.onerror = function(event:any) { console.error(event); }
      this.rs.onend = function() { console.log('webkitSpeechRecognition ended.'); }
    }
  }

  startRecording = () => this.rs.start();
  //                            👇 abort ahora no retorna resultados
  stopRecording = () => this.rs.stop();
}
