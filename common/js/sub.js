$(function(){

    //table 형태
    function table_list(){
        if(window.classesRemoved) return;

        var tdClassArr = [];
        $('.thead ul li').each(function(){
            tdClassArr.push($(this).attr('class') || '');
        });

        $('ol > li:not(.thead)').each(function(){
            $(this).find('ul li').each(function(i){
                if(tdClassArr[i]){
                    $(this).attr('class', tdClassArr[i]);
                }
            });
        });
    }
    function table_card(){
        $('ol > li:not(.thead)').each(function(){
            $(this).find('ul li').removeAttr('class');
        });
        window.classesRemoved = true;
    }

    // 카드/리스트 버튼
    $('#card').on('click', function(){ 
        var btn_text = $(this).text();

        if(btn_text == '썸네일형으로 보기'){
            $(this).text('리스트형으로 보기');
            $(this).addClass('active').parent().next().addClass('card');
            table_card(); // 클래스 제거 실행
        } else {
            $(this).text('썸네일형으로 보기');
            $(this).removeClass('active').parent().next().removeClass('card');
            window.classesRemoved = false; // 다시 table_list 가능하게
            table_list(); // 클래스 다시 적용
        }
    });
    // 초기 실행
    table_list();

    /*/공지태그 이미지다음에 추가
    $('#card').on('click', function() {
        $(this).toggleClass('active');
    
        if ($(this).hasClass('active')) {
            // 복사 아이템 추가
            var $source = $('.tab_thum ol > li').not('.thead').first().clone();
            $source.addClass('added-item');
            $('.tab_thum ol').append($source);
        } else {
            $('.tab_thum ol .added-item').remove();
        }
    
        // ★ 여기서 noti 이동 코드 다시 실행
        $('.tab_thum ol > li:not(.thead)').each(function() {
            var $noti = $(this).find('li[data-type="number"] .noti').detach();
            $(this).find('li[data-type="title"] a b').after($noti);
        });
    });*/


    //tab_list
    $('.tab_list ul li').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //lnb sns
    $('.lnb .etc li[data-type="sns"] a').on('click', function(){
        $(this).parents('li[data-type="sns"]').toggleClass('active');
    });
    $('.lnb .etc li[data-type="sns"] div button').on('click', function(){
        $(this).parents('li[data-type="sns"]').removeClass('active');
    });

    //저브 lnb
    $('.lnb .flex > li').hover(
        function() {
            $(this).addClass('active');
        },
        function() {
            $(this).removeClass('active');
        }
      );

    // email domain
    $('#email_domain_select').on('change', function() {
        var domainInput = $('input[name="email_domain"]');
        var selectedValue = $(this).val();

        if (selectedValue === '') {
            domainInput.val('').prop('readonly', false);
            setTimeout(function() {
                domainInput.focus();
            }, 10);
        } else {
            domainInput.val(selectedValue).prop('readonly', true);
        }
    });

    // 첨부파일
    $(document).on('change', 'input[type="file"]', function () {
        let fileName;
        if (window.FileReader) {
            fileName = $(this)[0].files[0].name;
        } else {
            fileName = $(this).val().split('/').pop().split('\\').pop();
        }
        // 추출한 파일명 삽입
        $(this).siblings('.fileName').text(fileName);
    });

});

// 페이지 로드 시 인터뷰 슬라이더 초기화
$(document).ready(function() {
  initInterviewSlider();
});

// AI 제안 코드
// 세부 연구분야 슬라이더
$(document).ready(function() {
  let fieldSwiper;

  function initFieldSlider() {
    const screenWidth = $(window).width();
    if (screenWidth <= 1080 && !fieldSwiper) {
      fieldSwiper = new Swiper('.field_slider', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: false,
      });
    } else if (screenWidth > 1080 && fieldSwiper) {
      fieldSwiper.destroy();
      fieldSwiper = undefined;
    }
  }

  initFieldSlider();

  $(window).on('resize', function() {
    initFieldSlider();
  });
});

// AI 제안 코드
$(document).ready(function() {
    // 보안문자 모달의 '확인' 버튼 클릭 시
    $('#btn-captcha-confirm').on('click', function(e) {
        e.preventDefault();
        // 보안문자 모달 닫기
        $('#modal-captcha').removeClass('show');
        // 연락처 확인 모달 열기
        $('#modal-contact-result').addClass('show');
    });
});

// AI 제안 코드
$(document).ready(function() {
  function toggleAccordion(button, open) {
    const accordionBox = $(button).closest('.accordion_box');
    const content = accordionBox.find('.accordion_content');
    const srOnly = $(button).find('.sr-only');

    accordionBox.toggleClass('on', open);

    if (open) {
      content.slideDown();
      $(button).removeClass('btn_accordion_open').addClass('btn_accordion_close');
      srOnly.text('연구실적 닫기');
    } else {
      content.slideUp();
      $(button).removeClass('btn_accordion_close').addClass('btn_accordion_open');
      srOnly.text('연구실적 열기');
    }
  }

  // 동적으로 생성될 수 있는 요소에 이벤트 위임
  $(document).on('click', '.btn_accordion_open', function() {
    toggleAccordion(this, true);
  });

  $(document).on('click', '.btn_accordion_close', function() {
    toggleAccordion(this, false);
  });
});

// AI 제안 코드
$(document).ready(function() {
  $('.accordion_list').each(function() {
    var $list = $(this);
    var $items = $list.find('li');
    var $btnAll = $list.siblings('.btn_all');

    if ($items.length > 5) {
      $items.slice(5).hide();
      $btnAll.show();
    } else {
      $btnAll.hide();
    }

    $btnAll.on('click', function() {
      var $list = $(this).siblings('.accordion_list');
      $list.find('li').show();
      $(this).hide();
    });
  });
});