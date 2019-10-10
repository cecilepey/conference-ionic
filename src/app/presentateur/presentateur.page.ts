import { Component, OnInit } from '@angular/core';
import { speakers } from '../entities/speakers';
import { infosSessions } from '../entities/infosSessions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.page.html',
  styles: [],
})
export class PresentateurPage implements OnInit {

  id: string;

  listeSpeakers: speakers[] = [];
  speaker = new speakers(null, '', '', '');

  listeSession: infosSessions[] = [];

  listeSessionSpeaker: infosSessions[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');

    });

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

    this.listeSpeakers.forEach(
      intervenant => {
        const id = parseInt(this.id);
        if (intervenant.id == id) {
          intervenant.photoUrl = `https://devfest2018.gdgnantes.com/${intervenant.photoUrl}`
          this.speaker = intervenant;
          this.listeSessionSpeaker = [];
          this.listeSession.forEach(
            session => {
              if (session.speakers != null) {
                session.speakers.forEach(
                  result => {
                    if (result == id) {
                      if (session.titleMobile != null) {
                        session.title = session.titleMobile;
                      }
                      this.listeSessionSpeaker.push(session);
                    }
                  }
                );
              }
            }
          );

        }
      }
    );

  }

}
