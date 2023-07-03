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
      fields:
        "id, Categoria_do_Cliente__c, Company__c, DistributionCenter__c, PaymentCondition__c, Pricebook__c, Product__c, Tipo_de_Carga__c, Volumn__c",
      recordId: this.recordId,
      sobjectApiName: "PricingCheck__c",
      relatedFieldApiName: "Id",
    };

    let jsonData = JSON.stringify(Object.assign({}, this.currentRecord));
    let record = await getBaseData({ jsonData });

    this.filter = `AND Pricebook2Id = '${record.Pricebook__c}' AND Product2Id =  '${record.Product__c}' AND IsActive = true`;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
