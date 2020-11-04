import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  type;
  userId;
  userEmail;
  isActive: boolean = false;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: DialogService,
    private router: Router) {
  }

  getAccountData() {

    this.type = this.route.snapshot.paramMap.get("type");
    this.userId = this.route.snapshot.paramMap.get("userId");


    if (this.type === '1') {//Comercio

      this.apiService.HttpGet(`api/PerfilComercio/${this.userId}`).subscribe(res => {
        if (res['estado']) {
          this.userEmail = res['email'];
          this.isActive = res['estado'];
        } else {
          this.userEmail = res['email'];
        }

      }, err => {
        this.router.navigate(['not-found-page'], { replaceUrl: true });
      });

    } else if (this.type === '2') {//Cliente
      this.apiService.HttpGet(`api/UsuariosClientes/${this.userId}`).subscribe(res => {
        if (res['estado']) {
          this.userEmail = res['email'];
          this.isActive = res['estado'];
        } else {
          this.userEmail = res['email'];
        }

      }, err => {
        this.router.navigate(['not-found-page'], { replaceUrl: true });
      });
    } else {
      this.router.navigate(['not-found-page'], { replaceUrl: true });
    }

  }

  ActivateAccount() {

    if (this.type === '1') {//Comercio

      this.apiService.HttpPut(`api/PerfilComercio/${this.userId}?state=true`, null).subscribe(res => {
        this.dialogService.openDialog('success', '¡Tu cuenta ha sido activada!');
        this.isActive = true;
      });;

    } else if (this.type === '2') {//Cliente
      this.apiService.HttpPut(`api/UsuariosClientes/${this.userId}?state=true`, null).subscribe(res => {
        this.dialogService.openDialog('success', '¡Tu cuenta ha sido activada!');
        this.isActive = true;
      });;
    } else {
      this.router.navigate(['not-found-page'], { replaceUrl: true });
    }
  }

  ngOnInit(): void {

    this.getAccountData();
  }

}
