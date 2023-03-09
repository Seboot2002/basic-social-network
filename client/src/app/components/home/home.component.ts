import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string;

  constructor(private titulo: Title)
  {
    this.title = "Bienvenido a mi Red Social";
    titulo.setTitle("Home");
  }

  ngOnInit(): void {
  }

}
