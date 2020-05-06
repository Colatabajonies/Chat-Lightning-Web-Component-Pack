import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Lwcchatpack_navigate extends NavigationMixin(LightningElement) 
{
    @api inputParams;
    @track navType;
    @track hasdirected;

    connectedCallback() 
    {
        this.navType = this.inputParams.split(':')[2];
        this.navId = this.inputParams.split(':')[3];
        this.navData = this.inputParams.split(':')[4];
        if(this.navType.toLowerCase() == "clearcache")
        {
             sessionStorage.clear();
             this.navType = '';
        }
        else if(this.navType.toLowerCase() == 'article')
        {
            console.log('redirect article', this.navData);
            this.navigateArticle(this.navData, this.navId);
        }
        else if(this.navType.toLowerCase() == 'record')
        {
            //console.log('redirect');
            this.navigateRecord(this.navData, this.navId);
        }
        else if(this.navType.toLowerCase() == 'page')
        {
            this.navigatePage(this.navData, this.navId);
        }
    }

    navigatePage(pageName, navId) {
        this.hasdirected = sessionStorage.getItem(navId + '-' + pageName);
        console.log('hasdirected', this.hasdirected);
        //alert(pageName);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(navId + '-' + pageName, true);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: pageName
            }
        });
    }
    navigateArticle(url, navId) {
        this.hasdirected = sessionStorage.getItem(navId + '-' + url);
        console.log('hasdirected', this.hasdirected);
        //alert(url);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(navId + '-' + url, true);
        this[NavigationMixin.Navigate]({
            type: 'standard__knowledgeArticlePage',
            attributes: {
                articleType: 'article',
                urlName: url
            }
        });
    }
    navigateRecord(recordId, navId) {
        this.hasdirected = sessionStorage.getItem(navId + '-' + recordId);
        console.log('hasdirected', this.hasdirected);
        //alert(recordId);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(navId + '-' + recordId, true);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
     
        });
    }
}