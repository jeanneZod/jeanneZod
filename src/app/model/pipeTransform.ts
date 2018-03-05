import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'camelCase'})
export class CamelCase implements PipeTransform {
    transform(value: string): string {
          return value.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));

  }
  }
