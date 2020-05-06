import { LightningElement, api, track } from 'lwc';

export default class Lwcchatpack_survey extends LightningElement 
{
    @api inputParams;
    @track showStars = false;
    @track showNPS = false;
    @track showCheckBox = false;

    @track leftTitle = 'Bad';
    @track rightTitle = 'Great';

    @track surveyDisabled = false;
    @track variant1;
    @track variant2;
    @track variant3;
    @track variant4;
    @track variant5;

    @track checkOptions = [];

    npsOptions = [
        {'label': '1', 'value': '1'},
        {'label': '2', 'value': '2'},
        {'label': '3', 'value': '3'},
        {'label': '4', 'value': '4'},
        {'label': '5', 'value': '5'},
        {'label': '6', 'value': '6'},
        {'label': '7', 'value': '7'},
        {'label': '8', 'value': '8'},
        {'label': '9', 'value': '9'},
        {'label': '10', 'value': '10'}
    ];

    @track checkOptions = [];
    @track checkValue = [];


    connectedCallback() 
    {
        if (this.inputParams.split(':')[2].toLowerCase() == 'star')
        {
            this.showStars = true;
        }
        else if (this.inputParams.split(':')[2].toLowerCase() == 'nps')
        {
            this.showNPS = true;
            this.leftTitle = 'Not likely';
            this.rightTitle = 'Extremely likely';
        }
        else if (this.inputParams.split(':')[2].toLowerCase() == 'checkbox')
        {
            this.showCheckBox = true;
            for (let i = 0; i < this.inputParams.split(':')[3].split(';').length; i++) 
            {
                var newCheck = { label: this.inputParams.split(':')[3].split(';')[i], value: this.inputParams.split(':')[3].split(';')[i]};
                this.checkOptions.push(newCheck);
            }
        }

        if (this.inputParams.split(':').length == 5)
        {
            this.leftTitle = this.inputParams.split(':')[3];
            this.rightTitle = this.inputParams.split(':')[4];
        }
    }

    handleStarClick(event)
    {
        if (this.surveyDisabled)
        {
            return;
        }

        //alert(event.target.title);
        this.surveyDisabled = true;
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: event.target.title
        }));
    }
    
    handleStarOver(event)
    {
        if (this.surveyDisabled)
        {
            return;
        }
        this.starNum = parseInt(event.target.title);
 
        if (this.starNum >= 1)
        {
            this.variant1 = 'success';
            this.variant2 = '';
            this.variant3 = '';
            this.variant4 = '';
            this.variant5 = '';
        }
        if (this.starNum >= 2)
        {
            this.variant2 = 'success';
            this.variant3 = '';
            this.variant4 = '';
            this.variant5 = '';
        }
        if (this.starNum >= 3)
        {
            this.variant3 = 'success';
            this.variant4 = '';
            this.variant5 = '';
        }
        if (this.starNum >= 4)
        {
            this.variant4 = 'success';
            this.variant5 = '';
        }
        if (this.starNum >= 5)
        {
            this.variant5 = 'success';
        }
    }

    handleStarOut(event)
    {
        if (this.surveyDisabled)
        {
            return;
        }
        this.variant1 = '';
        this.variant2 = '';
        this.variant3 = '';
        this.variant4 = '';
        this.variant5 = '';
    }

    handleNPSChange(event) 
    {
        const selectedOption = event.detail.value;
        console.log(`NPS selected with value: ${selectedOption}`);
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: selectedOption
        }));
        this.surveyDisabled = true;
    }

    handlCheckChange(e) {
        this.checkValue = e.detail.value;
    }

    handleOk(event)
    {
        this.surveyDisabled = true;
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: 'lwc:hide:' + this.checkValue.join(';')
        }));
    }
}