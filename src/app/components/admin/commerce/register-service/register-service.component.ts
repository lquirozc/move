import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { Subject } from 'rxjs';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { HistoryRequestServiceComponent } from './history-request-service/history-request-service.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.scss']
})

export class RegisterServiceComponent implements OnInit {

  searcherText: string;
  registerForm: FormGroup;
  registerSolicitudForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  submittedSolicitudForm: boolean = false;
  JSONdata: Array<any> = [];
  JSONdataTiposServicio: Array<any> = [];
  JSONdataPerfilComercio: Array<any> = [];
  JSONdataSolicitudesServicio: any = null;
  dataValues: Array<DatatableDataValues> = [
    { id: 'idPerfilComercio', header: 'IDC' },
    { id: 'nombrePerfilComercio', header: 'Nombre comercio' },
    { id: 'idServicio', header: 'IDS' },
    { id: 'nombre', header: 'Nombre servicio' },
    { id: 'nombreTipoServicio', header: 'Tipo de plan' },
    { id: 'duracionTipoServicio', header: 'Duración' },
    { id: 'valor', header: 'Valor', currency: true },
  ];
  serviceImage: string = 'assets/img/defaultsave.png';
  bitSolicitudesServicio: boolean = false;
  bsModalRef: BsModalRef;
  idItem: any = 0;

