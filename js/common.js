/*탑버튼*/
(function ($) {
    $(document).ready(function () {
        $('.m_tops').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        })
    });
})(jQuery);

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

$(document).ready(function () {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
});

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
$(document).ready(function () {
        $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');
            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');
            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        })
    });

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
//전체통합월보(누적)테이블출력
var ajaxCallback = function (data) {
    $(".unique").remove();
    var result = '';
    var dailynews = data["전체통합월보(누적)"];
    var jaga = dailynews["자가"];
    result += '<tr>';
    result += '<td id="jagatable">자가</td>';
    var jagasize = 0;
    var wetaksize = 0;
    var sum1 = 0; //텍스트가 아니고 숫자임을 알아야 하므로 먼저 0 지정해줌
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var sum7 = 0;
    var sum8 = 0;
    //  농장 반복
    $.each(jaga, function (index_nongjang, nongjang) {
        var nname = nongjang["농장이름"];
        var donsaArray = nongjang["돈사"];
//        console.log(index_nongjang, nname);
        var hap1 = 0;
        var hap2 = 0;
        var hap3 = 0;
        var hap4 = 0;
        var hap5 = 0;
        var hap6 = 0;
        var hap7 = 0;
        var hap8 = 0;
        if (donsaArray != null) {
            jagasize += donsaArray.length + 1;
            //  돈사 데이터 반복
            $.each(donsaArray, function (index_donsa, donsa) {
                var dname = donsa["이름"];
//                console.log(index_donsa, dname);
                result += '<td class = "sojaeji">' + nname + '</td>';
                result += '<td>' + nname + '농장의 ' + dname + '</td>';
                var gap1 = donsa["값1"];
                var gap2 = donsa["값2"];
                var gap3 = donsa["값3"];
                var gap4 = donsa["값4"];
                var gap5 = donsa["값5"];
                var gap6 = donsa["값6"];
                var gap7 = donsa["값7"];
                var gap8 = donsa["값8"];
                hap1 += gap1;
                hap2 += gap2;
                hap3 += gap3;
                hap4 += gap4;
                hap5 += gap5;
                hap6 += gap6;
                hap7 += gap7;
                hap8 += gap8;
                result += '<td>' + gap1 + '</td>';
                result += '<td>' + gap2 + '</td>';
                result += '<td>' + gap3 + '</td>';
                result += '<td>' + gap4 + '</td>';
                result += '<td>' + gap5 + '</td>';
                result += '<td>' + gap6 + '</td>';
                result += '<td>' + gap7 + '</td>';
                result += '<td>' + gap8 + '</td>';
                result += '</tr>';
            })
        }
        if (donsaArray != null) {
            result += '<tr>';
            result += '<td colspan="2" style="letter-spacing: 50px; background: #eee;">소계</td>';
            result += '<td style="background: #eee;">' + hap1 + '</td>';
            result += '<td style="background: #eee;">' + hap2 + '</td>';
            result += '<td style="background: #eee;">' + hap3 + '</td>';
            result += '<td style="background: #eee;">' + hap4 + '</td>';
            result += '<td style="background: #eee;">' + hap5 + '</td>';
            result += '<td style="background: #eee;">' + hap6 + '</td>';
            result += '<td style="background: #eee;">' + hap7 + '</td>';
            result += '<td style="background: #eee;">' + hap8 + '</td>';
            result += '</tr>';
            sum1 += hap1;
            sum2 += hap2;
            sum3 += hap3;
            sum4 += hap4;
            sum5 += hap5;
            sum6 += hap6;
            sum7 += hap7;
            sum8 += hap8;
        }
    });
    var wetak = dailynews["위탁"];
    result += '<tr>';
    result += '<td id="wetaktable" rowspan="0">위탁</td>';
    //  농장 반복
    $.each(wetak, function (index_wnongjang, wnongjang) {
        var wnname = wnongjang["농장이름"];
        var wdonsaArray = wnongjang["돈사"];
//        console.log(index_wnongjang, wnname);
        var whap1 = 0;
        var whap2 = 0;
        var whap3 = 0;
        var whap4 = 0;
        var whap5 = 0;
        var whap6 = 0;
        var whap7 = 0;
        var whap8 = 0;
        if (wdonsaArray != null) {
            wetaksize += wdonsaArray.length + 1;
            //  돈사 데이터 반복
            $.each(wdonsaArray, function (index_wdonsa, wdonsa) {
                var wdname = wdonsa["이름"];
//                console.log(index_wdonsa, wdname);
                result += '<td class="wsojaeji">' + wnname + '</td>';
                result += '<td>' + wnname + '농장의 ' + wdname + '</td>';
                var wgap1 = wdonsa["값1"];
                var wgap2 = wdonsa["값2"];
                var wgap3 = wdonsa["값3"];
                var wgap4 = wdonsa["값4"];
                var wgap5 = wdonsa["값5"];
                var wgap6 = wdonsa["값6"];
                var wgap7 = wdonsa["값7"];
                var wgap8 = wdonsa["값8"];
                whap1 += wgap1;
                whap2 += wgap2;
                whap3 += wgap3;
                whap4 += wgap4;
                whap5 += wgap5;
                whap6 += wgap6;
                whap7 += wgap7;
                whap8 += wgap8;
                result += '<td>' + wgap1 + '</td>';
                result += '<td>' + wgap2 + '</td>';
                result += '<td>' + wgap3 + '</td>';
                result += '<td>' + wgap4 + '</td>';
                result += '<td>' + wgap5 + '</td>';
                result += '<td>' + wgap6 + '</td>';
                result += '<td>' + wgap7 + '</td>';
                result += '<td>' + wgap8 + '</td>';
                result += '</tr>';
            })
            var wsum1 = 0;
            var wsum2 = 0;
            var wsum3 = 0;
            var wsum4 = 0;
            var wsum5 = 0;
            var wsum6 = 0;
            var wsum7 = 0;
            var wsum8 = 0;
            wsum1 += whap1;
//            console.log("wsum1 = " + wsum1);
            var wsumArray = new Array();
            wsumArray[0] = wsum1;
//            console.log(wsumArray);
        }
        if (wdonsaArray != null) {
            result += '<tr>';
            result += '<td colspan="2" style="letter-spacing: 50px; background: #eee;">소계</td>';
            result += '<td style="background: #eee;">' + whap1 + '</td>';
            result += '<td style="background: #eee;">' + whap2 + '</td>';
            result += '<td style="background: #eee;">' + whap3 + '</td>';
            result += '<td style="background: #eee;">' + whap4 + '</td>';
            result += '<td style="background: #eee;">' + whap5 + '</td>';
            result += '<td style="background: #eee;">' + whap6 + '</td>';
            result += '<td style="background: #eee;">' + whap7 + '</td>';
            result += '<td style="background: #eee;">' + whap8 + '</td>';
            result += '</tr>';
            sum1 += whap1;
        }
    });
//    console.log("sum1 = " + sum1);
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
    result += '<td style="background: #ddd;">' + sum1 + '</td>';
    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '<td style="background: #ddd;">' + sum7 + '</td>';
    result += '<td style="background: #ddd;">' + sum8 + '</td>';
    result += '</tr>';
    $('#tableList').append(result).addClass("unique");
    $('#jagatable').attr("rowspan", jagasize);
    $('#wetaktable').attr("rowspan", wetaksize);
    $(".sojaeji").each(function () {
        var rows = $(".sojaeji:contains('" + $(this).text() + "')");
        if (rows.length > 1) {
            rows.eq(0).attr("rowspan", rows.length);
            rows.not(":eq(0)").remove();
        }
    });
    $(".wsojaeji").each(function () {
        var rows = $(".wsojaeji:contains('" + $(this).text() + "')");
        if (rows.length > 1) {
            rows.eq(0).attr("rowspan", rows.length);
            rows.not(":eq(0)").remove();
        }
    });
};

