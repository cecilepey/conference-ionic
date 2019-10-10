import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';
import { infosSessions } from '../entities/infosSessions';
import { speakers } from '../entities/speakers';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styles: [],
})
export class SessionsPage implements OnInit {


  session: infosSessions = new infosSessions(null, '', '', '', []);

  listeSession: infosSessions[] = [];

  listeSpeakers: speakers[] = [];

  listeSpeakersSession: speakers[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    if (localStorage.getItem('session') === null) {
      this.dataService.recupererInfosSessions()
        .subscribe(
          info => {
            Object.values(info).forEach(
              result => {
                if (result.titleMobile != null) {
                  result.title = result.titleMobile;
                }
                this.listeSession.push(result);
              }
            );
            localStorage.setItem('session', JSON.stringify(this.listeSession));
          }
        );

    } else {
      this.listeSession = JSON.parse(localStorage.getItem('session'));
    }

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
        );

    } else {
      this.listeSpeakers = JSON.parse(localStorage.getItem('speaker'));
    }
  }

}
