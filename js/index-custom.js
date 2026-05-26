WebFont.load({
  google: {
    families: [
      "Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
      "Montserrat Alternates:100,100italic,200,300,300italic,regular,500,600,700,800,900",
      "Poppins:200,300,regular,500,600,700,800,900",
    ],
  },
});

!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  ((n.className += t + "js"),
    ("ontouchstart" in o ||
      (o.DocumentTouch && c instanceof DocumentTouch)) &&
    (n.className += t + "touch"));
})(window, document);

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".caseStudySwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: false,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const originalWrapper = document.querySelector(".l-scroll__wrapper");
  const track = document.querySelector(".l-scroll__track");

  if (track && !track.dataset.cloned) {
    const clone = track.cloneNode(true);
    originalWrapper.appendChild(clone);
    track.dataset.cloned = "true";
  }

  function handleMobileLogic() {
    if (!originalWrapper) return;
    const mobileClone = document.querySelector(".reverse-mobile");
    const isMobile = window.innerWidth <= 767;

    if (isMobile && !mobileClone) {
      const reverseWrapper = originalWrapper.cloneNode(true);
      reverseWrapper.classList.add("reverse-mobile");
      reverseWrapper.style.marginTop = "20px";
      originalWrapper.parentNode.appendChild(reverseWrapper);
    } else if (!isMobile && mobileClone) {
      mobileClone.remove();
    }
  }

  handleMobileLogic();
  window.addEventListener("resize", handleMobileLogic);

  // Mobile Burger Menu Toggle
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }

  document.querySelectorAll(".wistia-lazy").forEach((el) => {
    el.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        const id = el.dataset.embed;
        const paddingTop = el.dataset.padding || "56.25%";
        if (!id) return;

        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.paddingTop = paddingTop;
        wrapper.style.backgroundColor = "#000";

        const iframe = document.createElement("iframe");
        iframe.src = `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&videoFoam=true`;
        iframe.title = "Video Player";
        iframe.allow = "autoplay; fullscreen; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        wrapper.appendChild(iframe);
        el.replaceWith(wrapper);
      },
      { once: true }
    );
  });
});
