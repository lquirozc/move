import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { TextEditorService } from 'src/app/services/text-editor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-tickets-support',
  templateUrl: './detail-tickets-support.component.html',
  styleUrls: ['./detail-tickets-support.component.scss']
})
export class DetailTicketsSupportComponent implements OnInit {

  @Input() searcherText: string;
  idTicketsSop: number

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idDetalleTicketsSoporte', header: 'ID' },
    { id: 'fechaCreacion', header: 'Fecha Creación', date: true },
    { id: 'fechaModificacion', header: 'Fecha Modificación', date: true },
    { id: 'estado', header: 'Estado' },
  ];
  list: any[] = [];
  editorConfig = this.textEditorService.config;

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService,
    private textEditorService: TextEditorService,
    private route: ActivatedRoute,
    private _location: Location) {
    this.userData = this.session.getUserData();
  }

  getData(idTicket: number) {

    this.api.HttpGet(`api/DetalleTicketsSoporte/${0}?idTicketsSoporte=${idTicket}`).subscribe(res => {

      if (idTicket != null && idTicket != 0) {
        this.JSONdata = res as Array<any>;
      } else {
        this.JSONdata = [];
      }

    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getItem(id) {

    this.api.HttpGet(`api/DetalleTicketsSoporte/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idDetalleTicketsSoporte: res['idDetalleTicketsSoporte'],
        idTicketsSoporte: (res['idTicketsSoporte'] ? res['idTicketsSoporte'] : ''),
        cuerpoHtml: (res['cuerpoHtml'] ? res['cuerpoHtml'] : ''),
        estado: (res['estado'] ? res['estado'] : 'ABIERTO'),
        rol: 1,
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });
    });
  }

  onSubmit() {

    this.submittedForm = true;

    if (this.registerForm.invalid) {
      this.dialog.openDialog('warning', 'Debes diligenciar los campos obligatiorios');
      return;

    } else {
      let data = this.registerForm.value;
      if (this.dtService.isNew$.getValue()) {

        this.api.HttpPost(`api/DetalleTicketsSoporte`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/DetalleTicketsSoporte/${data.idDetalleTicketsSoporte}`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      }
    }
  }

  onBackProcessTicket() {
    this._location.back();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id'] !== undefined) {
        this.idTicketsSop = params['id'];
        this.initForms();
        this.getData(this.idTicketsSop);
      }
    });
  }

  get f() { return this.registerForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idDetalleTicketsSoporte: null,
      idTicketsSoporte: this.idTicketsSop,
      cuerpoHtml: ['', Validators.required],
      estado: ['', Validators.required],
      rol: 1,
      usuarioCreacion: this.userData.userId,
      usuarioModificacion: this.userData.userId
    });
  }

  clearForm() {
    this.cancelForm();
    this.getData(this.idTicketsSop);

  }

  cancelForm() {
    this.dtService.reset();
    this.submittedForm = false;
    this.registerForm.reset();
    this.initForms();
  }

}

