import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  loginForm: FormGroup;
  loginData: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private authService: AuthService,
    private apiService: ApiService,
    private sessionServices: SessionService,
    private loader: LoaderService,
    private router: Router) { }


  onSubmitLogin() {

    if (this.loginForm.invalid) {
      this.dialogService.openDialog('warning', 'Debes ingresar los campos obligatorios');
      return;
    } else {

      this.loginData = {
        userName: this.loginForm.value["user"],
        password: this.loginForm.value["password"],
        useRefreshTokens: true,
        typeApplication: 'Admin',
      }

      this.getLogin(this.loginData, false);

    }
  }

  getLogin(logData, isLogged) {
    this.authService.login(logData).then(res => {
      this.getAuth(isLogged);
    });
  }

  getAuth(isLogged) {

    this.apiService.HttpGet('api/Auth').subscribe(res => {

      const data = res;
      this.sessionServices.setUserData({
        identification: data[0].identification,
        name: data[0].name,
        lastName: data[0].lastName,
        userName: data[0].userId.username,
        userId: data[0].userId,
        email: data[0].email
      });

      if (!isLogged) {

        this.router.navigate(['/menu'], { replaceUrl: true });

      }
    });

  }

  initForms() {

    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.initForms();
  }

}
