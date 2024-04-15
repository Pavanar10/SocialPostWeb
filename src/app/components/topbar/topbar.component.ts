import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(private router:Router,private userService:UserService){}

  logout(){
    this.userService.user=undefined;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
