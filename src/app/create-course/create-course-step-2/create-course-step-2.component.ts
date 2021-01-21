import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromoPeriodValidator } from '../../validators/promo-period.validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null,[
      Validators.required,
      Validators.min(1),
      Validators.max(999),
      Validators.pattern('[0-9]+')
    ]],
    thumbnail: [null],
    promoStartDate: [null],
    promoEndDate: [null]
  },
  {
   validators: [createPromoPeriodValidator],
   updateOn: 'blur'
  });

  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {



  }

}
