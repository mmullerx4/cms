import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  selectedMessage: Message;

  //initialize with 3 message objects
  messages: Message[] = [];


  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messages = this.messageService.getMessages();
  }

  
}
