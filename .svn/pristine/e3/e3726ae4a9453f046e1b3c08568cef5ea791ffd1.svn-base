import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  dataFocus: any = {
    inputFocus: false
  }
  isLoading = new Subject<boolean>();
  isLoadingFull = new Subject<boolean>();

  changeFocus(state: boolean) {
    this.dataFocus.inputFocus = state;
  }

  show() {
    this.isLoading.next(true);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader');
  }
  hide() {
    this.isLoading.next(false);
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('loader');
  }
}
