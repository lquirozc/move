import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { Subject } from 'rxjs';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';


@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {

  searcherText: any;
  registerForm: FormGroup;
  userData: any;
  submittedForm: boolean = false;
  JSONdata: Array<any> = [];
  dataValues: Array<DatatableDataValues> = [
    { id: 'paymentGatewayID', header: 'ID' },
    { id: 'name', header: 'Nombre' },
    { id: 'urlApi', header: 'Url Api' },
    { id: 'urlInformation', header: 'Url Information' },
  ];

  constructor(private formBuilder: FormBuilder,
    private session: SessionService,
    private api: ApiService,
    private dialog: DialogService,
    private dtService: CustomDatatableService) {
    this.userData = this.session.getUserData();
  }

  getData() {

    this.api.HttpGet(`api/PaymentGateway`).subscribe(res => {

      this.JSONdata = res as Array<any>;
    }, err => {
      console.log(err);
      this.JSONdata = [];
    });
  }


  getItem(id) {

    this.api.HttpGet(`api/PaymentGateway/${id}`).subscribe(res => {

      this.registerForm.setValue({
        paymentGatewayID: res['paymentGatewayID'],
        name: (res['name'] ? res['name'] : ''),
        code: (res['code'] ? res['code'] : ''),
        nameImage: (res['nameImage'] ? res['nameImage'] : ''),
        urlApi: (res['urlApi'] ? res['urlApi'] : ''),
        urlInformation: (res['urlInformation'] ? res['urlInformation'] : ''),
        urlCollect: (res['urlCollect'] ? res['urlCollect'] : ''),
        del: (res['del'] ? res['del'] : false),
        test: (res['test'] ? res['test'] : false),
        userCreation: this.userData.userId,
        userModification: this.userData.userId
      });

    });
  }

  changeState(id) {

    this.api.HttpGet(`api/PaymentGateway/${id}`).subscribe(res => {

      this.registerForm.setValue({
        paymentGatewayID: res['paymentGatewayID'],
        name: (res['name'] ? res['name'] : ''),
        code: (res['code'] ? res['code'] : ''),
        nameImage: (res['nameImage'] ? res['nameImage'] : ''),
        urlApi: (res['urlApi'] ? res['urlApi'] : ''),
        urlInformation: (res['urlInformation'] ? res['urlInformation'] : ''),
        urlCollect: (res['urlCollect'] ? res['urlCollect'] : ''),
        del: (res['del'] ? res['del'] : false),
        test: (res['test'] ? res['test'] : false),
        userCreation: this.userData.userId,
        userModification: this.userData.userId
      });

      this.registerForm.get('test').setValue(!this.registerForm.get('test').value);

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

        this.api.HttpPost(`api/PaymentGateway`, data).subscribe(res => {
          this.dialog.openDialog('success', 'Guardado con éxito');
          this.clearForm();
        });

      } else {

        this.api.HttpPut(`api/PaymentGateway/${data.paymentGatewayID}`, data).subscribe(res => {
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
      paymentGatewayID: null,
      name: ['', Validators.required],
      code: ['', Validators.required],
      nameImage: ['', Validators.required],
      urlApi: ['', Validators.required],
      urlInformation: ['', Validators.required],
      urlCollect: '',
      del: false,
      test: true,
      userCreation: this.userData.userId,
      userModification: this.userData.userId
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

