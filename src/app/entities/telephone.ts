/**
 *Classe qui représente le téléphone de l'utilisateur
 *
 * @export
 * @class Telephone
 */
export class Telephone {

    constructor(public model: string, public platform: string, public osVersion: string, public uuid: string) { }
}
