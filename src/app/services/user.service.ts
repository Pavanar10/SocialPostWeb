import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user:any;
  constructor(private http:HttpClient) { }

  addUser(data:any){
    return new Promise((resolve,reject)=>{
      this.http.post('http://localhost:3000/users',data).subscribe(
        (response)=>{
          resolve(response)
        },
      (error)=>{
        reject(error)
      })
    })
  }

  getUser(email:string){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/users?email='+email).subscribe(
        (response)=>{resolve(response)},
        (error)=>{
          reject(error)
        }
      )
    })
  }










  
}
