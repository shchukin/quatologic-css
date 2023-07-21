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

    /* init и re-init */
    var animations = [];
    var startOffset = 250;

    function initAnimationsGeometry() {
        animations.length = 0;
        $('.animation:not(.animation--completed)').each(function () {
            animations.push({
                element: $(this),
                scroll: $(this).offset().top - $(window).outerHeight()
            })
        });
    }

    $(document).ready(initAnimationsGeometry);
    $(window).on('resize', initAnimationsGeometry);


    /* run */

    $('.animation').addClass('animation--ready'); /* Запускаем это всё только есть JS отработал */

    var scrolled = 0;

    function scrollingAnimation() {
        if (animations.length) { /* если ещё остались непоказанные элементы */
            scrolled = $(window).scrollTop()
            animations.map(function (item, i) {
                if (scrolled > item.scroll + startOffset) {
                    item.element.addClass('animation--completed');
                    animations.splice(i, 1); /* Удаляем за ненадобностью */
                }
            })
        }
    }

    $(document).ready(scrollingAnimation);
    $(window).on('scroll', scrollingAnimation);


    /* Contacts */

    $('.contact__submit').on('click', function (event) {
        event.preventDefault();
    });

})(jQuery);
