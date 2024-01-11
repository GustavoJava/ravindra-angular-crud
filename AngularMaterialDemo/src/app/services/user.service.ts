import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="/api/users"
  addUser=(user:UserModel)=>
  {
   if(user.id==0)
       return this.http.post(this.baseUrl,user);
   else
       return this.http.put(`${this.baseUrl}/${user.id}`,user);
  }

  getUsers=(page: number,limit: number)=>
           this.http.get(this.baseUrl+`?_page=${page}&_limit=${limit}`,{observe:'response'})
           .pipe(
            delay(1500),
            map(response=> {
              const totalElements = parseInt(response.headers.get('X-Total-Count')||"0",10);
              const users = response.body as UserModel[]
              return {users, totalElements}
            })
           )

   getById= (id:number)=> this.http.get<UserModel>(this.baseUrl+`/${id}`)

   delete= (id:number)=> this.http.delete<any>(this.baseUrl+`/${id}`)


  constructor(private http:HttpClient) { }
}