//전체통합월보(누적) 출력
$(document).ready(function(){
    $("#AccrueMonthlyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "1.json"
        , dataType: "json"
        , success: ajaxCallback
        , error: function () {
            alert("에러발생");
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//전체통합월보(월별) 테이블 출력
var ajaxCallback2 = function (data) {
    $(".unique2").remove();
    var result = '';
    var Adailynews = data["전체통합월보(누적)"];
    var Ajaga = Adailynews["자가"];
    result += '<tr>';
    result += '<td id="Ajagatable">자가</td>';
    var Ajagasize = 0;
    var Awetaksize = 0;
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var sum7 = 0;
    var sum8 = 0;
    //  농장 반복
    $.each(Ajaga, function (Aindex_nongjang, Anongjang) {
        var Anname = Anongjang["농장이름"];
        var AdonsaArray = Anongjang["돈사"];
//        console.log(index_nongjang, nname);
        var hap1 = 0;
        var hap2 = 0;
        var hap3 = 0;
        var hap4 = 0;
        var hap5 = 0;
        var hap6 = 0;
        var hap7 = 0;
        var hap8 = 0;
        if (AdonsaArray != null) {
            Ajagasize += AdonsaArray.length + 1;
            //  돈사 데이터 반복
            $.each(AdonsaArray, function (Aindex_donsa, Adonsa) {
                var Adname = Adonsa["이름"];
//                console.log(index_donsa, dname);
                result += '<td class = "Asojaeji">' + Anname + '</td>';
                result += '<td>' + Anname + '농장의 ' + Adname + '</td>';
                var gap1 = Adonsa["값1"];
                var gap2 = Adonsa["값2"];
                var gap3 = Adonsa["값3"];
                var gap4 = Adonsa["값4"];
                var gap5 = Adonsa["값5"];
                var gap6 = Adonsa["값6"];
                var gap7 = Adonsa["값7"];
                var gap8 = Adonsa["값8"];
                hap1 += gap1;
                hap2 += gap2;
                hap3 += gap3;
                hap4 += gap4;
                hap5 += gap5;
                hap6 += gap6;
                hap7 += gap7;
                hap8 += gap8;
                result += '<td>' + gap1 + '</td>';
                result += '<td>' + gap2 + '</td>';
                result += '<td>' + gap3 + '</td>';
                result += '<td>' + gap4 + '</td>';
                result += '<td>' + gap5 + '</td>';
                result += '<td>' + gap6 + '</td>';
                result += '<td>' + gap7 + '</td>';
                result += '<td>' + gap8 + '</td>';
                result += '</tr>';
            })
        }
        if (AdonsaArray != null) {
            result += '<tr>';
            result += '<td colspan="2" style="letter-spacing: 50px; background: #eee;">소계</td>';
            result += '<td style="background: #eee;">' + hap1 + '</td>';
            result += '<td style="background: #eee;">' + hap2 + '</td>';
            result += '<td style="background: #eee;">' + hap3 + '</td>';
            result += '<td style="background: #eee;">' + hap4 + '</td>';
            result += '<td style="background: #eee;">' + hap5 + '</td>';
            result += '<td style="background: #eee;">' + hap6 + '</td>';
            result += '<td style="background: #eee;">' + hap7 + '</td>';
            result += '<td style="background: #eee;">' + hap8 + '</td>';
            result += '</tr>';
            sum1 += hap1;
            sum2 += hap2;
            sum3 += hap3;
            sum4 += hap4;
            sum5 += hap5;
            sum6 += hap6;
            sum7 += hap7;
            sum8 += hap8;
        }
    });
    var Awetak = Adailynews["위탁"];
    result += '<tr>';
    result += '<td id="Awetaktable" rowspan="0">위탁</td>';
    //  농장 반복
    $.each(Awetak, function (Aindex_wnongjang, Awnongjang) {
        var Awnname = Awnongjang["농장이름"];
        var AwdonsaArray = Awnongjang["돈사"];
//        console.log(index_wnongjang, wnname);
        var whap1 = 0;
        var whap2 = 0;
        var whap3 = 0;
        var whap4 = 0;
        var whap5 = 0;
        var whap6 = 0;
        var whap7 = 0;
        var whap8 = 0;
        if (AwdonsaArray != null) {
            Awetaksize += AwdonsaArray.length + 1;
            //  돈사 데이터 반복
            $.each(AwdonsaArray, function (Aindex_wdonsa, Awdonsa) {
                var Awdname = Awdonsa["이름"];
//                console.log(index_wdonsa, wdname);
                result += '<td class="Awsojaeji">' + Awnname + '</td>';
                result += '<td>' + Awnname + '농장의 ' + Awdname + '</td>';
                var wgap1 = Awdonsa["값1"];
                var wgap2 = Awdonsa["값2"];
                var wgap3 = Awdonsa["값3"];
                var wgap4 = Awdonsa["값4"];
                var wgap5 = Awdonsa["값5"];
                var wgap6 = Awdonsa["값6"];
                var wgap7 = Awdonsa["값7"];
                var wgap8 = Awdonsa["값8"];
                whap1 += wgap1;
                whap2 += wgap2;
                whap3 += wgap3;
                whap4 += wgap4;
                whap5 += wgap5;
                whap6 += wgap6;
                whap7 += wgap7;
                whap8 += wgap8;
                result += '<td>' + wgap1 + '</td>';
                result += '<td>' + wgap2 + '</td>';
                result += '<td>' + wgap3 + '</td>';
                result += '<td>' + wgap4 + '</td>';
                result += '<td>' + wgap5 + '</td>';
                result += '<td>' + wgap6 + '</td>';
                result += '<td>' + wgap7 + '</td>';
                result += '<td>' + wgap8 + '</td>';
                result += '</tr>';
            })
            var wsum1 = 0;
            var wsum2 = 0;
            var wsum3 = 0;
            var wsum4 = 0;
            var wsum5 = 0;
            var wsum6 = 0;
            var wsum7 = 0;
            var wsum8 = 0;
            wsum1 += whap1;
//            console.log("wsum1 = " + wsum1);
            var AwsumArray = new Array();
            AwsumArray[0] = wsum1;
//            console.log(wsumArray);
        }
        if (AwdonsaArray != null) {
            result += '<tr>';
            result += '<td colspan="2" style="letter-spacing: 50px; background: #eee;">소계</td>';
            result += '<td style="background: #eee;">' + whap1 + '</td>';
            result += '<td style="background: #eee;">' + whap2 + '</td>';
            result += '<td style="background: #eee;">' + whap3 + '</td>';
            result += '<td style="background: #eee;">' + whap4 + '</td>';
            result += '<td style="background: #eee;">' + whap5 + '</td>';
            result += '<td style="background: #eee;">' + whap6 + '</td>';
            result += '<td style="background: #eee;">' + whap7 + '</td>';
            result += '<td style="background: #eee;">' + whap8 + '</td>';
            result += '</tr>';
            sum1 += whap1;
        }
    });
//    console.log("sum1 = " + sum1);
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
    result += '<td style="background: #ddd;">' + sum1 + '</td>';
    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '<td style="background: #ddd;">' + sum7 + '</td>';
    result += '<td style="background: #ddd;">' + sum8 + '</td>';
    result += '</tr>';
    $('#tableList2').append(result).addClass("unique2");
    $('#Ajagatable').attr("rowspan", Ajagasize);
    $('#Awetaktable').attr("rowspan", Awetaksize);
    $(".Asojaeji").each(function () {
        var rows = $(".Asojaeji:contains('" + $(this).text() + "')");
        if (rows.length > 1) {
            rows.eq(0).attr("rowspan", rows.length);
            rows.not(":eq(0)").remove();
        }
    });
    $(".Awsojaeji").each(function () {
        var rows = $(".Awsojaeji:contains('" + $(this).text() + "')");
        if (rows.length > 1) {
            rows.eq(0).attr("rowspan", rows.length);
            rows.not(":eq(0)").remove();
        }
    });
};

//전체통합월보(월별) 출력
$(document).ready(function(){
    $("#AllMonthlyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "2.json"
        , dataType: "json"
        , success: ajaxCallback2
        , error: function () {
            alert("에러발생");
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//전체통합일보 테이블 출력
var ajaxCallback3 = function (data) {
    $(".unique3").remove();
    var result = '';
    var dailynews = data["전체 통합일보"];
    result += '<tr>';
    result += '<td id="alltable">전체</td>';
    var allsize = 0;
    
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;

    //  농장 반복
    $.each(dailynews, function (index_nongjang, nongjang) {
        allsize += dailynews.length - 1;
//        var nname = nongjang["구분"];
        var gap1 = nongjang["날짜"];
        var gap2 = nongjang["시작"];
        var gap3 = nongjang["전입"];
        var gap4 = nongjang["전출"];
        var gap5 = nongjang["폐사"];
        var gap6 = nongjang["출하"];
        var gap7 = nongjang["예상"];
        var gap8 = nongjang["AI 실제"];
        
        sum1 += gap3;
        sum2 += gap4;
        sum3 += gap5;
        sum4 += gap6;
        sum5 += gap7;
        sum6 += gap8;
        
//        result += '<td>' + nname + '</td>';
        result += '<td>' + gap1 + '</td>';
        result += '<td>' + gap2 + '</td>';
        result += '<td>' + gap3 + '</td>';
        result += '<td>' + gap4 + '</td>';
        result += '<td>' + gap5 + '</td>';
        result += '<td>' + gap6 + '</td>';
        result += '<td>' + gap7 + '</td>';
        result += '<td>' + gap8 + '</td>';
        result += '</tr>';
    });
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
    result += '<td style="background: #ddd;">' + sum1 + '</td>';
    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '</tr>';
    $('#tableList3').append(result).addClass("unique3");
    $('#alltable').attr("rowspan", allsize);
};

//전체통합일보 출력
$(document).ready(function(){
    $("#TotalDailyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "3.json"
        , dataType: "json"
        , success: ajaxCallback3
        , error: function () {
            alert("에러발생");
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//농장별 월보 테이블 출력
var ajaxCallback4 = function (data) {
    $(".unique4").remove();
    var result = '';
    var farmmonthlydata = data["농장별월보"];
//    var pazu = farmmonthlydata["농장이름"];
    result += '<tr>';
    result += '<td rowspan="0" id="pazutable"></td>';
    var pazusize = 0;
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var sum7 = 0;
    var sum8 = 0;
    //  농장 반복
    $.each(farmmonthlydata, function (index_nongjang, nongjang) {
        var nname = nongjang["농장이름"];
        var dname = nongjang["돈사이름"];
        var donsaArray = nongjang["돈사값"];
        var hap1 = 0;
        var hap2 = 0;
        var hap3 = 0;
        var hap4 = 0;
        var hap5 = 0;
        var hap6 = 0;
        var hap7 = 0;
        var hap8 = 0;
        if (donsaArray != null) {
//            pazusize += donsaArray.length + 1;
            //  돈사 데이터 반복
            $.each(donsaArray, function (index_donsa, donsa) {
//                result += '<td id="pazutable">' + nname + ' 농장</td>';
                result += '<td>' + nname + '농장의 ' + dname + '</td>';
                var gap1 = donsa["월별"];
                var gap2 = donsa["값1"];
                var gap3 = donsa["값2"];
                var gap4 = donsa["값3"];
                var gap5 = donsa["값4"];
                var gap6 = donsa["값5"];
                var gap7 = donsa["값6"];
                var gap8 = donsa["값7"];
                hap1 += gap1;
                hap2 += gap2;
                hap3 += gap3;
                hap4 += gap4;
                hap5 += gap5;
                hap6 += gap6;
                hap7 += gap7;
                hap8 += gap8;
                result += '<td>' + gap1 + '</td>';
                result += '<td>' + gap2 + '</td>';
                result += '<td>' + gap3 + '</td>';
                result += '<td>' + gap4 + '</td>';
                result += '<td>' + gap5 + '</td>';
                result += '<td>' + gap6 + '</td>';
                result += '<td>' + gap7 + '</td>';
                result += '<td>' + gap8 + '</td>';
                result += '</tr>';
            })
//        }
//        if (donsaArray != null) {
            result += '<tr>';
            result += '<td colspan="3" style="letter-spacing: 50px; background: #eee;">소계</td>';
//            result += '<td style="background: #eee;">' + hap1 + '</td>';
//            result += '<td style="background: #eee;">' + hap2 + '</td>';
            result += '<td style="background: #eee;">' + hap3 + '</td>';
            result += '<td style="background: #eee;">' + hap4 + '</td>';
            result += '<td style="background: #eee;">' + hap5 + '</td>';
            result += '<td style="background: #eee;">' + hap6 + '</td>';
            result += '<td style="background: #eee;">' + hap7 + '</td>';
            result += '<td style="background: #eee;">' + hap8 + '</td>';
            result += '</tr>';
            sum1 += hap1;
            sum2 += hap2;
            sum3 += hap3;
            sum4 += hap4;
            sum5 += hap5;
            sum6 += hap6;
            sum7 += hap7;
            sum8 += hap8;
        }
    });
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
//    result += '<td style="background: #ddd;">' + sum1 + '</td>';
//    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '<td style="background: #ddd;">' + sum7 + '</td>';
    result += '<td style="background: #ddd;">' + sum8 + '</td>';
    result += '</tr>';
    $('#tableList4').append(result).addClass("unique4");
//    $('#pazutable').attr("rowspan", pazusize);

    // select 버튼에 관한 이벤트
    var sdata = document.getElementById("sel");
    //document.getElementById("sel").onclick = function(event){
    document.getElementById("sel").onchange = function(event){
      document.getElementById("pazutable").innerText = sdata.value;  
    }

};

//농장별 월보 출력
$(document).ready(function(){
    $("#FarmMonthlyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "4.json"
        , dataType: "json"
        , success: ajaxCallback4
        , error: function () {
            alert("에러발생");
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//농장별 일보 테이블 출력
var ajaxCallback5 = function (data) {
    $(".unique5").remove();
    var result = '';
    var dailynews5 = data["농장별 일보"];
    result += '<tr>';
    result += '<td id="alltable5">전체</td>';
    var allsize5 = 0;
    
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;

    //  농장 반복
    $.each(dailynews5, function (index_nongjang, nongjang) {
        allsize5 += dailynews5.length - 1;
//        var nname = nongjang["구분"];
        var gap1 = nongjang["날짜"];
        var gap2 = nongjang["시작"];
        var gap3 = nongjang["전입"];
        var gap4 = nongjang["전출"];
        var gap5 = nongjang["폐사"];
        var gap6 = nongjang["출하"];
        var gap7 = nongjang["예상"];
        var gap8 = nongjang["AI 실제"];
        
        sum1 += gap3;
        sum2 += gap4;
        sum3 += gap5;
        sum4 += gap6;
        sum5 += gap7;
        sum6 += gap8;
        
//        result += '<td>' + nname + '</td>';        
        result += '<td>' + gap1 + '</td>';
        result += '<td>' + gap2 + '</td>';
        result += '<td>' + gap3 + '</td>';
        result += '<td>' + gap4 + '</td>';
        result += '<td>' + gap5 + '</td>';
        result += '<td>' + gap6 + '</td>';
        result += '<td>' + gap7 + '</td>';
        result += '<td>' + gap8 + '</td>';
        result += '</tr>';
        
    });
    
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
    result += '<td style="background: #ddd;">' + sum1 + '</td>';
    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '</tr>';
    $('#tableList5').append(result).addClass("unique5");
    $('#alltable5').attr("rowspan", allsize5);
};

//농장별 일보 출력
$(document).ready(function(){
    $("#FarmDailyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "5.json"
        , dataType: "json"
        , success: ajaxCallback5
        , error: function () {
            alert("에러발생");
        }
    });
        return false;
    }); // end submit()
}); // end ready()

//농장 돈사별 일보 테이블 출력
var ajaxCallback6 = function (data) {
    $(".unique6").remove();
    var result = '';
    var dailynews = data["농장 돈사별 일보"];
    result += '<tr>';
    result += '<td id="seltable"></td>';
    var selsize = 0;
    
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;

    //  농장 반복
    $.each(dailynews, function (index_nongjang, nongjang) {
        selsize += dailynews.length - 1;
//        var nname = nongjang["구분"];
        var gap1 = nongjang["날짜"];
        var gap2 = nongjang["시작"];
        var gap3 = nongjang["전입"];
        var gap4 = nongjang["전출"];
        var gap5 = nongjang["폐사"];
        var gap6 = nongjang["출하"];
        var gap7 = nongjang["예상"];
        var gap8 = nongjang["AI 실제"];
        
        sum1 += gap3;
        sum2 += gap4;
        sum3 += gap5;
        sum4 += gap6;
        sum5 += gap7;
        sum6 += gap8;
        
//        result += '<td>' + nname + '</td>';        
        result += '<td>' + gap1 + '</td>';
        result += '<td>' + gap2 + '</td>';
        result += '<td>' + gap3 + '</td>';
        result += '<td>' + gap4 + '</td>';
        result += '<td>' + gap5 + '</td>';
        result += '<td>' + gap6 + '</td>';
        result += '<td>' + gap7 + '</td>';
        result += '<td>' + gap8 + '</td>';
        result += '</tr>';
        
    });
    
    result += '<tr>';
    result += '<td colspan="3" style="letter-spacing: 50px; background: #ddd;">합계</td>';
    result += '<td style="background: #ddd;">' + sum1 + '</td>';
    result += '<td style="background: #ddd;">' + sum2 + '</td>';
    result += '<td style="background: #ddd;">' + sum3 + '</td>';
    result += '<td style="background: #ddd;">' + sum4 + '</td>';
    result += '<td style="background: #ddd;">' + sum5 + '</td>';
    result += '<td style="background: #ddd;">' + sum6 + '</td>';
    result += '</tr>';
    $('#tableList6').append(result).addClass("unique6");
    $('#seltable').attr("rowspan", selsize);
    
    // select 버튼에 관한 이벤트
    var sdata6 = document.getElementById("good");
    //document.getElementById("sel").onclick = function(event){
    document.getElementById("good").onchange = function(event){
      document.getElementById("seltable").innerText = sdata6.value;  
    }
};

//농장별 일보 출력
$(document).ready(function(){
    $("#FarmDonsaDailyReport").submit(function(){
         //동적으로 원격에 있는 JSON 파일(결과값)을 로드 
    $.ajax({
        url: "6.json"
        , dataType: "json"
        , success: ajaxCallback6
        , error: function () {
            alert("에러발생");
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

//월별달력출력
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
        , showOn: 'both'
        , //                        buttonText: "달력",
        changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-99:c+99'
    , };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
    var datepicker_default = {
        showOn: 'both'
        , //                        buttonText: "달력",
        currentText: "이번달"
        , changeMonth: true
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-99:c+99'
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
        var selectDate = $(".mdate").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
    }
    $(".mdate").datepicker(datepicker_default);
});

//년별달력출력
$(document).ready(function () {
    $.datepicker.regional['ko'] = {
        closeText: '닫기'
//        , prevText: '이전달'
//        , nextText: '다음달'
        , currentText: '오늘'
        , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월'
                , '7월', '8월', '9월', '10월', '11월', '12월']
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
        , showOn: 'both'
        , //                        buttonText: "달력",
        changeMonth: false
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-99:c+99'
    , };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
    var datepicker_default = {
        showOn: 'both'
        ,//                         buttonText: "달력",
        currentText: "이번년"
        , changeMonth: false
        , changeYear: true
        , showButtonPanel: true
        , yearRange: 'c-99:c+99'
        , showOtherMonths: false
        , selectOtherMonths: false
    }
    datepicker_default.closeText = "선택";
    datepicker_default.dateFormat = "yy";
    datepicker_default.onClose = function (dateText, inst) {
//        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker("option", "defaultDate", new Date(year , 1));
        $(this).datepicker('setDate', new Date(year, 1));
    }
    datepicker_default.beforeShow = function () {
        var selectDate = $(".ydate").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker("option", "defaultDate", new Date(year, month, 1));
    }
    $(".ydate").datepicker(datepicker_default);
});

//일보조회 셀렉트
function categoryChange(e) {
    var donsa_a = ["돈사 선택"];
    var donsa_b = ["육성사 1동", "육성사 2동", "육성사 3동", "육성사 4동", "육성사 5동"];
    var donsa_c = ["육성사 1동", "육성사 2동", "육성사 3동", "육성사 4동", "육성사 5동", "육성사 6동", "육성사 7동"];
    var target = document.getElementById("good");
    if (e.value == "a") var d = donsa_a;
    else if (e.value == "b") var d = donsa_b;
    else if (e.value == "c") var d = donsa_c;
    target.options.length = 0;
    for (x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }
}

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
    exportTable.find('input').each(function (index, elem) {
        $(elem).remove();
    });
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
    }
    else {
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
//window.onload = function(){
    var slideIndex = 1;
    showSlides(slideIndex);

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
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        captionText.innerHTML = dots[slideIndex - 1].alt;
    }
//}