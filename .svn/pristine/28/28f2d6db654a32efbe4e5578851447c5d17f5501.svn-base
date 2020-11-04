import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-history-request-commerce',
  templateUrl: './history-request-commerce.component.html',
  styleUrls: ['./history-request-commerce.component.scss']
})

export class HistoryRequestCommerceComponent implements OnInit {

  @Input() searcherText: string;
  idRegister: any = 0;

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  JSONdataDepto: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idSolicitud', header: 'ID' },
    { id: 'nombrePerfilComercio', header: 'Comercio' },
    { id: 'estado', header: 'Estado' },
    { id: 'motivoRechazo', header: 'Motivo rechazo' },
  ];
  list: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService,
    private modalService: BsModalService,
    public customModal: BsModalRef) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/SolicitudesComercio`).subscribe(res => {

      let data = res as Array<any>;
      this.JSONdata = data.filter(x => x.idPerfilComercio = this.idRegister)

    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  ngOnInit(): void {

    this.initForms();
    this.getData();
  }

  get f() { return this.registerForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idSolicitud: null,
      idDepartamento: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: true,
      usuarioCreacion: this.userData.userId,
      usuarioModificacion: this.userData.userId
    });
  }

  cancelForm() {
    this.customModal.hide();
  }

}
