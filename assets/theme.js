// const mobMenuIcon = document.getElementById('mobileMenuIcon');
// const mobileMenu = document.querySelector('.mobile__menu');
// const mobileMenuCloseBtn = document.getElementById('expandedMenu');
// const prodForm = document.getElementById('productForm');
// const prodPrice = document.querySelector('.product__price__value');
// const cart_total_price = document.querySelector('.cart__subtotal__number');
// const item_count_num = document.querySelector('.item__count__val');
// const addCartBtn = document.getElementById('addToCart');


window.onload = function () {
    var cart_popup = new CartPopup();
    var selectors = {
        addToCartBtn: 'addToCart',
        product_select: 'productSelect',
        product_price: '.product__price__value',
        quantity: '.product__input__field',
        minus_btn: '.product__minus',
        plus_btn: '.product__plus'
    }


    function CartPopup() {
        let self = this;
        this.selectors = {
            cart_item_count:".cart__items__count__value",
            cart_item:".cart__item",
            cart_item_price:".cart__item__price",
            cart_content:'.cart__content',
            cart_minus:'.cart__minus',
            cart_plus:".cart__plus",
            cart_item_quantity:'.cart__input__field'
        }
        this.item_counter = document.querySelector(this.selectors.cart_item_count);
        this.cart_item = document.querySelector(this.selectors.cart_item);
        this.cart_item_price = document.querySelector(this.selectors.cart_item_price);
        this.cart_content = document.querySelector(this.selectors.cart_content);
        this.plusBtn = document.querySelectorAll(this.selectors.cart_plus);
        this.minusBtn = document.querySelectorAll(this.selectors.cart_minus);
        this.cart_item_qty = document.querySelectorAll(this.selectors.cart_item_quantity);
        this.compare_at_price = null;

        this.methods = {
            minusQty: function (index) {
                let qty = parseInt(self.cart_item_qty[index].value)
                if (qty > 1) {
                    qty -= 1;
                    self.cart_item_qty[index].value = qty
                }
            },
            plusQty: function (index) {
                let qty = parseInt(self.cart_item_qty[index].value)
                qty += 1;
                self.cart_item_qty[index].value = qty
            }
        }
        this.getCart = async function () {
           let response = await fetch('/cart.js');
           let data = await response.json()
           return data;
           // fetch('/cart.js')
           //  .then(response => response.json())
           //  .then(cart => {
           //          self.cart = cart
           //      })
        }

        this.getCart()
            .then(cart => {
               self.cart = cart;
            })

            this.setEventHandlers = function (items) {
                this.plusBtn = document.querySelectorAll(this.selectors.cart_plus);
                this.minusBtn = document.querySelectorAll(this.selectors.cart_minus);
                this.cart_item_qty = document.querySelectorAll(this.selectors.cart_item_quantity);
                items.forEach((item,index) => {
                    this.plusBtn[index].addEventListener('click',function () {
                        self.methods.plusQty(index);
                        self.changeCart(item,index);
                        console.log(item.key)
                    });
                    this.minusBtn[index].addEventListener('click',function () {
                        self.methods.minusQty(index);
                        self.changeCart(item,index);
                    });
                    console.log(this.minusBtn[index])
                })
            }
        }



        CartPopup.prototype.changeCart = function (item,index) {
            let quantity = parseInt(this.cart_item_qty[index].value);
            console.log(quantity)
            fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                        {
                            'id': item.key,
                            'quantity': quantity
                        })
            })
        }

        CartPopup.prototype.renderCart = function (product) {
            // this.cart_item = document.querySelectorAll(selectors.cart_item);
            this.compare_at_price = product.items[0].properties.compare_at_price?
                parseFloat(product.items[0].properties.compare_at_price):'';
            this.formatted_compare_price = this.compare_at_price?
                Shopify.formatMoney(this.compare_at_price,Shopify.money_format):'';
            this.getCart()
                .then(cart => {
                    console.log(cart.items)
                    this.cart_content.innerHTML = null;
                    cart.items.forEach((item,index)=> {
                        this.cart_content.innerHTML+= `
                                        <div class="cart__item" data-index="${index}">
                <div class="cart__item__image__wrapper">
                    <img src="${item.image}" alt="" class="cart__item__image">
                </div>
                <div class="cart__item__info">
                    <a href="${item.url}" class="cart__item__title">${item.product_title} - ${item.options_with_values[0].value}</a>
                    <h3 class="cart__item__price" data-product_price="">
                            ${Shopify.formatMoney(item.price,Shopify.money_format)}
                            <span class="cart__item__sale__price sale_price">
                                ${this.formatted_compare_price}
                        </span>
                    </h3>
                    <div class="custom_input cart__item__custom__input">
                        <div class="custom_input__minus cart__minus">
                            <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.69873 2.21891V0.643912H11.3037V2.21891H0.69873Z" fill="black"></path>
                            </svg>
                        </div>
                        <input type="number" class="custom_input__field cart__input__field"  value="${item.quantity}">
                        <div class="cart__plus custom_input__plus" >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1701 5.09791V6.96691H6.9281V11.2089H5.0801V6.96691H0.838102V5.09791H5.0801V0.855911H6.9281V5.09791H11.1701Z" fill="black"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
                        `;

                    })
                    this.setEventHandlers(cart.items)
                })
        }

    var product = (function () {
        var data = {};

        data.item_counter = document.querySelector(selectors.cart_item_count);
        data.quantity = document.querySelector(selectors.quantity) || data.quantity;
        data.variant = document.getElementById(selectors.product_select) || data.variant;
        data.id = data.variant.value;
        data.addCartBtn = document.getElementById(selectors.addToCartBtn) || data.addCartBtn;
        data.compare_at_price = theme.product.compare_at_price;

        methods = {
            clearCart:function () {
                fetch('/cart/clear.js',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "token": "1d19a32178501c44ef2223d73c54d16d",
                        "note": null,
                        "attributes": {},
                        "total_price": 0,
                        "total_weight": 0,
                        "item_count": 0,
                        "items": [],
                        "requires_shipping": false
                    })
                })
            },
            addProduct:function () {
             fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'items': [
                            {
                                'id': data.id,
                                'quantity': parseInt(data.quantity.value),
                                properties: {
                                    'compare_at_price':data.compare_at_price
                                }
                            }
                        ]
                    })
                })
                 .then(response => response.json())
                 .then(data => {
                     cart_popup.renderCart(data)
                 })
            },
            // addCart: function (onsuccess,onerror) {
            //     addCartFetch.then(onsuccess,onerror)
            // },
            // onSuccess:function (data) {
            //    cart_popup.renderCart()
            // },
            // onError:function (error) {
            //     return error
            // },
            // addToCart:async function (id, quantity) {
            //   let response = await
            //         let data = await response.json();
            //         return data;
            //        // .then(response => response.json())
            //        // .then(data => {
            //        //             // // self.cart.count = parseInt(cart.item_count);
            //        //             // // self.cart.total_price = cart.total_price
            //        //             // data.test.textContent = cart.total_price
            //        //             // data.item_counter.textContent = cart.item_count
            //        //      cart_popup.renderCart()
            //        // })
            //
            // },
            onProductVariantChange: function (select) {
                data.id = data.variant.value;
                document.querySelector(selectors.product_price).textContent =
                    select.options[select.selectedIndex].dataset.variant_price;
            },
            minusQty: function () {
                let qty = parseInt(data.quantity.value)
                if (qty > 1) {
                    qty -= 1;
                    document.querySelector(selectors.quantity).value = qty
                }
            },
            plusQty: function () {
                let qty = parseInt(data.quantity.value)
                qty += 1
                document.querySelector(selectors.quantity).value = qty
            }
        }
            document.querySelector('.clear').addEventListener('click',function () {
                methods.clearCart()
            })
            data.variant.addEventListener('change', function () {
                methods.onProductVariantChange(this)
            })
            data.addCartBtn.addEventListener('click', function () {
                // methods.addToCart(data.variant.value, data.quantity)
                //     // .then(data => {
                //     //     cart_popup.getCart()
                //     //         .then(cart => {
                //     //             cart_popup.renderCart(cart)
                //     //         })
                //     // })
                // cart_popup.getCart()
                //     .then(cart => {
                //         cart_popup.renderCart(cart)
                //     })
                methods.addProduct()
            })
            document.querySelector(selectors.plus_btn).addEventListener('click',function (){
                methods.plusQty()
            })
            document.querySelector(selectors.minus_btn).addEventListener('click',function () {
                methods.minusQty()
            })
    })()
// mobMenuIcon.addEventListener('click',() => {
//     mobileMenu.classList.remove('closed');
//     mobileMenu.classList.add('open')
// })
//
// mobileMenuCloseBtn.addEventListener('click',() => {
//     mobileMenu.classList.remove('open');
//     mobileMenu.classList.add('closed')
// })

    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 16,
        slidesPerView: 3,
        navigation: {
            nextEl: ".thumb-button-next",
            prevEl: ".thumb-button-prev",
        },
        // freeMode: true,
        // watchSlidesVisibility: true,
        // watchSlidesProgress: true,
    })
    const swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        }
    })

    var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
    Shopify.money_format = "${{amount}}";
    Shopify.formatMoney = function (cents, format) {
        if (typeof cents == 'string') {
            cents = cents.replace('.', '');
        }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || this.money_format);

        function defaultOption(opt, def) {
            return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = defaultOption(precision, 2);
            thousands = defaultOption(thousands, ',');
            decimal = defaultOption(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number / 100.0).toFixed(precision);

            var parts = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents = parts[1] ? (decimal + parts[1]) : '';

            return dollars + cents;
        }

        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
        }

        return formatString.replace(placeholderRegex, value);
    };

}