import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { HistoryRequestCommerceComponent } from './history-request-commerce/history-request-commerce.component';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-register-commerce',
  templateUrl: './register-commerce.component.html',
  styleUrls: ['./register-commerce.component.scss']
})
export class RegisterCommerceComponent implements OnInit {

  searcherText: any;
  registerForm: FormGroup;
  registerSolicitudForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  submittedSolicitudForm: boolean = false;
  JSONdata: Array<any> = [];
  JSONdataTiposIdentificacion: Array<any> = [];
  JSONdataComercios: Array<any> = [];
  JSONdataSolicitudesComercios: any = null;
  dataValues: Array<DatatableDataValues> = [
    { id: 'idPerfilComercio', header: 'ID' },
    { id: 'nombreComercio', header: 'Comercio' },
    { id: 'identificacion', header: 'Identificación' },
    { id: 'nombres', header: 'Nombres' },
    { id: 'apellidos', header: 'Apellidos' },
  ];
  bsOptions: any = { dateInputFormat: 'DD/MM/YYYY', maxdate: new Date() };
  profileImage: string = 'assets/img/defaultProfile.jpg';
  identifiImage: string = 'assets/img/defaultsave.png';
  JSONDataAdjuntoCedula: Array<any> = [];
  JSONDataAdjuntoCertificado: Array<any> = [];
  bitSolicitudesComercio: boolean = false;
  bsModalRef: BsModalRef;
  idItem: any = 0;
  selects: any = {
    paises: null,
    departamentos: null,
    ciudades: null,
    barrios: null,
    bancos: null,
  }
  preSelects = {
    country: 0,
    department: 0,
    city: 0,
    neighbor: 0
  }
  searched: boolean = false;

