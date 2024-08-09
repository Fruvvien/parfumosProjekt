import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-component',
  templateUrl: './sidenav-component.component.html',
  styleUrl: './sidenav-component.component.scss'
})
export class SidenavComponentComponent implements OnInit{

  constructor( private route: ActivatedRoute){
  }


ngOnInit(): void {

}



}
