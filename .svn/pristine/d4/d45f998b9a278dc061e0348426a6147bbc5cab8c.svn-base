import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableDataValues } from 'src/app/components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableService } from 'src/app/components/shared/custom-datatable/custom-datatable.module';


@Component({
  selector: 'app-ques-answ-help-center',
  templateUrl: './ques-answ-help-center.component.html',
  styleUrls: ['./ques-answ-help-center.component.scss']
})
export class QuesAnswHelpCenterComponent implements OnInit {

  searcherText:any;
    registerForm: FormGroup;
    userData: any;
    submittedForm: boolean = false;
    JSONdata: Array<any> = [];
    JSONdataTemas: Array<any> = [];
    dataValues: Array<DatatableDataValues> = [
      { id: 'idPregResCentroAyuda', header: 'ID' }, 
      { id: 'nombreTema', header: 'Tema' },
      { id: 'pregunta', header: 'Pregunta' }, 
      { id: 'respuesta', header: 'Respuesta' },    
    ];
  
    constructor(private formBuilder: FormBuilder,
      private session: SessionService,
      private api: ApiService,
      private dialog: DialogService,
      private dtService: CustomDatatableService) {
      this.userData = this.session.getUserData();
    }
  
    getData() {
  
      this.api.HttpGet(`api/PregResCentroAyuda`).subscribe(res => {
  
        this.JSONdata = res as Array<any>;
        this.getDataTemas();
  
      }, err => {
        console.log(err);
        this.JSONdata = [];
      });
    }
  
    getDataTemas() {
      this.api.HttpGet(`api/TemasCentroAyuda`).subscribe(res => {
        let data = res as Array<any>;
        this.JSONdataTemas = data.filter(x => x.estado == true);
      }, err => {
        console.log(err);
        this.JSONdataTemas = [];
  
      });
    }
  
    getItem(id) {
    
      this.api.HttpGet(`api/PregResCentroAyuda/${id}`).subscribe(res => {
  
        this.registerForm.setValue({
          idPregResCentroAyuda: res['idPregResCentroAyuda'],
          idTemasCentroAyuda: res['idTemasCentroAyuda'],        
          pregunta: (res['pregunta'] ? res['pregunta'] : ''),
          respuesta: (res['respuesta'] ? res['respuesta'] : ''),
          aplicaComercio: (res['aplicaComercio'] ? res['aplicaComercio'] : false),
          aplicaUsuariosClientes: (res['aplicaUsuariosClientes'] ? res['aplicaUsuariosClientes'] : false),
          estado: (res['estado'] ? res['estado'] : false),
          usuarioCreacion: this.userData.userId,
          usuarioModificacion: this.userData.userId
        });
  
      });
    }
  
    changeState(id) {
   
      this.api.HttpGet(`api/PregResCentroAyuda/${id}`).subscribe(res => {
  
        this.registerForm.setValue({
          idPregResCentroAyuda: res['idPregResCentroAyuda'],
          idTemasCentroAyuda: res['idTemasCentroAyuda'],        
          pregunta: (res['pregunta'] ? res['pregunta'] : ''),
          respuesta: (res['respuesta'] ? res['respuesta'] : ''),
          aplicaComercio: (res['aplicaComercio'] ? res['aplicaComercio'] : false),
          aplicaUsuariosClientes: (res['aplicaUsuariosClientes'] ? res['aplicaUsuariosClientes'] : false),
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
  
          this.api.HttpPost(`api/PregResCentroAyuda`, data).subscribe(res => {
            this.dialog.openDialog('success', 'Guardado con éxito');
            this.clearForm();
          });
  
        } else {
  
          this.api.HttpPut(`api/PregResCentroAyuda/${data.idPregResCentroAyuda}`, data).subscribe(res => {
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
        idPregResCentroAyuda: null,
        idTemasCentroAyuda: ['', Validators.required],
        pregunta: ['', Validators.required],
        respuesta: ['', Validators.required],
        aplicaComercio:false,
        aplicaUsuariosClientes:false,
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
  