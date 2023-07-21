(function($) {

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

    //init и re-init
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

    //run
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


    /* Init magnific popup */

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false
    });


    /* Contacts */

    $('.contact__submit').on('click', function (event) {
        event.preventDefault();
        const $this = $(this);
        const $form = $this.parents('.contact');
        const $alert = Math.random() < 0.5 ? $form.siblings('.inner-alert--success') : $form.siblings('.inner-alert--danger');
        let formWidth = $form.outerWidth();
        let formHeight = $form.outerHeight();

        if ( !$this.hasClass('button--loading') ) {
            $this.addClass('button--loading');
            setTimeout(function () {
                $this.removeClass('button--loading');
                $form.hide();
                $alert.show();
                $alert.css('width', formWidth);
                $alert.css('height', formHeight);
            }, 500);
        }
    });

    $('.inner-alert__action').on('click', function () {
        $(this).parents('.inner-alert').hide();
        $(this).parents('.inner-alert').siblings('.contact').show();
    });

    $('.mfp-close').on('click', function () {
        $('.contact').show();
        $('.inner-alert').hide();
    });

})(jQuery);
