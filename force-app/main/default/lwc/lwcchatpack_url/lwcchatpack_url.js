import { LightningElement, api, track, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';


export default class Lwcchatpack_url extends NavigationMixin(LightningElement) 
{
    @api inputParams;
    @track recordPageUrl;
    @wire(CurrentPageReference)
    pageRef;

    connectedCallback() 
    {
        // Generate a URL to a User record page
        
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'https://wwww.salesforce.com'
            }
        });
    }

    navigateToRecordViewPage(theId) {
        
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: theId,
                actionName: 'view'
            }
        });
    }
}