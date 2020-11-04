import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { Subject } from 'rxjs';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent implements OnInit {

  @Input() searcherText: string;

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idTipoServicio', header: 'ID' },
    { id: 'descripcion', header: 'Descripción' },
    { id: 'nombreTipo', header: 'Tipo' },
  ];

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/TiposServicio`).subscribe(res => {
      this.JSONdata = res as Array<any>;
    }, err => {
      console.log(err);
      this.JSONdata = [];    
    });
  }

  getItem(id) {

    this.api.HttpGet(`api/TiposServicio/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTipoServicio: res['idTipoServicio'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        tipo: (res['tipo'] ? res['tipo'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

    });
  }

  changeState(id) {

    this.api.HttpGet(`api/TiposServicio/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTipoServicio: res['idTipoServicio'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),        
        tipo: (res['tipo'] ? res['tipo'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
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

        this.api.HttpPost(`api/TiposServicio`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/TiposServicio/${data.idTipoServicio}`, data).subscribe(res => {
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

  get f() { return this.registerForm.controls; }

  initForms() {
    this.registerForm = this.formBuilder.group({
      idTipoServicio: null,
      descripcion: ['', Validators.required],      
      tipo: ['', Validators.required],
      estado: true,
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
