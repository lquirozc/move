import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';


@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})

export class BanksComponent implements OnInit {

  @Input() searcherText: string;

  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'idBanco', header: 'ID' },
    { id: 'descripcion', header: 'Nombre' },
  ];

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/Banco`).subscribe(res => {

      this.JSONdata = res as Array<any>;

    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }

  getItem(id) {

    this.api.HttpGet(`api/Banco/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idBanco: res['idBanco'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
      });

    });
  }

  changeState(id) {

    this.api.HttpGet(`api/Banco/${id}`).subscribe(res => {

      this.registerForm.setValue({
        idBanco: res['idBanco'],
        descripcion: (res['descripcion'] ? res['descripcion'] : ''),
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

        this.api.HttpPost(`api/Banco`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/Banco/${data.idBanco}`, data).subscribe(res => {
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
      idBanco: null,
      descripcion: ['', Validators.required],      
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
