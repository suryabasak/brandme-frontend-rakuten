import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserModel } from '../classes/user';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})



export class ProfileMenuComponent implements OnInit {
  public User = {};
  public user: UserModel = new UserModel();

  profilemenu = [
    {link: '/', menutitle: 'Profile', icon: 'profile-icon'},
    {link: '/me/cognos', menutitle: 'Cognos', icon: 'cognos-icon'},
    {link: '/', menutitle: 'Measurements', icon: 'measurements-icon'},
    {link: '/', menutitle: 'Payment', icon: 'payment-icon'},
    {link: '/', menutitle: 'Address', icon: 'address-icon'},
    {link: '/', menutitle: 'Style', icon: 'style-icon'},
    {link: '/', menutitle: 'Archive', icon: 'archive-icon'},
    {link: '/', menutitle: 'Orders', icon: 'orders-icon'},
  ]

  constructor(private router: Router) { }
  
 

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("bme-shopping-user-info"));
  }

}
