import { api, LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import Images from '@salesforce/resourceUrl/images';
import Images1 from '@salesforce/resourceUrl/images1';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { FacholiData } from './customerData';

export default class CreateAvailabilitySupply extends NavigationMixin(LightningElement) {
  @track account;
  @track desktop;
  @track headerStyle = "";
  @track headerClass = "";
  @track showHeader = false;
  @track showRelatedOrderProducts = false;
  @track showCheckoutModal = false;
  @track OrderNumber = null;

  @track allProducts = [];
  // @track allProductsRecommendation = [];
  @track sumObject = {};
  @track filterObject = {};
  @track filterObjectCenter = {};

  // @track baseImage = Images + '/baseIhara.webp';
  // @track baseImage = Images1 + '/forusLogo.png';
  // @track baseImage = Images1 + '/itajalogo.png';
  @track baseImage = Images1 + "/ALZlogo.png";

  @track optionsFamily = [];
  @track optionsCenter = [];
  @track selectedRecordAcc = { Id: "", Name: "NOVO HORIZONTINO" };

  @track isDetailOrderItem = false;

  connectedCallback() {
    this.desktop = FORM_FACTOR == "Large";
    this.headerStyle = this.desktop ? "height: 100%" : "";
    this.headerClass = this.desktop
      ? "main-content slds-scrollable_y"
      : "main-content";
    this.account = {
      key: "13.607.309/0001-96",
      name: "NOVO HORIZONTINO",
      aditional: "Grandes Contas",
      aditionalInfo: "Potencial de Compras: R$ 1.000.000",
      currency: "USD",
    };
    this.allProducts = FacholiData();
    // this.allProductsRecommendation = iharaRecommendationData(this.allProducts);

    this.sumFamily();
    this.sumCenter();
    this.calcProducts();
    this.sumProducts();
  }

  addTratamento() {}

  selectRelatedOrder(event) {
    this.handleChangeLookup(event, "OrderNumber");
    this.showRelatedOrderProducts = this.OrderNumber != null;
  }

  handleChangeLookup(event, lookup) {
    this[lookup] = this.getLookupData(event);
  }
  getLookupData(event) {
    return event?.detail?.record?.Id
      ? { Id: event?.detail?.record?.Id, Name: event?.detail?.record?.Name }
      : null;
  }

  sumCenter() {
    var listFamily = [];
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (cts) {
            listFamily.push(cts.name);
          },
          { listFamily }
        );
      },
      { listFamily }
    );

    this.optionsCenter.push({ label: "", value: "" });

    listFamily = [...new Set(listFamily)];
    for (var i = 0; i < listFamily.length; i++) {
      var item = listFamily[i];
      this.optionsCenter.push({ label: item, value: item });
    }
  }

  sumFamily() {
    var listFamily = [];
    this.allProducts.forEach(
      function (item) {
        listFamily.push(item.family);
      },
      { listFamily }
    );

    this.optionsFamily.push({ label: "", value: "" });

    listFamily = [...new Set(listFamily)];
    for (var i = 0; i < listFamily.length; i++) {
      var item = listFamily[i];
      this.optionsFamily.push({ label: item, value: item });
    }
  }
  calcProducts() {
    var t = this;
    this.allProducts.forEach(
      function (item) {
        item.stock = item.center.reduce(
          (sum, items) => Number(sum) + Number(items.stock),
          0
        );
        item.price = t.fmtDec(
          item.center.reduce(
            (sum, items) => Number(sum) + Number(items.listPrice),
            0
          ) / item.center.length,
          2
        );
        item.leadTime = t.fmtDec(
          item.center.reduce(
            (sum, items) => Number(sum) + Number(items.leadTime),
            0
          ) / item.center.length,
          0
        );
        item.leadTimeLabel = t.getCurrentDateTime(
          t.setDate(new Date(), item.leadTime)
        );
        item.center.forEach(
          function (items) {
            items.key = item.name + " - " + items.name;
            items.productName = item.name;
            items.img = item.img;
            items.leadTimeLabel = t.getCurrentDateTime(
              t.setDate(new Date(), items.leadTime)
            );
          },
          { item, t }
        );
      },
      { t }
    );
  }

  fmtDec(val, fixedd) {
    return Number(val.toFixed(fixedd));
  }

  setDate(dt, val) {
    return new Date(dt.setDate(dt.getDate() + val));
  }
  getCurrentDateTime(dt) {
    return (
      this.formatNumber(dt.getDate()) +
      "/" +
      this.formatNumber(dt.getMonth()) +
      "/" +
      dt.getFullYear()
    );
  }
  formatNumber(val) {
    return (val <= 9 ? "0" : "") + val;
  }

  closeHeader() {
    this.showHeader = false;
    this.handleProductScreen();
  }
  closeCheckoutModal() {
    this.showCheckoutModal = false;
    this.handleProductScreen();
  }
  showHeaderButton() {
    this.showHeader = !this.showHeader;
    this.scrollToTop();
    this.handleProductScreen();
  }

  showCheckout() {
    this.showCheckoutModal = !this.showCheckoutModal;
    this.scrollToTop();
    this.handleProductScreen();
  }
  handleProductScreen() {
    let divAllProducts = this.template.querySelectorAll(
      `[data-name="left_div"]`
    );
    var t = this;

    divAllProducts.forEach(
      function (div) {
        var lenghts = 12;
        lenghts -= t.showCheckoutModal ? 3 : 0;
        lenghts -= t.showHeader ? 2 : 0;
        div.classList.remove("slds-size_7-of-12");
        div.classList.remove("slds-size_8-of-12");
        div.classList.remove("slds-size_5-of-12");
        div.classList.remove("slds-size_9-of-12");
        div.classList.remove("slds-size_10-of-12");
        div.classList.remove("slds-size_12-of-12");
        div.classList.add(`slds-size_${lenghts.toString()}-of-12`);
      },
      { t }
    );
  }

  @track isMixClientOpen = false;
  @track isRelatedProducts = false;
  @track isBarterOpen = false;
  @track isRecommendation = false;
  @track isApprovers = false;
  @track showResumo = true;
  @track iconResumo = "utility:chevronright";

  @track iconCordeiro = "utility:chevronright";
  @track showCordeiro = true;

  @track iconAves = "utility:chevronright";
  @track showAves = true;

  @track orderObjectCrop = null;
  @track orderObjectRecordType = null;
  @track orderItemObjectCulture = null;
  @track orderItemObjectCulture2 = null;
  @track orderObjectBarterType = null;

  @track disabledCustomLookupCrop = false;

  @track isBarter = false;

  @track checkedCurrencyDol = true;
  @track checkedCurrencyReal = false;

  @track productSelected = "";
  @track familySelected = "";

  @track showFox = true;
  @track showGranary = true;

  @track allQuantity = 0;

  get getRoute(){
    var t= this;
    var allCenter = [];
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (center) {
            if (center.deliveryFor == 'Fabrica') allCenter.push(center);
          },
          { allCenter, t }
        );
      },
      { allCenter, t }
    );
    return allCenter.length > 0 ? 'Rota 01' : 'Rota 02';
  }

  get optionsBarter() {
    return [
      { label: "Trigo em Grãos", value: "Trigo em Grãos" },
      { label: "Sorgo em Grãos", value: "Sorgo em Grãos" },
      { label: "Milho em Grãos", value: "Milho em Grãos" },
      { label: "Soja em Grãos", value: "Soja em Grãos" },
      { label: "Algodão em Pluma", value: "Algodão em Pluma" },
    ];
  }

  get optionsCultura() {
    return [
      { label: "SOJA", value: "SOJA" },
      { label: "MILHO", value: "MILHO" },
    ];
  }
  get optionsCrop() {
    return [
      { label: "2023", value: "2023" },
      { label: "2024", value: "2024" },
    ];
  }
  get optionsMoviment() {
    return [{ label: "1101 Compra p/industrialização", value: "1101" }];
  }
  get optionsPayment() {
    return [
      { label: "Pagto 30/60/90", value: "30/60/90" },
      { label: "Pagto 30/60", value: "30/60" },
      { label: "Pagto 30", value: "30" },
    ];
  }
  get optionsRota() {
    return [
      { label: "Rota 3", value: "Rota3" },
      { label: "Rota 4", value: "Rota4" },
    ];
  }
  get optionsCargo() {
    return [
      { label: "Fracionada", value: "Fracionada" },
      { label: "Fechada", value: "Fechada" },
    ];
  }
  get optionsFreight() {
    return [
      { label: "Carga Empresa", value: "Carga" },
      { label: "Frete Combinado", value: "Frete" },
      { label: "Cliente Retira", value: "Cliente" },
      { label: "Transportadora", value: "Transportadora" },
    ];
  }
  get options() {
    return [
      { label: "Pedido Barter", value: "BarterSales" },
      { label: "Plano Safra", value: "PlanoSafra" },
      { label: "Pedido de Venda", value: "SalesOrder" },
      { label: "Contrato Futuro", value: "Contrato" },
    ];
  }
  get optionsCondition() {
    return [
      { label: "Campanha Verão OURO", value: "OURO" },
      { label: "Campanha Inverto NORTE", value: "NORTE" },
    ];
  }

  get getBarterType() {
    return [
      { label: "Por Dentro", value: "PorDentro" },
      { label: "Por Fora", value: "PorFora" },
      { label: "Triangulação", value: "Triangulacao" },
    ];
  }

  calcQuatidade(event) {
    this.allQuantity = Number(parseFloat(event.target.value).toFixed(3)) * 10;
  }

  handleCurrency(event) {
    this.account.currency = event.target.value;
    this.checkedCurrencyReal = this.account.currency == "BRL";
    this.checkedCurrencyDol = this.account.currency != "BRL";
  }

  showMessage() {
    this.showMsg(
      "Consulta de Crédito",
      "Muito Positivo , Crédito: R$ 10.000,00",
      "success"
    );
  }
  showMsg(title, msg, vari) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: msg,
        variant: vari,
      })
    );
  }

  sumProducts() {
    var t = this;
    var allCenter = [];
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (center) {
            if (center.showCart) allCenter.push(center);
          },
          { allCenter, t }
        );
      },
      { allCenter, t }
    );

    this.sumProductsFilter(allCenter);
  }
  sumProductsFilter(center) {
    this.sumObject.length = center.length;
    this.sumObject.amount = center.reduce(
      (sum, item) => Number(sum) + Number(item.totalPrice),
      0
    );
    this.sumObject.freight = center.reduce(
      (sum, item) => Number(sum) + (Number(item.quantity)  * (Number(item.transferFreight) + Number(item.outboundFreight))),
      0
    );;
    this.sumObject.totalAmount = this.sumObject.amount + this.sumObject.freight;

    this.sumObject.minimumOrderTotal = 10000;

    this.sumObject.minimumOrder =
      this.sumObject.minimumOrderTotal - this.sumObject.totalAmount;
    this.sumObject.minimumOrder =
      this.sumObject.minimumOrder <= 0 ? 0 : this.sumObject.minimumOrder;

    this.sumObject.minimumOrderPercent =
      this.sumObject.totalAmount / this.sumObject.minimumOrderTotal;
    this.sumObject.minimumOrderPercent =
      this.sumObject.minimumOrderPercent > 1
        ? 1
        : this.sumObject.minimumOrderPercent < 0
        ? 0
        : this.sumObject.minimumOrderPercent;
    this.sumObject.width =
      "width: " + this.sumObject.minimumOrderPercent * 100 + "% !important";
  }

  addProduct(event) {
    this.showCart(event.currentTarget.dataset.key, true);
    this.sumProducts();
  }

  removeProduct(event) {
    this.showCart(event.currentTarget.dataset.key, false);
    this.sumProducts();
  }

  showCart(key, show, initialVal = null, initialPrice = null) {
    var t = this;
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (center) {
            if (center.key == key) {
              center.quantity = initialVal ? initialVal : center.quantity;
              center.unitPrice = initialPrice ? initialPrice : center.unitPrice;
              if (center.quantity && center.unitPrice) {
                center.showCart = show;
              } else if (show) {
                t.showMsg(
                  "Cuidado!!",
                  "Preencha a quantidade e informe um preço para o Produto",
                  "warning"
                );
              }
            }
          },
          { key, show, t, initialVal, initialPrice }
        );
      },
      { key, show, t, initialVal, initialPrice }
    );
  }

  changeQuantity(event) {
    var val =
      parseFloat(event.currentTarget.dataset.quantity) +
      parseFloat(event.currentTarget.dataset.operation);
    this.updateFieldRelated(event.currentTarget.dataset.key, val, "quantity");
  }

  changeValueBarter(event) {
    this.updateFieldRelated(
      event.detail.key,
      event.detail.value,
      event.detail.field
    );
  }

  changeField(event) {
    this.updateFieldRelated(
      event.currentTarget.dataset.key,
      parseFloat(event?.target?.value),
      event.currentTarget.dataset.field
    );
  }
  updateFieldRelated(key, val, field) {
    var t = this;
    val = val < 0 ? 0 : val;
    if (val == 0 && field == "quantity") {
      this.showCart(key, false);
    }
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (center) {
            if (center.key == key) {
              center[field] = val;
              center.unitPrice = t.calcPrice(center);
              center.comission = t.calcComission(center);
              center.totalPrice = t.calcTotalPrice(center);
              center.deliveryFor = t.calcDelivery(center);
              center.discount = t.fmtDec(center.discount, 2);
            }
          },
          { key, val, field, t }
        );
      },
      { key, val, field, t }
    );
    this.sumProducts();
  }

  calcDelivery(center) {
    return center.quantity > 5000 ? 'Fabrica' : 'Centro de Distribuição';
  }
  calcComission(center) {
    return center.discount > center.taxPrice ? ((center.discount-center.taxPrice) > center.baseComission
      ? 0
      : center.baseComission - (center.discount-center.taxPrice)) : center.baseComission;
  }
  calcPrice(center) {
    return this.fmtDec((1 - center.discount / 100) * center.listPrice, 2);
  }

  calcTotalPrice(center) {
    return center.quantity * center.unitPrice;
  }

  @track paymentPercent = 0;
  handleCondition(event) {
    this.paymentPercent =
      event?.detail?.value == "30/60/90"
        ? 4
        : event?.detail?.value == "30/60"
        ? 3
        : event?.detail?.value == "30"
        ? 2
        : 0;
  }
  handleFilter(event) {
    this.filterObject[event.currentTarget.dataset.filter] =
      event?.detail?.value?.toUpperCase();
    this.filterContext();
  }
  handleFilterRelated(event) {
    this.filterObjectCenter[event.currentTarget.dataset.filter] =
      event?.detail?.value?.toUpperCase();
    this.filterContext();
    this.filterContextCenter();
  }
  filterContext() {
    this.allProducts.forEach((item) => (item.show = true));
    var t = this;
    Object.keys(this.filterObject).forEach(
      function (key) {
        if (key) {
          var val = t.filterObject[key];
          if (val) {
            t.allProducts.forEach(
              function (item) {
                item.show = item[key].toString().includes(val) && item.show;
              },
              { key, val }
            );
          }
        }
      },
      { t }
    );
  }
  filterContextCenter() {
    var t = this;
    this.allProducts.forEach(function (item) {
      item.center.forEach(function (center) {
        center.show = true;
      });
    });
    Object.keys(this.filterObjectCenter).forEach(
      function (key) {
        if (key) {
          var val = t.filterObjectCenter[key];
          if (val) {
            t.allProducts.forEach(
              function (item) {
                var hasTrue = { show: false };
                item.center.forEach(
                  function (center) {
                    center.show =
                      center[key].toString().includes(val) && center.show;
                    if (center.show) hasTrue["show"] = true;
                  },
                  { key, val, hasTrue }
                );
                item.show = hasTrue["show"] && item.show;
              },
              { key, val }
            );
          }
        }
      },
      { t }
    );
  }

  handleChangeType(event) {
    this.orderObjectRecordType = event.detail.value;
    this.isBarter = event.detail.value == "BarterSales";
    if (this.isBarter) {
      this.showResumo = false;
      this.iconResumo = this.showResumo
        ? "utility:chevronright"
        : "utility:chevrondown";
    } else {
      this.showResumo = true;
      this.iconResumo = this.showResumo
        ? "utility:chevronright"
        : "utility:chevrondown";
    }
  }
  handlePicklistBarterType(event) {
    var record = {};
    record = event?.detail || event?.detail?.value;
    this.orderObjectBarterType = record.record;
  }

  showResumoButton() {
    this.showResumo = !this.showResumo;
    this.iconResumo = this.showResumo
      ? "utility:chevronright"
      : "utility:chevrondown";
  }

  conclude() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Sucesso!",
        message: "Pedido criado com Sucesso.",
        variant: "success",
      })
    );
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: "8018a000000jiO7AAI",
        objectApiName: "Order",
        actionName: "view",
      },
    });
    // upsertOrder({products: JSON.stringify(this.getItems())})
    // .then(result => {
    //     if (!result.hasError)
    //         this.loadTasks();
    //     else
    //         this.showMsg(result.message);
    // })
    // .catch(error => {
    //    	this.dispatchEvent(new ShowToastEvent({ title: 'Sucesso!', message: "Pedido Criado com Sucesso.", variant: 'success' }));
    // });
  }

  getItems() {
    // var checkoutOrderItem = [];
    // return checkoutOrderItem;
  }
  checkNote() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Sucesso!",
        message: "Produto adicionado ao carrinho.",
        variant: "success",
      })
    );
  }
  scrollToTop() {
    if (!this.desktop) {
      const scrollOptions = {
        left: 0,
        top: 0,
      };
      parent.scrollTo(scrollOptions);
    }
  }
  @track componentsPricing = [];
  openItem(event) {    
    var key = event.currentTarget.dataset.key;
    var t = this;
    this.allProducts.forEach(
      function (item) {
        item.center.forEach(
          function (center) {
            if (center.key == key) {
              t.componentsPricing = [];
              t.componentsPricing.push({
                  val: center.taxPrice,
                  valType: "percent-fixed",
                  title: "Impostos",
                  icon: "standard:contract_line_outcome_data",
                });
               t.componentsPricing.push({
                  val: center.jurosPrice,
                  valType: "percent-fixed",
                  title: "Juros",
                  icon: "standard:price_book_entries",
                });
               t.componentsPricing.push({
                  val: -12,
                  valType: "percent-fixed",
                  title: "Politica Comercial",
                  icon: "standard:practitioner_role",
                });
               t.componentsPricing.push({
                  val: -7,
                  valType: "percent-fixed",
                  title: "Desconto Campanha",
                  icon: "standard:practitioner_role",
                });
                if (t.paymentPercent) {
                  t.componentsPricing.push({
                    val: t.paymentPercent,
                    valType: "percent-fixed",
                    title: "Condição de Pagamento",
                    icon: "standard:practitioner_role",
                  });
                }
               t.componentsPricing.push({
                  val: center.listPrice,
                  valType: "currency",
                  title: "Preço Base",
                  icon: "standard:price_book_entries",
                });
                if (center.discount != 0) {
                  t.componentsPricing.push({
                    val: center.discount,
                    valType: "percent-fixed",
                    title: "Desconto Vendedor",
                    icon: "standard:price_book_entries",
                  });
                }
               t.componentsPricing.push({
                  val: center.outboundFreight,
                  valType: "currency",
                  title: "Frete de Saida",
                  icon: "standard:activation_target",
                });
                if(center.deliveryFor != 'Fabrica' ){
                  t.componentsPricing.push({
                  val:  center.transferFreight,
                  valType: "currency",
                  title: "Frete de Transferencia",
                  icon: "standard:activations",
                });
                }
               t.componentsPricing.push({
                  val: (center.unitPrice ? center.unitPrice : center.listPrice) * (t.paymentPercent ? (1 + t.paymentPercent/100) : 1) + (center.deliveryFor == 'Fabrica' ? 0 : center.transferFreight) + center.outboundFreight,
                  valType: "currency",
                  title: "Valor Final",
                  icon: "standard:connect_wallet",
                });
              return;
            }
          },
          { key, t }
        );
      },
      { key, t }
    );
    this.isDetailOrderItem = true;
    this.scrollToTop();
  }
  openRelatedOrder() {
    this.isRelatedProducts = true;
    this.scrollToTop();
  }
  openMixClient() {
    this.isMixClientOpen = true;
    this.scrollToTop();
  }

  addToCart(event) {
    this.showCart(
      event.detail.key,
      true,
      event.detail.quantity,
      event.detail.price
    );
    this.sumProducts();
  }

  oncloseitem(event) {
    this.isDetailOrderItem = false;
  }
  oncloseproducts(event) {
    this.isRelatedProducts = false;
  }
  onclosehistory(event) {
    this.isMixClientOpen = false;
  }

  openBarter() {
    this.isBarterOpen = true;
    this.scrollToTop();
  }

  onclosebarter(event) {
    this.isBarterOpen = false;
  }

  openApprovers() {
    this.isApprovers = true;
    this.scrollToTop();
  }

  openRecommendation() {
    this.isRecommendation = true;
    this.scrollToTop();
  }

  oncloseApprovers(event) {
    this.isApprovers = false;
  }

  oncloseRecommendation(event) {
    this.isRecommendation = false;
  }

  removeOrderedProduct(event) {}

  handleNewRecordCrop(event) {
    var record = {};
    record = event?.detail || event?.detail?.value;
    this.orderObjectCrop = record.record == null ? undefined : record.record;
  }
  handleNewRecordCulture(event) {
    var record = event?.detail || event?.detail?.value;
    this.orderItemObjectCulture = record.record != null ? record.record : null;
  }
  handleNewRecordCulture2(event) {
    var record = event?.detail || event?.detail?.value;
    this.orderItemObjectCulture = record.record != null ? record.record : null;
  }
}