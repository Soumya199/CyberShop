import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Service/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private logInServiceObject:LogInService,private router:Router) { }

  ngOnInit(): void {
    if(!this.logInServiceObject.authenticated)
    {
      this.router.navigate(['/LogIn']);
    }
  }

}
