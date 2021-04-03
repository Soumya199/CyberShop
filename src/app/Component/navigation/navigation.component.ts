import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Service/log-in.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  UserName:String;
  constructor(private logInServiceObject:LogInService,private router:Router) { }
  allowRegistration:boolean=false;
  ngOnInit(): void {
     this.UserName=this.logInServiceObject.userLogedIn.Customr_Name;
     console.log(this.UserName);   
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  LogOut()
  {
    this.logInServiceObject.authenticated=false;
    this.router.navigate(['/LogIn']);
  }
}
