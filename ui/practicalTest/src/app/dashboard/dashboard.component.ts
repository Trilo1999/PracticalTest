import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router : Router,private http : HttpClient) { }
role = localStorage.getItem("role")
name = localStorage.getItem("name")
isActive = localStorage.getItem("active")
users : any =[]
  ngOnInit(): void {
this.http.get("http://localhost:3000/customers").subscribe(res=>{
  console.log(res);
  this.users = res;
})
  }
  logout(){
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("name")
    localStorage.removeItem("role")
    localStorage.removeItem("email")
    localStorage.removeItem("active");
    this.router.navigate(['/login'])
  }
  inactiveUser(i,email,name,index){
   var updateData ={
       email : email,
       name : name,
       active : 0
    }
    console.log("clicked at : "+i)
    this.http.put("http://localhost:3000/customers/"+i,updateData).subscribe(res=>{
console.log(res);
alert("user Inactivated")
this.users.splice(index,1)
    })
  }

}
