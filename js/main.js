$(function(){
//useful var's
var $windowHeight= $(document).height();

// if window is not smaller that 768px
  if (!($(window).width() < 768)){
      $('.preloader').css('height',$windowHeight);
  }
//hover effects
  $( "a.default-state" ).mouseout(function() {
    $(this).removeClass('btn-success3d');
  }).mouseover(function() {
    $(this).addClass('btn-success3d');
  });

  $( ".buttons" ).on( "mouseenter", function() {
    $(this).find('default-state').addClass('btn-success3d');
  }).on( "mouseleave", function() {
    $(this).find('default-state').removeClass('btn-success3d');
  });

//calculate center text left and right
  var leftH = $('.default-state.left').height();
  $('.default-state.left span:nth-child(2)').css({

  });

//countdowntimer
  $('#timer').downCount({
      date: '05/30/2016 00:00:00',
      offset: +2
  });
//modal popup
  $('.md-effect-12 .modal-dialog').niceScroll();
  $('.modal-scroll').niceScroll();

$('a.normalTip').tooltipster();

function valid_email_address(email) {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(email);
}
//validate form
$('#subscribe').submit(function(e) {
    var email = $('#emailForm').val();
    if (!valid_email_address(email))
    {
        $(".message").html('<i class="icon-exclamation-sign"></i> The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.');
    }
    else
    {
        $(".message").html("<span class='success'> Adding your email address...</span>");
        $.ajax({
            url: 'subscribe.php', 
            data: $(this).serialize(),
            type: 'POST',
            success: function(msg) {
                
                if(msg=="success")
                {
                    $('#emailForm').val("")
                    $(".message").html('<span class="success"> You have successfully subscribed to our mailing list.</span>');
                    
                }
                else
                {
                  $(".message").html('<i class="icon-exclamation-sign"></i> The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.');  
                }
            }
        });
    }

return false;
});

  //modal overlay
  
var overlaySubscribe = document.querySelector( 'div.subscribe-12' ),
overlayServices = document.querySelector( 'div.services-12' ),
overlayAbout = document.querySelector( 'div.about-12' ),
overlayContact = document.querySelector( 'div.contact-12' ),
closeBttn = $( 'button.overlay-close' );
transEndEventNames = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitioned',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd',
  'transition': 'transitioned'
},
transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
support = { transitions : Modernizr.csstransitions };

function toggleOverlay(context) {
  var overlay = context;
  if( classie.has( overlay, 'open' ) ) {
    classie.remove( overlay, 'open' );
    classie.add( overlay, 'close' );
    var onEndTransitionFn = function( ev ) {
      if( support.transitions ) {
        if( ev.propertyName !== 'visibility' ) return;
        this.removeEventListener( transEndEventName, onEndTransitionFn );
      }
      classie.remove( overlay, 'close' );
    };
    if( support.transitions ) {
      overlay.addEventListener( transEndEventName, onEndTransitionFn );
    }
    else {
      onEndTransitionFn();
    }
  }
  else if( !classie.has( overlay, 'close' ) ) {
    classie.add( overlay, 'open' );
  }
}
$('.inner-row > .subscribe').on('click',function(){
  toggleOverlay(overlaySubscribe);
  return false;
});
$('.inner-row-side > #services').click(function(){
   toggleOverlay(overlayServices);
   return false;
});
$('.inner-row > #about').click(function(){
  toggleOverlay(overlayAbout);
  return false;
});

$('#find').click(function(){
  toggleOverlay(overlayAbout);
  return false;
});

$('.inner-row-side > .contact').click(function(){
  toggleOverlay(overlayContact);
  return false
});
//general close
closeBttn.on('click', function(){
  var parent = $(this).parent().parent().parent().parent();
  if (parent.hasClass('open')) parent.removeClass('open');
});

//mobile button
$('.mobile-close').click(function(){
    $( this ).toggleClass( "open" );
});
//mobile navigation click event
$('.mobile-nav .navbar-collapse  .subscribe').click(function(){
    toggleOverlay(overlaySubscribe);
    if ($('.mobile-close').hasClass('open')){
        $('.mobile-nav .navbar-collapse').removeClass('in');
        $('.mobile-close').removeClass('open');
    }
    return false;
});

$('.mobile-nav .navbar-collapse .services').click(function(){
    toggleOverlay(overlayServices);
    if ($('.mobile-close').hasClass('open')){
        $('.mobile-nav .navbar-collapse').removeClass('in');
        $('.mobile-close').removeClass('open');
    }
    return false;
});

$('.mobile-nav .navbar-collapse .about').click(function(){
    toggleOverlay(overlayAbout);
    if ($('.mobile-close').hasClass('open')){
        $('.mobile-nav .navbar-collapse').removeClass('in');
        $('.mobile-close').removeClass('open');
    }
    return false;
});

$('.mobile-nav .navbar-collapse .contact').click(function(){
    toggleOverlay(overlayContact);
    if ($('.mobile-close').hasClass('open')){
        $('.mobile-nav .navbar-collapse').removeClass('in');
        $('.mobile-close').removeClass('open');
    }
    return false
});

//Contact Ajax Form
$('#contactForm').click(function(e){
e.preventDefault();
var flag = true;
$('#contact input[required=true]').each(function(){
  $(this).removeClass('error');
  if(!$.trim($(this).val())){ //if this field is empty 
          $(this).addClass('error'); //change border color to red  
          $('p.custom-alert').html('<i class="icon-exclamation-sign"></i> Please fill the required fields.').fadeIn(); 
          flag = false; //set do not proceed flag
  }
   //check invalid email
  var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
      $('p.custom-alert').html('<i class="icon-exclamation-sign"></i> Please fill the required fields.').fadeIn(); 
      $(this).addClass('error'); //change border color to red   
      flag = false; //set do not proceed flag              
  }

});

//if all is good 
if (flag){
  post_data = {
      'name'      : $('input[name=name]').val(),
      'email'     : $('input[name=email]').val(),
      'mes'       : $('textarea[name=mes]').val()
  }
  //Ajax post data to server
  var output = '';
  $.post('contact.php', post_data, function(response){
    if (response.type == 'error') {
        output = '<i class="icon-exclamation-sign"></i>'+response.text+'';
        $('p.custom-alert').html(output).fadeIn();
    } else {
        
        output = '<p>'+response.text+'</p>';
        $('#contact_results').addClass('open').html(output);
        $('#contact').fadeOut();
        
        $("#contact  input:not(input[type=submit]), #contact textarea").val('');
    }
  },'json');

}

return false;

});

