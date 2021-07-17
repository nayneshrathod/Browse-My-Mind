// };
    // this.getAllEMp()
    // if (this.data['requestAction'] == 'edit') {
    //   this.empForm = this.fb.group({
        // empid: [null],
    //     firstName: [null, Validators.required],
    //     lastName: [null, Validators.required],
    //     mobile: [null, Validators.required],
    //     address: [null, Validators.required],
    //     dob: [null, Validators.required],
    //     city: [null, Validators.required],
    //   });
    //   let fields: string = '';
    //   // fields = 'user_id,firstname,lastname,partners,email_address,mobile_number,companies';
    //   this.userService.editemp(this.empForm.,this.empForm.value).subscribe(data => {
    //     if (true == data['error']) {
    //       this._snackBar.open(data['reason'], "");
    //       return;
    //     }
    //     // this.userId = data['result']['user_id'];
    //     this.empForm.controls['firstName'].setValue(data['result']['firstName']);
    //     this.empForm.controls['city'].setValue(data['result']['city']);
    //     this.empForm.controls['dob'].setValue(data['result']['dob']);
    //     this.empForm.controls['address'].setValue(data['result']['address']);
    //     this.empForm.controls['lastName'].setValue(data['result']['lastName']);
    //     this.empForm.controls['email'].setValue(data['result']['email']);
    //     this.empForm.controls['mobile'].setValue(data['result']['mobile']);

    //     if (null != data['result']) {
    //       this.userService.editemp(data['result']['_id'], data['result']).subscribe(res => { });
    //     }
       
    //   },
    // error => {
    //   this._snackBar.open('Error: Something went wrong. Please try again!', 'ok');
    // }