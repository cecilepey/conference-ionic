import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { Telephone } from '../entities/telephone';
import { Connexion } from '../entities/connexion';

const { Device } = Plugins;

const { Network } = Plugins;



@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.page.html',
  styles: [],
})
export class TelephonePage implements OnInit {


  telephone = new Telephone('', '', '', '');

  connexion = new Connexion('');

  constructor() { }

  async ngOnInit() {
    this.telephone = await Device.getInfo();
    this.connexion = await Network.getStatus();

  }

}
