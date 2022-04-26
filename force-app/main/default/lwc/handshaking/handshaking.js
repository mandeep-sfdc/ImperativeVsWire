import { LightningElement,wire,track } from 'lwc';
import theSumIs from '@salesforce/apex/HandshakerHandler.theSumIs';

export default class Handshaking extends LightningElement {
    a=1; //Default Value
    b=0; //Default Value
    @track imperativeSum=0;
    @track wSum = 0;
    @track errorMsg;
    @track error;

    @wire(theSumIs, {a:'$a',b:'$b'}) wiredSum({data, error}) {
        if(data) {
            this.wSum = data;
            this.errorMsg=undefined;
        } 
        if(error) {
            this.wSum = undefined; 
            this.imperativeSum = undefined; 
            this.errorMsg=error.body.message;
        }
    }
    // Updating A and B when user changes it in the input box
    updateA(event){
        this.a=event.target.value;
    }
    updateB(event){
        this.b=event.target.value;
    }  
    // Imperative method that does the addition
    sumAB(){
        theSumIs({a:this.a,b:this.b})
            .then(result => {
                this.imperativeSum = result;
                this.errorMsg=undefined;
            })
            .catch(error => {
                this.imperativeSum = undefined;
                this.wSum = undefined; 
                this.errorMsg=error.body.message;
            });
    }
}