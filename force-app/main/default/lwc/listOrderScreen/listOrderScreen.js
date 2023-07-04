import { api, LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class ListOrderScreen extends LightningElement {
    @track showOrder = true;
    @track defaultData = {};
    @track selectedOrder = {};

	@track orderFilterData = {
		orderNumber: '',
		origem: '',
		destiny: '',
		createdDateFrom: '',
		createdDateUntil: '',
		status: []
	};
	@track datePicklist = [
		{
			label: '',
			value: ''
		},
		{
			label: 'Casa 1',
			value: 'Casa 1'
		},
		{
			label: 'Casa 2',
			value: 'Casa 2'
		},
		{
			label: 'Casa 3',
			value: 'Casa 3'
		},
		{
			label: 'Casa 4',
			value: 'Casa 4'
		}
	];
	@track statusPicklist = [
		{
			label: 'Em aprovação de crédito',
			value: 'Em aprovação de crédito',
			class: 'content__status-default'
		},
		{
			label: 'Em revisão',
			value: 'Em revisão',
			class: 'content__status-default'
		},
		{
			label: 'Fim do transporte',
			value: 'Fim do transporte',
			class: 'content__status-default'
		}
	];
	@track selectedOrder;
	handlerFilters(event) {
		const { name, value, dataset } = event.target;

		if (name === 'status') {
			this.handlerChangeStatus(dataset.id, dataset.index);
		}
		else {
			this.orderFilterData[name] = value;
		}
	}
	handlerChangeStatus(value, index) {
		let currentStatus = this.statusPicklist[index];

		if (this.orderFilterData.status.includes(value)) {
			currentStatus.class = 'content__status-default';

			this.orderFilterData.status = this.orderFilterData.status.filter(item => item !== value);
		}
		else {
			currentStatus.class = 'content__status-selected';

			this.orderFilterData.status = [
				...this.orderFilterData.status,
				value
			];
		}
	}
	handlerCloseOrderSummary() {
		this.handlerClearFilters();

		this.isShowOrderList = true;

		this.selectedOrder = null;
	}
    connectedCallback(){
        this.showOrder = true;
        this.defaultData = [{
            name                   : '395316',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'João Facholi',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 337,75',
                    name     : 'POTENMIX ENERGETICO 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 134,75',
                    name     : 'POTENMIX PASTO ENERGETICO 30KG',
                }
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        },{
            name                   : '395316',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'João Facholi',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 723,15',
                    name     : 'POTENMIX PASTO 20 30KG',
                },
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        },{
            name                   : '395318',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'IHARA',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 337,75',
                    name     : 'POTENMIX ENERGETICO 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 134,75',
                    name     : 'POTENMIX PASTO ENERGETICO 30KG',
                }
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        },{
            name                   : '395319',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'IHARA',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 723,15',
                    name     : 'POTENMIX PASTO 20 30KG',
                },
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        },{
            name                   : '395320',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'IHARA',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 723,15',
                    name     : 'POTENMIX PASTO 20 30KG',
                },
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        },{
            name                   : '395321',
            deliveryDate           : '13/10/2022',
            status                 : 'Em revisão',
            totalAmount            : 'R$ 15.200,20',
            authorizationNumber    : '424 / 2022',
            distributionCenterName : 'CD CUIABA',
            siteName               : 'João Facholi',
            Itens                  : [
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 834,75',
                    name     : 'BRBEEF 14 30KG',
                },
                {
                    quantity : '10',
                    und      : 'PC',
                    price    : 'R$ 124,75',
                    name     : 'POTENMIX AGUAS 30KG',
                },
                {
                    quantity : '75',
                    und      : 'PC',
                    price    : 'R$ 723,15',
                    name     : 'POTENMIX PASTO 20 30KG',
                },
            ],
            service                : [
                {
                    name     : 'ENTREGA DO MATERIAL',
                    name     : 'DESCARREGAR MATERIAL',
                }
            ],
            tech                : [
                {
                    name     : 'EMPILHADEIRA',
                }
            ],
            id                     : '395316',
        }
        ];
        this.selectedOrder = {
          status: "",
          name: "395616",
          deliveryDate: "13/10/2022",
          orderNumberSap: "3100245142",
          orderNumber: "Não Informado",
          accountName: "João Facholi",
          salesName: "Venda Direta",
          accountCnpj: "61.142.550/0004-82",
          freightType: "CIF",
          incoterms2: "DESTACADO",
          paymentConditionName: "30/60/90 DDL",
          escortType: "CIF - ESCOLTA",
          siteName: "João Facholi",
          distributionCenterName: "CD SAO PAULO",
          getTotalProduct: "R$ 10.721,00",
          getTotalFreigth: "R$ 2.987,00",
          getTotalEscort: "R$ 0,00",
          getTotalService: "R$ 4.987,00",
          totalDiscount: "R$ 0,00",
          getTotalWeight: "120 L",
          getTotalPrice: "R$ 29.928,00",
          noteObs:
            "AUTORIZACAO DE SERVICO E ENTREGA DE MATERIAL REFERENTE A COMPRA ANEXADA ACIMA",
          note: "",
          docname: "ASSINATURA",
          taxIcmspercent: "18%",
          taxIcmsvalue: "R$ 2.462,00",
          taxPispercent: "1,65%",
          taxPisvalue: "R$ 262,00",
          taxCofinspercent: "7,60%",
          taxCofinsvalue: "R$ 492,00",
          taxIsspercent: "2,00%",
          taxIssvalue: "R$ 102,00",
          itens: [
            {
              key: "10",
              code: "",
              name: "POTENMIX PASTO 20 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 120,00",
              price: "R$ 110,00",
              itemDiscount: "R$ 10,00",
              itemDiscountPercent: "9",
              priceParams: "13,00",
              priceWithIpi: "12,58",
              itemNumber: "",
            },
            {
              key: "20",
              code: "",
              name: "BRBEEF 14 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 220,00",
              price: "R$ 190,00",
              itemDiscount: "R$ 30,00",
              itemDiscountPercent: "12",
              priceParams: "22,00",
              priceWithIpi: "29,58",
              itemNumber: "",
            },
            {
              key: "30",
              code: "",
              name: "BRBEEF 18 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 100,00",
              price: "R$ 98,00",
              itemDiscount: "R$ 2,00",
              itemDiscountPercent: "2",
              priceParams: "3,00",
              priceWithIpi: "2,08",
              itemNumber: "",
            },
            {
              key: "40",
              code: "",
              name: "POTENMIX 40 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 20,00",
              price: "R$ 18,00",
              itemDiscount: "R$ 2,00",
              itemDiscountPercent: "10",
              priceParams: "1,00",
              priceWithIpi: "1,58",
              itemNumber: "",
            },
            {
              key: "50",
              code: "",
              name: "POTENMIX AGUAS 30KG",
              quantity: "12",
              und: "PC",
              originalPrice: "R$ 122,00",
              price: "R$ 112,00",
              itemDiscount: "R$ 10,00",
              itemDiscountPercent: "9",
              priceParams: "13,00",
              priceWithIpi: "12,58",
              itemNumber: "",
            },
            {
              key: "60",
              code: "",
              name: "POTENMIX CREEP 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 320,00",
              price: "R$ 240,00",
              itemDiscount: "R$ 80,00",
              itemDiscountPercent: "12",
              priceParams: "22,00",
              priceWithIpi: "29,58",
              itemNumber: "",
            },
            {
              key: "70",
              code: "",
              name: "BRBEEF 14 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 192,00",
              price: "R$ 98,00",
              itemDiscount: "R$ 94,00",
              itemDiscountPercent: "45",
              priceParams: "3,00",
              priceWithIpi: "2,08",
              itemNumber: "",
            },
            {
              key: "80",
              code: "",
              name: "BRBEEF 16 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 232,10",
              price: "R$ 180,00",
              itemDiscount: "R$ 52,10",
              itemDiscountPercent: "32",
              priceParams: "1,00",
              priceWithIpi: "1,58",
              itemNumber: "",
            },
            {
              key: "90",
              code: "",
              name: "BRBEEF 18 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 192,00",
              price: "R$ 98,00",
              itemDiscount: "R$ 94,00",
              itemDiscountPercent: "45",
              priceParams: "3,00",
              priceWithIpi: "2,08",
              itemNumber: "",
            },
            {
              key: "100",
              code: "",
              name: "POTENMIX DESMAMA 30KG",
              quantity: "10",
              und: "PC",
              originalPrice: "R$ 232,10",
              price: "R$ 180,00",
              itemDiscount: "R$ 52,10",
              itemDiscountPercent: "32",
              priceParams: "1,00",
              priceWithIpi: "1,58",
              itemNumber: "",
            },
          ],
        };
    }
    showOrderChange(){
        this.showOrder = !this.showOrder;
    }

}