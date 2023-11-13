import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  welcomeText = 'Welcome Angular Material Users CRUD';
  skillText = 'I hope you improve your skills';

  constructor() { }

  ngOnInit(): void {
  }

}
