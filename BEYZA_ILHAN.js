(function() {
  'use strict';
  
  // homepage'de çalış
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = canonicalLink ? canonicalLink.getAttribute('href') : '';
  
  // Home Page kontrolü
  const isHomepage = (canonicalUrl === 'https://www.e-bebek.com' || 
            canonicalUrl === 'https://www.e-bebek.com/' ||
            window.location.pathname === '/' || 
            window.location.pathname === ' ');
  // Home Page değilse çalışma
  if (!isHomepage) {
    console.log('wrong page');
    return;
  } 
  const carousel_hosts = document.querySelectorAll('eb-product-carousel');
  
  if (carousel_hosts.length === 0) {
    console.warn('Carousel elementi bulunamadı');
    return;
  }  
  const oldStyle = document.getElementById('ebx-styles');
  if (oldStyle) oldStyle.remove();
  
  const styleEl = document.createElement('style');
  styleEl.id = 'ebx-styles';
  styleEl.textContent = `

  .ebx-carousel {
    position: relative;
    width: 100%;
    background: #fff;
  }
   /* global container style*/
  .ebx-carousel .container {
    position: relative;
  }

  /* title - begenebileceklerinizi dusunduklerimiz */
  .ebx-carousel h2 {
    box-sizing: border-box;
    color: rgb(43, 47, 51);
    display: block;
    font-family: Quicksand-SemiBold;
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 0 0;
    text-align: left;
  }
  
  @media screen and (max-width: 480px) {
    .ebx-carousel h2 {
      font-size: 20px;
    }
  }

  .ebx-carousel .carousel-gutters {
    position: relative;
    padding: 0;
    margin: 0 auto;
  }
  
  .ebx-carousel .carousel_wrapper {
    overflow: hidden;
    padding: 20px 0;
  }
  /* carousel layout */
  .ebx-carousel .ebx-track {
    display: flex;
    gap: 18px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    align-items: stretch;
  }

  /* product item cards */
  .ebx-card {
    flex: 0 0 calc(20% - 14.4px);
    min-width: 0;
    border: 1.5px solid #f2fafe;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    transition: border-color 0.2s ease;
  }

  .ebx-card:hover {
    border-color: #c1ccd4;
  }
  .ebx-card:active {
    border-color: #c1ccd4;
  }
  .ebx-card .info_group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ebx-card .product-img {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    flex-shrink: 0;
  }

  .ebx-card .product-img img {
    display: inline-block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  /* Badge - çok satan ürün */
  .ebx-card .badge-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    font-size: 1rem;
    z-index: 10;
    left: 6px;
    top: 6px;
    border-radius: 15px;
    line-height: 26px;
    font-weight: 500;
    color: #008cd4;
  }

  .ebx-card .badge-wrapper > span {
    gap: 3px;
  }
  .ebx-card .badge-wrapper i {
    width: 40px;
  }
  .ebx-card .badge-wrapper img{
  height: auto;
    width: 50px;
  }

  .ebx-card .product-img .icon-most-seller {
    background-image: url("/assets/toys/svg/most-seller-product.svg");
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* heart icon */
  .ebx-card .product-img .heart_icon {
    position: absolute;
    top: 0;   
    height: 50px;
    right: 0;
    width: 50px;
  z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
   
  }

  .ebx-card .product-img .heart_icon .icon_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height:32px;
    width: 32px;
    ;
  }
  .ebx-card .product-img .heart_icon .ebx-icon {
    width: 15px;
    height: 15px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    cursor: pointer;
  }
   /* heart icon fav style */
  .ebx-card .product-img .heart-outline {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/heart-outline.svg");
  }
  .ebx-card:hover .heart_icon .heart-outline {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/heart-orange-filled.svg");
  }
  .ebx-card .product-img .heart-filled {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/heart-orange-filled.svg");
  }

  /* content alanı */
  .ebx-card .card_content {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .ebx-card .product_brand {
    font-size: 12px;
    color: var(--Primary-Black, #212738);
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    margin-bottom: 10px;
    margin-top: 10px;
    line-height: 1.4;
  }

  .ebx-card .product_brand b {
    font-weight: 600;
    color: #7d7d7d;
    text-transform: uppercase;
    font-size: 12px;
  }

  .ebx-card .product_name {
    display: inline;
    font-size: 12px;
    font-weight: 400;
  }

  /* stars */
  .ebx-card .card_content .stars-wrapper {
    min-height: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 12px;
  }

  .ebx-card .card_content .star-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #e9e9e9;
    margin-right: 5px;
    font-size: 10px;
    height: 10px;
    line-height: 10px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    user-select: none;
  }

  .ebx-card .card_content .star-icon::before {
    content: "\\f005";
  }

  .ebx-card .card_content .star-icon.active {
    color: #ff6900;
  }

  .ebx-card .card_content .stars-wrapper .review_count {
    margin-bottom: 0;
    color: rgb(162, 177, 188);
    font-size: 10px;
    font-family: Quicksand-Medium;
    font-weight: 400;
    display: block;
    cursor: pointer;
    margin-left: 4px;
  }

  /* price alanı */
  .ebx-card .price_area {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 6px 10px 15px;
    margin-top: auto;
  }

  .ebx-card .price_area .old-price-row {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  .ebx-card .price_area .oldPrice {
    color: rgb(162, 177, 188);
    cursor: pointer;
    display: block;
    font-family: Quicksand-SemiBold;
    font-size: 12px;
    font-weight: 400;
    height: 15px;
    line-height: normal;
    margin: 0 8px 0 0;
    text-decoration: line-through;
  }

  /* indirim yüzde */
  .ebx-card .price_area  .discount_badge {
    background-color: rgb(0, 163, 101);
    border: solid;
    border-width: 2px;
    border-color: rgb(0, 163, 101);
    border-radius: 16px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-width: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Quicksand-SemiBold;
    font-size: 12px;
    font-weight: 400;
    flex-shrink: 0;
    margin: 0;
    padding: 0px 4px;
    cursor: pointer;
    user-select: none;
  }

  .ebx-card .price_area .new-price-row {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .ebx-card .price_area .currentPrice {
    color: rgb(43, 47, 51);
    font-family: Quicksand-SemiBold;
    font-weight: 400;
    margin: 0;
    cursor: pointer;
    display: inline;
  }

  .ebx-card .price_area .currentPrice.hasDiscount {
    color: rgb(0, 163, 101);
    font-family: Quicksand-SemiBold;
    font-weight: 900;
  }

  .ebx-card .price_area .currentPrice .price_main {
    font-size: 20px;
  }

  .ebx-card .price_area .currentPrice .price_decimal {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    .ebx-card .price_area .currentPrice .price_main {
      font-size: 18px;
    }
    .ebx-card .price_area .currentPrice .price_decimal {
      font-size: 12px;
    }
  }

  /* add button */
  .ebx-card .price_area .add-to-cart-btn {
    position: absolute;
    right: 4px;
    bottom: 4px;
    border-radius: 100%;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }

  .ebx-card .price_area .add-to-cart-btn .btn_inner {
    width: 40px;
    height: 40px;
    background-color: #fff;
    color: rgb(0, 145, 213);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
    font-family: Quicksand-SemiBold;
    font-size: 11px;
    aspect-ratio: 1 / 1;
    position: relative;
  }
  
  .ebx-card .price_area .add-to-cart-btn .btn_inner::before {
    content: "";
    height: 14px;
    width: 14px;
    display: block;
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-blue.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    aspect-ratio: 1 / 1;
  }

  .ebx-card .price_area .add-to-cart-btn:hover .btn_inner {
    background-color: var(--Primary-400---Primary, #00a8e1);
  }
  .ebx-card .price_area .add-to-cart-btn:hover .btn_inner::before {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-white.svg");
  }

  /* slider nav butonlar */
  .ebx-nav {
    display: flex !important;
    align-items: center;  
    height: 40px;
    justify-content: center;
    width: 40px;
    background-color: #fff !important;
    border-radius: 50% !important;
    position: absolute;
    box-shadow: 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
    cursor: pointer;
    z-index: 100;
    user-select: none;
  }
  
  .ebx-nav:hover {
    box-shadow: inset 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
  }
  
  .ebx-nav .nav_icon {
    width: 14px;
    height: 14px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  /* carousel navigation buttons */
  .ebx-nav.prev-btn .nav_icon {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/arrow-left.svg");
  }
  .ebx-nav.next-btn .nav_icon {
    background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/arrow-right.svg");
  }
  .ebx-nav.next-btn { right: -65px; bottom: 50%; top: auto; }
  .ebx-nav.prev-btn { left: -65px; bottom: 50%; top: auto; }
  
  .ebx-nav.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* responsive styles */
  @media screen and (max-width: 1480px) {
    .ebx-card { flex: 0 0 calc(25% - 13.5px); }
  }
  @media screen and (max-width: 1280px) {
    .ebx-card { flex: 0 0 calc(33.333% - 12px); }
  }
  @media screen and (max-width: 992px) {
    .ebx-card { flex: 0 0 calc(50% - 9px); }
  }
  @media screen and (max-width: 768px) {
    .ebx-card { flex: 0 0 calc(50% - 9px); }
  }
  @media screen and (max-width: 480px)  {
    .ebx-card { flex: 0 0 calc(50% - 9px); }
    .ebx-nav {
      display: none !important;
    }
    .ebx-card .product_brand { font-size: 13px; }
  }
`;

  document.head.appendChild(styleEl);
  //console.log('CSS eklendi');
  //console.log('product data loaded');
  
  //get favs from local
  function getFavorites() {
    const favs = localStorage.getItem('ebx_favorites');
    return favs ? JSON.parse(favs) : [];
  }
  // add/remove fav
  function toggleFavorite(productId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }
    localStorage.setItem('ebx_favorites', JSON.stringify(favorites));
    return favorites.indexOf(productId) > -1;
  }
  
  async function loadProductData() {
    // check cache  first
    const cachedProducts = localStorage.getItem("ebx_products");
    const cacheTime = localStorage.getItem("ebx_products_time");
    const now = new Date().getTime();
    
    // 1 hour
    if (cachedProducts && cacheTime && (now - parseInt(cacheTime)) < 3600000) {
      //console.log("products loaded from cache");
      let products = JSON.parse(cachedProducts);
      
      // update favs 
      const favorites = getFavorites();
      products = products.map(function(p) {
        p.isFav = favorites.indexOf(p.id) > -1;
        return p;
      });
      buildAllCarousels(products);
      return;
    }
    
    try {
      const response = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json");
      const productsData = await response.json();
      console.log('product datas loaded from API: ', productsData.length);
      const favorites = getFavorites();
        // ürün verilerini dönüştür
        const products = productsData.map(function(p) {
          // indirim kontrolu - original_price ve price farklı
          const has_discount = p.original_price && p.price && p.price < p.original_price;
          // indirim varsa yüzdeyi hesapla
          let discountPct = 0;
          if (has_discount) {
            // yüzde: (eski fiyet - yeni fiyat) / eski fiyat * 100
            discountPct = Math.round(((p.original_price - p.price) / p.original_price) * 100);
          }
          // APIden gelen URL https://www.e-bebek.com/hellobaby-yenidogan-6li-agiz-mendili-24x24cm-unisex-p-24ghlbumnd007001
          let productLink = p.url || '#';
          //console.log('Product URL:', p.id, productLink);
          
          // indirimli ürünse eski fiyatı formatla
          // 129.99 --> 129,99 TL
          const oldPriceFormatted = has_discount ? `${p.original_price.toFixed(2).replace('.', ',')} TL` : null;
          //  güncel fiyat formatı 89.99 --> 89,99
          const currentPriceFormatted = `${p.price.toFixed(2).replace('.', ',')}`;
          
          return {
            id: p.id,
            img: p.img,
            brandName: p.brand,
            productName: p.name,
            productUrl: productLink,
            rating: Math.floor(Math.random() * 3) + 3,
            reviewCount: Math.floor(Math.random() * 30) + 5,
            oldPrice: oldPriceFormatted, // indirimli ise oldprice gösterilsin
            currentPrice: currentPriceFormatted, // güncel fiyat
            showBadge: Math.random() > 0.5,
            discountText: has_discount ? `%${discountPct}` : null, //indirim yüzdesi badge
            isFav: favorites.indexOf(p.id) > -1
          };
        });
      
      // save cache
      localStorage.setItem('ebx_products', JSON.stringify(products));
      localStorage.setItem('ebx_products_time', now.toString());
      
      buildAllCarousels(products);
      
    } catch (error) {
      console.error('Ürün verileri yüklenemedi:', error);

        // fallback data
      const fallback = [
        {
          id: 1,
          img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
          brandName: 'HelloBaby',
          productName: 'Yenidoğan Unisex Bebek Ağız Mendili İnterlok Ekru',
          productUrl: 'https://www.e-bebek.com/',
          rating: 5,
          reviewCount: 24,
          oldPrice: '129,99 TL',
          currentPrice: '89,99',
          showBadge: true,
          discountText: '%31',
          isFav: false
       }
      ];
      buildAllCarousels(fallback);
    }
  }
  
  function generateProductCard(product) {
    const totalStars = 5;
    const filled = Math.floor(product.rating);
    const empty = totalStars - filled;
    //  yıldızlar
    let starsHTML = '';
    for (let i = 0; i < filled; i++) {
      starsHTML += '<i class="star-icon active"></i>';
    }
    for (let i = 0; i < empty; i++) {
      starsHTML += '<i class="star-icon"></i>';
    }
    
    const heartClass = product.isFav ? 'heart-filled' : 'heart-outline';
    // price formatla 89,99 --> 89 - 20px ve ,99 TL - 14px
    const priceParts = product.currentPrice.split(",");
    const main = priceParts[0];
    const decimal = priceParts[1] ? `,${priceParts[1]} TL` : " TL";
    
    return `
      <div class="ebx-card" data-url="${product.productUrl || '#'}" data-product-id="${product.id}">
        <div class="info_group">
          <div class="product-img" >
            ${product.showBadge ? `
            <div class="badge-wrapper">
              <i class="ebx-icon icon-most-seller"></i>
            </div>
            ` : ' '}
            <div class="heart_icon" data-product-id="${product.id}">
              <div class="icon_wrapper">
                <span class="ebx-icon ${heartClass}"></span>
              </div>
            </div>
            <img src="${product.img}" alt="${product.productName}">
          </div>
          <div class="card_content">
            <h2 class="product_brand">
              <b>${product.brandName}</b> - <span class="product_name">${product.productName}</span>
            </h2>
            <div class="stars-wrapper" >
              ${product.rating > 0 ? `
                ${starsHTML}
                <span class="review_count">(${product.reviewCount})</span>
              ` : ''}
            </div>
          </div>
        </div>
        
        <!-- if discount show old price and discount text -->
        <div class="price_area">
          ${product.oldPrice || product.discountText ? `
          <div class="old-price-row">
            ${product.oldPrice ? `<div class="oldPrice">${product.oldPrice}</div>` : ''}
            ${product.discountText ? `<div class="discount_badge">${product.discountText}</div>` : ' '}
          </div>
          ` : ' '}
          <!-- if discount show green color -->
          <div class="new-price-row">
            <div class="currentPrice ${product.oldPrice ? 'hasDiscount' : ''}">
              <span class="price_main">${main}</span><span class="price_decimal">${decimal}</span>
            </div>
          </div>
          <button class="add-to-cart-btn" data-product-id="${product.id}">
            <div class="btn_inner"></div>
          </button>
        </div>
      </div>
    `;
  }
  
  function buildAllCarousels(products) {
    carousel_hosts.forEach(function(hostElement, idx) {      
      const carouselDiv = document.createElement('div');
      carouselDiv.className = 'ebx-carousel';
      carouselDiv.innerHTML = `
       <div class="container">
       <h2>Beğenebileceğinizi Düşündüklerimiz</h2>
        <div class="carousel-gutters">
          <button class="ebx-nav prev-btn"><span class="nav_icon"></span></button>
           <div class="carousel_wrapper">
             <div class="ebx-track">
            ${products.map(generateProductCard).join(' ')}
          </div>
        </div>
        <button class="ebx-nav next-btn"> <span class="nav_icon"></span></button>
      </div>
    </div>
  `;
      hostElement.parentNode.insertBefore(carouselDiv, hostElement);
      setupCarouselControls(carouselDiv, idx);
     // console.log('carousel hazır:', idx + 1);
    });
    //console.log('carousel oluşturuldu');
  }
  
  function setupCarouselControls(carouselElement, index) {
    const trackEl = carouselElement.querySelector('.ebx-track');

    const prevButton = carouselElement.querySelector('.prev-btn');
    const nextButton = carouselElement.querySelector('.next-btn');
    
    let current_position = 0;
    
    function getItemsPerView() {
        // carousel product item count
      const w = window.innerWidth;
      if (w <= 480) {
        return 2;
      } else if (w <= 768) {
        return 2;
      } else if (w <= 992) {
        return 2;
      } else if (w <= 1280) {
        return 3;
      } else if (w <= 1480) {
        return 4;
      } else {
        return 5;
      }
    }
    
    function updateSlider() {
      const itemsPerView = getItemsPerView();
      const cards = trackEl.querySelectorAll('.ebx-card');
      const maxPos = Math.max(0, cards.length - itemsPerView);
      
      current_position = Math.max(0, Math.min(current_position, maxPos));
      
      const cardWidth = cards[0].offsetWidth;
      const gapSize = 18;
      const offset = -(current_position * (cardWidth + gapSize));
      
      trackEl.style.transform = `translateX(${offset}px)`;
      
      prevButton.classList.toggle('disabled', current_position === 0);
      nextButton.classList.toggle('disabled', current_position >= maxPos);
    }
    
    // prev button
    prevButton.addEventListener('click', function() {
      if (current_position > 0) {
        current_position--;
        updateSlider();
      }
    });
    // next button
    nextButton.addEventListener('click', function() {
      const itemsPerView = getItemsPerView();
      const cards = trackEl.querySelectorAll('.ebx-card');
      const maxPos = cards.length - itemsPerView;
      
      if (current_position < maxPos) {
        current_position++;
        updateSlider();
      }
    });
    
    // resize olunca
    let resize_timer;
    window.addEventListener('resize', function() {
      clearTimeout(resize_timer);
      resize_timer = setTimeout(function() {
        updateSlider();
      }, 100);
    });
    
    updateSlider();
  }
  
  // heart icon click event
  function attachHeartEvents() {
    const allHearts = document.querySelectorAll('.heart_icon');
    
    allHearts.forEach(function(heart) {
      heart.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const productId = heart.getAttribute('data-product-id');
        if (!productId) return;
        const isFav = toggleFavorite(parseInt(productId));
        const iconSpan = heart.querySelector('.ebx-icon');
        
        if (!iconSpan) return;
        if (isFav) {
          iconSpan.classList.remove('heart-outline');
          iconSpan.classList.add('heart-filled');
        } else {
          iconSpan.classList.remove('heart-filled');
          iconSpan.classList.add('heart-outline');
        }
        // fav kontrol
        // console.log('Favori güncellendi:', productId, isFav ? 'eklendi' : 'çıkarıldı');
      });
    });
  }
  
  // product item clickable
  function attachCardClickEvents() {
    const allCards = document.querySelectorAll('.ebx-card');
    
    allCards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        // heart icon, add to cart button etc stop propagation
        if (e.target.closest('.heart_icon') || 
            e.target.closest('.add-to-cart-btn')) {
          e.stopPropagation();
          return;
        }
        const productUrl = card.getAttribute('data-url');
        if (productUrl && productUrl !== '#') {
          console.log('Ürün URL:', productUrl);
          window.location.href = productUrl;
        }
      });
      
      card.style.cursor = 'pointer';
    });
  }
  (async function init() {
    await loadProductData();
    // after cards created add events
    setTimeout(function() {
      attachHeartEvents();
      attachCardClickEvents();
    }, 100);
  })();
})();
