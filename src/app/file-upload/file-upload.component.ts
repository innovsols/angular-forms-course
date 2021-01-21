
import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { noop, of } from 'rxjs';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  }, {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: FileUploadComponent
  }]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  constructor(private http: HttpClient) {

  }
  

  @Input()
  requiredFileType: string;

  fileName = '';

  fileUploadError = false;

  uploadProgress: number;

  fileUploadSuccess = false;

  disabled = false;

  onChange = (filename: string) => { };

  onTouched = () => {};

  validate(control: AbstractControl): ValidationErrors | null{
    if(this.fileUploadSuccess) {
      return null;
    }
    const errors: any = {
      requiredFileType: this.requiredFileType
    };

    if(this.fileUploadError) {
      errors.uploadFailed =  true;
    }
    return errors;
  }
   writeValue(value: any): void {
    this.fileName = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(fileupload: HTMLInputElement) {
    this.onTouched();
    fileupload.click();
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];

    this.fileName = file.name;
    const formData = new FormData();

    formData.append('thumbnail', file);

    this.fileUploadError = false;

    this.http.post('/api/thumbnail-upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(error => {
        this.fileUploadError = true;
        return of(error);
        // tslint:disable-next-line: no-shadowed-variable
      }),
      finalize(() => {
        this.uploadProgress = null;
      }
      )).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.type == HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
        }
      });

  }

}
