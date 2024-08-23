import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,private routerService: Router) {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.form= new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required,Validators.min(6)])
    })
  }

  OnLogin() {
    if(this.isLoginMode){
      this.authService.login(this.form.get('username').value, this.form.get('password').value).subscribe((resData)=>
      {
        if(resData && resData.jwt){
          this.isLoginMode = true;
          this.routerService.navigate(['/recipes']);
        }
      });
    }else {
      this.authService.signup(this.form.get('username').value, this.form.get('password').value).subscribe((resData)=>
      {
        if(resData && resData.jwt){
          this.isLoginMode = true;
          this.routerService.navigate(['/recipes']);
        }
      });
    }
  }
}
