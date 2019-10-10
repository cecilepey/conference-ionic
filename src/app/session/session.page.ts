import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { infosSessions } from '../entities/infosSessions';
import { speakers } from '../entities/speakers';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styles: [],
})
export class SessionPage implements OnInit {

  id: string;

  listeSession: infosSessions[] = [];
  session: infosSessions = new infosSessions(null, '', '', '', []);

  listeSpeakers: speakers[] = [];
  listeSpeakersSession: speakers[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');

    });

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

    this.listeSession.forEach(
      result => {

        const id = parseInt(this.id)
        if (id == result.id) {
          this.session = result;
          this.listeSpeakersSession = []
          if (this.session.speakers != null) {
            this.session.speakers.forEach(
              intervenant => {
                this.listeSpeakers.forEach(
                  resultat => {
                    if (intervenant == resultat.id) {
                      resultat.photoUrl = 'https://devfest2018.gdgnantes.com/' + resultat.photoUrl;
                      this.listeSpeakersSession.push(resultat)
                    }
                  }
                );
              }
            );
          }
        }
      }
    );
  }



}
