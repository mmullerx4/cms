import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;

 //@Output() addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  public onSendMessage() {

    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;

    const message = new Message('1', subjectValue, msgTextValue, '1004');

    this.messageService.addMessage(message);


    this.onClear();

  }


  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';

  }

}
