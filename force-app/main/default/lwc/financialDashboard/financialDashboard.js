import { api, LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class FinancialDashboard extends LightningElement {
    @track defaultData = {};

    connectedCallback(){
        this.defaultData = {
            unpaidqtd    : '0',
            unpaidprice  : 'R$ 0,00',
            expiredqtd   : '3',
            expiredprice : 'R$ 750,14',
            showModal : false,
            orders: [
                {
                    key                : '100123',
                    name               : '100123',
                    distributionCenter : 'NORTE',
                    orderId            : '',
                    orderNumber        : '100123',
                    orderId            : '108651',
                    orderNumberSap     : '102691',
                    refNumber          : '4770',
                    parcel             : '01',
                    dueDate            : '02/03/2022',
                    value              : 'R$ 10.887,10',
                    status             : 'Compensado'
                },
                {
                    key                : '100124',
                    name               : '100124',
                    distributionCenter : 'NORTE',
                    orderId            : '',
                    orderNumber        : '100124',
                    orderId            : '108652',
                    orderNumberSap     : '102692',
                    refNumber          : '4770',
                    parcel             : '02',
                    dueDate            : '02/04/2022',
                    value              : 'R$ 2.887,10',
                    status             : 'Compensado'
                },
                {
                    key                : '100125',
                    name               : '100125',
                    distributionCenter : 'NORTE',
                    orderId            : '',
                    orderNumber        : '100125',
                    orderId            : '108653',
                    orderNumberSap     : '102693',
                    refNumber          : '4770',
                    parcel             : '03',
                    dueDate            : '02/05/2022',
                    value              : 'R$ 8.887,10',
                    status             : 'Compensado'
                }
            ],
            selectedBill : {
                    key                : '100123',
                    name               : '100123',
                    distributionCenter : 'NORTE',
                    orderId            : '',
                    orderNumber        : '100123',
                    orderId            : '108651',
                    orderNumberSap     : '102691',
                    refNumber          : '4770',
                    parcel             : '01',
                    dueDate            : '02/03/2022',
                    value              : 'R$ 10.887,10',
                    status             : 'Compensado',                    
                    postDate              : '02/07/2022',
                    docDate               : '02/03/2022',
                    compensationDate      : '02/07/2022',
                    numberCompensationDoc : '108651',
                    paymentDescription    : '',
            }
        }
    }
    changeModal(){
        this.defaultData.showModal = !this.defaultData.showModal;
    }
    createBoleto(){
        window.open('https://kaique-agro-demo.my.salesforce.com/sfc/p/8a000003BBwh/a/8a000001AlFw/VSio0sUFic9hleeyNIUS0QHb6q2Mq3HiZ.l9tR1mXno', '_blank').focus();
    }
}