  //motivo rechazo 
  @ViewChild('rejectedModal', { static: false }) rejectedModal: ModalDirective;

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService,
    private modalService: BsModalService,
    private route: ActivatedRoute) {
    this.userData = this.session.getUserData();
  }

  getData(idCommerce?: number) {

    this.api.HttpGet(`api/Servicios`).subscribe(res => {
      let data = res as Array<any>;
      if (idCommerce != null && idCommerce != 0) {
        this.JSONdata = data.filter(x => x.idPerfilComercio == idCommerce);
      } else {
        this.JSONdata = data
      }

      this.getTiposServicio();
      this.getPerfilComercio();
    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getTiposServicio() {
    this.api.HttpGet(`api/TiposServicio`).subscribe(res => {
      let data = res as Array<any>;
      this.JSONdataTiposServicio = data.filter(x => x.estado == true);
    }, err => {
      console.log(err);
      this.JSONdataTiposServicio = [];
    });

  }

  getPerfilComercio() {
    this.api.HttpGet(`api/PerfilComercio`).subscribe(res => {
      let data = res as Array<any>;
      this.JSONdataPerfilComercio = data.filter(x => x.estado == true);
    }, err => {
      console.log(err);
      this.JSONdataPerfilComercio = [];
    });

  }

  getItem(id) {
    this.idItem = id;
    this.api.HttpGet(`api/Servicios/${id}`).subscribe(res => {

      this.registerForm.patchValue({
        idServicio: res['idServicio'],
        idPerfilComercio: res['idPerfilComercio'],
        idTipoServicio: res['idTipoServicio'],
        nombre: (res['nombre'] ? res['nombre'] : ''),
        cantidadSesiones: (res['cantidadSesiones'] ? res['cantidadSesiones'] : 0),
        duracionTipoServicio: (res['duracionTipoServicio'] ? res['duracionTipoServicio'] : 0),
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        valor: (res['valor'] ? res['valor'] : 0),
        estado: (res['estado'] ? res['estado'] : false),
        imgServicio: res['imgServicio'],
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

      if (res['imgServicio']) {
        this.serviceImage = res['imgServicio'].toString();
      } else {
        this.serviceImage = 'assets/img/defaultsave.png';
      }

      if (res["eSolicitudesServicio"]) {
        this.bitSolicitudesServicio = true;
        this.JSONdataSolicitudesServicio = res["eSolicitudesServicio"];
      } else {
        this.bitSolicitudesServicio = false;
        this.JSONdataSolicitudesServicio = null;
      }

    });
  }

  changeState(id) {

    this.api.HttpGet(`api/Servicios/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idServicio: res['idServicio'],
        idPerfilComercio: res['idPerfilComercio'],
        idTipoServicio: res['idTipoServicio'],
        nombre: (res['nombre'] ? res['nombre'] : ''),
        cantidadSesiones: (res['cantidadSesiones'] ? res['cantidadSesiones'] : 0),
        duracionTipoServicio: (res['duracionTipoServicio'] ? res['duracionTipoServicio'] : 0),
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        valor: (res['valor'] ? res['valor'] : 0),
        estado: (res['estado'] ? res['estado'] : false),
        imgServicio: res['imgServicio'],
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

      this.registerForm.get('estado').setValue(!this.registerForm.get('estado').value);

      this.onSubmit();
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

        this.api.HttpPost(`api/Servicios`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/Servicios/${data.idServicio}`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      }
    }
  }

  onRejectedSolicitud() {
    this.rejectedModal.show();
  }

  onApproveSolicitud(isRejected) {
    this.dialog._openConfirmDialog('¿Está seguro de aprobar el perfil?').then(res => {
      if (res) {
        this.onSubmitSolicitud(isRejected);
      }
    });
  }

  onSubmitSolicitud(isRejected) {
    this.submittedSolicitudForm = true;
    this.registerSolicitudForm.get('idSolicitud').setValue(this.JSONdataSolicitudesServicio.idSolicitud);
    this.registerSolicitudForm.get('idServicio').setValue(this.JSONdataSolicitudesServicio.idServicio);
    this.registerSolicitudForm.get('estado').setValue(isRejected ? 'RECHAZADO' : 'APROBADO');
    this.registerSolicitudForm.get('motivoRechazo').setValue(isRejected ? this.registerSolicitudForm.value.motivoRechazo : 'Se aprueba el servicio');

    if (this.registerSolicitudForm.invalid) {
      this.dialog.openDialog('warning', 'Debes diligenciar los campos obligatiorios');
      return;

    } else {
      let data = this.registerSolicitudForm.value;
      this.api.HttpPut(`api/SolicitudesServicio/${data.idSolicitud}`, data).subscribe(res => {
        this.dialog.openDialog('success', 'Guardado con éxito');
        this.rejectedModal.hide();
        this.getItem(this.JSONdataSolicitudesServicio.idServicio);
        this.clearSolicitudForm();
      });

    }

  }

  onOpenHistorySolicitud() {
    const options = {
      // list: [this.idItem],
      'ignoreBackdropClick': true,
      'class': 'modal-lg',
      'animated': true
    };
    this.bsModalRef = this.modalService.show(HistoryRequestServiceComponent, options);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.idRegister = this.idItem;
  }

  ngOnInit(): void {
    this.initForms();

    this.route.queryParams.subscribe(params => {
      if (params['id'] !== undefined) {
        this.getData(params['id']);
      } else {
        this.getData();
      }
    });

  }

  get f() { return this.registerForm.controls; }

  get h() { return this.registerSolicitudForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idServicio: null,
      idPerfilComercio: ['', Validators.required],
      idTipoServicio: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidadSesiones: ['', Validators.required],
      duracionTipoServicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
      estado: true,
      imgServicio: null,
      usuarioCreacion: this.userData.userId,
      usuarioModificacion: this.userData.userId
    });

    this.initSolicitudForms();
  }

  initSolicitudForms() {
    this.registerSolicitudForm = this.formBuilder.group({
      idSolicitud: null,
      idServicio: null,
      estado: 'PENDIENTE',
      motivoRechazo: ['', Validators.required],
      usuarioRevision: this.userData.userId,
    });
  }

  clearForm() {
    this.cancelForm();
    this.getData();
    this.clearSolicitudForm();
  }

  clearSolicitudForm() {
    this.rejectedModal.hide();
    this.submittedSolicitudForm = false;
    this.registerSolicitudForm.reset();
    this.initSolicitudForms();
  }

  cancelForm() {
    this.dtService.reset();
    this.idItem = 0;
    this.submittedForm = false;
    this.bitSolicitudesServicio = false;
    this.submittedSolicitudForm = false;
    this.registerForm.reset();
    this.registerSolicitudForm.reset();
    this.initForms();
  }

}
