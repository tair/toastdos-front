import { Component, Input, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-keyword-record',
  templateUrl: './keyword-record.component.html',
  styleUrls: ['./keyword-record.component.scss']
})
export class KeywordRecordComponent implements OnInit {
  @Input() keyword: any;
  
  requested: boolean = false;
  requestText: string;

  confirmed: boolean = false;
  confirmText: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.requestText = this.requested? 'Requested' : 'Request';
    this.confirmText = this.confirmed? 'Confirmed' : 'Confirm';
  }
  request(){
    window.open('https://github.com/evidenceontology/evidenceontology/issues/new', '_blank');
    this.requested = ! this.requested;
    this.requestText = this.requested? 'Requested' : 'Request';
    // TODO: show requested status with 'requested' field in keyword_temp table to permanently track requested status
  }

  confirm(){
    this.confirmed = ! this.confirmed;
    this.confirmText = this.confirmed? 'Confirmed' : 'Confirm';
    // TODO: show confirmed keyword with 'confirmed_as' field in keyword_temp table
  }

  open(content) {
    this.modalService.open(content);
  }

}
