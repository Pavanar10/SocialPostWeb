import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

constructor(private fb:FormBuilder,private userService:UserService
  ,private snackbar:MatSnackBar,private router:Router
){}

ngOnInit(): void {
  
}
loginForm:FormGroup = this.fb.group({
  'email':['',[Validators.required,Validators.email]],
  'password':['',[Validators.required,Validators.minLength(6)]]
})
login(){
  this.userService.getUser(this.loginForm.value.email).then((res:any)=>{
    if(res.length===0){
      console.log('Account does not exist');
      this.snackbar.open('Account does not exist','ok');
    }else if(res[0].password === this.loginForm.value.password){
      console.log('Matched');
      this.snackbar.open('login successful','ok')
      this.userService.user=res[0];
      localStorage.setItem('user',JSON.stringify(res[0]));
      console.log(this.userService.user);
      this.router.navigate(['/posts']);
    }else{
      console.log('incorrect password');
      this.snackbar.open('Incorrect Password','ok')

    }
  }).catch((err)=>{
    console.log(err)
  })
}
}
