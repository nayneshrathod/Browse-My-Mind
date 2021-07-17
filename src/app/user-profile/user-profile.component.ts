import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';
import { AddeditdialogComponent } from './addeditdialog/addeditdialog.component';
import { AfterViewInit, ViewContainerRef, Inject, OnInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; import { Employee } from '../shared/user.model';
;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // userDetails;
  showSucessMessage = true;
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog, public viewContainerRef: ViewContainerRef,private ref: ChangeDetectorRef,) { 
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 500);
  
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'mobile', 'dob', 'city', 'address', 'Actions'];
  userDetails: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.getAllEMp();
  }
  getAllEMp() {
    this.userService.getEmpdata().subscribe(
      res => {
        if (0 == res['employee'].length) {
          return;
        }
        this.userDetails = res['employee'];
        this.userDetails = new MatTableDataSource(res['employee']);
        this.userDetails.paginator = this.paginator;
        this.userDetails.sort = this.sort;
      },
      err => {
        console.log(err);

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


  openDialog(action, data) {
    // const dialogRef = this.dialog.open(AddeditdialogComponent);
    let dialogRef = this.dialog.open(AddeditdialogComponent, {
      disableClose: true,
      width: '40%',
      data: { requestAction: action, requestActionData: data, }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result['success'] == true) this.getAllEMp();
    }); 
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDetails.filter = filterValue.trim().toLowerCase();

    if (this.userDetails.paginator) {
      this.userDetails.paginator.firstPage();
    }
  }


  delete(id: string): void { 

    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.delemp(id)
        .subscribe(res => {
          this._snackBar.open("deleted", 'OK');
        // this.getAllEMp();
        this.ngOnInit();

        },
          err => {
            this._snackBar.open('Something went wrong.Please contact admin.', 'ok');
          })
          
    };
    if (this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');
    // this._snackBar.open('Your Not Delete this Employee, Thank you', 'Ohh');
  }
}
