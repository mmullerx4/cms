import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  selectedMessage: Message;

  //initialize with 3 message objects
  messages: Message[] = [
    new Message('1', 'Hello World', 'This is the first message', 'Joe'),
    new Message('2', 'Second Hello!!', 'This is the second message', 'Sage'),
    new Message('3', 'Third Hello!!', 'This is the third message', 'Tate'),
  ];


  constructor() {}

  ngOnInit() {}

  //to push the new message
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
