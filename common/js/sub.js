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
            $(this).addClass('active').parents('.titlebox').next().addClass('card');
            table_card(); // 클래스 제거 실행
        } else {
            $(this).text('썸네일형으로 보기');
            $(this).removeClass('active').parents('.titlebox').next().removeClass('card');
            window.classesRemoved = false; // 다시 table_list 가능하게
            table_list(); // 클래스 다시 적용
        }
    });
    // 초기 실행
    table_list();

    // 이메일 인증 기능
    // 인증번호 전송 버튼 클릭 시 email_check_box 보여주기 및 버튼 텍스트 변경
    $(document).on('click', '.email .btn_sm:contains("인증번호 전송"), .email .btn_sm:contains("인증번호 재전송")', function(){
        $(this).closest('.email').siblings('.email_check').find('.email_check_box').show();
        $(this).text('인증번호 재전송');
    });

    // 인증하기 버튼 클릭 시 완료 메시지 보여주기
    $(document).on('click', '.email_check_box .btn_sm:contains("인증하기")', function(){
        $(this).closest('.email_check').find('.email_check_box').hide();
        $(this).closest('.email_check').find('b').show();
        // 인증이 완료되면 .email .btn_sm 버튼을 disabled 처리합니다.
        $(this).closest('.email_check').siblings('.email').find('.btn_sm').prop('disabled', true);
    });

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


//혜진추가
// 페이지 로드 시 인터뷰 슬라이더 초기화
$(document).ready(function() {
  initInterviewSlider();
});


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

// 보안문자 모달 열기/닫기
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

// 구성원안내 연구실적 아코디언
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

// 구성원안내 전체보기 아코디언
$(document).ready(function() {
  $('.accordion_list').each(function() {
    var $list = $(this);
    // 직계 자식 li 요소들만 선택 (자식 ul, ol 안의 li는 제외)
    var $items = $list.children('li');
    var $btnAll = $list.siblings('.btn_all');

    if ($items.length > 5) {
      $items.slice(5).hide();
      $btnAll.show();
    } else {
      $btnAll.hide();
    }

    $btnAll.on('click', function() {
      var $list = $(this).siblings('.accordion_list');
      // 직계 자식 li 요소들만 선택 (자식 ul, ol 안의 li는 제외)
      var $items = $list.children('li');
      
      if ($(this).text() === '전체보기') {
        // 전체보기 클릭 시
        $items.show();
        $(this).text('닫기').addClass('close');
      } else {
        // 닫기 클릭 시
        $items.slice(5).hide();
        $(this).text('전체보기').removeClass('close');
      }
    });
  });
});

// 특허 요약정보 모달 열기
$(document).on('click', '.btn_summary', function(e) {
  e.preventDefault(); // 기본 이벤트 방지
  e.stopPropagation(); // 이벤트 전파 방지
  
  
  const $modal = $('#modal-patent-summary');
  
  // 기존 모달 시스템과 동일하게 스크롤 방지 및 모달 표시
  if (typeof preventBodyScroll === 'function') {
    preventBodyScroll();
  }
  
  if ($modal.length > 0) {
    $modal.addClass('show');
    console.log('모달에 show 클래스 추가됨');
  } else {
    console.error('모달 요소를 찾을 수 없습니다');
  }
  
  return false;
});

// data-type="title" 클릭 시 기술요약 모달 열기
$(document).on('click', 'td[data-type="title"] a', function(e) {
  e.preventDefault(); // 기본 이벤트 방지
  e.stopPropagation(); // 이벤트 전파 방지
  
  const $modal = $('#modal-patent-summary');
  
  // 기존 모달 시스템과 동일하게 스크롤 방지 및 모달 표시
  if (typeof preventBodyScroll === 'function') {
    preventBodyScroll();
  }
  
  if ($modal.length > 0) {
    $modal.addClass('show');
    console.log('모달에 show 클래스 추가됨');
  } else {
    console.error('모달 요소를 찾을 수 없습니다');
  }
  
  return false;
});

