import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-update-users',
  templateUrl: './add-update-users.component.html',
  styleUrls: ['./add-update-users.component.scss']
})
export class AddUpdateUsersComponent implements OnInit {

  frm!:FormGroup;
  action = 'Add';
  errorMatcher = new MyErrorStateMatcher();
  @ViewChild("userForm") usrForm!:NgForm; //resetar mensagens da validação.

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder:FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserById();
  }

  getUserById() {
    const id = this.route.snapshot.params['id'];
    if(id){
      this.action = "Update";
      this.userService.getById(id).subscribe(response =>{
        this.frm.patchValue(response);
      },()=>this.onError()
      )
    }
  }

  initForm(){
    this.frm= this.formBuilder.group({
      id:[0],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]]
    })
  }

  get f() {
    return this.frm.controls;
  }

  onPost() {
    const form = (this.frm.value);
    this.userService.addUser(form).subscribe(() =>{
      this.usrForm.reset();
      this.usrForm.resetForm();
      this.onSucess();
      this.redirectToUsers();
    },()=>this.onError())

  }

  redirectToUsers(){
    setTimeout(() => {
      this.router.navigate(['/users']);
    },2000);
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
