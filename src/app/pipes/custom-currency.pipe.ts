import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(n: any): string {
    return '$' + parseFloat(n).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