// modal-member-info 모달이 닫힐 때 아코디언 리셋
$(document).on('click', '#modal-member-info .btn_modal_close', function() {
  // 모달이 닫힌 후 아코디언 리셋 (모달 애니메이션 후 실행)
  setTimeout(function() {
    resetMemberInfoAccordion();
  }, 300);
});

// 배경 클릭으로 모달 닫기 시에도 리셋
$(document).on('click', '#modal-member-info', function(e) {
  if (e.target === this) {
    setTimeout(function() {
      resetMemberInfoAccordion();
    }, 300);
  }
});

// ESC 키로 모달 닫기 시에도 리셋
$(document).on('keydown', function(e) {
  if (e.keyCode === 27 && $('#modal-member-info').hasClass('show')) {
    setTimeout(function() {
      resetMemberInfoAccordion();
    }, 300);
  }
});

// 구성원 안내 모달 아코디언 리셋 함수
function resetMemberInfoAccordion() {
  const $modal = $('#modal-member-info');
  if ($modal.length === 0) return;
  
  // 모든 accordion_box 리셋
  $modal.find('.accordion_box').each(function() {
    const $accordionBox = $(this);
    const $content = $accordionBox.find('.accordion_content');
    const $button = $accordionBox.find('.accordion_header button');
    const $srOnly = $button.find('.sr-only');
    
    // accordion_box를 on 상태로 설정
    $accordionBox.addClass('on');
    
    // accordion_content를 보이게 설정 (slideDown 효과 없이 즉시)
    $content.show();
    
    // 버튼 상태를 닫기 버튼으로 설정
    $button.removeClass('btn_accordion_open').addClass('btn_accordion_close');
    $srOnly.text('연구실적 닫기');
  });
  
  // 모든 accordion_list 리셋
  $modal.find('.accordion_list').each(function() {
    const $list = $(this);
    const $items = $list.children('li');
    const $btnAll = $list.siblings('.btn_all');
    
    // 모든 li 요소를 먼저 보이게 설정
    $items.show();
    
    if ($items.length > 5) {
      // 5개 초과 항목들 숨기기
      $items.slice(5).hide();
      // 전체보기 버튼 표시 및 텍스트 리셋
      $btnAll.text('전체보기').removeClass('close').show();
    } else {
      // 5개 이하면 전체보기 버튼 숨기기
      $btnAll.hide();
    }
  });
  
}

// 수령방법에 따른 폼 표시/숨김 기능
function initDeliveryMethodToggle() {
  const deliveryRadios = document.querySelectorAll('input[name="delivery_method"]');
  const emailForm = document.getElementById('email_form');
  const faxForm = document.getElementById('fax_form');
  
  if (!deliveryRadios.length || !emailForm || !faxForm) return;
  
  function toggleDeliveryForms() {
    const checkedRadio = document.querySelector('input[name="delivery_method"]:checked');
    
    if (!checkedRadio) {
      // 아무것도 선택되지 않은 경우 둘 다 숨김
      emailForm.style.display = 'none';
      faxForm.style.display = 'none';
      return;
    }
    
    const selectedValue = checkedRadio.value;
    const isSmallScreen = window.innerWidth <= 1080;

   if (selectedValue === 'email') {
    emailForm.style.display = isSmallScreen ? 'block' : 'table-row';
      faxForm.style.display = 'none';
    } else if (selectedValue === 'fax') {
      emailForm.style.display = 'none';
      // 1080 이하일 때는 block, 그 이상은 table-row
      faxForm.style.display = isSmallScreen ? 'block' : 'table-row';
    }
  }
  
  // 라디오 버튼 변경 이벤트 리스너 추가
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', toggleDeliveryForms);
  });
  
  // 페이지 로드 시 초기 상태 설정
  toggleDeliveryForms();
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
  initDeliveryMethodToggle();
});

