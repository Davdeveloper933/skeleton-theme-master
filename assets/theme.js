const mobMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');
const expandedMenu = document.getElementById('expandedMenu');
const addCartBtn = document.getElementById('addToCart');
const prodForm = document.getElementById('productForm');
const prod_select = document.getElementById('productSelect');
const prodPrice = document.querySelector('.product__price__value');
let prod_id = prod_select.value;


prod_select.addEventListener('change',() =>{
    prod_id = prod_select.value;
    prodPrice.textContent = prod_select.options[prod_select.selectedIndex].dataset.variant_price;
    console.log(prod_select.options[prod_select.selectedIndex].dataset.variant_price)
})

console.log(prod_id)
let formData = {
    'items': [{
        'id': 36110175633573,
        'quantity': 1
    }]
};

addCartBtn.addEventListener('click', async () => {
    // e.preventDefault();

    let response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'items': [
                {
                    'id': prod_id,
                    'quantity': 1
                }
            ]
        })
    })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
)


mobMenu.addEventListener('click',() => {
    hamburger.classList.toggle('hide')
    expandedMenu.classList.toggle('hide')
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