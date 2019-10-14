import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';
import { InfosSessions } from '../entities/infosSessions';
import { Note } from '../entities/note';
import { Plugins, CameraResultType, CameraPhoto, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

const { Camera } = Plugins;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styles: [],
})
export class NotesPage implements OnInit {


  id: string;
  listeSession: InfosSessions[] = [];

  session = new InfosSessions(null, '', '', '', []);

  note = new Note(null, ' ');

  listePhoto: string[] = [];



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

    });

    this.listeSession.forEach(
      result => {
        const id = parseInt(this.id, 10);
        if (id === result.id) {
          this.session = result;
          if (localStorage.getItem(`${this.session.id}`) != null) {
            this.note.contenu = localStorage.getItem(`${this.session.id}`)
          }
          if (localStorage.getItem(`photo${this.session.id}`) != null) {
            this.listePhoto = JSON.parse(localStorage.getItem(`photo${this.session.id}`));
          }
        }
      }
    );


  }

  enregistrerNotes(noteSaisie: Note) {
    this.note.contenu = noteSaisie.contenu;
    this.note.idSession = parseInt(this.id, 10);
    localStorage.setItem(`${this.note.idSession}`, this.note.contenu);
  }

  async prendrePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    const imageUrl = image.base64String;

    const cheminImage = 'data:image/png;base64,' + imageUrl;

    this.listePhoto.push(cheminImage);

    localStorage.setItem(`photo${this.session.id}`, JSON.stringify(this.listePhoto));


  }

  async choisirPhoto() {

    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    const imageUrl = image.base64String;

    const cheminImage = 'data:image/png;base64,' + imageUrl;

    this.listePhoto.push(cheminImage);

    localStorage.setItem(`photo${this.session.id}`, JSON.stringify(this.listePhoto));

  }

}

