import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb:FormBuilder,public userService:UserService,private router:Router){
  }

  ngOnInit(): void {
    
  }
  createForm:FormGroup = this.fb.group({
    'email':['',[Validators.required,Validators.email]],
    'username':['',[Validators.required,Validators.maxLength(10)]],
    'password':['',[Validators.required,Validators.minLength(6)]]

  })

createUser(){
this.userService.addUser(this.createForm.value).then((res)=>{
  console.log(res);
  this.userService.user=res;
  localStorage.setItem('user',JSON.stringify(res))
  this.router.navigate(['/posts']);
}).catch((err)=>{
  console.log(err)
})
}

}
