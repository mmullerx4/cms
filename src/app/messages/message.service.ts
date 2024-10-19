import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   //get a copy of all messages
   getMessages() {
    return this.messages.slice();
   }

   //get a single message by id
   getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
   }


}
