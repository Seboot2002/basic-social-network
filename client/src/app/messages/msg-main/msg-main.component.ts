import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-msg-main',
  templateUrl: './msg-main.component.html',
  styleUrls: ['./msg-main.component.css']
})
export class MsgMainComponent implements OnInit {

  constructor(private titulo: Title)
  {
    titulo.setTitle("Mensajes");
  }

  ngOnInit(): void {
  }

}
