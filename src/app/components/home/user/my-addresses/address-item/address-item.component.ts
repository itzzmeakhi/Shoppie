import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'src/app/shared/address.model';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit {

  @Input() address : Address;
  @Input() index : number;
  @Output() addressViewId = new EventEmitter<number>();
  @Output() addressDeleteId = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onAddressSelected() {
    this.addressViewId.emit(this.index);
  }

  onAddressDelete() {
    this.addressDeleteId.emit(this.index);
  }

}
