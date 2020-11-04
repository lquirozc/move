import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
  pure: false
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: string): Array<any> {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: string) => this.applyFilter(item, filter));
  }

  applyFilter(customObject: any, filter: string): boolean {

    let flag: boolean = false;

    for (let field in customObject) {
      if (customObject[field]) {

        if (customObject[field].toString().toLowerCase().indexOf(filter.toLowerCase()) === -1) {
          flag = false;
        }else{
          flag = true;
          break;
        }
      }
    }
    return flag;
  }
}
