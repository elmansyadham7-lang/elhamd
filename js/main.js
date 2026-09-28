/**
 * شركة الحمد للجبس بورد والأسقف المعلقة
 * Al-Hamd Gypsum Board & Ceilings - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Config: Target WhatsApp Number
  const WHATSAPP_PHONE = "201553316861"; // Egypt country code format

  // ==========================================
  // 1. Sticky Navbar & Active Navigation
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // ScrollSpy
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navLinksContainer.classList.contains('open')) {
        mobileToggle.innerHTML = '✕';
      } else {
        mobileToggle.innerHTML = '☰';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // ==========================================
  // 2. Pricing Table Filter
  // ==========================================
  const priceFilterBtns = document.querySelectorAll('.pricing-filter-btn');
  const priceRows = document.querySelectorAll('.pricing-table tbody tr');

  priceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      priceRows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 3. Portfolio / Gallery Filter & Lightbox
  // ==========================================
  const galleryFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxWhatsappBtn = document.getElementById('lightboxWhatsappBtn');

  // Filter items
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const desc = item.querySelector('.gallery-desc')?.textContent || '';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;

        if (lightboxWhatsappBtn) {
          const msg = encodeURIComponent(`مرحباً شركة الحمد، استفسر عن تصميم مشابه لهذا العمل في معرضكم: "${title}". أود معرفة التكلفة وإمكانية المعاينة.`);
          lightboxWhatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
        }

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Lightbox
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ==========================================
  // 4. Interactive Price Calculator
  // ==========================================
  const calcCeilingType = document.getElementById('calcCeilingType');
  const calcAreaSlider = document.getElementById('calcAreaSlider');
  const calcAreaInput = document.getElementById('calcAreaInput');
  const calcAddonCove = document.getElementById('calcAddonCove');
  const calcAddonLed = document.getElementById('calcAddonLed');
  const calcAddonWood = document.getElementById('calcAddonWood');
  
  const calcTotalPriceDisplay = document.getElementById('calcTotalPrice');
  const calcSummaryType = document.getElementById('calcSummaryType');
  const calcSummaryArea = document.getElementById('calcSummaryArea');
  const calcSummaryAddons = document.getElementById('calcSummaryAddons');
  const calcSummaryDuration = document.getElementById('calcSummaryDuration');
  const calcBookBtn = document.getElementById('calcBookBtn');

  // Rates definition (Min and Max)
  const RATES = {
    'white': { name: 'جبس بورد أبيض عادي', min: 280, max: 320, unit: 'م²' },
    'green': { name: 'جبس بورد أخضر مقاوم للرطوبة', min: 320, max: 370, unit: 'م²' },
    'red': { name: 'جبس بورد أحمر مقاوم للحريق', min: 350, max: 400, unit: 'م²' },
    'labor': { name: 'مصنعية فقط بدون خامات', min: 120, max: 150, unit: 'م²' },
    'grid': { name: 'بلاطات أسقف معلقة 60×60', min: 220, max: 280, unit: 'م²' },
    'tv_unit': { name: 'تأسيس مكتبة شاشة وديكور حائط', min: 2500, max: 3500, unit: 'وحدة', isFixed: true }
  };

  function updateCalculator() {
    if (!calcCeilingType || !calcAreaSlider) return;

    const selectedKey = calcCeilingType.value;
    const rateData = RATES[selectedKey] || RATES['white'];
    const area = parseFloat(calcAreaInput.value) || 0;

    let minTotal = 0;
    let maxTotal = 0;

    if (rateData.isFixed) {
      // For TV unit, area input acts as number of units
      const units = Math.max(1, Math.round(area / 10)); // normalized unit
      minTotal = rateData.min * units;
      maxTotal = rateData.max * units;
    } else {
      minTotal = rateData.min * area;
      maxTotal = rateData.max * area;
    }

    // Addons
    const activeAddons = [];
    if (calcAddonCove && calcAddonCove.checked) {
      // Estimated cove length roughly 60% of area in meters
      const estCoveMeters = Math.round(area * 0.7);
      minTotal += estCoveMeters * 180;
      maxTotal += estCoveMeters * 220;
      activeAddons.push('بيت نور مخفي');
    }

    if (calcAddonLed && calcAddonLed.checked) {
      minTotal += area * 50;
      maxTotal += area * 70;
      activeAddons.push('تأسيس إضاءة LED وسبوت');
    }

    if (calcAddonWood && calcAddonWood.checked) {
      minTotal += 1200;
      maxTotal += 1800;
      activeAddons.push('بديل خشب/رخام');
    }

    // Update UI numbers
    const formatNum = (num) => num.toLocaleString('ar-EG');
    if (calcTotalPriceDisplay) {
      calcTotalPriceDisplay.textContent = `${formatNum(Math.round(minTotal))} - ${formatNum(Math.round(maxTotal))} ج.م`;
    }

    if (calcSummaryType) calcSummaryType.textContent = rateData.name;
    if (calcSummaryArea) {
      calcSummaryArea.textContent = rateData.isFixed ? `${Math.max(1, Math.round(area / 10))} وحدة` : `${area} م²`;
    }
    if (calcSummaryAddons) {
      calcSummaryAddons.textContent = activeAddons.length > 0 ? activeAddons.join(' + ') : 'بدون إضافات';
    }

    // Estimated duration calculation
    let days = 2;
    if (area > 30) days = 3;
    if (area > 60) days = 4;
    if (area > 100) days = 6;
    if (calcSummaryDuration) {
      calcSummaryDuration.textContent = `${days} - ${days + 2} أيام عمل تقريباً`;
    }

    // Update WhatsApp CTA button href with custom quote message
    if (calcBookBtn) {
      const addonsText = activeAddons.length > 0 ? ` الإضافات: [${activeAddons.join(', ')}].` : '';
      const message = `مرحباً شركة الحمد للجبس بورد 🌟%0A` +
        `أرغب في حجز معاينة مجانية بناءً على حاسبة التكلفة في الموقع:%0A` +
        `📌 نوع العمل: ${rateData.name}%0A` +
        `📐 المساحة التقديرية: ${area} م²%0A` +
        `${addonsText}%0A` +
        `💰 التكلفة المقدرة: من ${Math.round(minTotal)} إلى ${Math.round(maxTotal)} جنيه مصري.%0A` +
        `يرجى التواصل لتحديد موعد المعاينة. شكراً لكم!`;

      calcBookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
    }
  }

  // Sync Slider and Number Input
  if (calcAreaSlider && calcAreaInput) {
    calcAreaSlider.addEventListener('input', () => {
      calcAreaInput.value = calcAreaSlider.value;
      updateCalculator();
    });

    calcAreaInput.addEventListener('input', () => {
      let val = parseFloat(calcAreaInput.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 500) val = 500;
      calcAreaSlider.value = val;
      updateCalculator();
    });
  }

  if (calcCeilingType) {
    calcCeilingType.addEventListener('change', updateCalculator);
  }

  [calcAddonCove, calcAddonLed, calcAddonWood].forEach(addon => {
    if (addon) {
      addon.addEventListener('change', () => {
        addon.closest('.calc-addon-item')?.classList.toggle('selected', addon.checked);
        updateCalculator();
      });
    }
  });

  // Initial calculation run
  updateCalculator();

  // ==========================================
  // 5. Contact Form Submission Handling
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('clientName')?.value || '';
      const phone = document.getElementById('clientPhone')?.value || '';
      const service = document.getElementById('clientService')?.value || 'استفسار عام';
      const address = document.getElementById('clientAddress')?.value || '';
      const notes = document.getElementById('clientNotes')?.value || '';

      if (!name || !phone) {
        showToast('يرجى كتابة الاسم ورقم الهاتف للتواصل معك');
        return;
      }

      // Build message for WhatsApp direct dispatch
      const msg = `طلب معاينة جديد من موقع شركة الحمد:%0A` +
        `👤 الاسم: ${name}%0A` +
        `📱 الهاتف: ${phone}%0A` +
        `🛠️ الخدمة المطلوبة: ${service}%0A` +
        `📍 العنوان / المحافظة: ${address}%0A` +
        `📝 ملاحظات إضافية: ${notes || 'لا يوجد'}`;

      showToast('جارٍ توجيهك إلى واتساب لإتمام الحجز...');
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
        contactForm.reset();
      }, 1000);
    });
  }

  // ==========================================
  // 6. Copy Phone Helper & Toast
  // ==========================================
  window.copyPhone = function(phoneNumber, event) {
    if (event) event.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast(`تم نسخ رقم الهاتف (${phoneNumber}) بنجاح!`);
      }).catch(() => {
        showToast(`رقم الهاتف: ${phoneNumber}`);
      });
    } else {
      showToast(`رقم الهاتف: ${phoneNumber}`);
    }
  };

  function showToast(text) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>🔔</span> <span>${text}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
