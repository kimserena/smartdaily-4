/*탑버튼*/
( function( $ ) {
$( document ).ready(function() {

 $('.m_tops').click(
 function () { $('body,html').animate({ scrollTop: 0 }, 500);}
 )

});
 
}
)( jQuery );

/*모달*/
// Get the modal
var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

/*navi*/
$(document).ready(function () {
$(".sub-navi").hide();
$(".nav ul li").hover(function () {
    $(".sub-navi").slideDown("fast");
});
$(".sub-navi").mouseleave(function () {
    $(".sub-navi").slideUp("fast");
});
$(".estimate_enquiry li").hover(function () {
    $(".sub-navi").slideUp("fast");
});
$(".logo").hover(function () {
    $(".sub-navi").slideUp("fast");
});
});

/*탑버튼*/
//Get the button
$(document).ready(function () {
var mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    }
    else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
});


/*서브*/

//서브 탭 메뉴
function openInfo(evt, infoName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(infoName).style.display = "block";
  evt.currentTarget.className += " active";
}

//탭_탭
$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})

/*고장접수,견적문의 선택*/
$(document).ready(function () {
    //선택커스텀
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            }
            else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
    
    //파일선택
    $(document).ready(function () {
        var fileTarget = $('.filebox .upload-hidden');
        fileTarget.on('change', function () {
            if (window.FileReader) {
                var filename = $(this)[0].files[0].name;
            }
            else {
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }
            $(this).siblings('.upload-name').val(filename);
        });
    });
    
});

/*일보조회*/

