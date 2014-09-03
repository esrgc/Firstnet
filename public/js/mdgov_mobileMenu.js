(function ($) {

    //var privateFunction = function () {}

    var methods = {
        init: function (options) {

            // Repeat over each element in selector
            return this.each(function () {

                var $this = $(this);

                // Attempt to grab saved settings, if they don't exist we'll get "undefined".
                var settings = $this.data('mdgov_mobileMenu');

                // If we could't grab settings, create them from defaults and passed options
                if (typeof (settings) == 'undefined') {
                    var defaults = {
                        slideToElement: true,
                        collapsingElementClass: 'subNavWrapper',
                        useIcons: false,
                        mobileBreakPoint: 768
                    }
                    settings = $.extend({}, defaults, options);
                    $this.data('mdgov_mobileMenu', settings);
                } else {
                    settings = $.extend({}, settings, options);
                    $this.data('mdgov_mobileMenu', settings);
                }

                // Iterative Plugin Code
                if ($(window).width() < settings.mobileBreakPoint) {

                    // Initialize
                    var $toggleEl = $('#' + $this.data('target') + ' .' + settings.collapsingElementClass);

                    // Put an anchor inside element
                    var $link = $this.wrapInner('<a href="#" class="mobileButton" />');

                    // Hide toggle element
                    $toggleEl.addClass('hidden-accessible');

                    // Add icon
                    if (settings.useIcons) {
                        $link.addClass('clearfix');
                        $link.wrapInner('<span style="float: left;width: 85%"/>');
                        $link.append('<i style="float: right;"></i>');
                        var $iconEl = $link.find('i');
                        methods.swapIcon($toggleEl, $iconEl);
                    }

                    $link.click(function (e) {
                        e.preventDefault();
                        $toggleEl.toggleClass('hidden-accessible').promise().done(function () {
                            if (settings.useIcons) {
                                methods.swapIcon($toggleEl, $link.find('i'));
                            }
                            if (settings.slideToElement && !$toggleEl.hasClass('hidden-accessible')) {
                                $('html, body').animate({ scrollTop: ($this.offset().top - 20) }, 100);
                            }
                        });
                    });

                }

            });
        },

        swapIcon: function (elToCheck, iconEl) {
            if (elToCheck.is(':hidden')) {
                iconEl.removeClass('icon-double-angle-up').addClass('icon-double-angle-down');
            } else {
                iconEl.removeClass('icon-double-angle-down').addClass('icon-double-angle-up');
            }
        },

        destroy: function () {

            return $(this).each(function () {
                var $this = $(this),
                settings = $this.data('mdgov_mobileMenu');
                if (typeof (settings) != 'undefined') {
                    var $link = $this.find('a');
                    $link.replaceWith($link.text());
                    $this.unbind('click');
                    $('#' + $this.data('target') + ' .' + settings.collapsingElementClass).removeClass('hidden-accessible');
                    $this.removeData('mdgov_mobileMenu');
                }
            });

        },

        val: function (options) {
            return this.eq(0).html();
        }

    };

    $.fn.mdgov_mobileMenu = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mdgov_mobileMenu');
            return this;
        }

        return method.apply(this, arguments);

    }

})(jQuery);