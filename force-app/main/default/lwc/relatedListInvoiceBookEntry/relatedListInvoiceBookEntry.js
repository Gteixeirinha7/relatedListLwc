import { LightningElement, track, api } from "lwc";
import getBaseData from "@salesforce/apex/RelatedListController.getBaseData";

export default class RelatedListInvoiceBookEntry extends LightningElement {
  @api recordId;
  @track recordIdProduct2;
  @track filter;
  @track currentRecord = {};

  @track columns = [
    { label: "Familia de Produto", fieldName: "FamilyName__c", type: "text" },
    { label: "Produto", fieldName: "Product2Name__c", type: "text" },
    { label: "Juros Aplicado (%)", fieldName: "Juros__c", type: "number" },
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

    this.filter = ` `;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
