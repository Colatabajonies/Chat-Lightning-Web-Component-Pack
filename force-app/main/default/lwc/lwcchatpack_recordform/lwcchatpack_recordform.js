import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_recordform extends LightningElement 
{
    @api inputParams;
    @track objName = '';
    @track recordId = '';
    @track iconName = '';
    @track firstField = '';
    @track fields;

    connectedCallback() 
    {
        this.objName = this.inputParams.split(':')[2];
        this.recordId = this.inputParams.split(':')[3];

        if (this.objName.includes("__c"))
        {
            this.iconName = 'standard:default';
        }
        else
        {
            this.iconName = 'standard:' + this.objName.toLowerCase();
        }
        
        this.firstField = this.inputParams.split(':')[4].split(',')[0];
        
        if (this.inputParams.split(':')[4].split(',').length > 1)
        {
            this.fields = this.inputParams.split(':')[4].split(',');
            this.fields.shift();
        }  
    }

}