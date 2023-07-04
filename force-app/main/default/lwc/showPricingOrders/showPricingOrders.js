import { LightningElement, api, track } from 'lwc';
import Images from '@salesforce/resourceUrl/images';
import Images1 from '@salesforce/resourceUrl/images1';
import { NavigationMixin } from 'lightning/navigation';

export default class ShowAccountOrders extends NavigationMixin(LightningElement) {
  @api recordId;
  @api componentspricing;
  @track componentStyle;

  connectedCallback() {
    this.componentStyle = "width: 100%; max-width: 100rem; min-width: 30rem;";
  }

  closeModal() {
    this.dispatchEvent(
      new CustomEvent("closehistory", {
        detail: {
          record: "",
        },
      })
    );
  }
}