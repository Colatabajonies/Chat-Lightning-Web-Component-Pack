import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_flow extends LightningElement
{
    @api inputParams;
    @track flowname = '';
    @track flowheight = '200';
    @track blReplied = false;

    handleFinish(event)
    {
        if (event.data && event.data.type === 'flow.finished' && !this.blReplied)
        {
            //alert('data:' + event.data.message);
            this.blReplied = true;
            this.dispatchEvent(new CustomEvent('postmessage',{detail: event.data.message}));
        }
    }
    
    renderedCallback()
    {
        this.conts = this.inputParams.split(':')[2];
        if (this.inputParams.split(':').length > 3)
        {
            this.flowheight = this.inputParams.split(':')[3];
        }
        
        this.flowurl = unescape(this.conts).replace(/&amp;/g, '&');
        this.comm = window.location.pathname.split('/')[1];
        if(this.comm === 's'){
            this.comm = '';
        } else {
            this.comm = '/' + this.comm;
        }
        this.flowname =   this.comm + '/s/flowcomponent?flowName=' + this.flowurl;
        
        //Try to handle a post from the flow finishing
        window.addEventListener('message', this.handleFinish.bind(this));
    
    }

    disconnectedCallback() 
    {
        window.removeEventListener('message', this.handleFinish.bind(this));
    }
}