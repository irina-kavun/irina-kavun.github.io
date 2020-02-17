
const $navbarMenu = $('.navbar__menu');
const $iconClose = $('.navbar__Xicon');
const $iconMenu = $('.navbar__icon');
let $navbarMenuList = $('.navbar__menu-list');

$(function () {
    $navbarMenu.on('click', function () {
            if ($navbarMenu.hasClass('opened')) {
                $navbarMenu.removeClass('opened');
                $iconClose.hide();
                $iconMenu.show();
            } else {
                $navbarMenu.addClass('opened');
                $iconMenu.hide();
                $iconClose.show();
            }
        $navbarMenuList.slideToggle('slow');
        },
    );
    $navbarMenuList.on('click', () => {
        $navbarMenuList.slideToggle('slow');
        $navbarMenu.removeClass('opened');
        $iconClose.hide();
        $iconMenu.show();
    });
});




