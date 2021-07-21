const mobMenuIcon = document.getElementById('mobileMenuIcon');
const mobileMenu = document.querySelector('.mobile__menu');
const mobileMenuCloseBtn = document.getElementById('expandedMenu');
const prodForm = document.getElementById('productForm');
const prodPrice = document.querySelector('.product__price__value');
const cart_total_price = document.querySelector('.cart__subtotal__number');
const item_count_num = document.querySelector('.item__count__val');
const addCartBtn = document.getElementById('addToCart');

var cart_popup = (function () {

})

var product = (function () {
    function Product() {
        self = this;
        function docEl(selector, all) {
            if (selector[0] === '#') {
                return document.getElementById(selector)
            } else if (selector[0] === '.') {
                return document.querySelector(selector)
            } else if (selector[0] === '.' && all) {
                return document.querySelectorAll(selector)
            }
        }

        function Data() {
            this.selectors = {
                addToCartBtn: 'addToCart',
                product_select: 'productSelect',
                product_price: '.product__price__value',
                quantity: '.product__input__field',
                minus_btn: '.product__minus',
                plus_btn: '.product__plus',
            }
            this.id = document.getElementById(this.selectors.product_select).value
            this.quantity = parseInt(document.querySelector(this.selectors.quantity).value)
            this.variant_select = document.getElementById(this.selectors.product_select)
            this.addCartBtn = document.getElementById(this.selectors.addToCartBtn)
        }

        this.data = new Data();
        console.log(self.data.quantity, 'quantity')

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
                                'quantity': quantity
                            }
                        ]
                    })
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data)
                    })
                console.log('added to cart')
            },
            onProductVariantChange: function (select) {
                self.data.id = document.getElementById(self.data.selectors.product_select).value;
                document.querySelector(self.data.selectors.product_price).textContent =
                    select.options[select.selectedIndex].dataset.variant_price;
            },
            minusQty: function () {
                // let qty = data.quantity
                if (self.data.quantity > 1) {
                    self.data.quantity -= 1;
                    docEl(self.data.selectors.quantity).value = self.data.quantity
                }
            },
            plusQty: function () {
                // let qty = data.quantity
                // qty += 1
                self.data.quantity += 1
                // console.log(quantity)
                docEl(self.data.selectors.quantity).value = self.data.quantity
            }
        }

        self.data.variant_select.addEventListener('change', function () {
            methods.onProductVariantChange(this)
        })

        self.data.addCartBtn.addEventListener('click', function () {
            methods.addToCart(self.data.id, self.data.quantity)
        })
        document.querySelector(self.data.selectors.plus_btn).addEventListener('click', methods.plusQty)
        document.querySelector(self.data.selectors.minus_btn).addEventListener('click', methods.minusQty)
    }
        return new Product();
})()



mobMenuIcon.addEventListener('click',() => {
    mobileMenu.classList.remove('closed');
    mobileMenu.classList.add('open')
})

mobileMenuCloseBtn.addEventListener('click',() => {
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('closed')
})

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
    loop:true,
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
Shopify.formatMoney = function(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.',''); }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal   = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number/100.0).toFixed(precision);

        var parts   = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents   = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch(formatString.match(placeholderRegex)[1]) {
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
