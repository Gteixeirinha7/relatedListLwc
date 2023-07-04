import { LightningElement, track, api } from "lwc";
import getBaseData from "@salesforce/apex/RelatedListController.getBaseData";

export default class RelatedListTaxes extends LightningElement {
  @api recordId;
  @track recordIdProduct2;
  @track filter;
  @track currentRecord = {};

  @track columns = [
    { label: "Região", fieldName: "RegionName__c", type: "text" },
    { label: "ICMS (%)", fieldName: "ICMS__c", type: "number" },
    { label: "Desconto (%)", fieldName: "Discount__c", type: "number" },
    { label: "ICMS Final (%)", fieldName: "ICMSFinal__c", type: "number" }
  ];

  async connectedCallback() {
    this.currentRecord = {
      fields: "id, Product2Id, PricebookEntry.Pricebook2Id, Center__c",
      recordId: this.recordId,
      sobjectApiName: "OrderItem",
      relatedFieldApiName: "Id",
    };

    let jsonData = JSON.stringify(Object.assign({}, this.currentRecord));
    let record = await getBaseData({ jsonData });

    this.filter = ` AND DistributionCenter__c = '${record.Center__c}'  `;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