//누적 월별 조회
$(document).ready(function(){
    $("#AccrueMonthlyReport").submit(function(){
        //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "http://101.101.162.62:8081/smartdaily/getrecords"
        , dataType: "json"
        , type: "POST"
        , success: function (data) {
            $(".uniquesss").remove();
            //받아온 JSON을 테이블에 출력
            $.each(data, function () {
                $('#tableList').append("<tr class='uniquesss'><td>" + this["groupid"] + "</td><td>" + this["locationid"] + "</td><td>" + this.buildingid + "</td><td>" + this["recordday"] + "</td><td>" + this["start_count"] + "</td><td>" + this["move_count"] + "</td><td>" + this["out_count"] + "</td><td>" + this["die_count"] + "</td><td>" + this["new_count"] + "</td><td>" + this["etc_count"] + "</td><td>" + this["ai_count"] + "</td></tr>");
            });
        }
        , error: function (err) {
            alert("에러발생"+err);
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//달력
$(document).ready(function () {
    $.datepicker.regional['ko'] = {
        closeText: '닫기'
        , prevText: '이전달'
        , nextText: '다음달'
        , currentText: '오늘'
        , monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)'
            , '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)']
        , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월'
            , '7월', '8월', '9월', '10월', '11월', '12월']
        , dayNames: ['일', '월', '화', '수', '목', '금', '토']
        , dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
        , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
        , weekHeader: 'Wk'
        , dateFormat: 'yy-mm-dd'
        , firstDay: 0
        , isRTL: false
        , showMonthAfterYear: true
        , yearSuffix: ''
//        , showOn: 'both'
//        , buttonText: "달력"
        , changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-10:c+10'
        , onClose: function (selectedDate) {
            //시작일(startDate) datepicker가 닫힐때
            //종료일(endDate)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
            $('#edate').datepicker('option', 'minDate', selectedDate);
        }
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
    $('#sdate').datepicker('setDate', 'today');
    var datepicker_default = {
        showOn: 'both'
//                        , buttonText: "달력"
        , currentText: "이번달"
        , changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-20:c+20'
        , showOtherMonths: true
        , selectOtherMonths: true
    }
    datepicker_default.closeText = "선택";
    datepicker_default.dateFormat = "yy-mm";
    datepicker_default.onClose = function (dateText, inst) {
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
        $(this).datepicker('setDate', new Date(year, month, 1));
    }
    datepicker_default.beforeShow = function () {
        var selectDate = $("#sdate").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
    }
    $("#sdate").datepicker(datepicker_default);
    $.datepicker.regional['ko'] = {
        closeText: '닫기'
        , prevText: '이전달'
        , nextText: '다음달'
        , currentText: '오늘'
        , monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)'
            , '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)']
        , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월'
            , '7월', '8월', '9월', '10월', '11월', '12월']
        , dayNames: ['일', '월', '화', '수', '목', '금', '토']
        , dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
        , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
        , weekHeader: 'Wk'
        , dateFormat: 'yy-mm-dd'
        , firstDay: 0
        , isRTL: false
        , showMonthAfterYear: true
        , yearSuffix: ''
//        , showOn: 'both'
//        , buttonText: "달력"
        , changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-20:c+20'
        , onClose: function (selectedDate) {
            // 종료일(endDate) datepicker가 닫힐때
            // 시작일(startDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 시작일로 지정
            $("#sdate").datepicker("option", "maxDate", selectedDate);
        }
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
    var datepicker_default = {
        showOn: 'both'
//                        , buttonText: "달력"
        , currentText: "이번달"
        , changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-20:c+20'
        , showOtherMonths: true
        , selectOtherMonths: true
    }
    datepicker_default.closeText = "선택";
    datepicker_default.dateFormat = "yy-mm";
    datepicker_default.onClose = function (dateText, inst) {
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
        $(this).datepicker('setDate', new Date(year, month, 1));
    }
    datepicker_default.beforeShow = function () {
        var selectDate = $("#edate").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
    }
    $("#edate").datepicker(datepicker_default);
});

//월별
$(document).ready(function () {
        $.datepicker.regional['ko'] = {
            closeText: '닫기',
            prevText: '이전달',
            nextText: '다음달',
            currentText: '오늘',
            monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)',
                '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월',
                '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: 'Wk',
            dateFormat: 'yy-mm-dd',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '',
            showOn: 'both',
//                        buttonText: "달력",
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: 'c-99:c+99',
        };
        $.datepicker.setDefaults($.datepicker.regional['ko']);

        var datepicker_default = {
            showOn: 'both',
//                        buttonText: "달력",
            currentText: "이번달",
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: 'c-99:c+99',
            showOtherMonths: true,
            selectOtherMonths: true
        }

        datepicker_default.closeText = "선택";
        datepicker_default.dateFormat = "yy-mm";
        datepicker_default.onClose = function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
            $(this).datepicker('setDate', new Date(year, month, 1));
        }

        datepicker_default.beforeShow = function () {
            var selectDate = $("#mdate").val().split("-");
            var year = Number(selectDate[0]);
            var month = Number(selectDate[1]) - 1;
            $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
        }

        $("#mdate").datepicker(datepicker_default);
    });

//일보조회 셀렉트

function categoryChange(e) {
  var good_a = ["돈사 선택"];
  var good_b = ["육성사 1동", "육성사 2동", "육성사 3동", "육성사 4동", "육성사 5동"];
  var good_c = ["육성사 1동", "육성사 2동", "육성사 3동", "육성사 4동", "육성사 5동", "육성사 6동", "육성사 7동"];
  var target = document.getElementById("good");
 
  if(e.value == "a") var d = good_a;
  else if(e.value == "b") var d = good_b;
  else if(e.value == "c") var d = good_c;
 
  target.options.length = 0;
 
  for (x in d) {
    var opt = document.createElement("option");
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  } 
}

<!--
//일보조회 셀렉트
function Category(value) {
    this.value = value;
    this.length = 0;
}

