import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  userData: any;
  dynamicMenuList: Array<any> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private session: SessionService) {
    this.userData = this.session.getUserData();
    if(this.userData == null){
      this.router.navigate(['/'],{replaceUrl:true});
    }
  }

  getDynamicMainMenu() {

    this.httpClient.get(`assets/json/menu-map.json`).subscribe(res => {

      this.dynamicMenuList = res as Array<any>;

    }, err => {
      console.log(err);
      this.dynamicMenuList = [];
    });

  }

  goToRoot(index) {

    const arrayMenus = this.dynamicMenuList[index];

    if (arrayMenus.menuList[0].root != "") {
      localStorage.setItem('activatedMenu', JSON.stringify(arrayMenus));
      this.router.navigate([arrayMenus.menuList[0].root]);
    } else {
      this.router.navigate(['not-found-page']);
    }

  }

  ngOnInit(): void {
    this.getDynamicMainMenu();
  }

}
