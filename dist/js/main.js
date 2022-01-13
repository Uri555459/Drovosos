document.addEventListener("DOMContentLoaded", function (event) {
	// !=============== Hover card ===========================
	const servicesItem = document.querySelectorAll('.services__item');
	const servicesItemBtn = document.querySelectorAll('.services__item-btn');
	for (let i = 0; i < servicesItem.length; i++) {
		servicesItemBtn[i].addEventListener('mouseover', servicesItemHover);
		servicesItemBtn[i].addEventListener('mouseout', servicesItemHoverOut);
	}
	function servicesItemHover(e) {
		let target = e.target;
		for (let i = 0; i < servicesItem.length; i++) {
			servicesItem[i].classList.remove('active');
		}
		if (target.classList.contains('hover')) {
			target.parentNode.classList.add('active');
		}
	}
	function servicesItemHoverOut(e) {
		for (let i = 0; i < servicesItem.length; i++) {
			servicesItem[i].classList.remove('active');
		}
	}
	// !================= Resize window =================
	$(window).resize(function () {
		let width = document.documentElement.clientWidth;
		if (width > 1024) {
			for (let i = 0; i < servicesItemBtn.length; i++) {
				servicesItemBtn[i].classList.add('hover');
			}
		}
		else {
			for (let i = 0; i < servicesItemBtn.length; i++) {
				servicesItemBtn[i].classList.remove('hover');
			}
		}
	});
	if (document.documentElement.clientWidth > 1024) {
		for (let i = 0; i < servicesItemBtn.length; i++) {
			servicesItemBtn[i].classList.add('hover');
		}
	}
	else {
		for (let i = 0; i < servicesItemBtn.length; i++) {
			servicesItemBtn[i].classList.remove('hover');
		}
	}
	// !======================== Scroll =====================
	$('a[data-target^="anchor"]').bind('click.smoothscroll', function () {
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top;
		$('body, html').animate({ scrollTop: bl_top }, 700);
		return false;
	});

	// !==================== Mobile menu =====================
	const mobileMenu = document.querySelector('.header__burger-menu');
	const menu = document.querySelector('.nav');
	const closeMenu = document.querySelector('.header__close-menu');
	const menuItem = document.querySelectorAll('.nav__list li a');
	mobileMenu.addEventListener('click', () => {
		menu.classList.add('active');
	});
	closeMenu.addEventListener('click', () => {
		menu.classList.remove('active');
	});
	// !==================== Mobile menu close tab link =====================
	for (let i = 0; i < menuItem.length; i++) {
		menuItem[i].addEventListener('click', () => {
			menu.classList.remove('active');
		});
	}

	// !============================== Popup form =======================================

	const requestCallButtons = document.querySelectorAll('.request-call');
	const servicesCallButtons = document.querySelectorAll('.services-call');
	const equipmentRentalCallButtons = document.querySelectorAll('.equipment-rental-call');
	const popupFormOverlay = document.querySelector('.popup-form__overlay');
	const popupFormCloseBtn = document.querySelector('.popup-form__close');
	// *==================== Заголовки писем ==================
	const tema1 = document.querySelector('.tema1');
	const tema2 = document.querySelector('.tema2');
	const tema3 = document.querySelector('.tema3');

	// !=========== Заказать звонок Header and Footer
	requestCallButtons.forEach(item => {
		item.addEventListener('click', () => {
			tema2.parentNode.removeChild(tema2);
			tema3.parentNode.removeChild(tema3);
			popupFormOverlay.classList.add('active');
			document.body.style.overflow = 'hidden';
		});
	});
	// !=========== Заказать звонок Аренда спецтехники
	equipmentRentalCallButtons.forEach(item => {
		item.addEventListener('click', () => {
			tema1.parentNode.removeChild(tema1);
			tema2.parentNode.removeChild(tema2);
			popupFormOverlay.classList.add('active');
			document.body.style.overflow = 'hidden';
		});
	});
	// !=========== Заказать звонок Наши услуги
	servicesCallButtons.forEach(item => {
		item.addEventListener('click', () => {
			tema1.parentNode.removeChild(tema1);
			tema3.parentNode.removeChild(tema3);
			popupFormOverlay.classList.add('active');
			document.body.style.overflow = 'hidden';
		});
	});

	function popupFormClose() {
		document.body.style.overflow = 'auto';
		popupFormOverlay.classList.remove('active');
		form.prepend(tema1)
		form.prepend(tema2)
		form.prepend(tema3)
	}

	popupFormCloseBtn.addEventListener('click', popupFormClose);

	// !===================== Mask input =======================
	$("#phone").mask("+7 (999) 999-9999");

	// !==================== Form submit ==================
	const form = document.querySelector('.form');
	const popupFormSuccess = document.querySelector('.popup-form__success');
	//E-mail Ajax Send
	$(".form").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			// Done Functions
			form.classList.add('hidden');
			popupFormSuccess.classList.add('active');
			setTimeout(() => {
				popupFormOverlay.classList.remove('active');
				document.body.style.overflow = 'auto';
				form.prepend(tema1)
				form.prepend(tema2)
				form.prepend(tema3)
			}, 3000);
			setTimeout(() => {
				form.classList.remove('hidden');
				popupFormSuccess.classList.remove('active');
			}, 4000);
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	// !===================== Slider
	$('.slider').slick({
		arrows: false,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					dots: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					dots: true
				}
			}
		]
	});

	// !================ Fancibox ======================
	$(".privacy-policy").fancybox({
		'width': '100%',
		'height': '100%',
		'autoScale': false,
		'transitionIn': 'none',
		'transitionOut': 'none',
		'type': 'iframe'
	});

});