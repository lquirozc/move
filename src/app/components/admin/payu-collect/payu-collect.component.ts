import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payu-collect',
  templateUrl: './payu-collect.component.html',
  styleUrls: ['./payu-collect.component.scss']
})
export class PayuCollectComponent implements OnInit {

  @ViewChild('collecBtn') collecBtn: ElementRef;
  registerForm: FormGroup;

  formLabels: any = {
    merchantId: null,
    accountId: null,
    description: null,
    referenceCode: null,
    amount: null,
    tax: null,
    taxReturnBase: null,
    currency: null,
    signature: null,
    test: null,
    buyerEmail: null,
    buyerFullName: null,
    payerFullName: null,
    billingAddress: null,
    payerPhone: null,
    payerDocument: null,
    responseUrl: null,
    confirmationUrl: null,
    urlCollect: null
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

  actionForm() {

    setTimeout(() => {
      this.collecBtn.nativeElement.click();
    }, 500);

  }

  initForms(params) {

    const payuCollect = params['payuCollect'];
    let urlEncoded = decodeURIComponent(payuCollect);
    let JSONData = JSON.parse(urlEncoded);

    this.formLabels = {
      merchantId: JSONData['merchantId'],
      accountId: JSONData['accountId'],
      description: JSONData['description'],
      referenceCode: JSONData['referenceCode'],
      amount: JSONData['amount'],
      tax: JSONData['tax'],
      taxReturnBase: JSONData['taxReturnBase'],
      currency: JSONData['currency'],
      signature: JSONData['signature'],
      test: JSONData['test'],
      buyerEmail: JSONData['buyerEmail'],
      buyerFullName: JSONData['buyerFullName'],
      payerFullName: JSONData['payerFullName'],
      billingAddress: JSONData['billingAddress'],
      payerPhone: JSONData['payerPhone'],
      payerDocument: JSONData['payerDocument'],
      responseUrl: JSONData['responseUrl'],
      confirmationUrl: JSONData['confirmationUrl'],
      urlCollect: JSONData['urlCollect']
    }

    this.actionForm();
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.initForms(params);
    });
  }
}
