import { Component, OnInit } from '@angular/core';
import { Speakers } from '../entities/speakers';
import { InfosSessions } from '../entities/infosSessions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

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


  constructor(private route: ActivatedRoute, private dataService: DataService, private contacts: Contacts) {
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
        if (intervenant.id === this.id) {
          intervenant.photoUrl = `https://devfest2018.gdgnantes.com/${intervenant.photoUrl}`
          this.speaker = intervenant;
          this.listeSessionSpeaker = [];
          this.listeSession.forEach(
            session => {
              if (session.speakers != null) {
                session.speakers.forEach(
                  result => {
                    const id = parseInt(this.id, 10)
                    if (result === id) {
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

  creerContact() {

    const nomPrenom = this.speaker.name.split(' ');

    const nom = nomPrenom[1];
    const prenom = nomPrenom[0];

    let contact = this.contacts.create();

    contact.name = new ContactName(null, nom, prenom);

    console.log(contact);
    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );
    console.log('aurevoir...');
  }

}
