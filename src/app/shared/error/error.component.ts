import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage : string;
  @Output() onCloseAlert = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.onCloseAlert.emit();
  }

}