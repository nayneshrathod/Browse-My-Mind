import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';

import { UserService } from '../../shared/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  signInForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, public userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');

    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: [null, Validators.required],
      address: [null, Validators.required],
      dob: [null, Validators.required],
      company: [null, Validators.required],
    },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        this._snackBar.open("Register successfully ", 'Done', { duration: 2, });
        this.resetForm(form);
        this.router.navigateByUrl('/login');
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          this._snackBar.open(this.serverErrorMessages ? this.serverErrorMessages : 'error occure', 'ok', { duration: 2, });

        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        this._snackBar.open(this.serverErrorMessages, 'ok', { duration: 2, });

      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedEmployee = {
      firstName: '',
      lastName: '',
      address: '',
      dob: '',
      mobile: '',
      city: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

}


