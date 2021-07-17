import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';

import { UserService } from '../../shared/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addeditdialog',
  templateUrl: './addeditdialog.component.html',
  styleUrls: ['./addeditdialog.component.css']
})
export class AddeditdialogComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  empForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar, public userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddeditdialogComponent>) {
  }

  ngOnInit() {

    if (this.data['requestAction'] == 'add') {
      this.empForm = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        mobile: [null, Validators.required],
        address: [null, Validators.required],
        dob: [null, Validators.required],
        city: [null, Validators.required],
      });
    }
    if (this.data['requestAction'] == 'edit') { 
      this.empForm = this.fb.group({
        firstName: [this.data.requestActionData.firstName, Validators.required],
        lastName: [this.data.requestActionData.lastName, Validators.required],
        mobile: [this.data.requestActionData.mobile, Validators.required],
        address: [this.data.requestActionData.address, Validators.required],
        dob: [this.data.requestActionData.dob, Validators.required],
        city: [this.data.requestActionData.city, Validators.required],
      });
    }

  }

  onSubmit(form) {
    if (this.data['requestAction'] == 'add') {
      this.userService.addemp(form.value).subscribe(
        res => {
          this.dialogRef.close({ success: true });
          this._snackBar.open("Employee successfully Added", 'Yes', { duration: 2, });
        },
        err => {
          if (err.status === 422) {
            this.dialogRef.close({ success: false });
            this.serverErrorMessages = err.error.join('<br/>');
            this._snackBar.open(this.serverErrorMessages, 'NO', { duration: 2, });
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          this._snackBar.open(this.serverErrorMessages, 'NO', { duration: 2, });
        });
    }
    if (this.data['requestAction'] == 'edit') {

      this.userService.editemp(this.data.requestActionData._id, form.value).subscribe(
        res => {
          this.dialogRef.close({ success: true });
          this._snackBar.open("Emplyee Updated Successfully", 'Done', { duration: 2, });
        },
        err => {
          if (err.status === 422) {
            this.dialogRef.close({ success: false });
            this.serverErrorMessages = err.error.join('<br/>');
            this._snackBar.open(this.serverErrorMessages, 'Cancel', { duration: 2, });

          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          
          this._snackBar.open(this.serverErrorMessages, 'Cancel', { duration: 2, });

        });
    }
  }
  cancel() {
    this.dialogRef.close({ success: false });
  }
}
