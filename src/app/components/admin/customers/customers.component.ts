import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DatatableDataValues } from '../../shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from '../../shared/custom-datatable/custom-datatable.module';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { isNullOrUndefined } from 'util';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  registerForm: FormGroup;
  JSONdata: Array<any> = [];
  JSONDataServicios: Array<any> = [];
  JSONdataTiposIdentificacion: Array<any> = [];
  userData: any;
  searcherText: any;
  submittedForm: boolean = false;
  dataValues: Array<DatatableDataValues> = [
    { id: 'idUsuarioCliente', header: 'ID' },
    { id: 'identificacion', header: 'Identificación' },
    { id: 'nombres', header: 'Nombres' },
    { id: 'apellidos', header: 'Apellidos' },
  ];
  bsOptions: any = { dateInputFormat: 'DD/MM/YYYY', maxdate: new Date() };
  idItem: any = 0;
  searched: boolean = false;
  profileImage: string = 'assets/img/defaultProfile.jpg';
  selects: any = {
    paises: null,
    departamentos: null,
    ciudades: null,
    barrios: null,
  }
  preSelects = {
    country: 0,
    department: 0,
    city: 0,
    neighbor: 0
  }

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dtService: CustomDatatableService,
    private localeService: BsLocaleService,
    private dialog: DialogService) {
    this.userData = this.session.getUserData();
    this.localeService.use('es');
  }

  getData() {

    this.api.HttpGet(`api/UsuariosClientes`).subscribe(res => {
      this.JSONdata = res as Array<any>;
      this.getTiposIdentificacion();
    }, err => {
      console.log(err);
      this.JSONdata = [];
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

  getTiposIdentificacion() {
    this.api.HttpGet(`api/TiposDeIdentificacion`).subscribe(res => {

      this.JSONdataTiposIdentificacion = res as Array<any>;

    }, err => {
      console.log(err);
      this.JSONdataTiposIdentificacion = [];
    });
  }

  getItem(id) {
    this.idItem = id;

    this.api.HttpGet(`api/UsuariosClientes/${id}`).subscribe(res => {

      this.preSelects.country = res['idPais'];
      this.preSelects.department = res['idDepartamento'];
      this.preSelects.city = res['idCiudad'];
      this.preSelects.neighbor = res['idBarrio'];

      this.registerForm.patchValue({
        idUsuarioCliente: res['idUsuarioCliente'],
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
        idPais: res['idPais'],
        idDepartamento: res['idDepartamento'],
        idCiudad: res['idCiudad'],
        idBarrio: res['idBarrio'],
        fotoPerfil: res['fotoPerfil'],
      });

      if (res['fotoPerfil']) {
        this.profileImage = res['fotoPerfil'].toString();
      } else {
        this.profileImage = 'assets/img/defaultProfile.jpg';
      }

      const lstAdjuntos = res["lstServicios"];
      if (lstAdjuntos.length > 0) {
        this.JSONDataServicios = lstAdjuntos;
      }

      this.getPaises();
      this.getDepartamentos();
      this.getCiudades();
      this.getBarrios();

    });

  }

  changeState(id) {
    this.api.HttpGet(`api/UsuariosClientes/${id}`).subscribe(res => {

      this.registerForm.patchValue({
        idUsuarioCliente: res['idUsuarioCliente'],
        idTipoIdentificacion: res['idTipoIdentificacion'],
        identificacion: (res['identificacion'] ? res['identificacion'] : ''),
        nombres: (res['nombres'] ? res['nombres'] : ''),
        apellidos: (res['apellidos'] ? res['apellidos'] : ''),
        direccion: (res['direccion'] ? res['direccion'] : ''),
        email: (res['email'] ? res['email'] : ''),
        telefono: (res['telefono'] ? res['telefono'] : ''),
        fechaNacimiento: (res['fechaNacimiento'] ? (new Date(res['fechaNacimiento'])) : new Date()),
        genero: (res['genero'] ? res['genero'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
        idPais: res['idPais'],
        idDepartamento: res['idDepartamento'],
        idCiudad: res['idCiudad'],
        idBarrio: res['idBarrio'],
        fotoPerfil: res['fotoPerfil'],
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

        this.api.HttpPost(`api/UsuariosClientes`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/UsuariosClientes/${data.idUsuarioCliente}`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      }
    }
  }

  get f() { return this.registerForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idUsuarioCliente: null,
      idTipoIdentificacion: ['', Validators.required],
      idPais: [null, Validators.required],
      idDepartamento: [null, Validators.required],
      idCiudad: [null, Validators.required],
      idBarrio: null,
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: [new Date(), Validators.required],
      genero: ['', Validators.required],
      estado: true,
      fotoPerfil: null
    });
  }

  ngOnInit(): void {
    this.getData();
    this.initForms();
  }

  cancelForm() {
    this.dtService.reset();
    this.submittedForm = false;
    this.registerForm.reset();
    this.initForms();
  }

  clearForm() {
    this.cancelForm();
    this.getData();
  }

}