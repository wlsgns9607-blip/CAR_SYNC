// 슬라이드 스크롤에 따라 상단 목차의 현재 위치를 표시합니다.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".slide-nav a"));
  var targets = links
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || targets.length === 0) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = links.find(function (l) {
          return l.getAttribute("href") === "#" + entry.target.id;
        });
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  targets.forEach(function (t) { observer.observe(t); });
})();
