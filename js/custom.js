// custom.js 修正後的完整內容

// to get current year - 函數定義保持不變
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var displayElement = document.querySelector("#displayYear");
    if (displayElement) {
        displayElement.innerHTML = currentYear;
    }
}
// 修正 1: 已經移除 getYear(); 的獨立調用，避免 Uncaught TypeError 錯誤！

// 讓 $grid 變數可以在全域範圍內使用
var $grid;

// Isotope 和 Nice Select 放在 document.ready 確保 DOM 結構準備好
$(document).ready(function() {
    
    // 找到網格容器
    $grid = $(".grid");

    // 修正 2: 使用 imagesLoaded 確保所有圖片載入後再初始化 Isotope，解決隨機堆疊問題
    $grid.imagesLoaded(function() {
        // 初始化 Isotope
        $grid.isotope({
            itemSelector: ".all",
            percentPosition: false,
            masonry: {
                columnWidth: ".all"
            }
        });
    });

    // 過濾器點擊事件
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        if ($grid) {
            $grid.isotope({
                filter: data
            })
        }
    });
    
    // nice select
    $('select').niceSelect();
});


/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

// 使用一個通用的異步載入函數
function loadHtml(url, targetElement, typeid) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // 檢查是否是 404 錯誤，提供更明確的訊息
                throw new Error(`無法載入 ${url} (狀態碼: ${response.status})`);
            }
            return response.text();
        })
        .then(html => {
            // 針對 <head> 內容，使用 insertAdjacentHTML 確保內容被追加而不是替換
            if (targetElement === document.head) {
                targetElement.insertAdjacentHTML('beforeend', html);
            } else {
                // 對於 <footer> 和 <nav> 內容，使用 innerHTML 替換佔位符的內容
                targetElement.innerHTML = html;
            }
			
          if(typeid==='B'){
            const activeItem = document.getElementById($grid2);
            activeItem.classList.add('active'); 
          }
          // 修正: 確保在 footer 載入後才調用 getYear()
          if(typeid==='C'){
            // 檢查 getYear 函數是否已從 custom.js 載入
            if (typeof getYear === 'function') {
                getYear();
            }
          }
		  $('.filters_menu li[data-filter="*"]').trigger('click');
        })
        .catch(error => {
            console.error(`載入 ${url} 失敗:`, error);
        });
}

// 載入 HEAD 內容 (使用 document.head 作為目標)
loadHtml('head.html', document.getElementById('head-placeholder'), 'A'); 
loadHtml('header.html', document.getElementById('header-placeholder'), 'B'); 
loadHtml('footer.html', document.getElementById('footer-placeholder'), 'C');
