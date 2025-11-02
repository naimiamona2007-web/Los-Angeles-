// تهيئة الموقع
document.addEventListener("DOMContentLoaded", function () {
  // تهيئة الموسيقى
  initMusicPlayer();

  // تهيئة شاشة التحميل
  initLoader();

  // تهيئة شريط التنقل
  initNavigation();

  // تهيئة تأثيرات التمرير
  initScrollEffects();

  // تهيئة الأزرار التفاعلية
  initInteractiveButtons();

  // تهيئة تأثيرات الظهور
  initAnimations();

  // تحديث إحصائيات اللاعبين
  updatePlayerStats();
});

// مشغل الموسيقى
function initMusicPlayer() {
  const music = document.getElementById("backgroundMusic");
  const toggleBtn = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const volumeSlider = document.getElementById("volumeSlider");

  // تشغيل/إيقاف الموسيقى
  toggleBtn.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      musicIcon.className = "fas fa-pause";
      toggleBtn.style.background = "var(--accent)";
    } else {
      music.pause();
      musicIcon.className = "fas fa-play";
      toggleBtn.style.background = "var(--gradient)";
    }
  });

  // التحكم في الصوت
  volumeSlider.addEventListener("input", function () {
    music.volume = this.value / 100;
  });

  // تشغيل الموسيقى تلقائياً بعد تحميل الصفحة
  setTimeout(() => {
    music.volume = 0.5;
    music.play().catch((e) => {
      console.log("التشغيل التلقائي للموسيقى متوقف: ", e);
    });
  }, 3000);
}

// شاشة التحميل
function initLoader() {
  const loader = document.querySelector(".loader");

  // إخفاء شاشة التحميل بعد 3 ثواني
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";

      // إظهار تأثيرات دخول المحتوى
      document.body.classList.add("loaded");
    }, 500);
  }, 3000);
}

// شريط التنقل
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // تبديل قائمة الهاتف
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // إغلاق القائمة عند النقر على رابط
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // تغيير لون الشريط عند التمرير
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });
}

// تأثيرات التمرير
function initScrollEffects() {
  // التمرير السلس للروابط
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // تحديث الروابط النشطة أثناء التمرير
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// الأزرار التفاعلية
function initInteractiveButtons() {
  // نسخ عنوان السيرفر
  const copyButtons = document.querySelectorAll(".btn-copy, .btn-copy-ip");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const ip = this.getAttribute("data-ip") || "51.75.79.54:7016";

      navigator.clipboard
        .writeText(ip)
        .then(() => {
          // تغيير النص مؤقتاً
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
          this.style.background = "var(--success)";

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = "";
          }, 2000);
        })
        .catch((err) => {
          console.error("فشل في نسخ النص: ", err);
          alert("تعذر نسخ العنوان. يرجى النسخ يدوياً: " + ip);
        });
    });
  });

  // تأثيرات hover للبطاقات
  const cards = document.querySelectorAll(".feature-card, .stat-card, .step");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// تأثيرات الظهور
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // إضافة تأثير تأخير للعناصر المتعددة
        if (entry.target.classList.contains("feature-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            0.1;
          entry.target.style.transitionDelay = delay + "s";
        }
      }
    });
  }, observerOptions);

  // مراقبة العناصر لإضافة تأثيرات الظهور
  const animatedElements = document.querySelectorAll(
    ".feature-card, .stat-card, .step, .about-feature, .server-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// تحديث إحصائيات اللاعبين
function updatePlayerStats() {
  const playerElements = document.querySelectorAll(
    ".players-online, .player-count span"
  );

  // محاكاة تغيير عدد اللاعبين (يمكن استبدالها ببيانات حقيقية من السيرفر)
  let playerCount = 360;

  setInterval(() => {
    // تغيير عشوائي بسيط في عدد اللاعبين لمحاكاة الواقع
    const change = Math.floor(Math.random() * 10) - 3; // -3 إلى +6
    playerCount = Math.max(350, Math.min(500, playerCount + change));

    playerElements.forEach((element) => {
      if (element.classList.contains("players-online")) {
        element.textContent = `${playerCount}/500`;
      } else {
        element.textContent = `${playerCount}+ لاعب متصل`;
      }
    });
  }, 10000); // تحديث كل 10 ثواني
}

// تأثيرات إضافية للخلفية
function createBackgroundEffects() {
  const heroSection = document.querySelector(".hero");
  const floatingContainer = document.querySelector(".floating-elements");

  // إنشاء جسيمات إضافية
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
    floatingContainer.appendChild(particle);
  }
}

// تهيئة تأثيرات إضافية بعد تحميل الصفحة
window.addEventListener("load", function () {
  createBackgroundEffects();

  // إضافة نمط للجسيمات العائمة
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .loaded .hero-title {
            animation: fadeIn 1s ease;
        }
        
        .loaded .hero-description {
            animation: fadeIn 1s ease 0.3s both;
        }
        
        .loaded .hero-actions {
            animation: fadeIn 1s ease 0.6s both;
        }
    `;
  document.head.appendChild(style);
});

// تحديث الوقت في قسم الانضمام
function updateCountdown() {
  const timerElement = document.querySelector(".countdown-timer .timer");

  setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    if (timerElement) {
      const timeUnits = timerElement.querySelectorAll(".time-number");
      if (timeUnits.length >= 2) {
        timeUnits[0].textContent = "360"; // عدد اللاعبين
        timeUnits[1].textContent = "140"; // الأماكن المتبقية
      }
    }
  }, 1000);
}

// تشغيل تحديث الوقت
updateCountdown();
