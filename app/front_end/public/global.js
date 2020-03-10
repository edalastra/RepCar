$(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $(document).ready(function(){
    $('.carousel').carousel({
      dist: 0,
      fullWidth: true,
      indicators: true,
    });
  });

  $(document).ready(function(){
    $('.parallax').parallax();
  });


  $(window).scroll(function() {
    if($(window).scrollTop() > 300) {
      $('#top').fadeIn()
    }else $('#top').fadeOut()
   
   })
   
   $(document).ready(function() {
     $('#top').hide();  
     $('#top').click(function(){
       $('html, body').animate({scrollTop:0}, 'slow');
       return false;
     });
   });

   $(document).ready(function(){
    $('select').formSelect();
  });


