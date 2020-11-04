import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  searcherText:any;
  masterSelect:any;
  dataOptions: Array<any> = [
    {
      key: 1,
      value: 'Tickets de comercios'
    }, {
      key: 2,
      value: 'Tickets de clientes'
    }];
  constructor() { }

  ngOnInit(): void {
  }

}
