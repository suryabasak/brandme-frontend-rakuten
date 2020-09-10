import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript("assets/js/script.js");
  }

}
