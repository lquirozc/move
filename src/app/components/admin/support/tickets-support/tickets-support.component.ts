import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-support',
  templateUrl: './tickets-support.component.html',
  styleUrls: ['./tickets-support.component.scss']
})
export class TicketsSupportComponent implements OnInit {

  @Input() searcherText: string;

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  JSONdataUsuaiosSibo: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idTicketsSoporte', header: 'ID' },
    { id: 'fechaCreacion', header: 'Fecha', date: true },
    { id: 'nomnbreResponsable', header: 'Responsable' },
    { id: 'descripcion', header: 'Descripción' },
    { id: 'estado', header: 'Estado' },
  ];
  bsModalRef: BsModalRef;
  idItem: any = 0;

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService,
    private modalService: BsModalService,
    private router: Router) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/TicketsSoporte`).subscribe(res => {
      let data = res as Array<any>;
      this.JSONdata = data.filter(x => x.esComercio == false);
      this.getDataUsuaiosSibo();

    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getDataUsuaiosSibo() {
    this.api.HttpGet(`api/UsuaiosSibo`).subscribe(res => {
      let data = res as Array<any>;
      this.JSONdataUsuaiosSibo = data.filter(x => x.strEstado == 'Activo');
    }, err => {
      console.log(err);
      this.JSONdataUsuaiosSibo = [];

    });
  }

  getItem(id) {
    this.idItem = id;
    this.api.HttpGet(`api/TicketsSoporte/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTicketsSoporte: res['idTicketsSoporte'],
        idResponsable: (res['idResponsable'] ? res['idResponsable'] : ''),
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        esComercio: (res['esComercio'] ? res['esComercio'] : false),
        estado: (res['estado'] ? res['estado'] : 'ABIERTO'),
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

    });
  }

  changeState(id) {

    //   this.api.HttpGet(`api/TicketsSoporte/${id}`).subscribe(res => {

    //     this.registerForm.setValue({
    //       idTicketsSoporte: res['idTicketsSoporte'],
    //       idResponsable: res['idResponsable'],
    //       descripcion: (res['descripcion'] ? res['descripcion'] : ''),
    //       esComercio: (res['esComercio'] ? res['esComercio'] : false),
    //       estado: (res['estado'] ? res['estado'] : 'ABIERTO'),
    //       usuarioCreacion: this.userData.userId,
    //       usuarioModificacion: this.userData.userId
    //     });

    //     this.registerForm.get('estado').setValue(!this.registerForm.get('estado').value);

    //     this.onSubmit();
    //   });
  }

  onSubmit() {

    this.submittedForm = true;

    if (this.registerForm.invalid) {
      this.dialog.openDialog('warning', 'Debes diligenciar los campos obligatiorios');
      return;

    } else {
      let data = this.registerForm.value;
      if (this.dtService.isNew$.getValue()) {

        this.api.HttpPost(`api/TicketsSoporte`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/TicketsSoporte/${data.idTicketsSoporte}`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      }
    }
  }

  ngOnInit(): void {

    this.initForms();
    this.getData();
  }

  onOpenProcessTicket() {
    this.router.navigate(['admin/detail-tickets-support'], { queryParams: { id: this.idItem } }); 4
  }

  get f() { return this.registerForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idTicketsSoporte: null,
      idResponsable: ['', Validators.required],
      descripcion: ['', Validators.required],
      esComercio: false,
      estado: ['', Validators.required],
      usuarioCreacion: this.userData.userId,
      usuarioModificacion: this.userData.userId
    });
  }

  clearForm() {
    this.cancelForm();
    this.getData();

  }

  cancelForm() {
    this.dtService.reset();
    this.submittedForm = false;
    this.registerForm.reset();
    this.initForms();
  }

}
