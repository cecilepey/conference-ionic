import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfosSessions } from '../entities/infosSessions';
import { Speakers } from '../entities/speakers';
import { DataService } from '../service/data-service';


@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styles: [],
})
export class SessionPage implements OnInit {

  id: string;

  listeSession: InfosSessions[] = [];
  session: InfosSessions = new InfosSessions(null, '', '', '', []);

  listeSpeakers: Speakers[] = [];
  listeSpeakersSession: Speakers[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');

      this.dataService.recupererInfosSessions()
        .subscribe(
          result => { this.listeSession = result; }
        );

      this.dataService.recupererInfosSpeakers()
        .subscribe(
          result => { this.listeSpeakers = result; }
        );

    });

    this.listeSession.forEach(
      result => {
        const id = parseInt(this.id, 10);
        if (id === result.id) {
          this.session = result;
          this.listeSpeakersSession = []
          if (this.session.speakers != null) {
            this.session.speakers.forEach(
              intervenant => {
                this.listeSpeakers.forEach(
                  resultat => {
                    const resultatId = parseInt(resultat.id, 10)
                    if (intervenant === resultatId) {
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

