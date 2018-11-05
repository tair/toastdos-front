import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users:any = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.allUserData$.subscribe(x=>{
        this.users = x;
        console.log(this.users)
    })
  }

}