// 일반 공통 슬라이더
$(document).ready(function() {
  const swiperSelector1 = '.support_list1.swiper';
  const controlSelector1 = '.support_list1.control';
  // 슬라이드 개수 조회 1개 초과인경우만 슬라이드 처리
  const item_size1 = $(`${swiperSelector1} .swiper-slide`).length;

  // 스와이프 생성
  if (item_size1 > 1 && !window.supportSwiper1) {
    window.supportSwiper1 = new Swiper(swiperSelector1, {
      slidesPerView: 'auto',
      speed: 600,
      loop: true,
      allowTouchMove: false,
      navigation: {
        nextEl: `${controlSelector1} .support_btn_next`,
        prevEl: `${controlSelector1} .support_btn_prev`,
      },
      on: {
        // 초기화 완료후
        init: function (swiper) {
          // 슬라이드 총 개수 셋팅
          $(`${controlSelector1} .tot`).text(' / ' + swiper.slides.length);
        },
      }
    });

    // 슬라이드 변경 이벤트
    window.supportSwiper1.off('slideChange').on('slideChange', function(swiper) {
      $(`${controlSelector1} .active`).text(swiper.realIndex + 1);
    });
  }
  // 네비게이션 숨김
  else {
    $(controlSelector1).addClass('hidden');
  }

  const swiperSelector2 = '.support_list2.swiper';
  const controlSelector2 = '.support_list2.control';
  // 슬라이드 개수 조회
  const item_size2 = $(`${swiperSelector2} .swiper-slide`).length;
  if (!window.supportSwiper2) {
    // 기본옵션
    let s_option = {
      slidesPerView: 'auto',
      speed: 600,
      loop: true,
      allowTouchMove: true,
      navigation: {
        nextEl: `${controlSelector2} .support_btn_next`,
        prevEl: `${controlSelector2} .support_btn_prev`,
      }
    };

    // 1개이하인경우는 스와이프 설정안함
    if (item_size2 <= 1) {
      s_option.loop = false;
      s_option.allowTouchMove = false;

      window.supportSwiper2 = new Swiper(swiperSelector2, s_option);
    }
    else {
      // 스와이퍼 개수가 모자르는경우가 존재하여 두배로 복사
      var contentSlides = $(`${swiperSelector2} .swiper-slide`).clone();
      $(`${swiperSelector2} .swiper-wrapper`).append(contentSlides);

      window.supportSwiper2 = new Swiper(swiperSelector2, s_option);

      // 슬라이드 변경 이벤트
      window.supportSwiper2.off('slideChange').on('slideChange', function(swiper) {
        const cur_num = swiper.realIndex % contentSlides.length + 1;
        $(`${controlSelector2} .active`).text(cur_num);

        // bar 게이지 설정
        const bar_guage = 100 / contentSlides.length * cur_num;
        $('.support_list2.bar span').css({width: bar_guage + '%'});

        // 현재 활성화된 슬라이드 인덱스 % 2 값과 동일한 인덱스는 down 클래스 없음.
        const $slides = $(`${swiperSelector2} .swiper-slide`);
        const num = swiper.activeIndex % 2;

        $slides.each(function(index) {
          const $slide = $(this);

          // 다른 값인경우
          if (index % 2 !== num) {
            $slide.addClass('down');
          } else {
            $slide.removeClass('down');
          }
        });
      });
    }
  }

  const swiperSelector4 = '.support_list4.swiper';
  const controlSelector4 = '.support_list4.control';
  // 슬라이드 개수 조회 1개 초과인경우만 슬라이드 처리
  const item_size4 = $(`${swiperSelector4} .swiper-slide`).length;

  // 스와이프 생성
  if (!window.support_list4) {
    // 기본옵션
    let s_option = {
      slidesPerView: 'auto',
      speed: 600,
      loop: true,
      spaceBetween: 20,
      allowTouchMove: true,
      navigation: {
        nextEl: `${controlSelector4} .support_btn_next`,
        prevEl: `${controlSelector4} .support_btn_prev`,
      },
      on: {
        // 초기화 완료후
        init: function (swiper) {
          // 슬라이드 총 개수 셋팅
          $(`${controlSelector4} .tot`).text(' / ' + item_size4);
        },
      },
      breakpoints: {
        1081: {
          spaceBetween: 70,
        }
      }
    };

    // 1개이하인경우는 스와이프 설정안함
    if (item_size4 <= 1) {
      s_option.loop = false;
      s_option.allowTouchMove = false;

      window.support_list4 = new Swiper(swiperSelector4, s_option);
      // $(controlSelector4).addClass('hidden');
    } else {
      // 스와이퍼 개수가 모자르는경우가 존재하여 두배로 복사
      const contentSlides = $(`${swiperSelector4} .swiper-slide`).clone();
      $(`${swiperSelector4} .swiper-wrapper`).append(contentSlides);

      window.support_list4 = new Swiper(swiperSelector4, s_option);

      // 슬라이드 변경 이벤트
      window.support_list4.off('slideChange').on('slideChange', function(swiper) {
        const cur_num = swiper.realIndex % contentSlides.length + 1;
        $(`${controlSelector4} .active`).text(cur_num);
      });
    }
  }
});

