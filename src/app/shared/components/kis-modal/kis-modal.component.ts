import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cust-modal',
  templateUrl: './cust-modal.component.html',
  styleUrls: ['./cust-modal.component.scss'],
})
export class KisModalComponent implements OnInit {
  bindingTitleInput1: string;
  bindingTitleInput2: string;
  bindingTitle: string;
  bindingHeight: string;

  @Output() modalclose = new EventEmitter<boolean>();
  @Input('kisclick') modal1: boolean;
  close() {
    this.modal1 = false;
    this.modalclose.emit(this.modal1);
  }

  @Input() set title(pram: any) {
    this.bindingTitle = pram;
  }

  @Input() set titleInput1(pram: string) {
    this.bindingTitleInput1 = pram;
  }
  @Input() set titleInput2(pram: string) {
    this.bindingTitleInput2 = pram;
  }

  @Input() set height(pram: string) {
    this.bindingHeight = pram;
  }
  constructor() {}

  ngOnInit(): void {}
}
