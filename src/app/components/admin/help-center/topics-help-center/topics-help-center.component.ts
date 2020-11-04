import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';


@Component({
  selector: 'app-topics-help-center',
  templateUrl: './topics-help-center.component.html',
  styleUrls: ['./topics-help-center.component.scss']
})
export class TopicsHelpCenterComponent implements OnInit {

  searcherText: any;
  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idTemasCentroAyuda', header: 'ID' },
    { id: 'descripcion', header: 'Descripción' },
  ];

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/TemasCentroAyuda`).subscribe(res => {

      this.JSONdata = res as Array<any>;

    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }


  getItem(id) {

    this.api.HttpGet(`api/TemasCentroAyuda/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTemasCentroAyuda: res['idTemasCentroAyuda'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
        usuarioCreacion: this.userData.userId,
        usuarioModificacion: this.userData.userId
      });

    });
  }

  changeState(id) {

    this.api.HttpGet(`api/TemasCentroAyuda/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTemasCentroAyuda: res['idTemasCentroAyuda'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
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

        this.api.HttpPost(`api/TemasCentroAyuda`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/TemasCentroAyuda/${data.idTemasCentroAyuda}`, data).subscribe(res => {
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
      idTemasCentroAyuda: null,
      descripcion: ['', Validators.required],
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
