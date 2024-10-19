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
    this.messages = this.messageService.getMessages(); //call/fetches messages on initialization
  }

  //to push the new message
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
