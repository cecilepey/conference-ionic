import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';
import { Speakers } from '../entities/speakers';
import { InfosSessions } from '../entities/infosSessions';

@Component({
  selector: 'app-presentateurs',
  templateUrl: './presentateurs.page.html',
  styles: [],
})
export class PresentateursPage implements OnInit {

  listeSpeakers: Speakers[] = [];

  listeSession: InfosSessions[] = [];


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
