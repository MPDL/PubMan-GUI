import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'pure-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialogRef: DialogRef<string>,
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.builder.group({
      password: ['',[
        Validators.required,
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)]],
      repeatPassword: ['', Validators.compose([Validators.required])]
    },
      {
        // check whether our password and confirm password match
        validator: this.passwordMatchValidator
      });
  }

  save_settings(): void {
    console.log(this.settingsForm.value);
    if (this.settingsForm && this.settingsForm.valid ) {
      this.dialogRef.close(this.settingsForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')!.value; // get password from our password form control
    const repeatPassword: string = control.get('repeatPassword')!.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== repeatPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('repeatPassword')!.setErrors({ NoPassswordMatch: true });
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return { key: false };
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? { key: false } : error;
    };
  }

}
