// const mobMenuIcon = document.getElementById('mobileMenuIcon');
// const mobileMenu = document.querySelector('.mobile__menu');
// const mobileMenuCloseBtn = document.getElementById('expandedMenu');
// const prodForm = document.getElementById('productForm');
// const prodPrice = document.querySelector('.product__price__value');
// const cart_total_price = document.querySelector('.cart__subtotal__number');
// const item_count_num = document.querySelector('.item__count__val');
// const addCartBtn = document.getElementById('addToCart');

window.onload = function () {
    var selectors = {
        addToCartBtn: 'addToCart',
        product_select: 'productSelect',
        product_price: '.product__price__value',
        quantity: '.product__input__field',
        minus_btn: '.product__minus',
        plus_btn: '.product__plus',
        cart_item_count:".cart__items__count__value",
        cart_test:".cart_test",
        cart_item:".cart__item"
    }


    function CartPopup() {
        let self = this;
        this.selectors = {
            cart_item_count:".cart__items__count__value",
            cart_test:".cart_test",
            cart_item:".cart__item"
        }
        this.test = document.querySelector(selectors.cart_test);
        this.item_counter = document.querySelector(selectors.cart_item_count);
        this.cart_item = document.querySelectorAll(selectors.cart_item);
        // // this.fetchCart = fetch('/cart.js');
        // this.getCart = async function () {
        //    let response = await fetch('/cart.js');
        //    let data = await response.json()
        //    return data;
        // }



        this.cart = {};

        this.renderCart = function (){
            fetch('/cart.js')
                .then(response => response.json())
                .then(cart => {
                    self.cart = cart
                    self.test.textContent = self.cart.total_price;
                    self.item_counter.textContent = self.cart.item_count;
                })
            console.log(self.cart)
        }//
            this.setContent = function () {
                // fetch('/cart.js')
                //     .then(response => response.json())
                //     self.getCart()
                //     .then(cart => {
                //         // self.cart.count = parseInt(cart.item_count);
                //         // self.cart.total_price = cart.total_price
                //         self.test.textContent = cart.total_price
                //         self.item_counter.textContent = cart.item_count
                //     })
                // self.cart.count+=1;
                //
                // self.test.textContent = self.cart.total_price
            }
        }
        // console.log(this.cartData.item_count.textContent)

    var product = (function () {
        var data = {};
        var cart_popup = new CartPopup();

        data.test = document.querySelector(selectors.cart_test);
        data.item_counter = document.querySelector(selectors.cart_item_count);
        data.cart_item = document.querySelectorAll(selectors.cart_item);
        data.quantity = document.querySelector(selectors.quantity) || data.quantity;
        data.variant = document.getElementById(selectors.product_select) || data.variant;
        data.addCartBtn = document.getElementById(selectors.addToCartBtn) || data.addCartBtn;
        methods = {
            addToCart: function (id, quantity) {
               fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'items': [
                            {
                                'id': id,
                                'quantity':parseInt(quantity.value)
                            }
                        ]
                    })
                })
                   .then(response => response.json())
                   .then(data => {
                               // // self.cart.count = parseInt(cart.item_count);
                               // // self.cart.total_price = cart.total_price
                               // data.test.textContent = cart.total_price
                               // data.item_counter.textContent = cart.item_count
                   })

            },
            onProductVariantChange: function (select) {
                // data.id = data.variant.value;
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
                // console.log(quantity)
                document.querySelector(selectors.quantity).value = qty
            }
        }
            data.variant.addEventListener('change', function () {
                methods.onProductVariantChange(this)
            })
            data.addCartBtn.addEventListener('click', function () {
                methods.addToCart(data.variant.value, data.quantity)
            })
        data.addCartBtn.addEventListener('click', cart_popup.setContent)
            document.querySelector(selectors.plus_btn).addEventListener('click', methods.plusQty)
            document.querySelector(selectors.minus_btn).addEventListener('click', methods.minusQty)

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