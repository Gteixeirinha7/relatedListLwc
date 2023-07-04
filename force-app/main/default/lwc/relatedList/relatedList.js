import { LightningElement, track, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import RelatedListHelper from "./relatedListHelper";
import { loadStyle } from "lightning/platformResourceLoader";
import relatedListResource from "@salesforce/resourceUrl/relatedListResource";

export default class RelatedList extends NavigationMixin(LightningElement) {
    @track state = {}
    @api sobjectApiName;
    @api relatedFieldApiName;
    @api numberOfRecords = 6;
    @api sortedBy;
    @api iconName;
    @api title;
    @api recordId;
    @api filter;
    @api sortedDirection = "ASC";
    @api rowActionHandler;
    @api fields;
    @api columns;
    @api customActions = [];
    helper = new RelatedListHelper()

    get hasRecords() {
        return this.state.records != null && this.state.records.length;
    }
    renderedCallback() {
        loadStyle(this, relatedListResource + '/relatedList.css')
    }

    async connectedCallback() {
        this.state.showRelatedList = this.recordId != null;
        if (! (this.recordId
            && this.sobjectApiName
            && this.relatedFieldApiName
            && this.fields
            && this.columns)) {
            this.state.records = [];
            return;
        }

        this.state.fields = this.fields
        this.state.relatedFieldApiName= this.relatedFieldApiName
        this.state.recordId= this.recordId
        this.state.numberOfRecords= this.numberOfRecords
        this.state.sobjectApiName= this.sobjectApiName
        this.state.sortedBy= this.sortedBy
        this.state.filter = this.filter;
        this.state.sortedDirection= this.sortedDirection
        this.state.customActions= this.customActions

        const data = await this.helper.fetchData(this.state);
        this.state.records = data.records;
        this.state.iconName = this.iconName ? this.iconName : data.iconName;
        this.state.sobjectLabel = data.sobjectLabel;
        this.state.sobjectLabelPlural = data.sobjectLabelPlural;
        this.state.title = this.title ? this.title : data.title;
        this.state.title += ` (${this.state.records.length})`;
        this.state.parentRelationshipApiName = data.parentRelationshipApiName;
        this.state.columns = this.columns;
    }

    handleGotoRelatedList() {
        this[NavigationMixin.Navigate]({
            type: "standard__recordRelationshipPage",
            attributes: {
                recordId: this.recordId,
                relationshipApiName: this.state.parentRelationshipApiName,
                actionName: "view",
                objectApiName: this.sobjectApiName
            }
        });
    }

    handleRefreshData() {
        this.init();
    }
}
