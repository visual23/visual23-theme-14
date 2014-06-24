try {
    console.log('init console... done');
} catch (e) {
    console = {
        log: function () {}
    }
}
var isTouch = false;
if (Modernizr.touch) {
    isTouch = true;
}
var sub_str;
var sub_str_length;
var active_category = "";
var prev_active_category = "";
var active_project_id;
var active_project;
var work_is_open = false;
var about_is_open = false;
var contact_is_open = false;
var scroll_top_value;
var projects;
var is_external = false;

function buildThumbnails() {
    for (var i = 0; i < projects.length; i++) {
        var thumb_set = "";
        thumb_set += '<li id="thumbnail_' + i + '"> <a class="nav" href="/work/' + projects[i].permalink + '">';
        thumb_set += '<div class="thumbnail"><div class="thumbnail_fader"></div><img src="' + projects[i].thumbnail + '" width="278" height="100" alt="' + projects[i].name + '" ></div>';
        thumb_set += '<div class="thumbnail_info">';
        thumb_set += '<div class="thumbnail_leaf"><div class="off"></div><div class="on"></div></div>';
        thumb_set += '<div class="thumbnail_project_title">' + projects[i].name + '</div>';
        thumb_set += '<div class="thumbnail_project_details">' + projects[i].what_we_did + '</div>';
        thumb_set += '</div>';
        thumb_set += '</a> </li>';
        var d = document.getElementById("thumbnail_grid");
        if (i != (projects.length - 1)) {
            d.innerHTML = d.innerHTML + thumb_set;
        } else {
            var clear_float = '<div class="clear_float"></div>';
            d.innerHTML = d.innerHTML + thumb_set + clear_float;
        }
    }
}
$(window).load(function () {
    $('#slider').nivoSlider({
        pauseTime: 2000,
        pauseOnHover: false,
        effect: 'fade',
        controlNav: true,
        captionOpacity: 1,
        directionNav: false,
        controlNavThumbs: false,
        slices: 15,
        controlNavThumbsFromRel: false,
        afterLoad: function () {
            $('.nivo-slice').first().css({
                '-webkit-border-top-left-radius': '12px',
                '-moz-border-radius-topleft': '12px',
                'border-top-left-radius': '12px',
                '-webkit-border-bottom-left-radius': '12px',
                '-moz-border-radius-bottomleft': '12px',
                'border-bottom-left-radius': '12px'
            });
            $('.nivo-slice').last().css({
                '-webkit-border-top-right-radius': '12px',
                '-moz-border-radius-topright': '12px',
                'border-top-right-radius': '12px',
                '-webkit-border-bottom-right-radius': '12px',
                '-moz-border-radius-bottomright': '12px',
                'border-bottom-right-radius': '12px'
            });
        }
    });
    $('#slider').data('nivoslider').stop();
});
$(window).resize(function () {
    positionLeaves();
    $('#content_fader').css("height", $('#content_wrapper').outerHeight(true) - 160);
});
$(document).ready(function () {
    getAllProjects();
    window.addEventListener("load", function () {
        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 0);
    });
});
jQuery.address.init(function (event) {
    $('a.nav').address(function () {
        return $(this).attr('href').replace(location.pathname, '');
    });
}).change(function (event) {
    sub_str = event.value.split('/');
    sub_str_length = sub_str.length;
    prev_active_category = active_category;
    active_category = sub_str[1];
    active_project = sub_str[2];
}).internalChange(function (event) {
    sub_str = event.value.split('/');
    if (active_category == "") {
        $.address.title("Visual 23 | Atlanta / Asheville Web Design and Web Development");
        if (work_is_open) {
            closeWork();
        } else if (contact_is_open) {
            closeContact();
        } else if (about_is_open) {
            closeAbout();
        }
    } else if (active_category == "about") {
        $.address.title("Visual 23 | About");
        if (work_is_open) {
            closeWorkQuick();
            loadAboutQuick();
        } else if (contact_is_open) {
            closeContactQuick();
            loadAboutQuick();
        } else {
            loadAbout();
        }
    } else if (active_category == "contact") {
        $.address.title("Visual 23 | Contact");
        if (work_is_open) {
            closeWorkQuick();
            loadContactQuick();
        } else if (about_is_open) {
            closeAboutQuick();
            loadContactQuick();
        } else {
            loadContact();
        }
    } else if (active_category == "work") {
        $.address.title("Visual 23 | Work | " + projects[active_project_id].name);
        if (contact_is_open) {
            closeContactQuick();
            loadWork();
        } else if (about_is_open) {
            closeAboutQuick();
            loadWork();
        } else {
            loadWork();
        }
    }
}).bind('externalChange', {
    msg: 'The value of the event is "{value}".'
}, function (event) {
    if (is_external) {
        loadExternalContent();
    }
    is_external = true;
});

