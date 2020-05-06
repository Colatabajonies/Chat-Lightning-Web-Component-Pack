import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];


export default class Lwcchatpack extends BaseChatMessage
{
    @track strMessage = '';

    //Add a var to track visibility for the component
    @track isBaseTextVisible = false;
    @track gmap = false;
    @track datepicker = false;
    @track html = false;
    @track fileupload = false;
    @track recordtile = false;
    @track carousel = false;
    @track flow = false;
    @track navigate = false;
    @track survey = false;

    connectedCallback() 
    {
        //Set message string
        this.strMessage = this.messageContent.value;
        if (this.isSupportedUserType(this.userType)) 
        {
            //if using a lwc, remove any emojis that may have been inserted by the bot (ie :D or :p )
            if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc'))
            {
                this.strMessage = this.strMessage.replace(/😀/g, ':D').replace(/😛/g, ':p');
            }

            if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:gmap'))
            {
                this.gmap = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:datepicker'))
            {
                this.datepicker = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:html'))
            {
                this.html = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:fileupload'))
            {
                this.fileupload = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:recordtile'))
            {
                this.recordtile = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:carousel'))
            {
                this.carousel = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:flow'))
            {
                this.flow = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:navigate'))
            {
                this.navigate = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:survey'))
            {
                this.survey = true;
            }
            
            //Add an elseif to show ur component....


            //ELSE SHOW BASE CHAT MESSAGE
            else if (!this.messageContent.value.startsWith('lwc:hide'))
            {
                this.isBaseTextVisible = true;
                this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
            }
        } 
        else
        {
            throw new Error('Unsupported user type passed in: ${this.userType}');
        }
    }


    isSupportedUserType(userType) 
    {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    handlePostMessage(event) 
    {
        const dateValue = event.detail;
        console.log('Handling Event with value: ' + dateValue);
        window.postMessage(
            {
                message: dateValue,
                type: "chasitor.sendMessage"
            },
            window.parent.location.href
        );
    }
}