import { Component, OnInit } from '@angular/core';
import { Speakers } from '../entities/speakers';
import { InfosSessions } from '../entities/infosSessions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.page.html',
  styles: [],
})
export class PresentateurPage implements OnInit {

  id: string;

  listeSpeakers: Speakers[] = [];
  speaker = new Speakers(null, '', '', '');

  listeSession: InfosSessions[] = [];

  listeSessionSpeaker: InfosSessions[] = [];

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

    this.listeSpeakers.forEach(
      intervenant => {
        const id = parseInt(this.id, 10);
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
