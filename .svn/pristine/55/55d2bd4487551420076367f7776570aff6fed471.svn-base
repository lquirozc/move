import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomDatatableService } from './custom-datatable.module';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.scss']
})
export class CustomDatatableComponent implements OnInit {

  @Input() searcherText: string;
  @Input() noPadding: string = 'no';

  @Input() JSONdata: Array<any> = [];
  @Input() dataValues: Array<DatatableDataValues> = [];
  @Input() hasActions: string = 'no';
  @Input() newitem: boolean = true;

  @Input() keyValue: string;

  isNew: BehaviorSubject<boolean> = this.dtService.isNew$;
  isEditing: BehaviorSubject<boolean> = this.dtService.isEditing$;

  @Input() activeRowEditId?: number = null;
  @Input() itemsPerPage: number;
  currentPage: number;

  @Output() onItemEdit = new EventEmitter();
  @Output() onActiveItem = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  currentOrderField: string;
  descending: boolean = false;

  constructor(private dtService: CustomDatatableService) {
    this.dtService.reset();
  }

  _onNew() {
    this.dtService.isEditing$.next(!this.dtService.isEditing$.getValue());
    this.dtService.isNew$.next(true);
  }

  _onItemEdit(id) {
    this.dtService.isNew$.next(false);
    // this.isNew = false;

    this.dtService.isEditing$.next(true);
    this.onItemEdit.emit(id);
  }

  _onActiveItem(id) {
    this.dtService.reset();
    this.onActiveItem.emit(id);
  }

  _onSubmit() {
    this.onSubmit.emit(null);
  }

  _onCancel() {

    this.dtService.reset();
    // this.isNew = false;

    this.activeRowEditId = null;
    this.onCancel.emit(null);
  }

  orderColumn(columnID: string) {

    if (this.currentOrderField == columnID) {

      this.descending = !this.descending;

    } else {
      this.currentOrderField = columnID;
      this.descending = false;
    }


  }

  ngOnInit(): void {
    this.currentOrderField = this.keyValue;
  }
}

export interface DatatableDataValues {
  id?: string;
  header: string;
  currency?: boolean,
  date?: boolean,
  template?: string
}