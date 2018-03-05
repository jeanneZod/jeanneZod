import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'localDate'})
export class LocalDate implements PipeTransform {
    transform(value: Date){
      console.log(value);
      const dTime = value.toLocaleTimeString();
      const dDay = value.toDateString();
      return `${dDay}+ +${dTime}`;

  }
  }
