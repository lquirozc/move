import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
  searcherText:any;
  masterSelect:any;
  dataOptions: Array<any> = [
    {
      key: 1,
      value: 'Tipos de comercio'
    }, {
      key: 2,
      value: 'Tipos de servicio'
    }, {
      key: 3,
      value: 'Paises'
    }, {
      key: 4,
      value: 'Departamentos'
    }, {
      key: 5,
      value: 'Ciudades'
    }, {
      key: 6,
      value: 'Barrios'
    },{
      key: 7,
      value: 'Moneda'
    },{
      key: 8,
      value: 'Bancos'
    }];

  constructor() { }

  ngOnInit(): void {
  }

}
