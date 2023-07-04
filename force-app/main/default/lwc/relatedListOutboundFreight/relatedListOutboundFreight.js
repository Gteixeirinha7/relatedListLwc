import { LightningElement, track, api } from "lwc";
import getBaseData from "@salesforce/apex/RelatedListController.getBaseData";

export default class RelatedListOutboundFreight extends LightningElement {
  @api recordId;
  @track recordIdProduct2;
  @track filter;
  @track currentRecord = {};

  @track columns = [
    { label: "Centro", fieldName: "DistributionCenterName__c", type: "text" },
    { label: "Fabrica", fieldName: "FabricaName__c", type: "text" },
    { label: "Tipo", fieldName: "TipoCarga__c", type: "text" },
    { label: "Veiculo", fieldName: "Veiculo__c", type: "text" },
    { label: "Minimo", fieldName: "MinimumWeight__c", type: "number" },
    { label: "Faixa (t)", fieldName: "Volumns__c", type: "text" },
    { label: "Valor", fieldName: "ValorFrete__c", type: "currency" },
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

    this.filter = ` AND RecordType.DeveloperName = 'OutBoundFreight' `;

    this.recordIdProduct2 = record.Product__c;
  }

  get showRelated() {
    return this.recordIdProduct2 != null && this.filter != null;
  }
}
