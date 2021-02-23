(function() {
    'use strict';
    var page = {
        navigate: function() {
            $('.appbar__icon, .nav__back, .nav__overlay').click(function() {
                $('nav').toggleClass('nav--open');
            });
        },
        hover: function() {
            $(document).on('mouseenter', '.share > button', function(e) {
                $('.share').addClass('share--active');
            });
            $(document).on('click', '.share', function(e) {
                $('.share').toggleClass('share--active');
            });
        },
        share: function(data) {
            var i, windowpath, finalpath, eventTarget, adressarray = [];
            for (i = 0; i < data.length; i++) {
                adressarray.push(data[i].adress);
            }
            $(document).on('click', '.share', function(e) {
                windowpath = window.location.pathname;
                finalpath = windowpath.substring(windowpath.lastIndexOf('/') + 1).replace('.html', '').replace('a-', '').replace('b-', '');
                i = data[$.inArray(finalpath, adressarray)];
                eventTarget = $(e.target).closest('a');
                if(eventTarget.hasClass('share--facebook')) {
                    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A//vanntile.tk/%23/" + encodeURIComponent(i.adress));
                } else if (eventTarget.hasClass('share--twitter')) {
                    window.open("https://twitter.com/home?status=" + encodeURIComponent(i.share.t[Math.floor(Math.random() * i.share.t.length)]));
                } else if ((eventTarget.hasClass('share--whatsapp')) && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                    window.open("whatsapp://send?text=" + encodeURIComponent(i.share.w[Math.floor(Math.random() * i.share.w.length)]));
                } else if (eventTarget.hasClass('share--google-plus')) {
                    window.open("https://plus.google.com/share?url=http%3A//vanntile.tk/%23/" + encodeURIComponent(i.adress));
                } else if (eventTarget.hasClass('share--pinterest')) {
                    window.open("https://pinterest.com/pin/create/button/?url=http%3A//vanntile.tk" + encodeURIComponent(i.share.p.url) + "&media=" + encodeURIComponent(i.share.p.media) + "&description=" + encodeURIComponent(i.summary));
                } else if (eventTarget.hasClass('share--linkedin')) {
                    window.open("https://www.linkedin.com/shareArticle?mini=true&url=http%3A//vanntile.tk/%23/" + encodeURIComponent(i.adress) + "&title=" + encodeURIComponent(i.description) + "&summary=" + encodeURIComponent(i.summary));
                }
            });
        }
    };
    $(document).ready(function() {
        console.log('%c  _   __\t     _______ __      ____\t  __\n | | \/ \/__ ____  ___\/_  __(_) \/__   \/ __\/__ _____\/ \/____  ______ __\n | |\/ \/ _ `\/ _ \\\/ _ \\\/ \/ \/ \/ \/ -_) \/ _\/\/ _ `\/ __\/ __\/ _ \\\/ __\/ \/\/ \/\n |___\/\\_,_\/_\/\/_\/_\/\/_\/_\/ \/_\/_\/\\__\/ \/_\/  \\_,_\/\\__\/\\__\/\\___\/_\/  \\_, \/ \n\t\t\t\t\t\t\t    \/___\/\nSo you like snooping under the hood? %cIf you want to collaborate or hire me, mail me at vann@vanntile.tk\nThank you for visiting, and for taking a look at the code!!', 'color:#ffc107', 'color:#2196f3');
        page.navigate();
        page.hover();
        $.getJSON('js/articles.json', function(data){
            page.share(data.data);
        });
    });
})();