function loadExternalContent() {
    if (active_category == "") {
        if (work_is_open) {
            closeWork();
        } else if (about_is_open) {
            closeAbout();
        } else if (contact_is_open) {
            closeContact();
        }
        $('#content_fader').hide();
    } else if (active_category == "work") {
        for (var j = 0, len = projects.length; j < len; j++) {
            if (projects[j].permalink == active_project) {
                active_project_id = j;
                break;
            }
        }
        $.address.title("Visual 23 | Work | " + projects[active_project_id].name);
        if (contact_is_open) {
            closeContactQuick();
        } else if (about_is_open) {
            closeAboutQuick();
        }
        loadWorkQuick();
    } else if (active_category == "about") {
        $.address.title("Visual 23 | About");
        if (contact_is_open) {
            closeContactQuick();
        } else if (work_is_open) {
            closeWorkQuick();
        }
        loadAboutQuick();
    } else if (active_category == "contact") {
        $.address.title("Visual 23 | Contact");
        if (work_is_open) {
            closeWorkQuick();
        } else if (about_is_open) {
            closeAboutQuick();
        }
        loadContactQuick();
    }
}

function loadWork() {
    work_is_open = true;
    $('#slider').data('nivoslider').stop();
    populateWorkPanel();
    scroll_top_value = $(window).scrollTop();
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#content_fader').delay(500).fadeIn(500);
    $('#work_panel_wrapper').delay(1000).fadeIn(700);
}

function loadWorkQuick() {
    work_is_open = true;
    $(window).load(function () {
        $('#slider').data('nivoslider').stop();
    });
    populateWorkPanel();
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#content_fader').delay(500).fadeIn(500);
    $('#work_panel_wrapper').delay(500).fadeIn(700);
}

function closeWork() {
    jQuery.address.path("/");
    $('#work_panel_wrapper').fadeOut(500);
    $('#content_fader').delay(500).fadeOut(700);
    setTimeout("jQuery('#slider').data('nivoslider').start()", 1000);
    $('body,html').animate({
        scrollTop: scroll_top_value
    }, 700);
    work_is_open = false;
}

function closeWorkQuick() {
    $('#work_panel_wrapper').fadeOut(500);
    work_is_open = false;
}

function populateWorkPanel() {
    $('#large_image img').unbind('load');
    $('#large_image img').bind('load', function () {
        $('#large_image img').fadeIn()
    });
    $("#large_image img").attr('src', projects[active_project_id].large_image);
    $('#large_image a, #view_project a').unbind('click');
    $('#large_image a, #view_project a').click(function (e) {
        e.preventDefault();
        window.open(projects[active_project_id].project_url, '_blank');
        return false;
    });
    $(".work_title").html(projects[active_project_id].name);
    $(".work_we_did").html(projects[active_project_id].what_we_did);
    $(".work_content").html(projects[active_project_id].description);
    if (projects[active_project_id].client != "") {
        $("#client_title").html('Client: <span>' + projects[active_project_id].client + '</span>');
        $("#client_title").show();
    } else {
        $("#client_title").hide();
    }
    if (projects[active_project_id].agency != "") {
        $("#agency_title").html('Agency: <span>' + projects[active_project_id].agency + '</span>');
        $("#agency_title").show();
    } else {
        $("#agency_title").hide();
    }
}

