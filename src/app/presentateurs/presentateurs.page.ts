import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';
import { speakers } from '../entities/speakers';
import { infosSessions } from '../entities/infosSessions';

@Component({
  selector: 'app-presentateurs',
  templateUrl: './presentateurs.page.html',
  styles: [],
})
export class PresentateursPage implements OnInit {

  listeSpeakers: speakers[] = [];
  speaker = new speakers(null, '', '', '');

  listeSession: infosSessions[] = [];

  listeSessionSpeaker: infosSessions[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('speaker') === null) {
      this.dataService.recupererInfosSpeakers()
        .subscribe(
          info => {
            Object.values(info).forEach(
              result => {
                this.listeSpeakers.push(result)
              }
            );
            localStorage.setItem('speaker', JSON.stringify(this.listeSpeakers));
          }
        )
    } else {
      this.listeSpeakers = JSON.parse(localStorage.getItem('speaker'));
    }

    if (localStorage.getItem('session') === null) {
      this.dataService.recupererInfosSessions()
        .subscribe(
          info => {
            Object.values(info).forEach(
              result => {
                this.listeSession.push(result)

              }
            );
            localStorage.setItem('session', JSON.stringify(this.listeSession));
          }
        )
    } else {
      this.listeSession = JSON.parse(localStorage.getItem('session'));
    }
  }

}