  @ViewChild('rejectedModal', { static: false }) rejectedModal: ModalDirective;

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private router: Router) {
    this.userData = this.session.getUserData();
    this.localeService.use('es');
  }

  getData() {

    this.api.HttpGet(`api/PerfilComercio`).subscribe(res => {
      this.JSONdata = res as Array<any>;
      this.getBancos();
      this.getTiposIdentificacion();
      this.getComercios();
    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getTiposIdentificacion() {
    this.api.HttpGet(`api/TiposDeIdentificacion`).subscribe(res => {

      this.JSONdataTiposIdentificacion = res as Array<any>;

    }, err => {
      console.log(err);
      this.JSONdataTiposIdentificacion = [];
    });
  }

  getPaises() {
    this.api.HttpGet(`api/Paises?noload`).subscribe(res => {
      let data = res as Array<any>;
      this.selects.paises = data.filter(x => x.estado === true);

      setTimeout(() => {
        this.registerForm.get('idPais').setValue(this.preSelects.country);
        this.searched = true;
      }, 300);


    }, err => {
      console.log(err);
      this.selects.paises = [];
    });
  }

  getDepartamentos() {

    const id = this.registerForm.get('idPais').value;

    if (!isNullOrUndefined(id)) {

      this.api.HttpGet(`api/Departamentos?idPais=${id}&noload`).subscribe(res => {

        let data = res as Array<any>;
        this.selects.departamentos = data.filter(x => x.estado == true);

        setTimeout(() => {
          this.registerForm.get('idDepartamento').setValue(this.preSelects.department);
        }, 300);


      }, err => {
        console.log(err);
        this.selects.departamentos = [];
      });

    }
  }

  getCiudades() {

    const id = this.registerForm.get('idDepartamento').value;

    if (!isNullOrUndefined(id)) {

      this.api.HttpGet(`api/Ciudades?idDepartamento=${id}&noload`).subscribe(res => {
        let data = res as Array<any>;
        this.selects.ciudades = data.filter(x => x.estado == true);

        setTimeout(() => {
          this.registerForm.get('idCiudad').setValue(this.preSelects.city);
        }, 300);


      }, err => {
        console.log(err);
        this.selects.ciudades = [];
      });

    }
  }

  getBarrios() {

    const id = this.registerForm.get('idCiudad').value;

    if (!isNullOrUndefined(id)) {

      this.api.HttpGet(`api/Barrio?idCiudad=${id}&noload`).subscribe(res => {
        let data = res as Array<any>;
        this.selects.barrios = data.filter(x => x.estado == true);

        setTimeout(() => {
          this.registerForm.get('idBarrio').setValue(this.preSelects.neighbor);
        }, 300);

      }, err => {
        console.log(err);
        this.selects.barrios = [];
      });
    }
  }

  getBancos() {
    this.api.HttpGet(`api/Banco?noload`).subscribe(res => {
      this.selects.bancos = res as Array<any>;
    }, err => {
      console.log(err);
      this.selects.bancos = [];
    });
  }


  getComercios() {
    this.api.HttpGet(`api/Comercios`).subscribe(res => {
      let data = res as Array<any>;
      this.JSONdataComercios = data.filter(x => x.estado == true);
    }, err => {
      console.log(err);
      this.JSONdataComercios = [];
    });
  }

  getItem(id) {

    this.idItem = id;
    this.api.HttpGet(`api/PerfilComercio/${id}`).subscribe(res => {

      this.preSelects.country = res['idPais'];
      this.preSelects.department = res['idDepartamento'];
      this.preSelects.city = res['idCiudad'];
      this.preSelects.neighbor = res['idBarrio'];

      this.registerForm.patchValue({
        idPerfilComercio: res['idPerfilComercio'],
        idTipoIdentificacion: res['idTipoIdentificacion'],
        idComercio: res['idComercio'],
        identificacion: (res['identificacion'] ? res['identificacion'] : ''),
        nombres: (res['nombres'] ? res['nombres'] : ''),
        apellidos: (res['apellidos'] ? res['apellidos'] : ''),
        direccion: (res['direccion'] ? res['direccion'] : ''),
        email: (res['email'] ? res['email'] : ''),
        telefono: (res['telefono'] ? res['telefono'] : ''),
        fechaNacimiento: (res['fechaNacimiento'] ? (new Date(res['fechaNacimiento'])) : new Date()),
        genero: (res['genero'] ? res['genero'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
        tipoCuenta: res['tipoCuenta'] ? res['tipoCuenta'].toString() : null,
        numeroCuenta: res['numeroCuenta'],
        idPais: res['idPais'],
        idDepartamento: res['idDepartamento'],
        idCiudad: res['idCiudad'],
        idBarrio: res['idBarrio'],
        idBanco: res['idBanco'], 
        fotoPerfil: res['fotoPerfil'],       
        eAdjuntosxPerfilComercio: [],
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

      if (res['fotoPerfil']) {
        this.profileImage = res['fotoPerfil'].toString();
      } else {
        this.profileImage = 'assets/img/defaultProfile.jpg';
      }

      const lstAdjuntos = res["eAdjuntosxPerfilComercio"];
      if (lstAdjuntos.length > 0) {
        this.JSONDataAdjuntoCertificado = lstAdjuntos.filter(x => x.tipo == "CERTIFICADO");
        this.JSONDataAdjuntoCedula = lstAdjuntos.filter(x => x.tipo == "CEDULA");
      } else {
        this.JSONDataAdjuntoCertificado = [];
        this.JSONDataAdjuntoCedula = [];
      }

      if (res["eSolicitudesComercio"]) {
        this.bitSolicitudesComercio = true;
        this.JSONdataSolicitudesComercios = res["eSolicitudesComercio"];
      } else {
        this.bitSolicitudesComercio = false;
        this.JSONdataSolicitudesComercios = null;
      }

      this.getPaises();
      this.getDepartamentos();
      this.getCiudades();
      this.getBarrios();

    });
  }


  changeState(id) {

    this.api.HttpGet(`api/PerfilComercio/${id}`).subscribe(res => {

      this.registerForm.patchValue({
        idPerfilComercio: res['idPerfilComercio'],
        idTipoIdentificacion: res['idTipoIdentificacion'],
        idComercio: res['idComercio'],
        identificacion: (res['identificacion'] ? res['identificacion'] : ''),
        nombres: (res['nombres'] ? res['nombres'] : ''),
        apellidos: (res['apellidos'] ? res['apellidos'] : ''),
        direccion: (res['direccion'] ? res['direccion'] : ''),
        email: (res['email'] ? res['email'] : ''),
        telefono: (res['telefono'] ? res['telefono'] : ''),
        fechaNacimiento: (res['fechaNacimiento'] ? (new Date(res['fechaNacimiento'])) : new Date()),
        genero: (res['genero'] ? res['genero'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
        tipoCuenta: res['tipoCuenta'] ? res['tipoCuenta'].toString() : null,
        numeroCuenta: res['numeroCuenta'],
        idPais: res['idPais'],
        idDepartamento: res['idDepartamento'],
        idCiudad: res['idCiudad'],
        idBarrio: res['idBarrio'],
        idBanco: res['idBanco'], 
        fotoPerfil: res['fotoPerfil'],       
        eAdjuntosxPerfilComercio: [],
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

        this.api.HttpPost(`api/PerfilComercio`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/PerfilComercio/${data.idPerfilComercio}`, data).subscribe(res => {
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
    this.registerSolicitudForm.get('idSolicitud').setValue(this.JSONdataSolicitudesComercios.idSolicitud);
    this.registerSolicitudForm.get('idPerfilComercio').setValue(this.JSONdataSolicitudesComercios.idPerfilComercio);
    this.registerSolicitudForm.get('estado').setValue(isRejected ? 'RECHAZADO' : 'APROBADO');
    this.registerSolicitudForm.get('motivoRechazo').setValue(isRejected ? this.registerSolicitudForm.value.motivoRechazo : 'Se aprueba el perfil');

    if (this.registerSolicitudForm.invalid) {
      this.dialog.openDialog('warning', 'Debes diligenciar los campos obligatiorios');
      return;

    } else {
      let data = this.registerSolicitudForm.value;
      this.api.HttpPut(`api/SolicitudesComercio/${data.idSolicitud}`, data).subscribe(res => {
        this.dialog.openDialog('success', 'Guardado con éxito');
        this.rejectedModal.hide();
        this.getItem(this.JSONdataSolicitudesComercios.idPerfilComercio);
        this.clearSolicitudForm();
      });

    }

  }

  onOpenHistorySolicitud() {
    const options = {
      'ignoreBackdropClick': true,
      'class': 'modal-lg',
      'animated': true
    };
    this.bsModalRef = this.modalService.show(HistoryRequestCommerceComponent, options);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.idRegister = this.idItem;
  }

  onOpenShowServices() {

    this.router.navigate(['admin/register-service'], { queryParams: { id: this.idItem } });
  }

  ngOnInit(): void {

    this.initForms();
    this.getData();
  }

  get f() { return this.registerForm.controls; }

  get h() { return this.registerSolicitudForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idPerfilComercio: null,
      idTipoIdentificacion: ['', Validators.required],
      idPais: [null, Validators.required],
      idDepartamento: [null, Validators.required],
      idCiudad: [null, Validators.required],
      idBarrio: null,
      idComercio: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: [new Date(), Validators.required],
      genero: ['', Validators.required],
      estado: true,
      fotoPerfil:null,
      idBanco: null,
      tipoCuenta: null,
      numeroCuenta: null,
      usuarioCreacion: this.userData.userId,
      usuarioModificacion: this.userData.userId
    });

    this.initSolicitudForms();

  }

  initSolicitudForms() {
    this.registerSolicitudForm = this.formBuilder.group({
      idSolicitud: null,
      idPerfilComercio: null,
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
    this.bitSolicitudesComercio = false;
    this.JSONDataAdjuntoCertificado = [];
    this.submittedSolicitudForm = false;
    this.registerForm.reset();
    this.registerSolicitudForm.reset();
    this.initForms();
  }

}