// 기술지원 아코디언 기능
$(document).ready(function() {
  const colTitles = document.querySelectorAll(".col-title");

  function accordionClick() {
    const current_col = this.parentElement;
    const is_active = current_col.classList.contains("active");

    current_col.parentElement.querySelectorAll(".col").forEach((col) => {
      col.classList.remove("active");
    });

    if (!is_active) {
      current_col.classList.add("active");
    }
  }

  function handleAccordion() {
    if (window.innerWidth <= 1080) {
      colTitles.forEach((title) => {
        title.addEventListener("click", accordionClick);
      });
    } else {
      colTitles.forEach((title) => {
        title.removeEventListener("click", accordionClick);
        title.parentElement.classList.remove("active");
      });
    }
  }

  // 초기 로드 시 실행
  handleAccordion();

  // 화면 크기 변경 시 실행
  window.addEventListener("resize", handleAccordion);


  // TRL stage_circle 클릭 이벤트
  $('.trl_stages .stage_circle').on('click', function() {
    // 모든 stage_circle에서 active 클래스 제거
    $('.trl_stages .stage_circle').removeClass('active');
    
    // 클릭된 요소에만 active 클래스 추가
    $(this).addClass('active');
    
    // TRL 단계 텍스트 추출 (예: "TRL 01" -> "01")
    var trlText = $(this).text().replace(/\s+/g, ''); // 공백 제거
    var trlNumber = trlText.replace('TLR', '').replace('TRL', ''); // TLR 또는 TRL 제거
    var trlNum = parseInt(trlNumber);
    
    // 모든 카테고리에서 active 클래스 제거
    $('.trl_categories .category_item').removeClass('active');
    
    // TRL 단계에 따라 해당 카테고리에 active 클래스 추가
    if (trlNum >= 1 && trlNum <= 2) {
      // 기초연구단계 (첫 번째 카테고리)
      $('.trl_categories .category_item').eq(0).addClass('active');
    } else if (trlNum >= 3 && trlNum <= 4) {
      // 실행단계 (두 번째 카테고리)  
      $('.trl_categories .category_item').eq(1).addClass('active');
    } else if (trlNum >= 5 && trlNum <= 6) {
      // 시작품단계 (세 번째 카테고리)
      $('.trl_categories .category_item').eq(2).addClass('active');
    } else if (trlNum >= 7 && trlNum <= 8) {
      // 실용화단계 (네 번째 카테고리)
      $('.trl_categories .category_item').eq(3).addClass('active');
    } else if (trlNum === 9) {
      // 사업화 (다섯 번째 카테고리)
      $('.trl_categories .category_item').eq(4).addClass('active');
    }
  });
});

