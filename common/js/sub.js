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