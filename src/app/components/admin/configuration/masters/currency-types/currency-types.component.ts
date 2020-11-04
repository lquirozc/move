import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { Subject } from 'rxjs';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';

@Component({
  selector: 'app-currency-types',
  templateUrl: './currency-types.component.html',
  styleUrls: ['./currency-types.component.scss']
})
export class CurrencyTypesComponent implements OnInit {

  @Input() searcherText: string;
  // isEditing: boolean = false;

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  // isNew: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idTiposMoneda', header: 'ID' },
    { id: 'descripcion', header: 'Descripción' },
    { id: 'simbolo', header: 'Simbolo' },
    { id: 'codigo', header: 'Codigo' },
  ];
  
  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/TiposMoneda`).subscribe(res => {

      this.JSONdata = res as Array<any>;
      //this.fillJSONdata(this.JSONdata);

    }, err => {
      console.log(err);
      this.JSONdata = [];
      //this.fillJSONdata(this.JSONdata);
    });
  }

  getItem(id) {

    this.api.HttpGet(`api/TiposMoneda/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTiposMoneda: res['idTiposMoneda'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        simbolo: (res['simbolo'] ? res['simbolo'] : ''),
        codigo: (res['codigo'] ? res['codigo'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
      });

    });
  }

  changeState(id) {
   
    this.api.HttpGet(`api/TiposMoneda/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idTiposMoneda: res['idTiposMoneda'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
        simbolo: (res['simbolo'] ? res['simbolo'] : ''),
        codigo: (res['codigo'] ? res['codigo'] : ''),
        estado: (res['estado'] ? res['estado'] : false),
      });

      this.registerForm.get('estado').setValue(!this.registerForm.get('estado').value);
      // this.JSONdata[index].estado = !this.JSONdata[index].estado;
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

        this.api.HttpPost(`api/TiposMoneda`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/TiposMoneda/${data.idTiposMoneda}`, data).subscribe(res => {
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
      idTiposMoneda: null,
      descripcion: ['', Validators.required],
      simbolo: ['', Validators.required],
      codigo: ['', Validators.required],
      estado: true,
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
