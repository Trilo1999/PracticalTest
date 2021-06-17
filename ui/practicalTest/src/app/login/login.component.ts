import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }
email : any
password : any;
  ngOnInit(): void {
    if(localStorage.getItem("isLoggedIn")=="true"){
      this.router.navigate(['/dashboard'])

    }
  }
response : any = {}
login(){
  console.log("email,password : ",this.email,this.password)
  let loginData = {
    username : this.email,
    password : this.password

  }
  
  this.http.post("http://localhost:3000/authenticate",loginData).subscribe(res=>{
    console.log(res)
    this.response =res;
    if(this.response.isLoggedIn==true){
      localStorage.setItem("isLoggedIn",this.response.isLoggedIn)
      localStorage.setItem("name",this.response.name)
      localStorage.setItem("email",this.response.email)
      localStorage.setItem("role",this.response.role)
      localStorage.setItem("active",this.response.active)
      this.router.navigate(['/dashboard'])
    }
    else{
      alert("invalid credentials")
    }
  })
}
}
