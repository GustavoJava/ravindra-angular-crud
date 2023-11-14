import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

import { UserService } from './../../services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss']
})
export class LoadUsersComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<UserModel>();
  displayColumns = ['id', 'name', 'email', 'action'];

  @ViewChild('empTbSort') empTbSort = new MatSort();

  pageSizeOptions=[3,6,9,12];
  pageSize = 5;
  pageIndex = 0
  pageLength = 0; //total records in db..

  dataSourceFilters = new MatTableDataSource(this.dataSource.data);

  constructor(private userService:UserService,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.empTbSort;
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDataFilter();
  }

  loadUsers() {
    this.userService.getUsers((this.pageIndex+1),(this.pageSize)).subscribe({
     next:(response)=>{
      this.dataSource.data = response.users;
      this.pageLength = response.count;
     },error:(err)=>console.log(err)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDataFilter() {
    this.dataSourceFilters.filterPredicate = function (record, filter) {
      debugger;
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof UserModel] == value);
        if(!isMatch) return false;
      }
      return isMatch;
    }
  }

  onBtnEdit(id: number){
    this.router.navigate(['users/edit/'+id]);
  }

  onBtnDelete(user: UserModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: `Are you sure delete user ${user.name} ?`
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.delete(user.id).subscribe({
              next:(response)=> {
                if(this.dataSource.data.length === 1 && this.pageIndex>0)
                  this.pageIndex--;
                  this.onSucess();
                  this.loadUsers();
              }
            })
          }
    }, error => this.onError());
  }

  changePage(event:PageEvent){
    this.pageSize=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.loadUsers();
  }

  onSucess(){
    this.snackBar.open('Operação realizada com sucesso!','X', {
          duration: 3000,
          verticalPosition: 'top'
    })
  }

  onError(){
    this.snackBar.open('Erro ao realizar operação!','X', {
          duration: 3000,
          verticalPosition: 'top'
    })
  }

}
