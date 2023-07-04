import { LightningElement, api, track } from 'lwc';

export default class ShowPricingOrderItem extends LightningElement {
    @track componentspricing = [];

    connectedCallback(){
        
              this.componentsPricing = [
              {
                  val: 7,
                  valType: "percent-fixed",
                  title: "Impostos",
                  icon: "standard:contract_line_outcome_data",
                },
               {
                  val: 12,
                  valType: "percent-fixed",
                  title: "Juros",
                  icon: "standard:price_book_entries",
                },
               {
                  val: -12,
                  valType: "percent-fixed",
                  title: "Politica Comercial",
                  icon: "standard:practitioner_role",
                },
               {
                  val: -7,
                  valType: "percent-fixed",
                  title: "Desconto Campanha",
                  icon: "standard:practitioner_role",
                },
                  {
                    val: 4,
                    valType: "percent-fixed",
                    title: "Condição de Pagamento",
                    icon: "standard:practitioner_role",
                  },
                
               {
                  val: 280,
                  valType: "currency",
                  title: "Preço Base",
                  icon: "standard:price_book_entries",
                },
                  {
                    val: 2,
                    valType: "percent-fixed",
                    title: "Desconto Vendedor",
                    icon: "standard:price_book_entries",
                  },
                
               {
                  val: 12,
                  valType: "currency",
                  title: "Frete de Saida",
                  icon: "standard:activation_target",
                },
                  {
                  val:  9,
                  valType: "currency",
                  title: "Frete de Transferencia",
                  icon: "standard:activations",
                },
                {
                  val: 301,
                  valType: "currency",
                  title: "Valor Final",
                  icon: "standard:connect_wallet",
                }];
    }
}