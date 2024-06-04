import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../../../models/mensajes';
import { OpenaiService } from '../../../../services/openai.service';

@Component({
  selector: 'app-chatbot-stream-main',
  standalone: true,
  imports: [
    FormsModule],
  templateUrl: './chatbot-stream-main.component.html',
  styleUrl: './chatbot-stream-main.component.css'
})
export class ChatbotStreamMainComponent implements AfterViewChecked {
  @ViewChild('areaWrapperContent') private readonly areaWrapperContent? : ElementRef;

  public nombreDelAsistente = 'Asistente';
  public nombreDelUsuario = 'Usuario';
  public areaDeTexto : string = "";
  public loading = signal(false);
  public promptDelUsuario : string = '';
  private needsScroll : boolean = false;
  public mensajes : Mensaje[] = [{
      role: 'assistant',
      content: 'Soy tu Profesor Virtual, ¿necesitas alguna orientación acerca de este curso?',
      status: 'done',
      tiempo: new Date()
    }];

  constructor(
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef,
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

    //setTimeout( () => {
      this.mensajes.push({
        role: 'assistant',
        content: '',
        status: 'thinking',
        tiempo: new Date()
      });
      this.needsScroll = true;
    //},1000)

    this.openAiService.startStreamChatWithAssistant(prompt)
    .subscribe({
      next: ( chunk ) => {
          this.mensajes[msgIndex].status = 'writing';
          this.mensajes[msgIndex].content += chunk;
          this.needsScroll = true;
        },
      complete: ()=> this.mensajes[msgIndex].status = 'done',
      error: (err) => console.error(`ERROR! ${err}`)
    });
  }

  public getHour(tiempo: Date) : string {
    return tiempo.toLocaleTimeString();
  }

  private scrollToBottom(): void {
    if ( this.areaWrapperContent !== undefined ) {
      this.areaWrapperContent.nativeElement.scrollTop = this.areaWrapperContent.nativeElement.scrollHeight + 100;
    } 
  }   
}
