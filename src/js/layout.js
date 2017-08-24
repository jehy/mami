const $ = require('jquery');

window.$ = $;
window.jQuery = $;

$(document).ready(() => {
  const AFFIX_TOP_LIMIT = 300;
  const AFFIX_OFFSET = 49;

  let $menu = $('#menu'),
    $btn = $('#menu-toggle');

  $('#menu-toggle').on('click', () => {
    $menu.toggleClass('open');
    return false;
  });


  $('.docs-nav').each(function () {
    let $affixNav = $(this),
      $container = $affixNav.parent(),
      affixNavfixed = false,
      originalClassName = this.className,
      current = null,
      $links = $affixNav.find('a');

    function getClosestHeader(top) {
      let last = $links.first();

      if (top < AFFIX_TOP_LIMIT) {
        return last;
      }

      for (let i = 0; i < $links.length; i++) {
        let $link = $links.eq(i),
          href = $link.attr('href');

        if (href.charAt(0) === '#' && href.length > 1) {
          const $anchor = $(href).first();

          if ($anchor.length > 0) {
            const offset = $anchor.offset();

            if (top < offset.top - AFFIX_OFFSET) {
              return last;
            }

            last = $link;
          }
        }
      }
      return last;
    }


    $(window).on('scroll', (evt) => {
      let top = window.scrollY,
        height = $affixNav.outerHeight(),
        maxBottom = $container.offset().top + $container.outerHeight(),
        bottom = top + height + AFFIX_OFFSET;

      if (affixNavfixed) {
        if (top <= AFFIX_TOP_LIMIT) {
          $affixNav.removeClass('fixed');
          $affixNav.css('top', 0);
          affixNavfixed = false;
        } else if (bottom > maxBottom) {
          $affixNav.css('top', (maxBottom - height) - top);
        } else {
          $affixNav.css('top', AFFIX_OFFSET);
        }
      } else if (top > AFFIX_TOP_LIMIT) {
        $affixNav.addClass('fixed');
        affixNavfixed = true;
      }

      const $current = getClosestHeader(top);

      if (current !== $current) {
        $affixNav.find('.active').removeClass('active');
        $current.addClass('active');
        current = $current;
      }
    });
  });

  // prettyPrint();
});
