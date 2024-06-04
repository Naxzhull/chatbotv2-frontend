export interface Mensaje {
    role: 'user'|'assistant';
    content: string;
    status: 'thinking'|'writing'|'done';
    tiempo: Date;
  }