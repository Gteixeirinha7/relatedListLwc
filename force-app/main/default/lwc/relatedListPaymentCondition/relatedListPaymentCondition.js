import { LightningElement, track, api } from "lwc";
import getBaseData from "@salesforce/apex/RelatedListController.getBaseData";

export default class RelatedListPaymentCondition extends LightningElement {
  @api recordId;
  @track recordIdProduct2;
  @track filter;
  @track currentRecord = {};

  @track columns = [
    { label: "Nome", fieldName: "Name", type: "text" },
    { label: "Tipo de Pagamento", fieldName: "PaymentType__c", type: "text" },
    { label: "Forma de Pagamento", fieldName: "PaymentForm__c", type: "text" },
    { label: "Desconto (%)", fieldName: "Discount__c", type: "number" },
  ];

  async connectedCallback() {
    this.currentRecord = {
      fields:
        "id, Product2Id, PricebookEntry.Pricebook2Id",
      recordId: this.recordId,
      sobjectApiName: "OrderItem",
      relatedFieldApiName: "Id",
    };

    let jsonData = JSON.stringify(Object.assign({}, this.currentRecord));
    let record = await getBaseData({ jsonData });

    this.filter = `AND Active__c = true `;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