function addCategory(category, value) {
    category[category.length] = new Category(value);
    category.length++;
}
var category = new Category();
addCategory(category, "자가 선택");
addCategory(category[0], "농장 선택");
addCategory(category[0][0], "육성사 선택");
addCategory(category, "자가");
addCategory(category[1], "파주 농장");
addCategory(category[1][0], "육성사1동");
addCategory(category[1][0], "육성사2동");
addCategory(category[1][0], "육성사3동");
addCategory(category[1][0], "육성사4동");
addCategory(category[1][0], "육성사5동");
addCategory(category[1], "의정부 농장");
addCategory(category[1][1], "육성사1동");
addCategory(category[1][1], "육성사2동");
addCategory(category[1][1], "육성사3동");
addCategory(category[1][1], "육성사4동");
addCategory(category[1][1], "육성사5동");
addCategory(category[1][1], "육성사6동");
addCategory(category[1][1], "육성사7동");
//        addCategory(category[1], "농장");
//        addCategory(category[1][2], "육성사1동");
//        addCategory(category[1][2], "육성사2동");
//        addCategory(category[1][2], "육성사3동");
addCategory(category, "위탁");
addCategory(category[2], "천안 농장");
addCategory(category[2][0], "육성사1동");
addCategory(category[2][0], "육성사2동");
addCategory(category[2][0], "육성사3동");
addCategory(category[2][0], "육성사4동");
addCategory(category[2][0], "육성사5동");
addCategory(category[2][0], "육성사6동");
addCategory(category[2], "당진 농장");
addCategory(category[2][1], "육성사1동");
addCategory(category[2][1], "육성사2동");
addCategory(category[2][1], "육성사3동");
addCategory(category[2][1], "육성사4동");
addCategory(category[2][1], "육성사5동");
addCategory(category[2][1], "육성사6동");
//        addCategory(category[2], "농장");
//        addCategory(category[2][2], "육성사1동");
//        addCategory(category[2][2], "육성사2동");
//        addCategory(category[2][2], "육성사3동");
function initForm(form) {
    form.subject.length = category.length;
    for (i = 0; i < category.length; i++) form.subject[i].text = category[i].value;
    form.subject.selectedIndex = 0;
    form.contents.selectedIndex = 0;
    change_subject(form);
}

function change_subject(form) {
    var i = form.subject.selectedIndex;
    form.contents.length = category[i].length;
    for (j = 0; j < form.contents.length; j++) form.contents[j].text = category[i][j].value;
    form.contents.selectedIndex = 0;
    change_contents(form);
}

function change_contents(form) {
    var i = form.subject.selectedIndex
    var j = form.contents.selectedIndex;
    form.components.length = category[i][j].length;
    for (k = 0; k < form.components.length; k++) form.components[k].text = category[i][j][k].value;
    form.components.selectedIndex = 0;
}
// -->

//일보조회 엑셀다운로드
function fnExcelReport(id, title) {
var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
tab_text = tab_text + '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
tab_text = tab_text + '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
tab_text = tab_text + "<table border='1px'>";
var exportTable = $('#' + id).clone();
exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
tab_text = tab_text + exportTable.html();
tab_text = tab_text + '</table></body></html>';
var data_type = 'data:application/vnd.ms-excel';
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var fileName = title + '.xls';
//Explorer 환경에서 다운로드
if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
if (window.navigator.msSaveBlob) {
var blob = new Blob([tab_text], {
type: "application/csv;charset=utf-8;"
});
navigator.msSaveBlob(blob, fileName);
}
} else {
var blob2 = new Blob([tab_text], {
type: "application/csv;charset=utf-8;"
});
var filename = fileName;
var elem = window.document.createElement('a');
elem.href = window.URL.createObjectURL(blob2);
elem.download = filename;
document.body.appendChild(elem);
elem.click();
document.body.removeChild(elem);
}
}


/*매뉴얼 슬라이드*/
$(document).ready(function(){
    var slideIndex = 1;
    showSlides(slideIndex);
});
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("menual_demo");
      var captionText = document.getElementById("caption");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
      captionText.innerHTML = dots[slideIndex-1].alt;
    }

