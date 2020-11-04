import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-master-admin',
  templateUrl: './master-admin.component.html',
  styleUrls: ['./master-admin.component.scss']
})
export class MasterAdminComponent implements OnInit {

  menuTopOffset: number = 0;
  activeIndex: number = 0;
  activatedMenu: any;
  menuItems: Array<any> = [];
  userData: any;
  companyProfileImg: string = 'assets/img/default-user.png';

  constructor(
    private router: Router,
    private session: SessionService,
    private auth: AuthService) {

    this.userData = this.session.getUserData();
    if (this.userData == null) {
      this.router.navigate(['/'], { replaceUrl: true });
    }

    if (localStorage.getItem('activatedMenu') != '') {
      this.activatedMenu = JSON.parse(localStorage.getItem('activatedMenu'));
      this.menuItems = this.activatedMenu.menuList;
    } else {
      this.router.navigate(['not-found-page']);
    }

    // if (this.router.getCurrentNavigation().extras.state) {
    //   this.activeIndex = this.router.getCurrentNavigation().extras.state.data.menuIndex;
    // }

    if (this.router.url) {
      const currentUrl = this.router.url;
      this.activeIndex = this.activatedMenu.menuList.findIndex(x => x.root.includes(currentUrl));
    }

  }

  closeSession() {
    this.auth.logOut();
  }

  goToRootMenu(index) {

    const menuRoot = this.menuItems[index].root;

    if (menuRoot != '') {
      this.router.navigate([menuRoot], {
        state: {
          data:
          {
            menuIndex: index
          }
        }
      });
    } else {
      this.router.navigate(['not-found-page']);
    }

  }

  backToMainMenu() {
    this.router.navigate(['menu'], { replaceUrl: true });
  }

  ngOnInit(): void {
  }

}