//animations
$('.overlay-close').hover(function(){
  $(this).toggleClass('open');
});

});

//resize window
$(window).resize(function(){
    var $windowHeight= $(window).height();
    ajustModal();
    $('.preloader').css('height',$windowHeight);
});

//on dom ready
$(document).ready(ajustModal);
$(window).resize(htmlHeight);

function bgSlider(){
    $('body').backstretch([
        "images/layout/slider1.jpg"
    ], {duration: 3000, fade: 750});
}

//ajust modal height
function ajustModal(){
  var modalH = $(window).height();
  $(".modal-scroll").css({"height":modalH,"overflow-y":"auto"});
}
//ajust html height
function htmlHeight(){
    var docH = $('.content').height();
    $("#row").css({"height":docH});
}

function loader() {
    var docH = $('.center_block').height();
  setTimeout(function() {

    var $contentHeight = $('.content').height();
    $('.loader').delay(250).fadeOut(1500);

    $('html').delay(2000).niceScroll();

    $('.content').delay(2000).css({
      display: 'none'
    }).fadeIn(2500);


    $('.buttons').delay(2000).css({
      display:'none'
    }).fadeIn(2500);



    $('#row').delay(2000).css({
      //height:$contentHeight,
      width:'100%'
    }).fadeIn(2500)
        .promise().done(function(){
           bgSlider();
            $('.screen-loader').delay(2000).css({
                display:"none"
            }).fadeOut('slow');
    });

  });
};

//check if an element id has class name cls
function hasClass(el, cls){
    return el.className && new RegExp("(^|\\s)" +
        cls + "(\\s|$)").test(el.className);
};

// preload function
$(window).load(loader);
