import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'John Doe';

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;

    const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }


  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.subjectInputRef.nativeElement.value = '';

  }
}
