import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:'welcome', component: WelcomeComponent},
  {path:'users/add', component: AddUpdateUsersComponent},
  {path:'users/edit/:id', component: AddUpdateUsersComponent},
  {path:'users', component: LoadUsersComponent},
  {path:'**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
