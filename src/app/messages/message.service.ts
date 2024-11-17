import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
//import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>(); //name provided by instructor

  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
   }

   //get a copy of all messages
   getMessages() {
    return this.http.get<Message[]>('https://cms-cont-mess-doc-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;  // Correctly update messages with fetched data
          this.maxMessageId = this.getMaxId();

          // Ensure `subject` exists before calling localeCompare
          this.messages.sort((a, b) => {
            const nameA = a.subject || '';  // Fallback to empty string if subject is undefined
            const nameB = b.subject || '';  // Fallback to empty string if subject is undefined
            return nameA.localeCompare(nameB);
          });

          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);  // Log errors
        }
      );
  }


   //get a single message by id
   getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
   }

   storeMessages() {
    // Converts the documents array to a JSON string for transmission
    const messagesCopy = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the HTTP PUT request to update the documents in Firebase
    this.http
      .put(
        'https://cms-cont-mess-doc-default-rtdb.firebaseio.com/messages.json',
        messagesCopy, { headers: headers }
      )
      .subscribe(
        (response) => {
          console.log('Messages successfully updated:', response);
        },
        (error) => {
          console.error('Error updating messages:', error);
        }
      );

    // Emit the cloned documents to notify listeners of the changes
    this.messageChangedEvent.next(this.messages.slice());
  }

   getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


   addMessage(newMessage: Message) {
    if(!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    //this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
   }


}