function loadAbout() {
    about_is_open = true;
    $('#btn_about').find('.button_glow').fadeIn(400);
    $('#slider').data('nivoslider').stop();
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#content_fader').delay(500).fadeIn(500);
    $('#about_panel_wrapper').delay(1000).fadeIn(700);
}

function loadAboutQuick() {
    about_is_open = true;
    $(window).load(function () {
        $('#slider').data('nivoslider').stop();
    });
    $('#btn_about').find('.button_glow').fadeIn(400);
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#about_panel_wrapper').delay(500).fadeIn(700);
}

function closeAbout() {
    jQuery.address.path("/");
    $('#btn_about').find('.button_glow').fadeOut(400);
    $('#about_panel_wrapper').fadeOut(500);
    $('#content_fader').delay(500).fadeOut(700);
    setTimeout("jQuery('#slider').data('nivoslider').start()", 1000);
    about_is_open = false;
}

function closeAboutQuick() {
    $('#btn_about').find('.button_glow').fadeOut(400);
    $('#about_panel_wrapper').fadeOut(500);
    about_is_open = false;
}

function loadContact() {
    contact_is_open = true;
    $('#slider').data('nivoslider').stop();
    $('#btn_contact').find('.button_glow').fadeIn(400);
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#content_fader').delay(500).fadeIn(500);
    $('#contact_panel_wrapper').delay(1000).fadeIn(700);
}

function loadContactQuick() {
    contact_is_open = true;
    $(window).load(function () {
        $('#slider').data('nivoslider').stop();
    });
    $('#btn_contact').find('.button_glow').fadeIn(400);
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    $('#contact_panel_wrapper').delay(500).fadeIn(700);
}

function closeContact() {
    jQuery.address.path("/");
    $('#btn_contact').find('.button_glow').fadeOut(400);
    $('#contact_panel_wrapper').fadeOut(500);
    $('#content_fader').delay(500).fadeOut(700);
    setTimeout("jQuery('#slider').data('nivoslider').start()", 1000);
    contact_is_open = false;
}

function closeContactQuick() {
    $('#btn_contact').find('.button_glow').fadeOut(400);
    $('#contact_panel_wrapper').fadeOut(500);
    contact_is_open = false;
}

function positionLeaves() {
    var window_width = $(window).width();
    var wrapper_width = 910;
    var left_gutter = (window_width - wrapper_width) / 2;
    var top_leaves_background_x = left_gutter + 640;
    $("#top_leaves").css('background-position', top_leaves_background_x + 'px 0px');
    if (left_gutter < 188) {
        var left_leaves_background_x = left_gutter - 188;
        $("#left_leaves").css('background-position', left_leaves_background_x + 'px 605px');
    }
}

function submitForm() {
    var name = $('input[name=name]');
    var email = $('input[name=email]');
    var phone = $('input[name=phone]');
    var find_us = $('input[name=find_us]');
    var comment = $('textarea[name=comment]');
    if (name.val() == '') {
        name.addClass('text');
        name.addClass('hightlight');
        return false;
    } else name.removeClass('hightlight'); if (email.val() == '') {
        email.addClass('text');
        email.addClass('hightlight');
        return false;
    } else email.removeClass('hightlight'); if (comment.val() == '') {
        comment.addClass('text');
        comment.addClass('hightlight');
        return false;
    } else comment.removeClass('hightlight');
    var data = 'name=' + name.val() + '&email=' + email.val() + '&phone=' + phone.val() + '&comment=' + encodeURIComponent(comment.val());
    $('.text').attr('disabled', 'true');
    $('.loading').show();
    $.ajax({
        url: "wp-content/themes/visual23/process.php",
        type: "GET",
        data: data,
        cache: false,
        success: function (html) {
            $('.form').fadeOut('slow');
            $('.done').fadeIn('slow');
        }
    });
    return false;
}

