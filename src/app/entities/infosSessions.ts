/**
 *classe qui représente une session
 *
 * @export
 * @class infosSessions
 */
export class InfosSessions {

    constructor(public id: number, public title: string, public titleMobile: string,
        public description: string, public speakers: number[]) { }
} 