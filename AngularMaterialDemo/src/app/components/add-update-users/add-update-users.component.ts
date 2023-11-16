import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-update-users',
  templateUrl: './add-update-users.component.html',
  styleUrls: ['./add-update-users.component.scss'],
})
export class AddUpdateUsersComponent implements OnInit {
  frm!: FormGroup;
  action = 'Add';
  errorMatcher = new MyErrorStateMatcher();
  @ViewChild('userForm') usrForm!: NgForm; //resetar mensagens da validação.

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getUserById();
  }

  getUserById() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.action = 'Update';
      this.userService.getById(id).subscribe(
        (response) => {
          this.frm.patchValue(response);
        },
        () => this.messageService.onError()
      );
    }
  }

  initForm() {
    this.frm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.frm.controls;
  }

  onPost() {
    const form = this.frm.value;
    this.userService.addUser(form).subscribe(
      () => {
        this.usrForm.reset();
        this.usrForm.resetForm();
        this.messageService.onSucess();
        this.redirectToUsers();
      },() => this.messageService.onError()
    );
  }

  redirectToUsers() {
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 1000);
  }
}
