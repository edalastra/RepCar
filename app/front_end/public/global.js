$(document).ready(function(){
    $('.sidenav').sidenav();
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


  $(document).ready(function(){
    $('.modal').modal();
  });

