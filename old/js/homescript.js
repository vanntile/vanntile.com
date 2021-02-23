(function() {
    'use strict';
    var page = {
        scroll: function() {
            var $window = $(window);
            $window.bind('scroll', function() {
                var offset = $window.scrollTop(),
                    fadeUntil = $window.height() * 0.66,
                    opacity = 0;
                if( offset > fadeUntil ){
                    opacity = 1;
                } else if( offset <= fadeUntil ){
                    opacity = offset/fadeUntil;
                }
                $('.appbar').css('background-color', 'rgba(63, 81, 181, ' + opacity + ')');
            });
        },
        navigate: function() {
            $('.appbar__icon, .nav__back, .nav__overlay').click(function() {
                $('nav').toggleClass('nav--open');
            });
        }
    };
    $(document).ready(function() {
        console.log('%c  _   __\t     _______ __      ____\t  __\n | | \/ \/__ ____  ___\/_  __(_) \/__   \/ __\/__ _____\/ \/____  ______ __\n | |\/ \/ _ `\/ _ \\\/ _ \\\/ \/ \/ \/ \/ -_) \/ _\/\/ _ `\/ __\/ __\/ _ \\\/ __\/ \/\/ \/\n |___\/\\_,_\/_\/\/_\/_\/\/_\/_\/ \/_\/_\/\\__\/ \/_\/  \\_,_\/\\__\/\\__\/\\___\/_\/  \\_, \/ \n\t\t\t\t\t\t\t    \/___\/\nSo you like snooping under the hood? %cIf you want to collaborate or hire me, mail me at vann@vanntile.tk\n%cThank you for visiting, and for taking a look at the code!!', 'color:#ffc107', 'color:#FAFAFA', 'color:#2196f3');
        page.scroll();
        page.navigate();
    });
})();