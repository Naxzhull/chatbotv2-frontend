import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { OpenaiService } from '../../../services/openai.service';

interface Mensaje {
  role: 'user'|'assistant';
  content: string;
  status: 'thinking'|'done';
  tiempo: Date;
}

@Component({
  selector: 'app-chatbot-text-main',
  templateUrl: './chatbot-text-main.component.html',
  styleUrl: './chatbot-text-main.component.css'
})
export class ChatbotTextMainComponent implements AfterViewChecked {
  @ViewChild('areaWrapperContent') private readonly areaWrapperContent? : ElementRef;

  public nombreDelAsistente = 'Asistente';
  public nombreDelUsuario = 'Usuario';
  public areaDeTexto : string = "";
  public loading = signal(false);
  public promptDelUsuario : string = '';
  private needsScroll : boolean = false;
  public mensajes : Mensaje[] = [{
      role: 'assistant',
      content: '¿En qué puedo ayudarte?',
      status: 'done',
      tiempo: new Date()
    }];

  constructor(
    private readonly changeDetector : ChangeDetectorRef,
    private readonly openAiService : OpenaiService
  ) { }

  public ngAfterViewChecked(): void {
    if (this.needsScroll) {
      this.scrollToBottom();
      this.needsScroll = false;
    }
  }

  public enviarPrompt() {
    if ( !this.promptDelUsuario ) return;
    this.mensajes.push({
      role: 'user',
      content: this.promptDelUsuario,
      status: 'done',
      tiempo: new Date()
    })

    this.sendPromptToOpenAI(this.promptDelUsuario);
    this.promptDelUsuario = '';
    this.needsScroll = true;
    this.changeDetector.detectChanges();
  }

  private async sendPromptToOpenAI(prompt:string) {
    const msgIndex = this.mensajes.length;

    setTimeout( () => {
      this.mensajes.push({
        role: 'assistant',
        content: '',
        status: 'thinking',
        tiempo: new Date()
      });
      this.needsScroll = true;
    },1000)

    this.openAiService
    .startChatWithAssistant(prompt)
    .subscribe(( {data} ) => {
      const respuesta = data.content[0].text.value;
      this.mensajes[msgIndex].content = respuesta;
      this.mensajes[msgIndex].status = 'done';
      this.needsScroll = true;
    });
  }
 
  public onChangeInput(event:string) { this.promptDelUsuario = event; }

  public getHour(tiempo: Date) : string {
    return tiempo.toLocaleTimeString();
  }

  private scrollToBottom(): void {
    if ( this.areaWrapperContent !== undefined ) {
      this.areaWrapperContent.nativeElement.scrollTop = this.areaWrapperContent.nativeElement.scrollHeight + 100;
    } 
  }               

}
