(function($) {

    /* Magnific popup */

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false
    });


    /* Benefits tabs */

    $('.benefits__tag').on('click', function () {
        const $this = $(this);
        if ( ! $this.hasClass('benefits__tag--current') ) {
            $('.benefits__item--current').removeClass('benefits__item--current');
            $('.benefits__tag--current').removeClass('benefits__tag--current');
            $('.benefits__item:eq(' + $this.index() + ')').addClass('benefits__item--current');
            $this.addClass('benefits__tag--current');
        }
    });


    /* Fade in animations */

    var $animation = [];
    var windowHeight = $(window).outerHeight();
    var startOffset = 250;

    $('.animation').each(function () {
        $animation.push({
            element: $(this),
            scroll: $(this).offset().top - windowHeight
        })
    });

    console.log($animation);

    $('.animation').addClass('animation--ready');

    var scrolled = 0;

    function scrollingAnimation() {
        scrolled = $(window).scrollTop()
        $animation.map(function (item, i) {

            console.log(i, scrolled, item.scroll)

            if(scrolled > item.scroll + startOffset) {
                item.element.addClass('animation--completed');
            }
        })
    }

    $(window).on('scroll', scrollingAnimation);


})(jQuery);
