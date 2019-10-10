import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';
import { InfosSessions } from '../entities/infosSessions';
import { Speakers } from '../entities/speakers';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styles: [],
})
export class SessionsPage implements OnInit {


  listeSession: InfosSessions[] = [];

  listeSpeakers: Speakers[] = [];


  constructor(private dataService: DataService) { }

  ngOnInit() {


    this.dataService.recupererInfosSessions()
      .subscribe(
        result => { this.listeSession = result; }
      );

    this.dataService.recupererInfosSpeakers()
      .subscribe(
        result => { this.listeSpeakers = result; }
      );

  }

}
