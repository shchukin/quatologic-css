(function($) {

    /* Detect macOS */
    // For some reason macOS changes colors on video files, so they don't match with background
    // We should ideally fix video files: https://stackoverflow.com/questions/63686800/color-variations-in-video-html5
    // but for now let's just change few backgrounds on macOS

    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
        $('html').addClass('macos');
    }


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


    /* Anchors */

    // Calculate header height. If it's fixed, our anchors distance should be 80px less (header height)
    const $header = $('.header__fixed-bar');
    let headerHeight = 0;

    function initAnchorsOffest() {
        headerHeight = $header.css('position') === 'fixed' ? $header.outerHeight() : 0;
    }

    $(document).ready(initAnchorsOffest);
    $(window).on('resize', initAnchorsOffest);

    // set offest

    const anchorsOffset = 40;

    // run anchors
    $(".anchor").on('click', function () {
        $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top - anchorsOffset - headerHeight}, 800);
        return true;
    });


    /* Scroll animations */

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
        const $inputs = $form.find('.input__widget');
        const $alert = Math.random() < 0.5 ? $form.siblings('.inner-alert--success') : $form.siblings('.inner-alert--danger');
        let formHeight = $form.outerHeight();

        if ( !$this.hasClass('button--loading') ) {
            $this.addClass('button--loading');
            $inputs.attr('disabled', true);
            setTimeout(function () {
                $this.removeClass('button--loading');
                $inputs.attr('disabled', false);
                $form.hide();
                $alert.show();
                $alert.css('height', formHeight);
            }, 1500);
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
