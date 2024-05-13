import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../interfaces/base-response';
import { ChatResponse, CompletionRequest, MessageResponse } from '../interfaces/chat-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public startChat(content: string): Observable<BaseResponse<ChatResponse>> {
    const body: CompletionRequest = { messages: [{ content }] };
    return this.http.post<BaseResponse<ChatResponse>>(
      this.baseUrl + 'chat',
      body
    );
  }

  public startChatWithAssistant(content: string): Observable<BaseResponse<MessageResponse>> {
    const body: CompletionRequest = { messages: [{ content }] };
    return this.http.post<BaseResponse<MessageResponse>>(
      this.baseUrl + 'assistant',
      body
    );
  }
}
