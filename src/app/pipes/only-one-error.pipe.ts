import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {

  transform(errors: any, errorsPriority: string[]): any {
    if(!errors){
      return null;
    }
    const onlyOneError: any = {}

    for (let error1 of errorsPriority) {
      if(errors[error1]) {
        onlyOneError[error1] = errors[error1];
        break;
      }
    }
    return onlyOneError;
  }

}
