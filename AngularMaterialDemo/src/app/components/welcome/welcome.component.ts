import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  longText = 'Welcome Angular Material Users CRUD';
  text = 'I hope you improve your skills';

  constructor() { }

  ngOnInit(): void {
  }

}
