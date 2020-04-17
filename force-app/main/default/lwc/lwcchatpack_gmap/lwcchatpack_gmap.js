import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_gmap extends LightningElement 
{
    @api inputParams;
    @track mapURL = '';

    connectedCallback() 
    {
        this.mapURL = 'https://www.google.com/maps/embed/v1/place?key=' + this.inputParams.split(':')[2] + '&q=' + this.inputParams.split(':')[3];
    }
}