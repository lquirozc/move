import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  submittedForm: boolean = false;
  restoreForm: FormGroup;
  type;
  commerceId;
  userId;
  userEmail;
  isActive: boolean = false;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  getAccountData() {
    this.type = this.route.snapshot.paramMap.get("type");
    this.userId = this.route.snapshot.paramMap.get("userId");

    this.apiService.HttpGet(`api/Usuarios/${this.userId}`).subscribe(res => {
      if (!res['estado']) {
        this.userEmail = res['usuario'];
        this.isActive = res['estado'];
      } else {
        this.userEmail = res['usuario'];
        this.isActive = res['estado'];
      }

    }, err => {
      this.router.navigate(['not-found-page'], { replaceUrl: true })
    });;

  }

  onSubmit() {

    this.submittedForm = true;

    if (this.restoreForm.invalid) {

      if (this.restoreForm.get('contrasenaConfirm').hasError('NoPassswordMatch')) {

        this.dialogService.openDialog('warning', "Las contraseñas no coinciden.");

      } else {

        this.dialogService.openDialog('warning', "Debes diligenciar todos los campos.");
      }

      return;
    }

    let data = this.restoreForm.value;
    this.apiService.HttpPut(`api/Usuarios/${this.userId}`, data).subscribe(res => {

      this.dialogService.openDialog('success', "Tu contraseña ha sido cambiada!");
      this.isActive = true;
    });
  }

  initForms() {

    this.restoreForm = this.formBuilder.group({
      contrasena: [null, Validators.required],
      contrasenaConfirm: [null],
    }, { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('contrasena').value; // get password from our password form control
    const confirmPassword: string = control.get('contrasenaConfirm').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('contrasenaConfirm').setErrors({ NoPassswordMatch: true });
    }
  }

  get f() { return this.restoreForm.controls; }

  ngOnInit(): void {

    this.initForms();
    this.getAccountData();
  }

}
