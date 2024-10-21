import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService) {}

  public onSendMessage(event: Event) {
    console.log("Form submitted");
    event.preventDefault();
    console.log("Default prevented");

    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;
    const CurrentUserName = 'John Doe';

    const newMessage = new Message(Date.now().toString(), subjectValue, msgTextValue, CurrentUserName);

    this.messageService.addMessage(newMessage);

    this.addMessageEvent.emit(newMessage);

    this.onClear();

  }


  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';

  }

  testClick() {
    console.log("Send button clicked!");
  }

}
