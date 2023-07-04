import { LightningElement, track, api } from "lwc";
import getBaseData from "@salesforce/apex/RelatedListController.getBaseData";

export default class RelatedListPricebookEntry extends LightningElement {
  @api recordId;
  @track recordIdProduct2;
  @track filter;
  @track currentRecord = {};

  @track columns = [
    { label: "Moeda", fieldName: "CurrencyIsoCode", type: "text" },
    { label: "Preço de Venda", fieldName: "UnitPrice", type: "currency" },
  ];

  async connectedCallback() {
    this.currentRecord = {
      fields: "id, Product2Id, PricebookEntry.Pricebook2Id",
      recordId: this.recordId,
      sobjectApiName: "OrderItem",
      relatedFieldApiName: "Id",
    };

    let jsonData = JSON.stringify(Object.assign({}, this.currentRecord));
    let record = await getBaseData({ jsonData });

    this.filter = `AND Pricebook2Id = '${record.PricebookEntry.Pricebook2Id}' AND Product2Id =  '${record.Product__c}' AND IsActive = true`;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
