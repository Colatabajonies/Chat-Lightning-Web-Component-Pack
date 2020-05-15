import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_html extends LightningElement 
{
    @api inputParams;
    @track innerHtml = '';

    connectedCallback() 
    {
        //this.template.querySelector('div').innerHTML = this.inputParams.replace('lwc:html:', '');
        //alert(this.inputParams);
        this.innerHtml = this.inputParams.replace('lwc:html:', '').replace(/<a\shref=[\s\S]+target='_blank'>/g, '').replace(/<\/a>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x2F;/g, "/") + '<br />';
        //alert(this.innerHtml);
    }


    postMessage(e)
    {
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: e
        }));
    }
}