/*SERVICES TABS*/
$(document).ready(function(){
/*make click on the element*/
$('.services-items').on('click', function() {

   /*on the event assign an active class to this particular element and remove it from all the sibling-elements with the same data-attr*/
   $(this).addClass('active-services-tab')
       .siblings()
       .removeClass('active-services-tab');

/*get the data-attr identification*/
   const tabData = $(this).data('tab');

   /*get the parent of the content-blocks, find the child with relevant attribute, add class 'current' to it and remove the class from siblings*/
   $('.services-content-wrapper').find(`[data-content = ${tabData}]`)
       .addClass('current')
       .siblings()
       .removeClass('current')
});


/*OUR AMAZING WORK FILTER ITEMS*/

$('.amazing-work-item').on('click', function() {
   // fetch the class of the clicked item
   const menuData = $(this).data('menuItem');

   // reset the active class on all the buttons
   $('.amazing-work-item').removeClass('active');
   // update the active state on the clicked button
   $(this).addClass('active');

   if(menuData === 'all') {
      // show all the items
      $('.product-container').children('div.basic-product-item').show();
      $('.product-container').children('div.hidden-product-item').hide();
      //show the loadMore button
      $('#loadMore').show()
   }
   else {
      // hide all elements that don't share the menuData and show those which do correspond to the menuData
      $('.product-item').hide();
      $('.product-container').find(`div.product-item[data-menu-content = ${menuData}]`).show();
      $('#loadMore').hide()
   }
});

/*SLIDER PEOPLE SAY*/
   $('.slider-img-nav').on('click', function () {
      $(this).addClass('active-nav-img')
          .siblings()
          .removeClass('active-nav-img');

      /*get the data-attr identification*/
      const imgData = $(this).data('imgNav');
//connect the content with relevant data-attr identification and add an active class to the respective content and remove it from all other siblings
      $('.slider-for-content').find(`[data-img-container = ${imgData}]`)
          .addClass('active-content-for-slider')
          .siblings()
          .removeClass('active-content-for-slider')

   });

/*OUR AMAZING WORK LOAD MORE EFFECT*/
   $('#loadMore').on('click', function (e){
      e.preventDefault();
//on click on loadMore button appears the spinner
     $('.spinner').addClass('active-spin');
      setTimeout(function () {
         //the spinner disappears and more content slides down
         $('.spinner').removeClass('active-spin');
         $('.product-item:hidden').slice(0, 12).slideDown();

         //if there are no more hidden items available to show (.length is 0) the button fades out
         if ($('.product-item:hidden').length === 0) {
            $('#loadMore').fadeOut('slow');
         }
      },3000)
   });

/*NEXT-PREV BUTTONS*/
      const leftNavBtn = $('#leftSliderBtn');
      const rightNavBtn = $('#rightSliderBtn');

      leftNavBtn.on('click', function () {
         //get the previous active nav-img
      const oldActivePrev = $('.slider-img-nav.active-nav-img');

   //for this remove the active status and assign it to the previous item
         oldActivePrev.removeClass('active-nav-img')
             .prev()
             .addClass('active-nav-img');

         //get the data-attr identification for active nav-img
      let actualImgData = $('.active-nav-img').data('imgNav');

      //condition: if we get to the first item we need to get back to the last one,
         // and we have to get the data identification for the last item separately and re-assign it into the variable
      if (oldActivePrev.is(':first-child')) {
         actualImgData = $('.slider-img-nav:last-child').data('imgNav');
         oldActivePrev.removeClass('active-nav-img');
         $('.slider-img-nav:last-child').addClass('active-nav-img');
      }
//give the respective data-attr identification to the corresponding content, add an active class, and remove it from the siblings
         $('.slider-for-content').siblings(`[data-img-container = ${actualImgData}]`)
          .addClass('active-content-for-slider')
          .siblings()
          .removeClass('active-content-for-slider');
   });

      //visa versa for the right button onclick
   rightNavBtn.on('click', function () {
      const oldActiveNext = $('.slider-img-nav.active-nav-img');

      oldActiveNext.removeClass('active-nav-img')
          .next()
          .addClass('active-nav-img');

      let actualImgData = $('.active-nav-img').data('imgNav');

      if (oldActiveNext.is(':last-child')) {
         actualImgData = $('.slider-img-nav:first-child').data('imgNav');
         oldActiveNext.removeClass('active-nav-img');
         $('.slider-img-nav:first-child').addClass('active-nav-img');
      }
      $('.slider-for-content').siblings(`[data-img-container = ${actualImgData}]`)
          .addClass('active-content-for-slider')
          .siblings()
          .removeClass('active-content-for-slider');

   });
});