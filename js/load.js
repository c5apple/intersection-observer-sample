(function () {
  /**
   * 遅延ロード
   */
  var loading = function (img) {
    var src_val = img.getAttribute('data-src');
    if (src_val) {
      img.src = src_val;
      img.onload = function () {
        this.removeAttribute('data-src');
      };
    }
  };
  var element = document.querySelectorAll('img[data-src]');

  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loading(entry.target);
        io.unobserve(entry.target);
      });
    }, {
        rootMargin: "100px 0px"
      });
    element.forEach(e => {
      io.observe(e);
    });
  } else {
    Array.prototype.slice.call(element, 0).forEach(function (e) {
      loading(e);
    });
  }
})();