import { Component, signal, WritableSignal, model, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeechService } from '../../../services/speech.service';
import { RecognitionService } from '../../../services/recognition.service';
import { OpenaiService } from '../../../services/openai.service';

@Component({
  selector: 'chatbot-prompt',
  templateUrl: 'chatbot-prompt.component.html',
})
export class ChatbotPromptComponent implements OnInit {
  public input: string = '';
  public isSpeaking = signal(false);
  // 👇 nuevo estado
  public isThinking = signal(false);
  public selectedInputPreference: boolean = false;
  public utterance: WritableSignal<string> = signal('');
  public speechRecognizable = model(false);

  constructor(
    private readonly synthesis: SpeechService,
    private readonly recognition: RecognitionService,
    private readonly completion: OpenaiService,
    // 👇 necesario because zoneless
    private readonly changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    try {
      this.recognition.init();
      this.speechRecognizable.set(true);
    } catch {}
  }

  onChangeInput = () => this.utterance.set(this.input);

  toggleRecognition = () => {
    if (!this.isSpeaking()) this.startRecognition();
    else this.stopRecognition();
  }

  startRecognition = () => {
    this.recognition.startRecording();
    this.isSpeaking.set(true);

    this.recognition.rs.onresult = (event: any) => { 
      this.stopRecognition(event);
    }
  };

  stopRecognition = (event?:any) => {
    this.isSpeaking.set(false);
    this.changeDetector.detectChanges();

    this.recognition.stopRecording();
    if (event){
      this.sendRecognitionResult(event);
    } else {
      this.recognition.rs.onresult = (event: any) => { 
        this.sendRecognitionResult(event);
      }
    }
  };

  sendRecognitionResult = (event:any) => {
    this.isThinking.set(true);
    this.changeDetector.detectChanges();

    const result = event.results[0][0].transcript;
    this.utterance.set(result);
    this.completion
    .startChat(this.utterance())
    .subscribe(({ data }) => {
      this.isThinking.set(false);
      this.changeDetector.detectChanges();

      this.synthesis.speakFromUtterance(data.choices[0].message.content);
    });
  };

  triggerCompletion = () => {
    this.completion.startChat(this.utterance()).subscribe(({ data }) => {
      this.input = '';
      this.synthesis.speakFromUtterance(data.choices[0].message.content);
      this.utterance.set('');
    });
  }
}
