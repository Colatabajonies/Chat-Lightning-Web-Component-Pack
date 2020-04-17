import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_html extends LightningElement 
{
    @api inputParams;
    @track innerHtml = '';

    renderedCallback() 
    {
        //this.template.querySelector('div').innerHTML = this.inputParams.replace('lwc:html:', '');
        //alert(this.innerHtml);
        this.innerHtml = this.inputParams.replace('lwc:html:', '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x2F;/g, "/").replace('<a href=\'', '').replace('\' target=\'_blank\'>', ' tag="').replace('"</a>', '" ') + '<br />';
    }


    postMessage(e)
    {
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: e
        }));
    }
}