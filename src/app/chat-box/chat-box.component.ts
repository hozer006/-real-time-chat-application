import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages: Message[] = [];
  messageText = '';
  senderName = '';

  private socket: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  private setupSocketConnection(): void {
    this.socket = io(SERVER_URL);

    this.socket.on('message', (message: Message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    const message: Message = {
      text: this.messageText,
      sender: this.senderName,
      timestamp: new Date()
    };
    this.socket.emit('message', message);
    this.messageText = '';
  }
}
