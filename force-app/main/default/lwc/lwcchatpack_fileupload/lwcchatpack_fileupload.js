import { LightningElement, api } from 'lwc';

export default class Lwcchatpack_fileupload extends LightningElement 
{
    @api inputParams;
    @api myRecordId;

    connectedCallback() 
    {
        this.myRecordId = this.inputParams.split(':')[2];
        //alert(this.myRecordId);
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;

        if (uploadedFiles.length > 0)
        {
            this.dispatchEvent(new CustomEvent('postmessage',{
                detail: 'lwc:hide:' + this.myRecordId
            }));
        }
        else
        {
            alert("No files uploaded");
        }
    }
}