import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public isLogged: boolean;

  constructor(public route: ActivatedRoute, private login: LoginService) { }

  ngOnInit(): void {
    this.isLogged = this.login.isLogged();
  }

}