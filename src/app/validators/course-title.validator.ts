import { CoursesService } from './../services/courses.service';
import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { map } from 'rxjs/operators';

export function courseTitleValidator(coursesService: CoursesService): AsyncValidatorFn {

    return (control: AbstractControl) => {
      return  coursesService.findAllCourses().pipe(
          map( courses => {
              const foundcourse = courses.find(
                 course => course.description.toLowerCase() === control.value.toLowerCase());
                               return foundcourse ? {titleExists: true} : null;
          })
      );
    };
}