function hidePreloader() {
    $("#preloader").delay(0).fadeOut("slow");
}

function init() {
    buildThumbnails();
    $("#thumbnail_grid li").bind("click", function () {
        active_project_id = $(this).index();
        console.log('active_project_id = ' + active_project_id)
    });
    $("#work_close_btn").bind("click", function () {
        closeWork();
        return false;
    });
    $("#about_close_btn").bind("click", function () {
        closeAbout();
        return false;
    });
    $("#contact_close_btn").bind("click", function () {
        closeContact();
        return false;
    });
    $("#btn_submit").bind("click", function () {
        submitForm();
        return false;
    });
    if ((isTouch == false)) {
        $("#thumbnail_grid li").hover(function () {
            $(this).find('.thumbnail_project_title').animate({
                color: "#74b500"
            }, 500);
            $(this).find('.thumbnail_project_details').animate({
                color: "#fff"
            }, 500);
            $(this).find('.thumbnail_fader').fadeOut(400);
            $(this).find('.thumbnail_leaf .off').fadeOut(400);
            $(this).find('.thumbnail_leaf .on').fadeIn(400);
            return false;
        }, function () {
            $(this).find('.thumbnail_project_title').animate({
                color: "#fff"
            }, 500);
            $(this).find('.thumbnail_project_details').animate({
                color: "#9d9d9d"
            }, 500);
            $(this).find('.thumbnail_fader').fadeIn(400);
            $(this).find('.thumbnail_leaf .off').fadeIn(400);
            $(this).find('.thumbnail_leaf .on').fadeOut(400);
            return false;
        });
        $("#btn_about").hover(function () {
            $(this).find('.button_glow').fadeIn(400);
            $(this).find('a').animate({
                color: "#fff"
            }, 500);
        }, function () {
            if (active_category != "about") {
                $(this).find('a').animate({
                    color: "#ececec"
                }, 500);
                $(this).find('.button_glow').fadeOut(400);
            }
        });
        $("#btn_contact").hover(function () {
            $(this).find('.button_glow').stop(true, true).fadeIn(400);
            $(this).find('a').animate({
                color: "#fff"
            }, 500);
        }, function () {
            if (active_category != "contact") {
                $(this).find('a').animate({
                    color: "#ececec"
                }, 500);
                $(this).find('.button_glow').stop(true, true).fadeOut(400);
            }
        });
        $("#btn_submit").hover(function () {
            $(this).find('.button_glow').stop(true, true).fadeIn(400);
        }, function () {
            $(this).find('.button_glow').stop(true, true).fadeOut(400);
        });
        $(".close_btn").find("span").hide().end().hover(function () {
            $(this).find("span").stop(true, true).fadeIn();
        }, function () {
            $(this).find("span").stop(true, true).fadeOut();
        });
    }
    $('#content_fader').css("height", $('#content_wrapper').outerHeight(true) - 112);
    if (is_external) {
        loadExternalContent()
    }
    positionLeaves();
    hidePreloader();
    setTimeout("jQuery('#slider').data('nivoslider').start()", 1000);
}

function getAllProjects() {
    var url = template_url + "/get_data.php";
    $.ajax({
        type: "POST",
        xhr: (window.ActiveXObject) ? function () {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        } : function () {
            return new window.XMLHttpRequest();
        },
        url: url,
        beforeSend: function () {},
        success: getAllProjectsHandler
    });
}
getAllProjectsHandler = function (data) {
    projects = JSON.parse(data).projects;
    init();
}
errorHandler = function (data) {}