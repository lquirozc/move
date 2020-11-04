import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss']
})
export class PaymentReportsComponent implements OnInit {

  searcherText: any;
  JSONdata: Array<any> = [];
  JSONComercio: Array<any> = [];
  JSONPerfilComercio: Array<any> = [];
  userData: any;
  dataValues: Array<DatatableDataValues> = [
    { id: 'idFactura', header: 'ID' },
    { id: 'nroFactura', header: 'Nro Factura' },
    { id: 'tipoComercio', header: 'Tipo Comercio' },
    { id: 'nombreComercio', header: 'comercio' },
    { id: 'identificacion', header: 'Identificacion' },
    { id: 'nombreCliente', header: 'Cliente' },
    { id: 'subTotal', header: 'Sub Total', currency: true },
    { id: 'valorIVA', header: 'IVA', currency: true },
    { id: 'total', header: 'Total', currency: true },
    { id: 'porcentajeComision', header: '%', currency: true },
    { id: 'valorComercio', header: 'Comercio', currency: true },
    { id: 'valorPlataforma', header: 'plataforma', currency: true },

  ];
  bsOptions: any = { dateInputFormat: 'DD/MM/YYYY', maxdate: new Date() };
  filterForm: FormGroup;
  subTotal: any = 0;
  valorIVA: any = 0;
  total: any = 0;
  valorComercio: any = 0;
  valorPlataforma: any = 0;

  constructor(private session: SessionService,
    private api: ApiService,
    private dtService: CustomDatatableService,
    private localeService: BsLocaleService,
    private formBuilder: FormBuilder) {
    this.userData = this.session.getUserData();
    this.localeService.use('es');
  }

  getData() {

    const data = {
      idComercio: this.filterForm.get('idComercio').value,
      idPerfilComercio: null,
      identificacion: this.filterForm.get('identificacion').value,
      fechaInicial: this.filterForm.get('fechaInicial').value,
      fechaFinal: this.filterForm.get('fechaFinal').value,
    }

    this.api.HttpPost(`api/InformePagosComercios`, data).subscribe(res => {
      this.JSONdata = res as Array<any>;
      this.getTotales();
    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getComercio() {
    this.api.HttpGet(`api/Comercios`).subscribe(res => {
      this.JSONComercio = res as Array<any>;
    });
  }

  changeState(id) {
    this.api.HttpPut(`api/InformePagosComercios?idFactura=${id}`, null).subscribe(res => {
      this.getData();
    });
  }

  getTotales() {
    this.total = 0;
    this.subTotal = 0;
    this.valorIVA = 0;
    this.total = 0;
    this.valorComercio = 0;
    this.valorPlataforma = 0;

    for (let i in this.JSONdata) {
      this.subTotal += this.JSONdata[i].subTotal;
      this.valorIVA += this.JSONdata[i].valorIVA;
      this.total += this.JSONdata[i].total;
      this.valorComercio += this.JSONdata[i].valorComercio;
      this.valorPlataforma += this.JSONdata[i].valorPlataforma;
    }
  }

  initForms() {
    this.filterForm = this.formBuilder.group({
      idComercio: null,
      idPerfilComercio: null,
      identificacion: null,
      fechaInicial: null,
      fechaFinal: null,
    });
  }

  ngOnInit(): void {
    this.initForms();
    this.getData();
    this.getComercio();
  }

}
