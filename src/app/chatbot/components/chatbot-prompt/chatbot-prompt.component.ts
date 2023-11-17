import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { SpeechService } from '../../../services/speech.service';
import { RecognitionService } from '../../../services/recognition.service';
import { OpenaiService } from '../../../services/openai.service';

@Component({
  selector: 'chatbot-prompt',
  templateUrl: 'chatbot-prompt.component.html',
})
export class ChatbotPromptComponent implements OnInit {
  public input: string = '';
  public isSpeaking: boolean = false;
  public selectedInputPreference: boolean = false;
  public utterance: WritableSignal<string> = signal('');

  constructor(
    private readonly synthesis: SpeechService,
    private readonly recognition: RecognitionService,
    private readonly completion: OpenaiService
  ) {}

  ngOnInit() {}

  onChangeInput = () => this.utterance.set(this.input);

  startRecognition = () => {
    this.recognition.startRecording();
    this.isSpeaking = true;
  };

  abortRecognition = () => {
    this.recognition.abortRecording();
    this.isSpeaking = false;
    this.speakFromRecognition();
  };

  speakFromRecognition = () => {
    this.recognition.rs.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      this.utterance.set(result);
      this.completion
        .startChat(this.utterance())
        .subscribe(({ data }) =>
          this.synthesis.speakFromUtterance(data.choices[0].message.content)
        );
      this.isSpeaking = false;
    };
  };

  triggerCompletion = () => {
    this.completion.startChat(this.utterance()).subscribe(({ data }) => {
      this.input = '';
      this.synthesis.speakFromUtterance(data.choices[0].message.content);
      this.utterance.set('');
    });
  }
}
