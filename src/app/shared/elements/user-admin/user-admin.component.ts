import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  @Input() user: any;

  constructor(private adminService: AdminService) { }

  ngOnInit()
  {

  }

  userIsAdmin(user)
  {
    return user.roles.some(x=>{
      return x.id===1;
    })
  }
  userIsCurator(user)
  {
    return user.roles.some(x=>{
      return x.id===2;
    })
  }
  userIsResearcher(user)
  {
    return user.roles.some(x=>{
      return x.id===3;
    })
  }

  toggleAdmin(user)
  {
    this.toggleRole(user,1);
  }
  toggleCurator(user)
  {
    this.toggleRole(user,2); //tbh these seem to be backwards...
  }
  toggleResearcher(user)
  {
    this.toggleRole(user,3); //tbh these seem to be backwards...
  }

  toggleRole(user,roleId)
  {
    let userHasRole = user.roles.some(x=>{return x.id===roleId;});
    if (userHasRole)
    {
        this.adminService.removeUserRole$(user,roleId).subscribe(x=>{
                    user.roles = user.roles.filter(r=> {
                        return r.id !== roleId;
                    })
            }, error1 => {
              console.log(error1);
            }
        );
    } else {
        this.adminService.addUserRole$(user,roleId).subscribe(x=>{
                    user.roles.push({'id':roleId}) //if we get a 200 safe to assume it worked, no joke XD. this is how old team did it
            }, error1 => {
                console.log(error1);
            }
        );
    }
  }
}
