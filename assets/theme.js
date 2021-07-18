const mobMenuIcon = document.getElementById('mobileMenuIcon');
const mobileMenu = document.querySelector('.mobile__menu');
const mobileMenuCloseBtn = document.getElementById('expandedMenu');
const prodForm = document.getElementById('productForm');
const prodPrice = document.querySelector('.product__price__value');
const cart_total_price = document.querySelector('.cart__subtotal__number');
const item_count_num = document.querySelector('.item__count__val');
// console.log(document.querySelectorAll('.cart__item__title'))

let getTheCartData = {};

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

console.log(Shopify.formatMoney(145, Shopify.money_format))