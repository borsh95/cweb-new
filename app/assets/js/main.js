"use strict";
(function (window) {
	const breakPoint = {
		desctop: 1920,
		desctopMid: 1450,
		desctopMin: 1220,
		table: 1070,
		mobile: 768,
		tel: 480,
	}

	// mobile menu
	if (isElem('.mobile-menu')) {
		const mobileMenu = document.querySelector('.mobile-menu');

		broMenu(mobileMenu).init();
	}

	if (isElem('.services-menu')) {
		const servicesMenu = document.querySelector('.services-menu');

		broMenu(servicesMenu, {
			nextBtn: '.bro-menu__next',
			arrow: `
		<svg width="25" height="25" viewBox="0 0 19 19">
		<path d="M0.735916 9.50004C0.735916 4.65975 4.65975 0.735918 9.50004 0.735918C14.3403 0.735918 18.2642 4.65975 18.2642 9.50004C18.2642 14.3403 14.3403 18.2642 9.50004 18.2642C4.65975 18.2642 0.735916 14.3403 0.735916 9.50004Z" fill="inherit"/>
		<path d="M0 9.5C0 14.7379 4.26138 19 9.5 19C14.7379 19 19 14.7379 19 9.5C19 4.26138 14.7379 0 9.5 0C4.26138 0 0 4.26138 0 9.5ZM17.5283 9.5C17.5283 13.927 13.927 17.5283 9.5 17.5283C5.07304 17.5283 1.47172 13.927 1.47172 9.5C1.47172 5.07304 5.07378 1.47172 9.5 1.47172C13.927 1.47172 17.5283 5.07304 17.5283 9.5Z" fill="inherit"/>
		<path d="M7.45432 5.29824C7.1688 5.58525 7.1688 6.04881 7.45432 6.33582L10.6112 9.49267L7.45432 12.6495C7.19014 12.9579 7.22621 13.4229 7.53451 13.6871C7.80971 13.9233 8.21666 13.9233 8.49186 13.6871L12.1712 10.0078C12.4567 9.72079 12.4567 9.25722 12.1712 8.97021L8.49186 5.29089C8.20267 5.00756 7.73909 5.01053 7.45432 5.29824Z" fill="currentColor"/>
		</svg>
		`
		}).init();
	}

	if (isElem('.b-tabs')) {
		const tabs = document.querySelectorAll('.b-tabs');

		for (const tab of tabs) {
			bTabs(tab);
		}
	}

	if (isElem('.accardion')) {
		const accardions = document.querySelectorAll('.accardion');
		const accardionPlagin = accardion();

		for (const item of accardions) {
			accardionPlagin().init(item);
		}
	}

	if (window.AOS && isElem('[data-aos]')) {
		AOS.init({
			//disable: "mobile",
			duration: 2000,
			offset: 200,
			once: true,
			anchorPlacement: 'bottom-bottom'
		});
	}

	if (isElem('.js-readmore')) {
		const $readmoreEls = document.querySelectorAll('.js-readmore');

		for (const $item of $readmoreEls) {

			let options = {
				visibleHeight: 170,
				moreBtnContent: `
						<svg width="19" height="11" viewBox="0 0 19 11">
						<path d="M8.54615 10.1431L0.224646 1.63837C-0.0478386 1.35973 -0.0473805 0.908587 0.226055 0.630406C0.499456 0.35244 0.942344 0.353158 1.21504 0.631843L9.04126 8.63037L16.8674 0.631555C17.1402 0.352907 17.5828 0.352188 17.8562 0.630119C17.9933 0.769568 18.0618 0.952258 18.0618 1.13495C18.0618 1.31717 17.9937 1.49914 17.8576 1.63834L9.53633 10.1431C9.40532 10.2773 9.22702 10.3526 9.04126 10.3526C8.85549 10.3526 8.6774 10.2771 8.54615 10.1431Z" fill="inherit"/>
						</svg>
					`,
				btnClasses: 'btn btn--secondary btn--circ',
			}

			readmore($item, options);
		}
	}

	/***** CUSTOM PLUGIN ******/
	document.addEventListener('click', function (e) {
		const $target = e.target;

		if ($target.closest('[data-copy]:not(.disabled)')) {
			const $dataCopyEl = $target.closest('[data-copy]');
			$dataCopyEl.classList.add('disabled');
			navigator.clipboard.writeText($dataCopyEl.dataset.copy);

			const notificationEl = document.createElement('div');
			notificationEl.className = 'copy-notification';
			notificationEl.textContent = 'Скопированно в буфер обмена';
			$dataCopyEl.append(notificationEl);

			let left = 0 + ($dataCopyEl.offsetWidth - notificationEl.offsetWidth) / 2;
			notificationEl.style.left = left + "px";

			// спозиционируем его сверху от аннотируемого элемента (top-center)
			let coordsNotify = notificationEl.getBoundingClientRect();
			const { top: coordTop, right: coordRight, bottom: coordBottom, left: coordLeft } = coordsNotify;

			if (coordLeft < 0) {
				notificationEl.style.left = "0px";
			}

			if (coordTop < 0) {
				notificationEl.style.top = "100%";
				notificationEl.style.bottom = "auto";
			}


			setTimeout(() => { notificationEl.classList.add('copy-notification--animated') }, 10);
			setTimeout(() => { notificationEl.classList.remove('copy-notification--animated') }, 2010);
			setTimeout(() => {
				notificationEl.remove();
				$dataCopyEl.classList.remove('disabled');
			}, 2500);
		}
	});

	//Hamburger
	(function () {
		const hamburgerBtn = document.querySelector('.header__hamburger');
		const burgerBlock = document.querySelector('.header__burger');
		const burgerInner = burgerBlock.querySelector('.header__burger-inner');
		const bodyEl = document.querySelector('body');
		const header = document.querySelector('header');

		hamburgerBtn.addEventListener('click', function () {
			this.classList.toggle('active');

			burgerBlock.style.top = header.offsetHeight - 1 + 'px';

			let isActive = this.classList.contains('active');
			burgerBlock.classList[isActive ? 'add' : 'remove']('open');
			burgerInner.style.maxHeight = (isActive) ? `calc(100vh - ${header.offsetHeight}px)` : '';
			bodyEl.style.overflow = (isActive) ? 'hidden' : '';
		});

		window.addEventListener('resize', function () {
			if (window.innerWidth > 970 && burgerBlock.classList.contains('open')) {
				hamburgerBtn.classList.remove('active');
				burgerBlock.classList.remove('open');
				bodyEl.style.overflow = '';
			}
		});

		burgerBlock.addEventListener('click', function (e) {
			if (!e.target.contains(burgerBlock)) return;

			hamburgerBtn.classList.remove('active');
			burgerBlock.classList.remove('open');
			bodyEl.style.overflow = '';
		});
	}());

	//fixed header
	if (isElem('header')) {
		let fixedHeader = showHeader('header');

		function showHeader(el) {
			const $el = (typeof el === 'string') ? document.querySelector(el) : el;
			const htmlEl = document.documentElement;
			let offsetTopEl = $el.getBoundingClientRect().height;

			window.addEventListener('scroll', function () {
				if (window.pageYOffset > offsetTopEl + 20) {
					show();
				} else {
					fixed();
				}
			})

			window.onresize = function () {
				offsetTopEl = $el.getBoundingClientRect().height;
			}

			function show() {
				if ($el.classList.contains('fixed')) return;

				if (window.innerWidth > 1024) {
					htmlEl.style.paddingTop = $el.offsetHeight + "px";
				} else {
					htmlEl.style.paddingTop = $el.offsetHeight + "px";
				}


				$el.classList.add('fixed');
			}

			function fixed() {
				if (!$el.classList.contains('fixed')) return;

				$el.classList.remove('fixed');
				htmlEl.style.paddingTop = '';
			}

			return {
				show,
				fixed,
			}
		}
	}

	// под меню с гамбургером внутри основного меню
	if (isElem('.menu__item--drop')) {
		const menuDrop = document.querySelector('.menu__item--drop');
		const toggle = menuDrop.querySelector('.menu__item-toggle');
		const linkbtn = menuDrop.querySelector('.menu__item-toggle ~ .menu__link');

		toggle.addEventListener('click', function () {
			toggle.classList.toggle('active');
			menuDrop.classList.toggle('active');
		});

		linkbtn.addEventListener('click', function (e) {
			e.preventDefault();
			toggle.classList.toggle('active');
			menuDrop.classList.toggle('active');
		});

		document.addEventListener('click', function (ev) {
			if (!ev.target.closest('.menu__item--drop')) {
				if (menuDrop.classList.contains('active')) {
					toggle.classList.remove('active');
					menuDrop.classList.remove('active');
				}
			}
		})
	}

	// main slider 
	if (isElem('.main-slider')) {
		const sliders = document.querySelectorAll('.main-slider');

		for (const slider of sliders) {
			new Swiper(slider, {
				effect: "coverflow",
				speed: 700,
				autoHeight: true,
				watchOverflow: true,
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				},
				navigation: {
					nextEl: slider.parentElement.querySelector('.slider-arr--next'),
					prevEl: slider.parentElement.querySelector('.slider-arr--prev'),
				},
			});
		}
	}

	// band slider
	if (isElem('.band-slider')) {
		const sliderBand = document.querySelector('.band-slider');

		const swiper = new Swiper(sliderBand, {
			grabCursor: true,
			loop: true,
			slidesPerView: "auto",
			spaceBetween: 32,
			slideToClickedSlide: true,
			centeredSlides: true,
			noSwipingSelector: 'button',
			speed: 500,

			breakpoints: {
				320: {
					spaceBetween: 10,
				},
				769: {
					slidesPerView: "auto",
					spaceBetween: 20,
				},
				1071: {
					slidesPerView: 3,
				},
				1221: {

				}
			},
			navigation: {
				nextEl: sliderBand.parentElement.querySelector('.slider-arr--next'),
				prevEl: sliderBand.parentElement.querySelector('.slider-arr--prev'),
			}
		});

		swiper.on('resize', function () {
			swiper.update();
		})
	}

	// reviews slider
	if (isElem('.reviews-slider')) {
		const reviewsSlider = document.querySelector('.reviews-slider');

		const swiper = slider(reviewsSlider, {
			slidesPerView: 3,
			spaceBetween: 35,
			speed: 700,
			grabCursor: true,
			breakpoints: {
				300: {
					autoHeight: true,
					slidesPerView: 'auto',
					slidesPerGroup: 1,
					spaceBetween: 25,
					centeredSlides: true,
				},
				481: {
					centeredSlides: true,
					spaceBetween: 25,
					slidesPerView: 'auto',
					slidesPerGroup: 1,
					slideToClickedSlide: false,
				},
				769: {
					centeredSlides: false,
					slideToClickedSlide: true,
					slidesPerView: 3,
					slidesPerGroup: 3,
				},
				[breakPoint.table]: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 30,
					autoHeight: true,
				}
			}
		});
	}

	if (isElem('.clients-slider')) {
		const slider = document.querySelector('.clients-slider');

		new Swiper(slider, {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 24,
			slideToClickedSlide: true,
			speed: 500,
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				769: {
					slidesPerView: 2,
				},
				1071: {
					slidesPerView: 3,
				}
			},
			navigation: {
				nextEl: slider.parentElement.querySelector('.slider-arr--next'),
				prevEl: slider.parentElement.querySelector('.slider-arr--prev'),
			},
		})
	}

	if (isElem('.info-slider')) {
		new Swiper('.info-slider', {
			enabled: false,
			slidesPerView: 1,
			spaceBetween: 100,
			breakpoints: {
				320: {
					enabled: true
				},
				1071: {
					enabled: false
				}
			},
			pagination: {
				el: document.querySelector('.info-slider-wrap .slider-pagination'),
				clickable: true,
			}
		})
	}

	// 	band slider 
	if (isElem('.cards-slider')) {
		let swiper = slider('.cards-slider', {
			grabCursor: true,
			slideToClickedSlide: true,
			breakpoints: {
				300: {
					enabled: true,
					centeredSlides: true,
					slidesPerView: 'auto',
				},
				[breakPoint.table + 1]: {
					enabled: false,
					centeredSlides: false,
					slidesPerView: 5,
				}
			}
		})
	}

	if (isElem(".twenty-b")) {
		$(".twenty-b").twentytwenty();
	}

	if (isElem('.gallery-slider')) {
		const slider = document.querySelector('.gallery-slider');

		const swiper = new Swiper(slider, {
			enabled: false,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 60,
					enabled: true,
				},
				769: {
					enabled: true,
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 30,
				},
				1071: {
					spaceBetween: 0,
					enabled: false,
				},
			},
			pagination: {
				el: slider.parentElement.querySelector('.slider-pagination'),
				clickable: true,
			}
		});

		swiper.on('resize', function () {
			swiper.update();
		});
	}

	if (isElem('.examples-work-slider')) {
		const sliderEl = document.querySelector('.examples-work-slider');

		const swiper = new Swiper(sliderEl, {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 32,
			autoHeight: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				769: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				1071: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				}
			},
			navigation: {
				prevEl: sliderEl.parentElement.querySelector('.slider-arr--prev'),
				nextEl: sliderEl.parentElement.querySelector('.slider-arr--next'),
			},
			pagination: {
				el: sliderEl.parentElement.querySelector('.slider-pagination'),
				clickable: true,
			}
		})
	}

	if (isElem('header .bro-menu')) {
		const $menu = document.querySelector('header .bro-menu');
		const menu = broMenu($menu);

		toggleMenu();

		window.addEventListener('resize', toggleMenu);

		function toggleMenu() {
			if (window.innerWidth < 1025) {
				menu.init();

			} else {
				menu.destroy();
			}
		}
	}

	// обработка событий на кнопок сайта
	// которые имеют атрибут data-btn-type
	if (isElem('[data-btn-type]')) {
		document.addEventListener('click', function (e) {
			if (!e.target.closest('[data-btn-type]')) {
				document.querySelector('[data-btn-type="toggleClass"].active')
					&& document.querySelector('[data-btn-type="toggleClass"].active').classList.remove('active');
			}

			if (e.target.closest('[data-btn-type]')) {
				const btn = e.target.closest('[data-btn-type]');

				if (btn.dataset.btnType === 'toggleClass') {
					if (document.querySelector('[data-btn-type="toggleClass"].active')) {
						document.querySelector('[data-btn-type="toggleClass"].active').classList.remove('active');
					}

					btn.classList.toggle('active');
				}
			}
		});
	}

	if (isElem('.drop')) {
		const dropElList = document.querySelectorAll('.drop');

		for (const dropEl of dropElList) {
			dropdown(dropEl);
		}
	}

	//показ окна статистики к блоке кейса
	if (isElem('.service-tool')) {
		let lastOpenEl;

		document.addEventListener('click', function (e) {
			const btn = e.target.closest('.service-tool__btn');

			if (lastOpenEl && lastOpenEl.classList.contains('active')) {
				lastOpenEl.classList.remove('active');
				lastOpenEl = null;
			}

			if (btn) {
				btn.classList.toggle('active');
				lastOpenEl = btn;
			}
		})
	}

	//v-modal
	if (document.querySelector('.v-modal')) {
		const modalEl = document.querySelector('.v-modal');
		const body = document.querySelector('body');
		const typeOpen = "openModal";
		const typeClose = 'closeModal';

		document.addEventListener('click', function (e) {
			const btn = e.target.closest('[data-button-type]');
			if (btn && btn.dataset.buttonType === typeOpen) {

				const scrollBarWidth = window.innerWidth - body.offsetWidth;

				e.preventDefault();
				modalEl.classList.add('active');

				body.style.overflow = 'hidden';
				body.style.paddingRight = scrollBarWidth + "px";
			}
			else if (e.target.classList.contains('v-modal__inner') || e.target.dataset.buttonType === typeClose) {
				modalEl.classList.remove('active');
				body.style.overflow = '';
				body.style.paddingRight = "";
			}
		});
	}

	if (document.querySelector('.js-label-file')) {
		for (const $uploader of document.querySelectorAll('.js-label-file')) {
			fileInput($uploader);
		}
	}

	// v-up кнопка вверх
	(function () {
		document.querySelector('body').insertAdjacentHTML('afterbegin', `
		<div class="v-up"></div>
	`);

		const btnDown = document.querySelector('.v-up');
		let vUpTriggerTimer = 0;

		vUp(btnDown, getScroledWindow);

		btnDown.addEventListener('click', function () {
			backToTop(-45, 0);
		});

		window.addEventListener('scroll', function () {
			clearTimeout(vUpTriggerTimer);
			vUpTriggerTimer = setTimeout(() => {
				vUp(btnDown, getScroledWindow);
			}, 200)
		});

		//пролистываине окна вверх при клике на кнопку
		function vUp(btn, scroled) {
			if (scroled() > (document.documentElement.clientHeight / 2)) {
				btn.classList.add('active');
			} else if (scroled() < (document.documentElement.clientHeight / 2) || btn.classList.contains('active')) {
				btn.classList.remove('active');
			}
		}

		//прокрутка окна вверх вниз
		function backToTop(interval, to) {
			if (window.pageYOffset <= to) return;

			window.scrollBy(0, interval);
			setTimeout(() => {
				backToTop(interval, to)
			}, 0);
		}

		//на сколько прокручено окно
		function getScroledWindow() {
			return window.pageYOffset || document.documentElement.scrollTop;
		}
	}());

	if (isElem('.portfolio-b')) {
		const filterCard = document.querySelectorAll('.portfolio-b .work-card');

		document.querySelector('.portfolio-b__categories').addEventListener('click', function (e) {
			const filterBtn = e.target.closest('[data-f]');

			if (filterBtn) {
				if (filterBtn.classList.contains('active')) return;

				document.querySelector('[data-f].active').classList.remove('active');
				filterBtn.classList.add('active');

				const filterClass = 'f-' + e.target.dataset['f'];

				for (const card of filterCard) {
					card.classList.remove('hide');

					if (!card.classList.contains(filterClass) && filterClass !== 'f-all') {
						card.classList.add('hide');
					}
				}
			}
		});

	}


	/*
	  FUNCTIONS PLUGINS	
	*/
	//slinky menu
	function broMenu(selector, options) {
		const $menu = typeof selector === "string" ? document.querySelector(selector) : selector;
		const $level_1 = $menu.lastElementChild;
		const $subMenuList = $menu.querySelectorAll('li > ul');
		const $subMenuLink = $menu.querySelectorAll('li > a');
		let activated;

		let defaulOptions = {
			nextBtn: '.bro-menu__next-arr',
			arrow: `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12.219 2.281L10.78 3.72 18.062 11H2v2h16.063l-7.282 7.281 1.438 1.438 9-9 .687-.719-.687-.719z" />
			</svg>
		`
		}

		Object.assign(defaulOptions, options);

		let $activeUl;
		let translate = 0;

		const method = {
			init() {
				if (activated) return;

				$menu.classList.add('bro-menu');

				for (let submenu of $subMenuList) {
					const link = submenu.parentElement.querySelector('li > a');
					link.classList.add('bro-menu__next');

					_addBtnBack(submenu, link);
					_addBtnNext(link);

					activated = true;
				}

				for (const $link of $subMenuLink) {
					$link.classList.add('active');
				}

				$menu.addEventListener('click', clickHandler);

				window.addEventListener('resize', _setHeighMenu);
			},

			destroy() {
				if (!activated) return;

				const $arrNodes = $menu.querySelectorAll('.bro-menu__arr');

				$menu.removeEventListener('click', clickHandler);
				window.removeEventListener('resize', _setHeighMenu);

				for (const $link of $menu.querySelectorAll('.link')) {
					if ($link.classList.contains('bro-menu__back')) {
						$link.closest('li').remove();
						continue;
					}

					for (const $arr of $arrNodes) {
						$arr.remove();
					}

					$link.classList.remove('link');
					$link.classList.remove('bro-menu__next');
				}

				$activeUl && $activeUl.classList.remove('active');

				$menu.style.height = '';
				$level_1.style.transform = ``;
				translate = 0;
				activated = false;
			}
		}

		function clickHandler(e) {
			const target = e.target;

			if (target.closest(defaulOptions.nextBtn)) {
				e.preventDefault();

				const $nestedMenu = target.closest('li').querySelector('ul');

				if ($activeUl) $activeUl.classList.remove('active');

				$nestedMenu.classList.add('active');
				$nestedMenu.style.visibility = 'visible';
				translate -= 100;

				$level_1.style.transform = `translateX(${translate}%)`;
				$activeUl = $nestedMenu;

				scrollToVisible($activeUl);
				_setHeighMenu();
			}
			else if (target.closest('.bro-menu__back')) {
				e.preventDefault();

				const $upperMenu = $activeUl.parentElement.closest('ul');
				$upperMenu.classList.add('active');

				$activeUl.style.visibility = '';

				translate += 100;

				$level_1.style.transform = `translateX(${translate}%)`;
				$activeUl.classList.remove('active');
				$activeUl = $upperMenu;
				_setHeighMenu();
			}
		}

		function _addBtnNext(elem) {
			elem.classList.add('link')
			elem.insertAdjacentHTML('beforeend', `
				<span class="bro-menu__next-arr">
					${defaulOptions.arrow}
				</span>
			`);

			elem.lastElementChild.classList.add('bro-menu__arr');
		}

		function _addBtnBack(elem, link) {
			const href = link.getAttribute('href');

			elem.insertAdjacentHTML('afterbegin', `
			<li>
				<a class="bro-menu__back link" ${(href) ? `href=${href}` : ''}>
					${defaulOptions.arrow}
					${link.textContent}
				</a>
			</li>
		`);
		}

		function _setHeighMenu() {
			if (!$activeUl) return;

			$menu.style.height = $activeUl.offsetHeight + "px";
		}

		function scrollToVisible(el) {
			if (_getPosAbsWindow(el) > window.pageYOffset) return;

			backToTop(-10, _getPos(el));
		}

		function _getPosAbsWindow(elem) {
			const offsetTop = elem.getBoundingClientRect().top;

			return offsetTop - window.pageYOffset;
		}

		function _getPos(el) {
			return el.getBoundingClientRect().top + window.pageYOffset;
		}

		function backToTop(interval, to) {
			if (window.pageYOffset <= to) return;

			window.scrollBy(0, interval);
			setTimeout(() => {
				backToTop(interval, to)
			}, 0);
		}

		return method;
	}

	function fileInput(fieldAreaSelector) {
		const $parent = typeof fieldAreaSelector === 'string' ? document.querySelector(fieldAreaSelector) : fieldAreaSelector;
		const input = $parent.querySelector('input');
		const $textContainer = $parent.querySelector('.js-label-file__text');

		input.addEventListener('change', function (e) {
			const filesCount = e.target.files.length;

			if (!filesCount) {
				e.preventDefault();
				return;
			}

			if (filesCount === 1) {
				const fileName = e.target.value.split('\\').pop();
				$textContainer.textContent = fileName;
			} else {
				$textContainer.textContent = `Выбрано файлов: ${filesCount}`;
			}
		})
	}

	// slider  
	function slider(selector, option = {}) {
		const $slider = (typeof selector === 'string') ? document.querySelector(selector) : selector;
		const $sliderWrap = $slider.closest('.slider-wrap');

		const setings = {
			navigation: $sliderWrap.querySelector('.slider-nav'),
			pagination: $sliderWrap.querySelector('.slider-pagination'),
			options: {
				watchOverflow: true,
				...option,
			}
		}

		Object.assign(setings.options, {
			watchSlidesVisibility: true,
			watchOverflow: true,
			autoplay: (+$slider.dataset.swiperAutoplay > 0) ? {
				delay: +$slider.dataset.swiperAutoplay,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			} : '',
			navigation: setings.navigation ? {
				nextEl: $sliderWrap.querySelector('.slider-arr--next'),
				prevEl: $sliderWrap.querySelector('.slider-arr--prev'),
			} : '',
			pagination: setings.pagination ? {
				el: $sliderWrap.querySelector('.slider-pagination'),
				clickable: true,
			} : '',
		})

		return new Swiper($slider, setings.options);
	}

	//accardion
	function accardion() {
		return function () {
			let _mainElement = {}, // .accordion 
				_items = {}, // .accordion-item 
				headerDom = document.querySelector('header');

			return {
				init: function (element) {
					_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
					_items = _mainElement.querySelectorAll('.accardion__item');
					_setupListeners(_mainElement, 'click', _clickHandler);
				}
			}

			function _clickHandler(e) {
				if (!e.target.closest('.accardion__item-header')) return;

				e.preventDefault();

				let header = e.target.closest('.accardion__item-header'),
					item = header.closest('.accardion__item'),
					itemActive = _getItem(_items, 'open');

				if (itemActive === undefined) {
					item.classList.add('open');
				} else {
					itemActive.classList.remove('open');

					if (itemActive !== item) {
						item.classList.add('open');

						scrollToVisible(item);
					}
				}
			}
		}

		function _setupListeners(elem, event, handler) {
			elem.addEventListener(event, handler);
		}

		function scrollToVisible(el) {
			if (_getPos(el) > window.pageYOffset) return;
			backToTop(-10, _getPos(el) - headerDom.offsetHeight - 30);
		}

		function _getPos(el) {
			return el.getBoundingClientRect().top + window.pageYOffset;
		}

		function _getItem(elements, className) {
			var element = undefined;
			elements.forEach(function (item) {
				if (item.classList.contains(className)) {
					element = item;
				}
			});
			return element;
		};

		function backToTop(interval, to) {
			if (window.pageYOffset <= to) return;

			window.scrollBy(0, interval);
			setTimeout(() => {
				backToTop(interval, to)
			}, 0);
		}
	}

	// bTabs
	function bTabs(target) {
		let _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
			_eventTabsShow,
			_showTab = function (tabsLinkTarget) {
				var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
				tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
				tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.b-tabs__link.active');
				tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.b-tabs__pane.active');
				// если следующая вкладка равна активной, то завершаем работу
				if (tabsLinkTarget === tabsLinkActive) return;
				// удаляем классы у текущих активных элементов
				if (tabsLinkActive !== null) tabsLinkActive.classList.remove('active');

				if (tabsPaneShow !== null) tabsPaneShow.classList.remove('active');
				// добавляем классы к элементам (в завимости от выбранной вкладки)
				tabsLinkTarget.classList.add('active');
				tabsPaneTarget.classList.add('active');
				document.dispatchEvent(_eventTabsShow);
			},
			_switchTabTo = function (tabsLinkIndex) {
				var tabsLinks = _elemTabs.querySelectorAll('.b-tabs__link');
				if (tabsLinks.length > 0) {
					if (tabsLinkIndex > tabsLinks.length) {
						tabsLinkIndex = tabsLinks.length;
					} else if (tabsLinkIndex < 1) {
						tabsLinkIndex = 1;
					}
					_showTab(tabsLinks[tabsLinkIndex - 1]);
				}
			};

		_eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

		_elemTabs.addEventListener('click', function (e) {
			var tabsLinkTarget = e.target;
			// завершаем выполнение функции, если кликнули не по ссылке
			if (!tabsLinkTarget.classList.contains('b-tabs__link')) return;

			e.preventDefault();
			_showTab(tabsLinkTarget);
		});

		return {
			showTab: function (target) {
				_showTab(target);
			},
			switchTabTo: function (index) {
				_switchTabTo(index);
			}
		}

	};

	//dropdown
	function dropdown(selector) {
		const $el = typeof selector === 'string' ? document.querySelector(selector)
			: selector,
			$btn = $el.querySelector('.drop-btn'),
			$content = $el.querySelector('.drop-content');

		$btn.addEventListener('click', function () {
			$el.classList.toggle('open');

			if ($el.classList.contains('open')) {
				$content.style.minHeight = $content.scrollHeight + 'px';
				setTimeout(function () {
					$content.style.overflow = 'visible';
				}, 320)
			} else {
				$content.style.minHeight = '';
				$content.style.overflow = '';
			}
		});

		window.addEventListener('resize', function () {
			if ($el.classList.contains('open')) {
				$content.style.minHeight = '';
				$content.style.minHeight = $content.scrollHeight + 'px';
			}
		})
	}

	// readmore js
	function readmore(selector, options = {}) {
		let $el = (typeof selector === 'string') ? document.querySelector(selector) : selector,
			$toggle;

		const baseClass = 'js-readmore';
		const sectionClass = baseClass + '-section';
		const expandedClass = sectionClass + '--expanded';
		const collapsedClass = sectionClass + '--collapsed';
		const disabledClass = sectionClass + '--disabled';
		const btnToggleClass = baseClass + '-toggle';
		const btnToggleMoreClass = btnToggleClass + '--more';
		let isExpanded = false;
		let isBtnInit = false;

		const settings = {
			visibleHeight: 200,
			positionToggle: 'inside',
			btnClasses: "",
			changeName: false,
			moreBtnContent: "Показать все",
			lessBtnContent: "Скрыть",
		}

		Object.assign(settings, options);

		settings.visibleHeight = parseFloat($el.dataset.readmoreHeight) || settings.visibleHeight;

		$el.className = $el.className + ` ${sectionClass}`;

		changeState();

		window.addEventListener('resize', changeState);

		function changeState() {
			if ($el.scrollHeight > settings.visibleHeight) {
				if (!isBtnInit) {
					isBtnInit = true;
					$toggle = createBtn();

					$toggle.addEventListener('click', handlerToggle);
				} else {
					$toggle.innerHTML = settings.moreBtnContent;
				}

				$el.style.maxHeight = settings.visibleHeight + 'px';
				$el.classList.add(collapsedClass);
				$el.classList.remove(disabledClass)
			} else {
				$el.classList.remove(expandedClass);
				$el.classList.remove(collapsedClass);
				$el.classList.add(disabledClass);
			}
		}

		function createBtn() {
			const $btn = document.createElement('button');
			$btn.innerHTML = settings.moreBtnContent;
			$btn.className = btnToggleClass + " " + btnToggleMoreClass;

			if (typeof settings.btnClasses === 'string') {
				$btn.className = settings.btnClasses + " " + $btn.className;
			}

			$el.insertAdjacentElement('afterend', $btn);

			return $btn;
		}

		function handlerToggle() {
			if (isExpanded) {
				isExpanded = false;
				$toggle.classList.add(btnToggleMoreClass);
				$el.classList.remove(expandedClass);
				$el.classList.add(collapsedClass);
				$el.style.maxHeight = settings.visibleHeight + 'px';

				if (!settings.changeName) return
				$toggle.innerHTML = settings.moreBtnContent;
			} else {
				isExpanded = true;
				$toggle.classList.remove(btnToggleMoreClass);
				$el.classList.add(expandedClass);
				$el.classList.remove(collapsedClass);
				$el.style.maxHeight = $el.scrollHeight + 'px';
				if (!settings.changeName) return
				$toggle.innerHTML = settings.lessBtnContent;
			}
		}
	}

	function fixedElemTop(selector) {
		const $el = typeof selector === 'string' ? document.querySelector(selector) : selector;
		const $startingPlace = document.createElement('div');
		const $header = document.querySelector('header');
		$el.insertAdjacentElement('beforebegin', $startingPlace);

		window.addEventListener('scroll', throttle(
			function () {
				let pageYOffset = window.pageYOffset;
				let isFixedHeader = false;

				if (getComputedStyle($header).position === 'fixed') {
					pageYOffset = pageYOffsetByNodes($header);
					isFixedHeader = true;
				}

				if (pageYOffset > getOffsetTop($startingPlace)) {
					$startingPlace.style.height = $el.offsetHeight + 'px';
					$el.classList.add('fixed');
					$el.style.top = isFixedHeader ? $header.offsetHeight + 'px' : '';
				} else {
					$startingPlace.style.height = '';
					$el.classList.remove('fixed');
				}
			}
		), 70)
	}

	/***** UTILS ******/
	function isElem(selector) {
		return (document.querySelector(selector)) ? true : false;
	}

	// положение верха вьюпорта от начала документа
	// c учетом закрепленного сверху элемента
	function pageYOffsetByNodes(node) {
		const args = Array.from(arguments);
		let summHeight = 0;

		if (args.length != 0) {
			summHeight = args.reduce(function (accum, item) {
				return accum + item.offsetHeight;
			}, summHeight)
		}

		return window.pageYOffset + summHeight;
	}
}(window));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4oZnVuY3Rpb24gKHdpbmRvdykge1xyXG5cdGNvbnN0IGJyZWFrUG9pbnQgPSB7XHJcblx0XHRkZXNjdG9wOiAxOTIwLFxyXG5cdFx0ZGVzY3RvcE1pZDogMTQ1MCxcclxuXHRcdGRlc2N0b3BNaW46IDEyMjAsXHJcblx0XHR0YWJsZTogMTA3MCxcclxuXHRcdG1vYmlsZTogNzY4LFxyXG5cdFx0dGVsOiA0ODAsXHJcblx0fVxyXG5cclxuXHQvLyBtb2JpbGUgbWVudVxyXG5cdGlmIChpc0VsZW0oJy5tb2JpbGUtbWVudScpKSB7XHJcblx0XHRjb25zdCBtb2JpbGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZS1tZW51Jyk7XHJcblxyXG5cdFx0YnJvTWVudShtb2JpbGVNZW51KS5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuc2VydmljZXMtbWVudScpKSB7XHJcblx0XHRjb25zdCBzZXJ2aWNlc01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtbWVudScpO1xyXG5cclxuXHRcdGJyb01lbnUoc2VydmljZXNNZW51LCB7XHJcblx0XHRcdG5leHRCdG46ICcuYnJvLW1lbnVfX25leHQnLFxyXG5cdFx0XHRhcnJvdzogYFxyXG5cdFx0PHN2ZyB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMjVcIiB2aWV3Qm94PVwiMCAwIDE5IDE5XCI+XHJcblx0XHQ8cGF0aCBkPVwiTTAuNzM1OTE2IDkuNTAwMDRDMC43MzU5MTYgNC42NTk3NSA0LjY1OTc1IDAuNzM1OTE4IDkuNTAwMDQgMC43MzU5MThDMTQuMzQwMyAwLjczNTkxOCAxOC4yNjQyIDQuNjU5NzUgMTguMjY0MiA5LjUwMDA0QzE4LjI2NDIgMTQuMzQwMyAxNC4zNDAzIDE4LjI2NDIgOS41MDAwNCAxOC4yNjQyQzQuNjU5NzUgMTguMjY0MiAwLjczNTkxNiAxNC4zNDAzIDAuNzM1OTE2IDkuNTAwMDRaXCIgZmlsbD1cImluaGVyaXRcIi8+XHJcblx0XHQ8cGF0aCBkPVwiTTAgOS41QzAgMTQuNzM3OSA0LjI2MTM4IDE5IDkuNSAxOUMxNC43Mzc5IDE5IDE5IDE0LjczNzkgMTkgOS41QzE5IDQuMjYxMzggMTQuNzM3OSAwIDkuNSAwQzQuMjYxMzggMCAwIDQuMjYxMzggMCA5LjVaTTE3LjUyODMgOS41QzE3LjUyODMgMTMuOTI3IDEzLjkyNyAxNy41MjgzIDkuNSAxNy41MjgzQzUuMDczMDQgMTcuNTI4MyAxLjQ3MTcyIDEzLjkyNyAxLjQ3MTcyIDkuNUMxLjQ3MTcyIDUuMDczMDQgNS4wNzM3OCAxLjQ3MTcyIDkuNSAxLjQ3MTcyQzEzLjkyNyAxLjQ3MTcyIDE3LjUyODMgNS4wNzMwNCAxNy41MjgzIDkuNVpcIiBmaWxsPVwiaW5oZXJpdFwiLz5cclxuXHRcdDxwYXRoIGQ9XCJNNy40NTQzMiA1LjI5ODI0QzcuMTY4OCA1LjU4NTI1IDcuMTY4OCA2LjA0ODgxIDcuNDU0MzIgNi4zMzU4MkwxMC42MTEyIDkuNDkyNjdMNy40NTQzMiAxMi42NDk1QzcuMTkwMTQgMTIuOTU3OSA3LjIyNjIxIDEzLjQyMjkgNy41MzQ1MSAxMy42ODcxQzcuODA5NzEgMTMuOTIzMyA4LjIxNjY2IDEzLjkyMzMgOC40OTE4NiAxMy42ODcxTDEyLjE3MTIgMTAuMDA3OEMxMi40NTY3IDkuNzIwNzkgMTIuNDU2NyA5LjI1NzIyIDEyLjE3MTIgOC45NzAyMUw4LjQ5MTg2IDUuMjkwODlDOC4yMDI2NyA1LjAwNzU2IDcuNzM5MDkgNS4wMTA1MyA3LjQ1NDMyIDUuMjk4MjRaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cclxuXHRcdDwvc3ZnPlxyXG5cdFx0YFxyXG5cdFx0fSkuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmItdGFicycpKSB7XHJcblx0XHRjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFicycpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgdGFiIG9mIHRhYnMpIHtcclxuXHRcdFx0YlRhYnModGFiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5hY2NhcmRpb24nKSkge1xyXG5cdFx0Y29uc3QgYWNjYXJkaW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NhcmRpb24nKTtcclxuXHRcdGNvbnN0IGFjY2FyZGlvblBsYWdpbiA9IGFjY2FyZGlvbigpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgaXRlbSBvZiBhY2NhcmRpb25zKSB7XHJcblx0XHRcdGFjY2FyZGlvblBsYWdpbigpLmluaXQoaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAod2luZG93LkFPUyAmJiBpc0VsZW0oJ1tkYXRhLWFvc10nKSkge1xyXG5cdFx0QU9TLmluaXQoe1xyXG5cdFx0XHQvL2Rpc2FibGU6IFwibW9iaWxlXCIsXHJcblx0XHRcdGR1cmF0aW9uOiAyMDAwLFxyXG5cdFx0XHRvZmZzZXQ6IDIwMCxcclxuXHRcdFx0b25jZTogdHJ1ZSxcclxuXHRcdFx0YW5jaG9yUGxhY2VtZW50OiAnYm90dG9tLWJvdHRvbSdcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmpzLXJlYWRtb3JlJykpIHtcclxuXHRcdGNvbnN0ICRyZWFkbW9yZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkbW9yZScpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgJGl0ZW0gb2YgJHJlYWRtb3JlRWxzKSB7XHJcblxyXG5cdFx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0XHR2aXNpYmxlSGVpZ2h0OiAxNzAsXHJcblx0XHRcdFx0bW9yZUJ0bkNvbnRlbnQ6IGBcclxuXHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE5XCIgaGVpZ2h0PVwiMTFcIiB2aWV3Qm94PVwiMCAwIDE5IDExXCI+XHJcblx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNOC41NDYxNSAxMC4xNDMxTDAuMjI0NjQ2IDEuNjM4MzdDLTAuMDQ3ODM4NiAxLjM1OTczIC0wLjA0NzM4MDUgMC45MDg1ODcgMC4yMjYwNTUgMC42MzA0MDZDMC40OTk0NTYgMC4zNTI0NCAwLjk0MjM0NCAwLjM1MzE1OCAxLjIxNTA0IDAuNjMxODQzTDkuMDQxMjYgOC42MzAzN0wxNi44Njc0IDAuNjMxNTU1QzE3LjE0MDIgMC4zNTI5MDcgMTcuNTgyOCAwLjM1MjE4OCAxNy44NTYyIDAuNjMwMTE5QzE3Ljk5MzMgMC43Njk1NjggMTguMDYxOCAwLjk1MjI1OCAxOC4wNjE4IDEuMTM0OTVDMTguMDYxOCAxLjMxNzE3IDE3Ljk5MzcgMS40OTkxNCAxNy44NTc2IDEuNjM4MzRMOS41MzYzMyAxMC4xNDMxQzkuNDA1MzIgMTAuMjc3MyA5LjIyNzAyIDEwLjM1MjYgOS4wNDEyNiAxMC4zNTI2QzguODU1NDkgMTAuMzUyNiA4LjY3NzQgMTAuMjc3MSA4LjU0NjE1IDEwLjE0MzFaXCIgZmlsbD1cImluaGVyaXRcIi8+XHJcblx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0YCxcclxuXHRcdFx0XHRidG5DbGFzc2VzOiAnYnRuIGJ0bi0tc2Vjb25kYXJ5IGJ0bi0tY2lyYycsXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlYWRtb3JlKCRpdGVtLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKioqKiBDVVNUT00gUExVR0lOICoqKioqKi9cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRjb25zdCAkdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG5cdFx0aWYgKCR0YXJnZXQuY2xvc2VzdCgnW2RhdGEtY29weV06bm90KC5kaXNhYmxlZCknKSkge1xyXG5cdFx0XHRjb25zdCAkZGF0YUNvcHlFbCA9ICR0YXJnZXQuY2xvc2VzdCgnW2RhdGEtY29weV0nKTtcclxuXHRcdFx0JGRhdGFDb3B5RWwuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcclxuXHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoJGRhdGFDb3B5RWwuZGF0YXNldC5jb3B5KTtcclxuXHJcblx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdG5vdGlmaWNhdGlvbkVsLmNsYXNzTmFtZSA9ICdjb3B5LW5vdGlmaWNhdGlvbic7XHJcblx0XHRcdG5vdGlmaWNhdGlvbkVsLnRleHRDb250ZW50ID0gJ9Ch0LrQvtC/0LjRgNC+0LLQsNC90L3QviDQsiDQsdGD0YTQtdGAINC+0LHQvNC10L3QsCc7XHJcblx0XHRcdCRkYXRhQ29weUVsLmFwcGVuZChub3RpZmljYXRpb25FbCk7XHJcblxyXG5cdFx0XHRsZXQgbGVmdCA9IDAgKyAoJGRhdGFDb3B5RWwub2Zmc2V0V2lkdGggLSBub3RpZmljYXRpb25FbC5vZmZzZXRXaWR0aCkgLyAyO1xyXG5cdFx0XHRub3RpZmljYXRpb25FbC5zdHlsZS5sZWZ0ID0gbGVmdCArIFwicHhcIjtcclxuXHJcblx0XHRcdC8vINGB0L/QvtC30LjRhtC40L7QvdC40YDRg9C10Lwg0LXQs9C+INGB0LLQtdGA0YXRgyDQvtGCINCw0L3QvdC+0YLQuNGA0YPQtdC80L7Qs9C+INGN0LvQtdC80LXQvdGC0LAgKHRvcC1jZW50ZXIpXHJcblx0XHRcdGxldCBjb29yZHNOb3RpZnkgPSBub3RpZmljYXRpb25FbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0Y29uc3QgeyB0b3A6IGNvb3JkVG9wLCByaWdodDogY29vcmRSaWdodCwgYm90dG9tOiBjb29yZEJvdHRvbSwgbGVmdDogY29vcmRMZWZ0IH0gPSBjb29yZHNOb3RpZnk7XHJcblxyXG5cdFx0XHRpZiAoY29vcmRMZWZ0IDwgMCkge1xyXG5cdFx0XHRcdG5vdGlmaWNhdGlvbkVsLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29vcmRUb3AgPCAwKSB7XHJcblx0XHRcdFx0bm90aWZpY2F0aW9uRWwuc3R5bGUudG9wID0gXCIxMDAlXCI7XHJcblx0XHRcdFx0bm90aWZpY2F0aW9uRWwuc3R5bGUuYm90dG9tID0gXCJhdXRvXCI7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90aWZpY2F0aW9uRWwuY2xhc3NMaXN0LmFkZCgnY29weS1ub3RpZmljYXRpb24tLWFuaW1hdGVkJykgfSwgMTApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90aWZpY2F0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnY29weS1ub3RpZmljYXRpb24tLWFuaW1hdGVkJykgfSwgMjAxMCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdG5vdGlmaWNhdGlvbkVsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdCRkYXRhQ29weUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH0sIDI1MDApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvL0hhbWJ1cmdlclxyXG5cdChmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBoYW1idXJnZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19oYW1idXJnZXInKTtcclxuXHRcdGNvbnN0IGJ1cmdlckJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyk7XHJcblx0XHRjb25zdCBidXJnZXJJbm5lciA9IGJ1cmdlckJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlci1pbm5lcicpO1xyXG5cdFx0Y29uc3QgYm9keUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cdFx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcblxyXG5cdFx0aGFtYnVyZ2VyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0YnVyZ2VyQmxvY2suc3R5bGUudG9wID0gaGVhZGVyLm9mZnNldEhlaWdodCAtIDEgKyAncHgnO1xyXG5cclxuXHRcdFx0bGV0IGlzQWN0aXZlID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG5cdFx0XHRidXJnZXJCbG9jay5jbGFzc0xpc3RbaXNBY3RpdmUgPyAnYWRkJyA6ICdyZW1vdmUnXSgnb3BlbicpO1xyXG5cdFx0XHRidXJnZXJJbm5lci5zdHlsZS5tYXhIZWlnaHQgPSAoaXNBY3RpdmUpID8gYGNhbGMoMTAwdmggLSAke2hlYWRlci5vZmZzZXRIZWlnaHR9cHgpYCA6ICcnO1xyXG5cdFx0XHRib2R5RWwuc3R5bGUub3ZlcmZsb3cgPSAoaXNBY3RpdmUpID8gJ2hpZGRlbicgOiAnJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk3MCAmJiBidXJnZXJCbG9jay5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG5cdFx0XHRcdGhhbWJ1cmdlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRidXJnZXJCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0XHRcdFx0Ym9keUVsLnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGJ1cmdlckJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0aWYgKCFlLnRhcmdldC5jb250YWlucyhidXJnZXJCbG9jaykpIHJldHVybjtcclxuXHJcblx0XHRcdGhhbWJ1cmdlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0YnVyZ2VyQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cdFx0XHRib2R5RWwuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdH0pO1xyXG5cdH0oKSk7XHJcblxyXG5cdC8vZml4ZWQgaGVhZGVyXHJcblx0aWYgKGlzRWxlbSgnaGVhZGVyJykpIHtcclxuXHRcdGxldCBmaXhlZEhlYWRlciA9IHNob3dIZWFkZXIoJ2hlYWRlcicpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHNob3dIZWFkZXIoZWwpIHtcclxuXHRcdFx0Y29uc3QgJGVsID0gKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbDtcclxuXHRcdFx0Y29uc3QgaHRtbEVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cdFx0XHRsZXQgb2Zmc2V0VG9wRWwgPSAkZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gb2Zmc2V0VG9wRWwgKyAyMCkge1xyXG5cdFx0XHRcdFx0c2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmaXhlZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRvZmZzZXRUb3BFbCA9ICRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHNob3coKSB7XHJcblx0XHRcdFx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpeGVkJykpIHJldHVybjtcclxuXHJcblx0XHRcdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCkge1xyXG5cdFx0XHRcdFx0aHRtbEVsLnN0eWxlLnBhZGRpbmdUb3AgPSAkZWwub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRodG1sRWwuc3R5bGUucGFkZGluZ1RvcCA9ICRlbC5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoJ2ZpeGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGZpeGVkKCkge1xyXG5cdFx0XHRcdGlmICghJGVsLmNsYXNzTGlzdC5jb250YWlucygnZml4ZWQnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LnJlbW92ZSgnZml4ZWQnKTtcclxuXHRcdFx0XHRodG1sRWwuc3R5bGUucGFkZGluZ1RvcCA9ICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNob3csXHJcblx0XHRcdFx0Zml4ZWQsXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtCDQvNC10L3RjiDRgSDQs9Cw0LzQsdGD0YDQs9C10YDQvtC8INCy0L3Rg9GC0YDQuCDQvtGB0L3QvtCy0L3QvtCz0L4g0LzQtdC90Y5cclxuXHRpZiAoaXNFbGVtKCcubWVudV9faXRlbS0tZHJvcCcpKSB7XHJcblx0XHRjb25zdCBtZW51RHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19pdGVtLS1kcm9wJyk7XHJcblx0XHRjb25zdCB0b2dnbGUgPSBtZW51RHJvcC5xdWVyeVNlbGVjdG9yKCcubWVudV9faXRlbS10b2dnbGUnKTtcclxuXHRcdGNvbnN0IGxpbmtidG4gPSBtZW51RHJvcC5xdWVyeVNlbGVjdG9yKCcubWVudV9faXRlbS10b2dnbGUgfiAubWVudV9fbGluaycpO1xyXG5cclxuXHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRtZW51RHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxpbmtidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdFx0bWVudURyb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xyXG5cdFx0XHRpZiAoIWV2LnRhcmdldC5jbG9zZXN0KCcubWVudV9faXRlbS0tZHJvcCcpKSB7XHJcblx0XHRcdFx0aWYgKG1lbnVEcm9wLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdHRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdG1lbnVEcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIG1haW4gc2xpZGVyIFxyXG5cdGlmIChpc0VsZW0oJy5tYWluLXNsaWRlcicpKSB7XHJcblx0XHRjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1haW4tc2xpZGVyJyk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBzbGlkZXIgb2Ygc2xpZGVycykge1xyXG5cdFx0XHRuZXcgU3dpcGVyKHNsaWRlciwge1xyXG5cdFx0XHRcdGVmZmVjdDogXCJjb3ZlcmZsb3dcIixcclxuXHRcdFx0XHRzcGVlZDogNzAwLFxyXG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcclxuXHRcdFx0XHRjb3ZlcmZsb3dFZmZlY3Q6IHtcclxuXHRcdFx0XHRcdHJvdGF0ZTogNTAsXHJcblx0XHRcdFx0XHRzdHJldGNoOiAwLFxyXG5cdFx0XHRcdFx0ZGVwdGg6IDEwMCxcclxuXHRcdFx0XHRcdG1vZGlmaWVyOiAxLFxyXG5cdFx0XHRcdFx0c2xpZGVTaGFkb3dzOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdFx0bmV4dEVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tbmV4dCcpLFxyXG5cdFx0XHRcdFx0cHJldkVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gYmFuZCBzbGlkZXJcclxuXHRpZiAoaXNFbGVtKCcuYmFuZC1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVyQmFuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYW5kLXNsaWRlcicpO1xyXG5cclxuXHRcdGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyQmFuZCwge1xyXG5cdFx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0XHRsb29wOiB0cnVlLFxyXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAzMixcclxuXHRcdFx0c2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuXHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdG5vU3dpcGluZ1NlbGVjdG9yOiAnYnV0dG9uJyxcclxuXHRcdFx0c3BlZWQ6IDUwMCxcclxuXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDEwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMDcxOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTIyMToge1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRuZXh0RWw6IHNsaWRlckJhbmQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tbmV4dCcpLFxyXG5cdFx0XHRcdHByZXZFbDogc2xpZGVyQmFuZC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1wcmV2JyksXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHN3aXBlci5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzd2lwZXIudXBkYXRlKCk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gcmV2aWV3cyBzbGlkZXJcclxuXHRpZiAoaXNFbGVtKCcucmV2aWV3cy1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3QgcmV2aWV3c1NsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzLXNsaWRlcicpO1xyXG5cclxuXHRcdGNvbnN0IHN3aXBlciA9IHNsaWRlcihyZXZpZXdzU2xpZGVyLCB7XHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMzUsXHJcblx0XHRcdHNwZWVkOiA3MDAsXHJcblx0XHRcdGdyYWJDdXJzb3I6IHRydWUsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzAwOiB7XHJcblx0XHRcdFx0XHRhdXRvSGVpZ2h0OiB0cnVlLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDEsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDI1LFxyXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ0ODE6IHtcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyNSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAxLFxyXG5cdFx0XHRcdFx0c2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njk6IHtcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuXHRcdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRbYnJlYWtQb2ludC50YWJsZV06IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDQsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogNCxcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXHJcblx0XHRcdFx0XHRhdXRvSGVpZ2h0OiB0cnVlLFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuY2xpZW50cy1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWVudHMtc2xpZGVyJyk7XHJcblxyXG5cdFx0bmV3IFN3aXBlcihzbGlkZXIsIHtcclxuXHRcdFx0bG9vcDogdHJ1ZSxcclxuXHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAyNCxcclxuXHRcdFx0c2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuXHRcdFx0c3BlZWQ6IDUwMCxcclxuXHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHQzMjA6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njk6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMDcxOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdG5leHRFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHRwcmV2RWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1wcmV2JyksXHJcblx0XHRcdH0sXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmluZm8tc2xpZGVyJykpIHtcclxuXHRcdG5ldyBTd2lwZXIoJy5pbmZvLXNsaWRlcicsIHtcclxuXHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMTAwLFxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tc2xpZGVyLXdyYXAgLnNsaWRlci1wYWdpbmF0aW9uJyksXHJcblx0XHRcdFx0Y2xpY2thYmxlOiB0cnVlLFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gXHRiYW5kIHNsaWRlciBcclxuXHRpZiAoaXNFbGVtKCcuY2FyZHMtc2xpZGVyJykpIHtcclxuXHRcdGxldCBzd2lwZXIgPSBzbGlkZXIoJy5jYXJkcy1zbGlkZXInLCB7XHJcblx0XHRcdGdyYWJDdXJzb3I6IHRydWUsXHJcblx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzAwOiB7XHJcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRbYnJlYWtQb2ludC50YWJsZSArIDFdOiB7XHJcblx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbShcIi50d2VudHktYlwiKSkge1xyXG5cdFx0JChcIi50d2VudHktYlwiKS50d2VudHl0d2VudHkoKTtcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5nYWxsZXJ5LXNsaWRlcicpKSB7XHJcblx0XHRjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1zbGlkZXInKTtcclxuXHJcblx0XHRjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG5cdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAzMCxcclxuXHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHQzMjA6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMSxcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogNjAsXHJcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAyLFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEwNzE6IHtcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMCxcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRlbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1wYWdpbmF0aW9uJyksXHJcblx0XHRcdFx0Y2xpY2thYmxlOiB0cnVlLFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRzd2lwZXIub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c3dpcGVyLnVwZGF0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuZXhhbXBsZXMtd29yay1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXhhbXBsZXMtd29yay1zbGlkZXInKTtcclxuXHJcblx0XHRjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlckVsLCB7XHJcblx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMzIsXHJcblx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDEsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njk6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMixcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEwNzE6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMyxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRwcmV2RWw6IHNsaWRlckVsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdFx0XHRuZXh0RWw6IHNsaWRlckVsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0fSxcclxuXHRcdFx0cGFnaW5hdGlvbjoge1xyXG5cdFx0XHRcdGVsOiBzbGlkZXJFbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJ2hlYWRlciAuYnJvLW1lbnUnKSkge1xyXG5cdFx0Y29uc3QgJG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgLmJyby1tZW51Jyk7XHJcblx0XHRjb25zdCBtZW51ID0gYnJvTWVudSgkbWVudSk7XHJcblxyXG5cdFx0dG9nZ2xlTWVudSgpO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0b2dnbGVNZW51KTtcclxuXHJcblx0XHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xyXG5cdFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDI1KSB7XHJcblx0XHRcdFx0bWVudS5pbml0KCk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lbnUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQvtCx0YvRgtC40Lkg0L3QsCDQutC90L7Qv9C+0Log0YHQsNC50YLQsFxyXG5cdC8vINC60L7RgtC+0YDRi9C1INC40LzQtdGO0YIg0LDRgtGA0LjQsdGD0YIgZGF0YS1idG4tdHlwZVxyXG5cdGlmIChpc0VsZW0oJ1tkYXRhLWJ0bi10eXBlXScpKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGlmICghZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnRuLXR5cGVdJykpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpXHJcblx0XHRcdFx0XHQmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnRuLXR5cGVdJykpIHtcclxuXHRcdFx0XHRjb25zdCBidG4gPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1idG4tdHlwZV0nKTtcclxuXHJcblx0XHRcdFx0aWYgKGJ0bi5kYXRhc2V0LmJ0blR5cGUgPT09ICd0b2dnbGVDbGFzcycpIHtcclxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi10eXBlPVwidG9nZ2xlQ2xhc3NcIl0uYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuZHJvcCcpKSB7XHJcblx0XHRjb25zdCBkcm9wRWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3AnKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGRyb3BFbCBvZiBkcm9wRWxMaXN0KSB7XHJcblx0XHRcdGRyb3Bkb3duKGRyb3BFbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL9C/0L7QutCw0Lcg0L7QutC90LAg0YHRgtCw0YLQuNGB0YLQuNC60Lgg0Log0LHQu9C+0LrQtSDQutC10LnRgdCwXHJcblx0aWYgKGlzRWxlbSgnLnNlcnZpY2UtdG9vbCcpKSB7XHJcblx0XHRsZXQgbGFzdE9wZW5FbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZXJ2aWNlLXRvb2xfX2J0bicpO1xyXG5cclxuXHRcdFx0aWYgKGxhc3RPcGVuRWwgJiYgbGFzdE9wZW5FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0bGFzdE9wZW5FbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRsYXN0T3BlbkVsID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGJ0bikge1xyXG5cdFx0XHRcdGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRsYXN0T3BlbkVsID0gYnRuO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly92LW1vZGFsXHJcblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52LW1vZGFsJykpIHtcclxuXHRcdGNvbnN0IG1vZGFsRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudi1tb2RhbCcpO1xyXG5cdFx0Y29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRcdGNvbnN0IHR5cGVPcGVuID0gXCJvcGVuTW9kYWxcIjtcclxuXHRcdGNvbnN0IHR5cGVDbG9zZSA9ICdjbG9zZU1vZGFsJztcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWJ1dHRvbi10eXBlXScpO1xyXG5cdFx0XHRpZiAoYnRuICYmIGJ0bi5kYXRhc2V0LmJ1dHRvblR5cGUgPT09IHR5cGVPcGVuKSB7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBib2R5Lm9mZnNldFdpZHRoO1xyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0bW9kYWxFbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0Ym9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cdFx0XHRcdGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyBcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2LW1vZGFsX19pbm5lcicpIHx8IGUudGFyZ2V0LmRhdGFzZXQuYnV0dG9uVHlwZSA9PT0gdHlwZUNsb3NlKSB7XHJcblx0XHRcdFx0bW9kYWxFbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHRcdFx0Ym9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGFiZWwtZmlsZScpKSB7XHJcblx0XHRmb3IgKGNvbnN0ICR1cGxvYWRlciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbGFiZWwtZmlsZScpKSB7XHJcblx0XHRcdGZpbGVJbnB1dCgkdXBsb2FkZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gdi11cCDQutC90L7Qv9C60LAg0LLQstC10YDRhVxyXG5cdChmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxyXG5cdFx0PGRpdiBjbGFzcz1cInYtdXBcIj48L2Rpdj5cclxuXHRgKTtcclxuXHJcblx0XHRjb25zdCBidG5Eb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnYtdXAnKTtcclxuXHRcdGxldCB2VXBUcmlnZ2VyVGltZXIgPSAwO1xyXG5cclxuXHRcdHZVcChidG5Eb3duLCBnZXRTY3JvbGVkV2luZG93KTtcclxuXHJcblx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRiYWNrVG9Ub3AoLTQ1LCAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh2VXBUcmlnZ2VyVGltZXIpO1xyXG5cdFx0XHR2VXBUcmlnZ2VyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR2VXAoYnRuRG93biwgZ2V0U2Nyb2xlZFdpbmRvdyk7XHJcblx0XHRcdH0sIDIwMClcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8v0L/RgNC+0LvQuNGB0YLRi9Cy0LDQuNC90LUg0L7QutC90LAg0LLQstC10YDRhSDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRg1xyXG5cdFx0ZnVuY3Rpb24gdlVwKGJ0biwgc2Nyb2xlZCkge1xyXG5cdFx0XHRpZiAoc2Nyb2xlZCgpID4gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLyAyKSkge1xyXG5cdFx0XHRcdGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIGlmIChzY3JvbGVkKCkgPCAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAvIDIpIHx8IGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/Qv9GA0L7QutGA0YPRgtC60LAg0L7QutC90LAg0LLQstC10YDRhSDQstC90LjQt1xyXG5cdFx0ZnVuY3Rpb24gYmFja1RvVG9wKGludGVydmFsLCB0bykge1xyXG5cdFx0XHRpZiAod2luZG93LnBhZ2VZT2Zmc2V0IDw9IHRvKSByZXR1cm47XHJcblxyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsQnkoMCwgaW50ZXJ2YWwpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKVxyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL9C90LAg0YHQutC+0LvRjNC60L4g0L/RgNC+0LrRgNGD0YfQtdC90L4g0L7QutC90L5cclxuXHRcdGZ1bmN0aW9uIGdldFNjcm9sZWRXaW5kb3coKSB7XHJcblx0XHRcdHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cclxuXHRpZiAoaXNFbGVtKCcucG9ydGZvbGlvLWInKSkge1xyXG5cdFx0Y29uc3QgZmlsdGVyQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3J0Zm9saW8tYiAud29yay1jYXJkJyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcnRmb2xpby1iX19jYXRlZ29yaWVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRjb25zdCBmaWx0ZXJCdG4gPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1mXScpO1xyXG5cclxuXHRcdFx0aWYgKGZpbHRlckJ0bikge1xyXG5cdFx0XHRcdGlmIChmaWx0ZXJCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mXS5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRmaWx0ZXJCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGZpbHRlckNsYXNzID0gJ2YtJyArIGUudGFyZ2V0LmRhdGFzZXRbJ2YnXTtcclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCBjYXJkIG9mIGZpbHRlckNhcmQpIHtcclxuXHRcdFx0XHRcdGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoZmlsdGVyQ2xhc3MpICYmIGZpbHRlckNsYXNzICE9PSAnZi1hbGwnKSB7XHJcblx0XHRcdFx0XHRcdGNhcmQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdC8qXHJcblx0ICBGVU5DVElPTlMgUExVR0lOU1x0XHJcblx0Ki9cclxuXHQvL3NsaW5reSBtZW51XHJcblx0ZnVuY3Rpb24gYnJvTWVudShzZWxlY3Rvciwgb3B0aW9ucykge1xyXG5cdFx0Y29uc3QgJG1lbnUgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IHNlbGVjdG9yO1xyXG5cdFx0Y29uc3QgJGxldmVsXzEgPSAkbWVudS5sYXN0RWxlbWVudENoaWxkO1xyXG5cdFx0Y29uc3QgJHN1Yk1lbnVMaXN0ID0gJG1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGkgPiB1bCcpO1xyXG5cdFx0Y29uc3QgJHN1Yk1lbnVMaW5rID0gJG1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGkgPiBhJyk7XHJcblx0XHRsZXQgYWN0aXZhdGVkO1xyXG5cclxuXHRcdGxldCBkZWZhdWxPcHRpb25zID0ge1xyXG5cdFx0XHRuZXh0QnRuOiAnLmJyby1tZW51X19uZXh0LWFycicsXHJcblx0XHRcdGFycm93OiBgXHJcblx0XHRcdDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuXHRcdFx0PHBhdGggZD1cIk0xMi4yMTkgMi4yODFMMTAuNzggMy43MiAxOC4wNjIgMTFIMnYyaDE2LjA2M2wtNy4yODIgNy4yODEgMS40MzggMS40MzggOS05IC42ODctLjcxOS0uNjg3LS43MTl6XCIgLz5cclxuXHRcdFx0PC9zdmc+XHJcblx0XHRgXHJcblx0XHR9XHJcblxyXG5cdFx0T2JqZWN0LmFzc2lnbihkZWZhdWxPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcblx0XHRsZXQgJGFjdGl2ZVVsO1xyXG5cdFx0bGV0IHRyYW5zbGF0ZSA9IDA7XHJcblxyXG5cdFx0Y29uc3QgbWV0aG9kID0ge1xyXG5cdFx0XHRpbml0KCkge1xyXG5cdFx0XHRcdGlmIChhY3RpdmF0ZWQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0JG1lbnUuY2xhc3NMaXN0LmFkZCgnYnJvLW1lbnUnKTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgc3VibWVudSBvZiAkc3ViTWVudUxpc3QpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSBzdWJtZW51LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignbGkgPiBhJyk7XHJcblx0XHRcdFx0XHRsaW5rLmNsYXNzTGlzdC5hZGQoJ2Jyby1tZW51X19uZXh0Jyk7XHJcblxyXG5cdFx0XHRcdFx0X2FkZEJ0bkJhY2soc3VibWVudSwgbGluayk7XHJcblx0XHRcdFx0XHRfYWRkQnRuTmV4dChsaW5rKTtcclxuXHJcblx0XHRcdFx0XHRhY3RpdmF0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCAkbGluayBvZiAkc3ViTWVudUxpbmspIHtcclxuXHRcdFx0XHRcdCRsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xyXG5cclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3NldEhlaWdoTWVudSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRkZXN0cm95KCkge1xyXG5cdFx0XHRcdGlmICghYWN0aXZhdGVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGNvbnN0ICRhcnJOb2RlcyA9ICRtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJy5icm8tbWVudV9fYXJyJyk7XHJcblxyXG5cdFx0XHRcdCRtZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcclxuXHRcdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3NldEhlaWdoTWVudSk7XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3QgJGxpbmsgb2YgJG1lbnUucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKSkge1xyXG5cdFx0XHRcdFx0aWYgKCRsaW5rLmNsYXNzTGlzdC5jb250YWlucygnYnJvLW1lbnVfX2JhY2snKSkge1xyXG5cdFx0XHRcdFx0XHQkbGluay5jbG9zZXN0KCdsaScpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0ICRhcnIgb2YgJGFyck5vZGVzKSB7XHJcblx0XHRcdFx0XHRcdCRhcnIucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0JGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG5cdFx0XHRcdFx0JGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYnJvLW1lbnVfX25leHQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCRhY3RpdmVVbCAmJiAkYWN0aXZlVWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCRtZW51LnN0eWxlLmhlaWdodCA9ICcnO1xyXG5cdFx0XHRcdCRsZXZlbF8xLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xyXG5cdFx0XHRcdHRyYW5zbGF0ZSA9IDA7XHJcblx0XHRcdFx0YWN0aXZhdGVkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcblx0XHRcdGlmICh0YXJnZXQuY2xvc2VzdChkZWZhdWxPcHRpb25zLm5leHRCdG4pKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRjb25zdCAkbmVzdGVkTWVudSA9IHRhcmdldC5jbG9zZXN0KCdsaScpLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcblxyXG5cdFx0XHRcdGlmICgkYWN0aXZlVWwpICRhY3RpdmVVbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JG5lc3RlZE1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0JG5lc3RlZE1lbnUuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuXHRcdFx0XHR0cmFuc2xhdGUgLT0gMTAwO1xyXG5cclxuXHRcdFx0XHQkbGV2ZWxfMS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZX0lKWA7XHJcblx0XHRcdFx0JGFjdGl2ZVVsID0gJG5lc3RlZE1lbnU7XHJcblxyXG5cdFx0XHRcdHNjcm9sbFRvVmlzaWJsZSgkYWN0aXZlVWwpO1xyXG5cdFx0XHRcdF9zZXRIZWlnaE1lbnUoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICh0YXJnZXQuY2xvc2VzdCgnLmJyby1tZW51X19iYWNrJykpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0ICR1cHBlck1lbnUgPSAkYWN0aXZlVWwucGFyZW50RWxlbWVudC5jbG9zZXN0KCd1bCcpO1xyXG5cdFx0XHRcdCR1cHBlck1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCRhY3RpdmVVbC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XHJcblxyXG5cdFx0XHRcdHRyYW5zbGF0ZSArPSAxMDA7XHJcblxyXG5cdFx0XHRcdCRsZXZlbF8xLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlfSUpYDtcclxuXHRcdFx0XHQkYWN0aXZlVWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0JGFjdGl2ZVVsID0gJHVwcGVyTWVudTtcclxuXHRcdFx0XHRfc2V0SGVpZ2hNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfYWRkQnRuTmV4dChlbGVtKSB7XHJcblx0XHRcdGVsZW0uY2xhc3NMaXN0LmFkZCgnbGluaycpXHJcblx0XHRcdGVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXHJcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJicm8tbWVudV9fbmV4dC1hcnJcIj5cclxuXHRcdFx0XHRcdCR7ZGVmYXVsT3B0aW9ucy5hcnJvd31cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdGApO1xyXG5cclxuXHRcdFx0ZWxlbS5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2Jyby1tZW51X19hcnInKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfYWRkQnRuQmFjayhlbGVtLCBsaW5rKSB7XHJcblx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cclxuXHRcdFx0ZWxlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgXHJcblx0XHRcdDxsaT5cclxuXHRcdFx0XHQ8YSBjbGFzcz1cImJyby1tZW51X19iYWNrIGxpbmtcIiAkeyhocmVmKSA/IGBocmVmPSR7aHJlZn1gIDogJyd9PlxyXG5cdFx0XHRcdFx0JHtkZWZhdWxPcHRpb25zLmFycm93fVxyXG5cdFx0XHRcdFx0JHtsaW5rLnRleHRDb250ZW50fVxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5cclxuXHRcdGApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9zZXRIZWlnaE1lbnUoKSB7XHJcblx0XHRcdGlmICghJGFjdGl2ZVVsKSByZXR1cm47XHJcblxyXG5cdFx0XHQkbWVudS5zdHlsZS5oZWlnaHQgPSAkYWN0aXZlVWwub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNjcm9sbFRvVmlzaWJsZShlbCkge1xyXG5cdFx0XHRpZiAoX2dldFBvc0Fic1dpbmRvdyhlbCkgPiB3aW5kb3cucGFnZVlPZmZzZXQpIHJldHVybjtcclxuXHJcblx0XHRcdGJhY2tUb1RvcCgtMTAsIF9nZXRQb3MoZWwpKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0UG9zQWJzV2luZG93KGVsZW0pIHtcclxuXHRcdFx0Y29uc3Qgb2Zmc2V0VG9wID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG5cdFx0XHRyZXR1cm4gb2Zmc2V0VG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9nZXRQb3MoZWwpIHtcclxuXHRcdFx0cmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKSB7XHJcblx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPD0gdG8pIHJldHVybjtcclxuXHJcblx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBpbnRlcnZhbCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pXHJcblx0XHRcdH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBtZXRob2Q7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmaWxlSW5wdXQoZmllbGRBcmVhU2VsZWN0b3IpIHtcclxuXHRcdGNvbnN0ICRwYXJlbnQgPSB0eXBlb2YgZmllbGRBcmVhU2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihmaWVsZEFyZWFTZWxlY3RvcikgOiBmaWVsZEFyZWFTZWxlY3RvcjtcclxuXHRcdGNvbnN0IGlucHV0ID0gJHBhcmVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG5cdFx0Y29uc3QgJHRleHRDb250YWluZXIgPSAkcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1sYWJlbC1maWxlX190ZXh0Jyk7XHJcblxyXG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0Y29uc3QgZmlsZXNDb3VudCA9IGUudGFyZ2V0LmZpbGVzLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmICghZmlsZXNDb3VudCkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmaWxlc0NvdW50ID09PSAxKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xyXG5cdFx0XHRcdCR0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gZmlsZU5hbWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JHRleHRDb250YWluZXIudGV4dENvbnRlbnQgPSBg0JLRi9Cx0YDQsNC90L4g0YTQsNC50LvQvtCyOiAke2ZpbGVzQ291bnR9YDtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIHNsaWRlciAgXHJcblx0ZnVuY3Rpb24gc2xpZGVyKHNlbGVjdG9yLCBvcHRpb24gPSB7fSkge1xyXG5cdFx0Y29uc3QgJHNsaWRlciA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogc2VsZWN0b3I7XHJcblx0XHRjb25zdCAkc2xpZGVyV3JhcCA9ICRzbGlkZXIuY2xvc2VzdCgnLnNsaWRlci13cmFwJyk7XHJcblxyXG5cdFx0Y29uc3Qgc2V0aW5ncyA9IHtcclxuXHRcdFx0bmF2aWdhdGlvbjogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1uYXYnKSxcclxuXHRcdFx0cGFnaW5hdGlvbjogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1wYWdpbmF0aW9uJyksXHJcblx0XHRcdG9wdGlvbnM6IHtcclxuXHRcdFx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHRcdC4uLm9wdGlvbixcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdE9iamVjdC5hc3NpZ24oc2V0aW5ncy5vcHRpb25zLCB7XHJcblx0XHRcdHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogdHJ1ZSxcclxuXHRcdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcclxuXHRcdFx0YXV0b3BsYXk6ICgrJHNsaWRlci5kYXRhc2V0LnN3aXBlckF1dG9wbGF5ID4gMCkgPyB7XHJcblx0XHRcdFx0ZGVsYXk6ICskc2xpZGVyLmRhdGFzZXQuc3dpcGVyQXV0b3BsYXksXHJcblx0XHRcdFx0cGF1c2VPbk1vdXNlRW50ZXI6IHRydWUsXHJcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0XHR9IDogJycsXHJcblx0XHRcdG5hdmlnYXRpb246IHNldGluZ3MubmF2aWdhdGlvbiA/IHtcclxuXHRcdFx0XHRuZXh0RWw6ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1uZXh0JyksXHJcblx0XHRcdFx0cHJldkVsOiAkc2xpZGVyV3JhcC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHR9IDogJycsXHJcblx0XHRcdHBhZ2luYXRpb246IHNldGluZ3MucGFnaW5hdGlvbiA/IHtcclxuXHRcdFx0XHRlbDogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1wYWdpbmF0aW9uJyksXHJcblx0XHRcdFx0Y2xpY2thYmxlOiB0cnVlLFxyXG5cdFx0XHR9IDogJycsXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBuZXcgU3dpcGVyKCRzbGlkZXIsIHNldGluZ3Mub3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHQvL2FjY2FyZGlvblxyXG5cdGZ1bmN0aW9uIGFjY2FyZGlvbigpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBfbWFpbkVsZW1lbnQgPSB7fSwgLy8gLmFjY29yZGlvbiBcclxuXHRcdFx0XHRfaXRlbXMgPSB7fSwgLy8gLmFjY29yZGlvbi1pdGVtIFxyXG5cdFx0XHRcdGhlYWRlckRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRpbml0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0X21haW5FbGVtZW50ID0gKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50KTtcclxuXHRcdFx0XHRcdF9pdGVtcyA9IF9tYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjYXJkaW9uX19pdGVtJyk7XHJcblx0XHRcdFx0XHRfc2V0dXBMaXN0ZW5lcnMoX21haW5FbGVtZW50LCAnY2xpY2snLCBfY2xpY2tIYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIF9jbGlja0hhbmRsZXIoZSkge1xyXG5cdFx0XHRcdGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmFjY2FyZGlvbl9faXRlbS1oZWFkZXInKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdGxldCBoZWFkZXIgPSBlLnRhcmdldC5jbG9zZXN0KCcuYWNjYXJkaW9uX19pdGVtLWhlYWRlcicpLFxyXG5cdFx0XHRcdFx0aXRlbSA9IGhlYWRlci5jbG9zZXN0KCcuYWNjYXJkaW9uX19pdGVtJyksXHJcblx0XHRcdFx0XHRpdGVtQWN0aXZlID0gX2dldEl0ZW0oX2l0ZW1zLCAnb3BlbicpO1xyXG5cclxuXHRcdFx0XHRpZiAoaXRlbUFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aXRlbUFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGl0ZW1BY3RpdmUgIT09IGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRzY3JvbGxUb1Zpc2libGUoaXRlbSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX3NldHVwTGlzdGVuZXJzKGVsZW0sIGV2ZW50LCBoYW5kbGVyKSB7XHJcblx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsVG9WaXNpYmxlKGVsKSB7XHJcblx0XHRcdGlmIChfZ2V0UG9zKGVsKSA+IHdpbmRvdy5wYWdlWU9mZnNldCkgcmV0dXJuO1xyXG5cdFx0XHRiYWNrVG9Ub3AoLTEwLCBfZ2V0UG9zKGVsKSAtIGhlYWRlckRvbS5vZmZzZXRIZWlnaHQgLSAzMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2dldFBvcyhlbCkge1xyXG5cdFx0XHRyZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9nZXRJdGVtKGVsZW1lbnRzLCBjbGFzc05hbWUpIHtcclxuXHRcdFx0dmFyIGVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IGl0ZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5wYWdlWU9mZnNldCA8PSB0bykgcmV0dXJuO1xyXG5cclxuXHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIGludGVydmFsKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0YmFja1RvVG9wKGludGVydmFsLCB0bylcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBiVGFic1xyXG5cdGZ1bmN0aW9uIGJUYWJzKHRhcmdldCkge1xyXG5cdFx0bGV0IF9lbGVtVGFicyA9ICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldCksXHJcblx0XHRcdF9ldmVudFRhYnNTaG93LFxyXG5cdFx0XHRfc2hvd1RhYiA9IGZ1bmN0aW9uICh0YWJzTGlua1RhcmdldCkge1xyXG5cdFx0XHRcdHZhciB0YWJzUGFuZVRhcmdldCwgdGFic0xpbmtBY3RpdmUsIHRhYnNQYW5lU2hvdztcclxuXHRcdFx0XHR0YWJzUGFuZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFic0xpbmtUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xyXG5cdFx0XHRcdHRhYnNMaW5rQWN0aXZlID0gdGFic0xpbmtUYXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYi10YWJzX19saW5rLmFjdGl2ZScpO1xyXG5cdFx0XHRcdHRhYnNQYW5lU2hvdyA9IHRhYnNQYW5lVGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmItdGFic19fcGFuZS5hY3RpdmUnKTtcclxuXHRcdFx0XHQvLyDQtdGB0LvQuCDRgdC70LXQtNGD0Y7RidCw0Y8g0LLQutC70LDQtNC60LAg0YDQsNCy0L3QsCDQsNC60YLQuNCy0L3QvtC5LCDRgtC+INC30LDQstC10YDRiNCw0LXQvCDRgNCw0LHQvtGC0YNcclxuXHRcdFx0XHRpZiAodGFic0xpbmtUYXJnZXQgPT09IHRhYnNMaW5rQWN0aXZlKSByZXR1cm47XHJcblx0XHRcdFx0Ly8g0YPQtNCw0LvRj9C10Lwg0LrQu9Cw0YHRgdGLINGDINGC0LXQutGD0YnQuNGFINCw0LrRgtC40LLQvdGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcblx0XHRcdFx0aWYgKHRhYnNMaW5rQWN0aXZlICE9PSBudWxsKSB0YWJzTGlua0FjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0aWYgKHRhYnNQYW5lU2hvdyAhPT0gbnVsbCkgdGFic1BhbmVTaG93LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGB0Ysg0Log0Y3Qu9C10LzQtdC90YLQsNC8ICjQsiDQt9Cw0LLQuNC80L7RgdGC0Lgg0L7RgiDQstGL0LHRgNCw0L3QvdC+0Lkg0LLQutC70LDQtNC60LgpXHJcblx0XHRcdFx0dGFic0xpbmtUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0dGFic1BhbmVUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChfZXZlbnRUYWJzU2hvdyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdF9zd2l0Y2hUYWJUbyA9IGZ1bmN0aW9uICh0YWJzTGlua0luZGV4KSB7XHJcblx0XHRcdFx0dmFyIHRhYnNMaW5rcyA9IF9lbGVtVGFicy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJzX19saW5rJyk7XHJcblx0XHRcdFx0aWYgKHRhYnNMaW5rcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRpZiAodGFic0xpbmtJbmRleCA+IHRhYnNMaW5rcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0dGFic0xpbmtJbmRleCA9IHRhYnNMaW5rcy5sZW5ndGg7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRhYnNMaW5rSW5kZXggPCAxKSB7XHJcblx0XHRcdFx0XHRcdHRhYnNMaW5rSW5kZXggPSAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0X3Nob3dUYWIodGFic0xpbmtzW3RhYnNMaW5rSW5kZXggLSAxXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdF9ldmVudFRhYnNTaG93ID0gbmV3IEN1c3RvbUV2ZW50KCd0YWIuc2hvdycsIHsgZGV0YWlsOiBfZWxlbVRhYnMgfSk7XHJcblxyXG5cdFx0X2VsZW1UYWJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHRhYnNMaW5rVGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHRcdC8vINC30LDQstC10YDRiNCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhNGD0L3QutGG0LjQuCwg0LXRgdC70Lgg0LrQu9C40LrQvdGD0LvQuCDQvdC1INC/0L4g0YHRgdGL0LvQutC1XHJcblx0XHRcdGlmICghdGFic0xpbmtUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdiLXRhYnNfX2xpbmsnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRfc2hvd1RhYih0YWJzTGlua1RhcmdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93VGFiOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcblx0XHRcdFx0X3Nob3dUYWIodGFyZ2V0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3dpdGNoVGFiVG86IGZ1bmN0aW9uIChpbmRleCkge1xyXG5cdFx0XHRcdF9zd2l0Y2hUYWJUbyhpbmRleCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly9kcm9wZG93blxyXG5cdGZ1bmN0aW9uIGRyb3Bkb3duKHNlbGVjdG9yKSB7XHJcblx0XHRjb25zdCAkZWwgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuXHRcdFx0OiBzZWxlY3RvcixcclxuXHRcdFx0JGJ0biA9ICRlbC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1idG4nKSxcclxuXHRcdFx0JGNvbnRlbnQgPSAkZWwucXVlcnlTZWxlY3RvcignLmRyb3AtY29udGVudCcpO1xyXG5cclxuXHRcdCRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdCRjb250ZW50LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHRcdH0sIDMyMClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkY29udGVudC5zdHlsZS5taW5IZWlnaHQgPSAnJztcclxuXHRcdFx0XHQkY29udGVudC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJyc7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIHJlYWRtb3JlIGpzXHJcblx0ZnVuY3Rpb24gcmVhZG1vcmUoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG5cdFx0bGV0ICRlbCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogc2VsZWN0b3IsXHJcblx0XHRcdCR0b2dnbGU7XHJcblxyXG5cdFx0Y29uc3QgYmFzZUNsYXNzID0gJ2pzLXJlYWRtb3JlJztcclxuXHRcdGNvbnN0IHNlY3Rpb25DbGFzcyA9IGJhc2VDbGFzcyArICctc2VjdGlvbic7XHJcblx0XHRjb25zdCBleHBhbmRlZENsYXNzID0gc2VjdGlvbkNsYXNzICsgJy0tZXhwYW5kZWQnO1xyXG5cdFx0Y29uc3QgY29sbGFwc2VkQ2xhc3MgPSBzZWN0aW9uQ2xhc3MgKyAnLS1jb2xsYXBzZWQnO1xyXG5cdFx0Y29uc3QgZGlzYWJsZWRDbGFzcyA9IHNlY3Rpb25DbGFzcyArICctLWRpc2FibGVkJztcclxuXHRcdGNvbnN0IGJ0blRvZ2dsZUNsYXNzID0gYmFzZUNsYXNzICsgJy10b2dnbGUnO1xyXG5cdFx0Y29uc3QgYnRuVG9nZ2xlTW9yZUNsYXNzID0gYnRuVG9nZ2xlQ2xhc3MgKyAnLS1tb3JlJztcclxuXHRcdGxldCBpc0V4cGFuZGVkID0gZmFsc2U7XHJcblx0XHRsZXQgaXNCdG5Jbml0ID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB7XHJcblx0XHRcdHZpc2libGVIZWlnaHQ6IDIwMCxcclxuXHRcdFx0cG9zaXRpb25Ub2dnbGU6ICdpbnNpZGUnLFxyXG5cdFx0XHRidG5DbGFzc2VzOiBcIlwiLFxyXG5cdFx0XHRjaGFuZ2VOYW1lOiBmYWxzZSxcclxuXHRcdFx0bW9yZUJ0bkNvbnRlbnQ6IFwi0J/QvtC60LDQt9Cw0YLRjCDQstGB0LVcIixcclxuXHRcdFx0bGVzc0J0bkNvbnRlbnQ6IFwi0KHQutGA0YvRgtGMXCIsXHJcblx0XHR9XHJcblxyXG5cdFx0T2JqZWN0LmFzc2lnbihzZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0c2V0dGluZ3MudmlzaWJsZUhlaWdodCA9IHBhcnNlRmxvYXQoJGVsLmRhdGFzZXQucmVhZG1vcmVIZWlnaHQpIHx8IHNldHRpbmdzLnZpc2libGVIZWlnaHQ7XHJcblxyXG5cdFx0JGVsLmNsYXNzTmFtZSA9ICRlbC5jbGFzc05hbWUgKyBgICR7c2VjdGlvbkNsYXNzfWA7XHJcblxyXG5cdFx0Y2hhbmdlU3RhdGUoKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hhbmdlU3RhdGUpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGNoYW5nZVN0YXRlKCkge1xyXG5cdFx0XHRpZiAoJGVsLnNjcm9sbEhlaWdodCA+IHNldHRpbmdzLnZpc2libGVIZWlnaHQpIHtcclxuXHRcdFx0XHRpZiAoIWlzQnRuSW5pdCkge1xyXG5cdFx0XHRcdFx0aXNCdG5Jbml0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdCR0b2dnbGUgPSBjcmVhdGVCdG4oKTtcclxuXHJcblx0XHRcdFx0XHQkdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlclRvZ2dsZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCR0b2dnbGUuaW5uZXJIVE1MID0gc2V0dGluZ3MubW9yZUJ0bkNvbnRlbnQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkZWwuc3R5bGUubWF4SGVpZ2h0ID0gc2V0dGluZ3MudmlzaWJsZUhlaWdodCArICdweCc7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVkQ2xhc3MpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoZXhwYW5kZWRDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGRpc2FibGVkQ2xhc3MpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQnRuKCkge1xyXG5cdFx0XHRjb25zdCAkYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblx0XHRcdCRidG4uaW5uZXJIVE1MID0gc2V0dGluZ3MubW9yZUJ0bkNvbnRlbnQ7XHJcblx0XHRcdCRidG4uY2xhc3NOYW1lID0gYnRuVG9nZ2xlQ2xhc3MgKyBcIiBcIiArIGJ0blRvZ2dsZU1vcmVDbGFzcztcclxuXHJcblx0XHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MuYnRuQ2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHQkYnRuLmNsYXNzTmFtZSA9IHNldHRpbmdzLmJ0bkNsYXNzZXMgKyBcIiBcIiArICRidG4uY2xhc3NOYW1lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRidG4pO1xyXG5cclxuXHRcdFx0cmV0dXJuICRidG47XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaGFuZGxlclRvZ2dsZSgpIHtcclxuXHRcdFx0aWYgKGlzRXhwYW5kZWQpIHtcclxuXHRcdFx0XHRpc0V4cGFuZGVkID0gZmFsc2U7XHJcblx0XHRcdFx0JHRvZ2dsZS5jbGFzc0xpc3QuYWRkKGJ0blRvZ2dsZU1vcmVDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoZXhwYW5kZWRDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5zdHlsZS5tYXhIZWlnaHQgPSBzZXR0aW5ncy52aXNpYmxlSGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5jaGFuZ2VOYW1lKSByZXR1cm5cclxuXHRcdFx0XHQkdG9nZ2xlLmlubmVySFRNTCA9IHNldHRpbmdzLm1vcmVCdG5Db250ZW50O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlzRXhwYW5kZWQgPSB0cnVlO1xyXG5cdFx0XHRcdCR0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZShidG5Ub2dnbGVNb3JlQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGNvbGxhcHNlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuc3R5bGUubWF4SGVpZ2h0ID0gJGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5jaGFuZ2VOYW1lKSByZXR1cm5cclxuXHRcdFx0XHQkdG9nZ2xlLmlubmVySFRNTCA9IHNldHRpbmdzLmxlc3NCdG5Db250ZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmaXhlZEVsZW1Ub3Aoc2VsZWN0b3IpIHtcclxuXHRcdGNvbnN0ICRlbCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IHNlbGVjdG9yO1xyXG5cdFx0Y29uc3QgJHN0YXJ0aW5nUGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuXHRcdCRlbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgJHN0YXJ0aW5nUGxhY2UpO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZShcclxuXHRcdFx0ZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGxldCBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdFx0XHRsZXQgaXNGaXhlZEhlYWRlciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoZ2V0Q29tcHV0ZWRTdHlsZSgkaGVhZGVyKS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xyXG5cdFx0XHRcdFx0cGFnZVlPZmZzZXQgPSBwYWdlWU9mZnNldEJ5Tm9kZXMoJGhlYWRlcik7XHJcblx0XHRcdFx0XHRpc0ZpeGVkSGVhZGVyID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwYWdlWU9mZnNldCA+IGdldE9mZnNldFRvcCgkc3RhcnRpbmdQbGFjZSkpIHtcclxuXHRcdFx0XHRcdCRzdGFydGluZ1BsYWNlLnN0eWxlLmhlaWdodCA9ICRlbC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cdFx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoJ2ZpeGVkJyk7XHJcblx0XHRcdFx0XHQkZWwuc3R5bGUudG9wID0gaXNGaXhlZEhlYWRlciA/ICRoZWFkZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JyA6ICcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkc3RhcnRpbmdQbGFjZS5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHRcdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKCdmaXhlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0KSwgNzApXHJcblx0fVxyXG5cclxuXHQvKioqKiogVVRJTFMgKioqKioqL1xyXG5cdGZ1bmN0aW9uIGlzRWxlbShzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkgPyB0cnVlIDogZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLyDQv9C+0LvQvtC20LXQvdC40LUg0LLQtdGA0YXQsCDQstGM0Y7Qv9C+0YDRgtCwINC+0YIg0L3QsNGH0LDQu9CwINC00L7QutGD0LzQtdC90YLQsFxyXG5cdC8vIGMg0YPRh9C10YLQvtC8INC30LDQutGA0LXQv9C70LXQvdC90L7Qs9C+INGB0LLQtdGA0YXRgyDRjdC70LXQvNC10L3RgtCwXHJcblx0ZnVuY3Rpb24gcGFnZVlPZmZzZXRCeU5vZGVzKG5vZGUpIHtcclxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgc3VtbUhlaWdodCA9IDA7XHJcblxyXG5cdFx0aWYgKGFyZ3MubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0c3VtbUhlaWdodCA9IGFyZ3MucmVkdWNlKGZ1bmN0aW9uIChhY2N1bSwgaXRlbSkge1xyXG5cdFx0XHRcdHJldHVybiBhY2N1bSArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR9LCBzdW1tSGVpZ2h0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgKyBzdW1tSGVpZ2h0O1xyXG5cdH1cclxufSh3aW5kb3cpKTsiXX0=
