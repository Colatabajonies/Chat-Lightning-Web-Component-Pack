import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_gmap extends LightningElement 
{
    @api inputParams;
    @track mapURL = '';
    @track mapWidth = '260';
    @track mapHeight = '250';

    connectedCallback() 
    {
        if (this.inputParams.split(':').length == 6)
        {
            this.mapWidth = this.inputParams.split(':')[4];
            this.mapHeight = this.inputParams.split(':')[5];
        }
        this.mapURL = 'https://www.google.com/maps/embed/v1/place?key=' + this.inputParams.split(':')[2] + '&q=' + this.inputParams.split(':')[3];
    }
}