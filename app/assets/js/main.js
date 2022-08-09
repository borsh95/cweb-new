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
	const isFixedHeader = true;

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
			offset: 100,
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

	if (isElem('.img-switch')) {
		const card = document.querySelectorAll('.band-card');

		if (card.length) {
			card.forEach(el => {
				let currentCard = el;
				const imageSwitchItems = currentCard.querySelectorAll('.img-switch__item');
				const imagePagination = currentCard.querySelector('.img-pagination');

				if (imageSwitchItems.length > 1 && imagePagination) {
					imageSwitchItems.forEach((el, index) => {
						el.setAttribute('data-index', index);

						imagePagination.innerHTML += `<li class="img-pagination__item ${index == 0 ? 'img-pagination__item--active' : ''}" data-index="${index}"></li>`;

						el.addEventListener('mouseenter', (e) => {
							currentCard.querySelectorAll('.img-pagination__item').forEach(el => { el.classList.remove('img-pagination__item--active') });

							currentCard.querySelector(`.img-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('img-pagination__item--active');
						});

						el.addEventListener('mouseleave', (e) => {
							currentCard.querySelectorAll('.img-pagination__item').forEach(el => { el.classList.remove('img-pagination__item--active') });

							currentCard.querySelector(`.img-pagination__item[data-index="0"]`).classList.add('img-pagination__item--active');
						});
					});
				}
			});
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
			watchSlidesVisibility: true,
			watchOverflow: true,
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
		for (const $slider of document.querySelectorAll('.cards-slider')) {
			slider($slider, {
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
	}

	// page-slider 
	if (isElem('.page-slider')) {
		for (const $slider of document.querySelectorAll('.page-slider')) {
			const $parent = $slider.closest('.slider-wrap');

			new Swiper($slider, {
				autoHeight: true,
				spaceBetween: 60,
				grabCursor: true,
				slideToClickedSlide: true,
				lazy: true,
				speed: 700,
				pagination: {
					el: $parent.querySelector('.page-slider__btns'),
					clickable: true,
					renderBullet: function (index, className) {
						const slides = this.slides;
						const textBtn = slides[index].getAttribute('aria-label');

						if (textBtn) {
							return `
								<button class="${className} btn btn--white">
									${textBtn}
								</button>
							`
						}
					},
				},
			});
		}
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
		const sliderEls = document.querySelectorAll('.examples-work-slider');

		for (const slider of sliderEls) {
			new Swiper(slider, {
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
					prevEl: slider.parentElement.querySelector('.slider-arr--prev'),
					nextEl: slider.parentElement.querySelector('.slider-arr--next'),
				},
				pagination: {
					el: slider.parentElement.querySelector('.slider-pagination'),
					clickable: true,
				}
			})
		}
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

	if (isElem('[data-tooltip]')) {
		let tooltipElem;

		document.onmouseover = function (event) {
			let target = event.target.closest('[data-tooltip]');

			// если у нас есть подсказка...
			if (!target) return;

			tooltipElem = target.querySelector('.tooltip');

			// если нету dom подсказки но есть текст в атрибуте
			if (!tooltipElem && target.dataset.tooltip) {
				tooltipElem = document.createElement('div');
				tooltipElem.className = 'tooltip tooltip--open';
				tooltipElem.innerHTML = target.dataset.tooltip;
				document.body.append(tooltipElem);

				document.onmouseout = function (e) {
					tooltipElem.classList.remove('tooltip--open');
					tooltipElem = null;
					document.onmouseout = null;
				};
			} else if (!tooltipElem && !target.dataset.tooltip) {
				return false;
			}

			const widthWindow = document.documentElement.clientWidth;

			// спозиционируем его сверху от аннотируемого элемента (top-center)
			let coords = target.getBoundingClientRect();

			let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
			if (left < 0) left = 0; // не заезжать за левый край окна

			let top = (coords.top - tooltipElem.offsetHeight - 5) - 5;

			if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
				top = (coords.top + target.offsetHeight + 5) - 5;
			}

			if (tooltipElem.offsetWidth + left > widthWindow) {
				tooltipElem.style.left = `auto`;
				tooltipElem.style.right = `10px`;
				tooltipElem.style.top = `${top}px`;
				return;
			}

			tooltipElem.style.left = `${left}px`;
			tooltipElem.style.top = `${top}px`;
		};
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

	// фиксация навигации продукта
	if (isElem('.nav-panel')) {
		const $header = document.querySelector('header') || document.querySelector('.header');
		const $navPanel = document.querySelector('.nav-panel');
		let isFixedHeader = true;

		fixedElemTop($navPanel);

		const navLinkSelector = '[href*="#"]';
		const $navLinks = $navPanel.querySelectorAll(navLinkSelector);
		const sections = [];
		let indexActiveLink = null;

		for (const $navLink of $navLinks) {
			const hash = $navLink.hash;
			const section = document.querySelector(hash);

			if (section) {
				sections.push(section);
			}
		}

		if (sections.length === 0) return;

		setActiveLinkByScroll();

		window.addEventListener('scroll', setActiveLinkByScroll);

		$navPanel.addEventListener('click', function (e) {
			const link = e.target.closest('a[href*="#"]');

			if (!link) return;

			e.preventDefault();
			const sectionId = link.getAttribute('href');
			const section = document.querySelector(sectionId);

			if (!section) return;

			const sectionOffsetTop = getOffsetTop(section);

			let scrollPoint = sectionOffsetTop - $navPanel.offsetHeight + 10;

			if (isFixedHeader) {
				scrollPoint = scrollPoint - $header.offsetHeight;
			}

			window.scrollTo(0, scrollPoint);
		})

		function setActiveLinkByScroll() {
			const topSections = sections.map($section => {
				return getOffsetTop($section);
			});

			let currentActiveIndex = null;
			const firstSectionTopCoords = topSections[0];
			const lastSectionBottomCoords = topSections[topSections.length - 1] + sections[topSections.length - 1].offsetHeight;

			let offsetTopByNodes = pageYOffsetByNodes($navPanel);

			if (isFixedHeader) {
				offsetTopByNodes = pageYOffsetByNodes($navPanel, $header);
			}

			if (offsetTopByNodes < firstSectionTopCoords || offsetTopByNodes > lastSectionBottomCoords) {
				if (indexActiveLink === null) return;

				$navLinks[indexActiveLink].classList.remove('active');
				indexActiveLink = null;
				return;
			}

			for (let i = 0; i < topSections.length; i++) {
				if (offsetTopByNodes > topSections[i]) {
					currentActiveIndex = i;
				}
			}

			if (indexActiveLink !== currentActiveIndex && currentActiveIndex !== null) {
				indexActiveLink = currentActiveIndex;
				changeNavActive($navLinks[indexActiveLink])
			}
		}

		function changeNavActive(newNavLinkNode) {
			for (let i = 0; i < $navLinks.length; i++) {
				$navLinks[i].classList.remove('active');
			}

			newNavLinkNode.classList.add('active');
		}
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
		let headerDom = document.querySelector('header') || document.querySelector('.header');

		return function () {
			let _mainElement = {}, // .accordion 
				_items = {}; // .accordion-item 

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

		window.addEventListener('scroll', throttle(function () {
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
		}, 0
		))
	};

	//video
	(function () {
		findVideos();

		function findVideos() {
			let videos = document.querySelectorAll('.video');

			for (let i = 0; i < videos.length; i++) {
				setupVideo(videos[i]);
			}
		}

		// ленивая загрузка видео 
		function setupVideo(video) {
			let link = video.querySelector('.video__link');
			const hrefLink = link.href;
			let media = video.querySelector('.video__media');
			let button = video.querySelector('.video__button');
			let deletedLength = 'https://youtu.be/'.length;
			let videoId = hrefLink.substring(deletedLength, hrefLink.length);
			let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';

			media.src = youtubeImgSrc;

			video.addEventListener('click', () => {
				let iframe = createIframe(videoId);

				link.remove();
				button.remove();
				video.appendChild(iframe);
			});

			link.removeAttribute('href');
			video.classList.add('video--enabled');
		}

		function createIframe(id) {
			let iframe = document.createElement('iframe');

			iframe.setAttribute('allowfullscreen', '');
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write;');
			iframe.setAttribute('src', generateURL(id));
			iframe.classList.add('video__media');

			return iframe;
		}

		function generateURL(id) {
			let query = '?rel=0&showinfo=1&autoplay=1';

			return 'https://www.youtube.com/embed/' + id + query;
		}
	}());

	document.addEventListener('click', function (e) {
		if (e.target.closest('.scroll-to[href*="#"]')) {
			const link = e.target.closest('.scroll-to[href*="#"]');
			const id = link.hash;
			const $section = document.querySelector(id);

			if (!$section) return;

			e.preventDefault();

			let coordsSection = window.pageYOffset + $section.getBoundingClientRect().top;

			if (isFixedHeader) {
				const $header = document.querySelector('.header') || document.querySelector('header');
				coordsSection = coordsSection - $header.offsetHeight;
			}

			window.scrollTo(0, coordsSection);
		}
	})

	if (isElem('[data-active-coins]')) {
		const coinParentEls = document.querySelectorAll('[data-active-coins]');


		for (const coinParentEl of coinParentEls) {
			const count = coinParentEl.dataset.activeCoins;
			const childrenCoinEls = coinParentEl.children;

			if (!count) return;

			Array.from(childrenCoinEls).filter((item, i) => i >= count).map(item => item.dataset.disabledCoin = "");
		}
	}

	/***** UTILS ******/
	function isElem(selector) {
		return (document.querySelector(selector)) ? true : false;
	}

	function throttle(func, ms = 50) {
		let locked = false;

		return function () {
			if (locked) return;

			const context = this;
			const args = arguments;
			locked = true;

			setTimeout(() => {
				func.apply(context, args);
				locked = false;
			}, ms)
		}
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

	function getOffsetTop(node) {
		return window.pageYOffset + node.getBoundingClientRect().top;
	}
}(window));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4oZnVuY3Rpb24gKHdpbmRvdykge1xyXG5cdGNvbnN0IGJyZWFrUG9pbnQgPSB7XHJcblx0XHRkZXNjdG9wOiAxOTIwLFxyXG5cdFx0ZGVzY3RvcE1pZDogMTQ1MCxcclxuXHRcdGRlc2N0b3BNaW46IDEyMjAsXHJcblx0XHR0YWJsZTogMTA3MCxcclxuXHRcdG1vYmlsZTogNzY4LFxyXG5cdFx0dGVsOiA0ODAsXHJcblx0fVxyXG5cdGNvbnN0IGlzRml4ZWRIZWFkZXIgPSB0cnVlO1xyXG5cclxuXHQvLyBtb2JpbGUgbWVudVxyXG5cdGlmIChpc0VsZW0oJy5tb2JpbGUtbWVudScpKSB7XHJcblx0XHRjb25zdCBtb2JpbGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZS1tZW51Jyk7XHJcblxyXG5cdFx0YnJvTWVudShtb2JpbGVNZW51KS5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuc2VydmljZXMtbWVudScpKSB7XHJcblx0XHRjb25zdCBzZXJ2aWNlc01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtbWVudScpO1xyXG5cclxuXHRcdGJyb01lbnUoc2VydmljZXNNZW51LCB7XHJcblx0XHRcdG5leHRCdG46ICcuYnJvLW1lbnVfX25leHQnLFxyXG5cdFx0XHRhcnJvdzogYFxyXG5cdFx0PHN2ZyB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMjVcIiB2aWV3Qm94PVwiMCAwIDE5IDE5XCI+XHJcblx0XHQ8cGF0aCBkPVwiTTAuNzM1OTE2IDkuNTAwMDRDMC43MzU5MTYgNC42NTk3NSA0LjY1OTc1IDAuNzM1OTE4IDkuNTAwMDQgMC43MzU5MThDMTQuMzQwMyAwLjczNTkxOCAxOC4yNjQyIDQuNjU5NzUgMTguMjY0MiA5LjUwMDA0QzE4LjI2NDIgMTQuMzQwMyAxNC4zNDAzIDE4LjI2NDIgOS41MDAwNCAxOC4yNjQyQzQuNjU5NzUgMTguMjY0MiAwLjczNTkxNiAxNC4zNDAzIDAuNzM1OTE2IDkuNTAwMDRaXCIgZmlsbD1cImluaGVyaXRcIi8+XHJcblx0XHQ8cGF0aCBkPVwiTTAgOS41QzAgMTQuNzM3OSA0LjI2MTM4IDE5IDkuNSAxOUMxNC43Mzc5IDE5IDE5IDE0LjczNzkgMTkgOS41QzE5IDQuMjYxMzggMTQuNzM3OSAwIDkuNSAwQzQuMjYxMzggMCAwIDQuMjYxMzggMCA5LjVaTTE3LjUyODMgOS41QzE3LjUyODMgMTMuOTI3IDEzLjkyNyAxNy41MjgzIDkuNSAxNy41MjgzQzUuMDczMDQgMTcuNTI4MyAxLjQ3MTcyIDEzLjkyNyAxLjQ3MTcyIDkuNUMxLjQ3MTcyIDUuMDczMDQgNS4wNzM3OCAxLjQ3MTcyIDkuNSAxLjQ3MTcyQzEzLjkyNyAxLjQ3MTcyIDE3LjUyODMgNS4wNzMwNCAxNy41MjgzIDkuNVpcIiBmaWxsPVwiaW5oZXJpdFwiLz5cclxuXHRcdDxwYXRoIGQ9XCJNNy40NTQzMiA1LjI5ODI0QzcuMTY4OCA1LjU4NTI1IDcuMTY4OCA2LjA0ODgxIDcuNDU0MzIgNi4zMzU4MkwxMC42MTEyIDkuNDkyNjdMNy40NTQzMiAxMi42NDk1QzcuMTkwMTQgMTIuOTU3OSA3LjIyNjIxIDEzLjQyMjkgNy41MzQ1MSAxMy42ODcxQzcuODA5NzEgMTMuOTIzMyA4LjIxNjY2IDEzLjkyMzMgOC40OTE4NiAxMy42ODcxTDEyLjE3MTIgMTAuMDA3OEMxMi40NTY3IDkuNzIwNzkgMTIuNDU2NyA5LjI1NzIyIDEyLjE3MTIgOC45NzAyMUw4LjQ5MTg2IDUuMjkwODlDOC4yMDI2NyA1LjAwNzU2IDcuNzM5MDkgNS4wMTA1MyA3LjQ1NDMyIDUuMjk4MjRaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cclxuXHRcdDwvc3ZnPlxyXG5cdFx0YFxyXG5cdFx0fSkuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmItdGFicycpKSB7XHJcblx0XHRjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFicycpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgdGFiIG9mIHRhYnMpIHtcclxuXHRcdFx0YlRhYnModGFiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5hY2NhcmRpb24nKSkge1xyXG5cdFx0Y29uc3QgYWNjYXJkaW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NhcmRpb24nKTtcclxuXHRcdGNvbnN0IGFjY2FyZGlvblBsYWdpbiA9IGFjY2FyZGlvbigpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgaXRlbSBvZiBhY2NhcmRpb25zKSB7XHJcblx0XHRcdGFjY2FyZGlvblBsYWdpbigpLmluaXQoaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAod2luZG93LkFPUyAmJiBpc0VsZW0oJ1tkYXRhLWFvc10nKSkge1xyXG5cdFx0QU9TLmluaXQoe1xyXG5cdFx0XHQvL2Rpc2FibGU6IFwibW9iaWxlXCIsXHJcblx0XHRcdGR1cmF0aW9uOiAyMDAwLFxyXG5cdFx0XHRvZmZzZXQ6IDEwMCxcclxuXHRcdFx0b25jZTogdHJ1ZSxcclxuXHRcdFx0YW5jaG9yUGxhY2VtZW50OiAnYm90dG9tLWJvdHRvbSdcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmpzLXJlYWRtb3JlJykpIHtcclxuXHRcdGNvbnN0ICRyZWFkbW9yZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkbW9yZScpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgJGl0ZW0gb2YgJHJlYWRtb3JlRWxzKSB7XHJcblxyXG5cdFx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0XHR2aXNpYmxlSGVpZ2h0OiAxNzAsXHJcblx0XHRcdFx0bW9yZUJ0bkNvbnRlbnQ6IGBcclxuXHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE5XCIgaGVpZ2h0PVwiMTFcIiB2aWV3Qm94PVwiMCAwIDE5IDExXCI+XHJcblx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNOC41NDYxNSAxMC4xNDMxTDAuMjI0NjQ2IDEuNjM4MzdDLTAuMDQ3ODM4NiAxLjM1OTczIC0wLjA0NzM4MDUgMC45MDg1ODcgMC4yMjYwNTUgMC42MzA0MDZDMC40OTk0NTYgMC4zNTI0NCAwLjk0MjM0NCAwLjM1MzE1OCAxLjIxNTA0IDAuNjMxODQzTDkuMDQxMjYgOC42MzAzN0wxNi44Njc0IDAuNjMxNTU1QzE3LjE0MDIgMC4zNTI5MDcgMTcuNTgyOCAwLjM1MjE4OCAxNy44NTYyIDAuNjMwMTE5QzE3Ljk5MzMgMC43Njk1NjggMTguMDYxOCAwLjk1MjI1OCAxOC4wNjE4IDEuMTM0OTVDMTguMDYxOCAxLjMxNzE3IDE3Ljk5MzcgMS40OTkxNCAxNy44NTc2IDEuNjM4MzRMOS41MzYzMyAxMC4xNDMxQzkuNDA1MzIgMTAuMjc3MyA5LjIyNzAyIDEwLjM1MjYgOS4wNDEyNiAxMC4zNTI2QzguODU1NDkgMTAuMzUyNiA4LjY3NzQgMTAuMjc3MSA4LjU0NjE1IDEwLjE0MzFaXCIgZmlsbD1cImluaGVyaXRcIi8+XHJcblx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0YCxcclxuXHRcdFx0XHRidG5DbGFzc2VzOiAnYnRuIGJ0bi0tc2Vjb25kYXJ5IGJ0bi0tY2lyYycsXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlYWRtb3JlKCRpdGVtLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5pbWctc3dpdGNoJykpIHtcclxuXHRcdGNvbnN0IGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFuZC1jYXJkJyk7XHJcblxyXG5cdFx0aWYgKGNhcmQubGVuZ3RoKSB7XHJcblx0XHRcdGNhcmQuZm9yRWFjaChlbCA9PiB7XHJcblx0XHRcdFx0bGV0IGN1cnJlbnRDYXJkID0gZWw7XHJcblx0XHRcdFx0Y29uc3QgaW1hZ2VTd2l0Y2hJdGVtcyA9IGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWctc3dpdGNoX19pdGVtJyk7XHJcblx0XHRcdFx0Y29uc3QgaW1hZ2VQYWdpbmF0aW9uID0gY3VycmVudENhcmQucXVlcnlTZWxlY3RvcignLmltZy1wYWdpbmF0aW9uJyk7XHJcblxyXG5cdFx0XHRcdGlmIChpbWFnZVN3aXRjaEl0ZW1zLmxlbmd0aCA+IDEgJiYgaW1hZ2VQYWdpbmF0aW9uKSB7XHJcblx0XHRcdFx0XHRpbWFnZVN3aXRjaEl0ZW1zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpbWFnZVBhZ2luYXRpb24uaW5uZXJIVE1MICs9IGA8bGkgY2xhc3M9XCJpbWctcGFnaW5hdGlvbl9faXRlbSAke2luZGV4ID09IDAgPyAnaW1nLXBhZ2luYXRpb25fX2l0ZW0tLWFjdGl2ZScgOiAnJ31cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj48L2xpPmA7XHJcblxyXG5cdFx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50Q2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuaW1nLXBhZ2luYXRpb25fX2l0ZW0nKS5mb3JFYWNoKGVsID0+IHsgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaW1nLXBhZ2luYXRpb25fX2l0ZW0tLWFjdGl2ZScpIH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50Q2FyZC5xdWVyeVNlbGVjdG9yKGAuaW1nLXBhZ2luYXRpb25fX2l0ZW1bZGF0YS1pbmRleD1cIiR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnaW1nLXBhZ2luYXRpb25fX2l0ZW0tLWFjdGl2ZScpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWctcGFnaW5hdGlvbl9faXRlbScpLmZvckVhY2goZWwgPT4geyBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpbWctcGFnaW5hdGlvbl9faXRlbS0tYWN0aXZlJykgfSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3IoYC5pbWctcGFnaW5hdGlvbl9faXRlbVtkYXRhLWluZGV4PVwiMFwiXWApLmNsYXNzTGlzdC5hZGQoJ2ltZy1wYWdpbmF0aW9uX19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqKioqIENVU1RPTSBQTFVHSU4gKioqKioqL1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGNvbnN0ICR0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcblx0XHRpZiAoJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1jb3B5XTpub3QoLmRpc2FibGVkKScpKSB7XHJcblx0XHRcdGNvbnN0ICRkYXRhQ29weUVsID0gJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1jb3B5XScpO1xyXG5cdFx0XHQkZGF0YUNvcHlFbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCgkZGF0YUNvcHlFbC5kYXRhc2V0LmNvcHkpO1xyXG5cclxuXHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0bm90aWZpY2F0aW9uRWwuY2xhc3NOYW1lID0gJ2NvcHktbm90aWZpY2F0aW9uJztcclxuXHRcdFx0bm90aWZpY2F0aW9uRWwudGV4dENvbnRlbnQgPSAn0KHQutC+0L/QuNGA0L7QstCw0L3QvdC+INCyINCx0YPRhNC10YAg0L7QsdC80LXQvdCwJztcclxuXHRcdFx0JGRhdGFDb3B5RWwuYXBwZW5kKG5vdGlmaWNhdGlvbkVsKTtcclxuXHJcblx0XHRcdGxldCBsZWZ0ID0gMCArICgkZGF0YUNvcHlFbC5vZmZzZXRXaWR0aCAtIG5vdGlmaWNhdGlvbkVsLm9mZnNldFdpZHRoKSAvIDI7XHJcblx0XHRcdG5vdGlmaWNhdGlvbkVsLnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xyXG5cclxuXHRcdFx0Ly8g0YHQv9C+0LfQuNGG0LjQvtC90LjRgNGD0LXQvCDQtdCz0L4g0YHQstC10YDRhdGDINC+0YIg0LDQvdC90L7RgtC40YDRg9C10LzQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCAodG9wLWNlbnRlcilcclxuXHRcdFx0bGV0IGNvb3Jkc05vdGlmeSA9IG5vdGlmaWNhdGlvbkVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRjb25zdCB7IHRvcDogY29vcmRUb3AsIHJpZ2h0OiBjb29yZFJpZ2h0LCBib3R0b206IGNvb3JkQm90dG9tLCBsZWZ0OiBjb29yZExlZnQgfSA9IGNvb3Jkc05vdGlmeTtcclxuXHJcblx0XHRcdGlmIChjb29yZExlZnQgPCAwKSB7XHJcblx0XHRcdFx0bm90aWZpY2F0aW9uRWwuc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb29yZFRvcCA8IDApIHtcclxuXHRcdFx0XHRub3RpZmljYXRpb25FbC5zdHlsZS50b3AgPSBcIjEwMCVcIjtcclxuXHRcdFx0XHRub3RpZmljYXRpb25FbC5zdHlsZS5ib3R0b20gPSBcImF1dG9cIjtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RpZmljYXRpb25FbC5jbGFzc0xpc3QuYWRkKCdjb3B5LW5vdGlmaWNhdGlvbi0tYW5pbWF0ZWQnKSB9LCAxMCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RpZmljYXRpb25FbC5jbGFzc0xpc3QucmVtb3ZlKCdjb3B5LW5vdGlmaWNhdGlvbi0tYW5pbWF0ZWQnKSB9LCAyMDEwKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0bm90aWZpY2F0aW9uRWwucmVtb3ZlKCk7XHJcblx0XHRcdFx0JGRhdGFDb3B5RWwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuXHRcdFx0fSwgMjUwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vSGFtYnVyZ2VyXHJcblx0KGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IGhhbWJ1cmdlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2hhbWJ1cmdlcicpO1xyXG5cdFx0Y29uc3QgYnVyZ2VyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXInKTtcclxuXHRcdGNvbnN0IGJ1cmdlcklubmVyID0gYnVyZ2VyQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyLWlubmVyJyk7XHJcblx0XHRjb25zdCBib2R5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblx0XHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuXHJcblx0XHRoYW1idXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRidXJnZXJCbG9jay5zdHlsZS50b3AgPSBoZWFkZXIub2Zmc2V0SGVpZ2h0IC0gMSArICdweCc7XHJcblxyXG5cdFx0XHRsZXQgaXNBY3RpdmUgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7XHJcblx0XHRcdGJ1cmdlckJsb2NrLmNsYXNzTGlzdFtpc0FjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSddKCdvcGVuJyk7XHJcblx0XHRcdGJ1cmdlcklubmVyLnN0eWxlLm1heEhlaWdodCA9IChpc0FjdGl2ZSkgPyBgY2FsYygxMDB2aCAtICR7aGVhZGVyLm9mZnNldEhlaWdodH1weClgIDogJyc7XHJcblx0XHRcdGJvZHlFbC5zdHlsZS5vdmVyZmxvdyA9IChpc0FjdGl2ZSkgPyAnaGlkZGVuJyA6ICcnO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gOTcwICYmIGJ1cmdlckJsb2NrLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcblx0XHRcdFx0aGFtYnVyZ2VyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGJ1cmdlckJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHRcdFx0XHRib2R5RWwuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0YnVyZ2VyQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRpZiAoIWUudGFyZ2V0LmNvbnRhaW5zKGJ1cmdlckJsb2NrKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0aGFtYnVyZ2VyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRidXJnZXJCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0XHRcdGJvZHlFbC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cdFx0fSk7XHJcblx0fSgpKTtcclxuXHJcblx0Ly9maXhlZCBoZWFkZXJcclxuXHRpZiAoaXNFbGVtKCdoZWFkZXInKSkge1xyXG5cdFx0bGV0IGZpeGVkSGVhZGVyID0gc2hvd0hlYWRlcignaGVhZGVyJyk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2hvd0hlYWRlcihlbCkge1xyXG5cdFx0XHRjb25zdCAkZWwgPSAodHlwZW9mIGVsID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSA6IGVsO1xyXG5cdFx0XHRjb25zdCBodG1sRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblx0XHRcdGxldCBvZmZzZXRUb3BFbCA9ICRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblxyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiBvZmZzZXRUb3BFbCArIDIwKSB7XHJcblx0XHRcdFx0XHRzaG93KCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGZpeGVkKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0d2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdG9mZnNldFRvcEVsID0gJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gc2hvdygpIHtcclxuXHRcdFx0XHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnZml4ZWQnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPiAxMDI0KSB7XHJcblx0XHRcdFx0XHRodG1sRWwuc3R5bGUucGFkZGluZ1RvcCA9ICRlbC5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGh0bWxFbC5zdHlsZS5wYWRkaW5nVG9wID0gJGVsLm9mZnNldEhlaWdodCArIFwicHhcIjtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gZml4ZWQoKSB7XHJcblx0XHRcdFx0aWYgKCEkZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaXhlZCcpKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKCdmaXhlZCcpO1xyXG5cdFx0XHRcdGh0bWxFbC5zdHlsZS5wYWRkaW5nVG9wID0gJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2hvdyxcclxuXHRcdFx0XHRmaXhlZCxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8g0L/QvtC0INC80LXQvdGOINGBINCz0LDQvNCx0YPRgNCz0LXRgNC+0Lwg0LLQvdGD0YLRgNC4INC+0YHQvdC+0LLQvdC+0LPQviDQvNC10L3RjlxyXG5cdGlmIChpc0VsZW0oJy5tZW51X19pdGVtLS1kcm9wJykpIHtcclxuXHRcdGNvbnN0IG1lbnVEcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2l0ZW0tLWRyb3AnKTtcclxuXHRcdGNvbnN0IHRvZ2dsZSA9IG1lbnVEcm9wLnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19pdGVtLXRvZ2dsZScpO1xyXG5cdFx0Y29uc3QgbGlua2J0biA9IG1lbnVEcm9wLnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19pdGVtLXRvZ2dsZSB+IC5tZW51X19saW5rJyk7XHJcblxyXG5cdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRcdG1lbnVEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGlua2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRtZW51RHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2KSB7XHJcblx0XHRcdGlmICghZXYudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19pdGVtLS1kcm9wJykpIHtcclxuXHRcdFx0XHRpZiAobWVudURyb3AuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0dG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0bWVudURyb3AuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gbWFpbiBzbGlkZXIgXHJcblx0aWYgKGlzRWxlbSgnLm1haW4tc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWFpbi1zbGlkZXInKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IHNsaWRlciBvZiBzbGlkZXJzKSB7XHJcblx0XHRcdG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcblx0XHRcdFx0ZWZmZWN0OiBcImNvdmVyZmxvd1wiLFxyXG5cdFx0XHRcdHNwZWVkOiA3MDAsXHJcblx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZSxcclxuXHRcdFx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHRcdGNvdmVyZmxvd0VmZmVjdDoge1xyXG5cdFx0XHRcdFx0cm90YXRlOiA1MCxcclxuXHRcdFx0XHRcdHN0cmV0Y2g6IDAsXHJcblx0XHRcdFx0XHRkZXB0aDogMTAwLFxyXG5cdFx0XHRcdFx0bW9kaWZpZXI6IDEsXHJcblx0XHRcdFx0XHRzbGlkZVNoYWRvd3M6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0XHRuZXh0RWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1uZXh0JyksXHJcblx0XHRcdFx0XHRwcmV2RWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1wcmV2JyksXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBiYW5kIHNsaWRlclxyXG5cdGlmIChpc0VsZW0oJy5iYW5kLXNsaWRlcicpKSB7XHJcblx0XHRjb25zdCBzbGlkZXJCYW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhbmQtc2xpZGVyJyk7XHJcblxyXG5cdFx0Y29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXJCYW5kLCB7XHJcblx0XHRcdGdyYWJDdXJzb3I6IHRydWUsXHJcblx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IFwiYXV0b1wiLFxyXG5cdFx0XHRzcGFjZUJldHdlZW46IDMyLFxyXG5cdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0d2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxyXG5cdFx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHRub1N3aXBpbmdTZWxlY3RvcjogJ2J1dHRvbicsXHJcblx0XHRcdHNwZWVkOiA1MDAsXHJcblxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAxMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2OToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEyMjE6IHtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0bmV4dEVsOiBzbGlkZXJCYW5kLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHRwcmV2RWw6IHNsaWRlckJhbmQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRzd2lwZXIub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c3dpcGVyLnVwZGF0ZSgpO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIHJldmlld3Mgc2xpZGVyXHJcblx0aWYgKGlzRWxlbSgnLnJldmlld3Mtc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHJldmlld3NTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3cy1zbGlkZXInKTtcclxuXHJcblx0XHRjb25zdCBzd2lwZXIgPSBzbGlkZXIocmV2aWV3c1NsaWRlciwge1xyXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRzcGFjZUJldHdlZW46IDM1LFxyXG5cdFx0XHRzcGVlZDogNzAwLFxyXG5cdFx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMwMDoge1xyXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAxLFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyNSxcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NDgxOiB7XHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjUsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMSxcclxuXHRcdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAzLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0W2JyZWFrUG9pbnQudGFibGVdOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDQsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDMwLFxyXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmNsaWVudHMtc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGllbnRzLXNsaWRlcicpO1xyXG5cclxuXHRcdG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcblx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMjQsXHJcblx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdHNwZWVkOiA1MDAsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRuZXh0RWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1uZXh0JyksXHJcblx0XHRcdFx0cHJldkVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5pbmZvLXNsaWRlcicpKSB7XHJcblx0XHRuZXcgU3dpcGVyKCcuaW5mby1zbGlkZXInLCB7XHJcblx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRzcGFjZUJldHdlZW46IDEwMCxcclxuXHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHQzMjA6IHtcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEwNzE6IHtcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0ZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXNsaWRlci13cmFwIC5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIFx0YmFuZCBzbGlkZXIgXHJcblx0aWYgKGlzRWxlbSgnLmNhcmRzLXNsaWRlcicpKSB7XHJcblx0XHRmb3IgKGNvbnN0ICRzbGlkZXIgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmRzLXNsaWRlcicpKSB7XHJcblx0XHRcdHNsaWRlcigkc2xpZGVyLCB7XHJcblx0XHRcdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcclxuXHRcdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0XHQzMDA6IHtcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRbYnJlYWtQb2ludC50YWJsZSArIDFdOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gcGFnZS1zbGlkZXIgXHJcblx0aWYgKGlzRWxlbSgnLnBhZ2Utc2xpZGVyJykpIHtcclxuXHRcdGZvciAoY29uc3QgJHNsaWRlciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZS1zbGlkZXInKSkge1xyXG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJHNsaWRlci5jbG9zZXN0KCcuc2xpZGVyLXdyYXAnKTtcclxuXHJcblx0XHRcdG5ldyBTd2lwZXIoJHNsaWRlciwge1xyXG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiA2MCxcclxuXHRcdFx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdFx0bGF6eTogdHJ1ZSxcclxuXHRcdFx0XHRzcGVlZDogNzAwLFxyXG5cdFx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRcdGVsOiAkcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXNsaWRlcl9fYnRucycpLFxyXG5cdFx0XHRcdFx0Y2xpY2thYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0cmVuZGVyQnVsbGV0OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBzbGlkZXMgPSB0aGlzLnNsaWRlcztcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGV4dEJ0biA9IHNsaWRlc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGV4dEJ0bikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBgXHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHtjbGFzc05hbWV9IGJ0biBidG4tLXdoaXRlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdCR7dGV4dEJ0bn1cclxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdGBcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oXCIudHdlbnR5LWJcIikpIHtcclxuXHRcdCQoXCIudHdlbnR5LWJcIikudHdlbnR5dHdlbnR5KCk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuZ2FsbGVyeS1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnktc2xpZGVyJyk7XHJcblxyXG5cdFx0Y29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuXHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDEsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDYwLFxyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2OToge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMDcxOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDAsXHJcblx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0ZWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0c3dpcGVyLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHN3aXBlci51cGRhdGUoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmV4YW1wbGVzLXdvcmstc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlckVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGFtcGxlcy13b3JrLXNsaWRlcicpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qgc2xpZGVyIG9mIHNsaWRlckVscykge1xyXG5cdFx0XHRuZXcgU3dpcGVyKHNsaWRlciwge1xyXG5cdFx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxyXG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQ3Njk6IHtcclxuXHRcdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMyxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRcdHByZXZFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdFx0XHRcdG5leHRFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRcdGVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXBhZ2luYXRpb24nKSxcclxuXHRcdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCdoZWFkZXIgLmJyby1tZW51JykpIHtcclxuXHRcdGNvbnN0ICRtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIC5icm8tbWVudScpO1xyXG5cdFx0Y29uc3QgbWVudSA9IGJyb01lbnUoJG1lbnUpO1xyXG5cclxuXHRcdHRvZ2dsZU1lbnUoKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdG9nZ2xlTWVudSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyNSkge1xyXG5cdFx0XHRcdG1lbnUuaW5pdCgpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtZW51LmRlc3Ryb3koKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnW2RhdGEtdG9vbHRpcF0nKSkge1xyXG5cdFx0bGV0IHRvb2x0aXBFbGVtO1xyXG5cclxuXHRcdGRvY3VtZW50Lm9ubW91c2VvdmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcF0nKTtcclxuXHJcblx0XHRcdC8vINC10YHQu9C4INGDINC90LDRgSDQtdGB0YLRjCDQv9C+0LTRgdC60LDQt9C60LAuLi5cclxuXHRcdFx0aWYgKCF0YXJnZXQpIHJldHVybjtcclxuXHJcblx0XHRcdHRvb2x0aXBFbGVtID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy50b29sdGlwJyk7XHJcblxyXG5cdFx0XHQvLyDQtdGB0LvQuCDQvdC10YLRgyBkb20g0L/QvtC00YHQutCw0LfQutC4INC90L4g0LXRgdGC0Ywg0YLQtdC60YHRgiDQsiDQsNGC0YDQuNCx0YPRgtC1XHJcblx0XHRcdGlmICghdG9vbHRpcEVsZW0gJiYgdGFyZ2V0LmRhdGFzZXQudG9vbHRpcCkge1xyXG5cdFx0XHRcdHRvb2x0aXBFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdFx0dG9vbHRpcEVsZW0uY2xhc3NOYW1lID0gJ3Rvb2x0aXAgdG9vbHRpcC0tb3Blbic7XHJcblx0XHRcdFx0dG9vbHRpcEVsZW0uaW5uZXJIVE1MID0gdGFyZ2V0LmRhdGFzZXQudG9vbHRpcDtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZCh0b29sdGlwRWxlbSk7XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50Lm9ubW91c2VvdXQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0dG9vbHRpcEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndG9vbHRpcC0tb3BlbicpO1xyXG5cdFx0XHRcdFx0dG9vbHRpcEVsZW0gPSBudWxsO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQub25tb3VzZW91dCA9IG51bGw7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSBlbHNlIGlmICghdG9vbHRpcEVsZW0gJiYgIXRhcmdldC5kYXRhc2V0LnRvb2x0aXApIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IHdpZHRoV2luZG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdFx0Ly8g0YHQv9C+0LfQuNGG0LjQvtC90LjRgNGD0LXQvCDQtdCz0L4g0YHQstC10YDRhdGDINC+0YIg0LDQvdC90L7RgtC40YDRg9C10LzQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCAodG9wLWNlbnRlcilcclxuXHRcdFx0bGV0IGNvb3JkcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRcdGxldCBsZWZ0ID0gY29vcmRzLmxlZnQgKyAodGFyZ2V0Lm9mZnNldFdpZHRoIC0gdG9vbHRpcEVsZW0ub2Zmc2V0V2lkdGgpIC8gMjtcclxuXHRcdFx0aWYgKGxlZnQgPCAwKSBsZWZ0ID0gMDsgLy8g0L3QtSDQt9Cw0LXQt9C20LDRgtGMINC30LAg0LvQtdCy0YvQuSDQutGA0LDQuSDQvtC60L3QsFxyXG5cclxuXHRcdFx0bGV0IHRvcCA9IChjb29yZHMudG9wIC0gdG9vbHRpcEVsZW0ub2Zmc2V0SGVpZ2h0IC0gNSkgLSA1O1xyXG5cclxuXHRcdFx0aWYgKHRvcCA8IDApIHsgLy8g0LXRgdC70Lgg0L/QvtC00YHQutCw0LfQutCwINC90LUg0L/QvtC80LXRidCw0LXRgtGB0Y8g0YHQstC10YDRhdGDLCDRgtC+INC+0YLQvtCx0YDQsNC20LDRgtGMINC10ZEg0YHQvdC40LfRg1xyXG5cdFx0XHRcdHRvcCA9IChjb29yZHMudG9wICsgdGFyZ2V0Lm9mZnNldEhlaWdodCArIDUpIC0gNTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRvb2x0aXBFbGVtLm9mZnNldFdpZHRoICsgbGVmdCA+IHdpZHRoV2luZG93KSB7XHJcblx0XHRcdFx0dG9vbHRpcEVsZW0uc3R5bGUubGVmdCA9IGBhdXRvYDtcclxuXHRcdFx0XHR0b29sdGlwRWxlbS5zdHlsZS5yaWdodCA9IGAxMHB4YDtcclxuXHRcdFx0XHR0b29sdGlwRWxlbS5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dG9vbHRpcEVsZW0uc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xyXG5cdFx0XHR0b29sdGlwRWxlbS5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8vINC+0LHRgNCw0LHQvtGC0LrQsCDRgdC+0LHRi9GC0LjQuSDQvdCwINC60L3QvtC/0L7QuiDRgdCw0LnRgtCwXHJcblx0Ly8g0LrQvtGC0L7RgNGL0LUg0LjQvNC10Y7RgiDQsNGC0YDQuNCx0YPRgiBkYXRhLWJ0bi10eXBlXHJcblx0aWYgKGlzRWxlbSgnW2RhdGEtYnRuLXR5cGVdJykpIHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0aWYgKCFlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1idG4tdHlwZV0nKSkge1xyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi10eXBlPVwidG9nZ2xlQ2xhc3NcIl0uYWN0aXZlJylcclxuXHRcdFx0XHRcdCYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi10eXBlPVwidG9nZ2xlQ2xhc3NcIl0uYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1idG4tdHlwZV0nKSkge1xyXG5cdFx0XHRcdGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWJ0bi10eXBlXScpO1xyXG5cclxuXHRcdFx0XHRpZiAoYnRuLmRhdGFzZXQuYnRuVHlwZSA9PT0gJ3RvZ2dsZUNsYXNzJykge1xyXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi10eXBlPVwidG9nZ2xlQ2xhc3NcIl0uYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYnRuLXR5cGU9XCJ0b2dnbGVDbGFzc1wiXS5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5kcm9wJykpIHtcclxuXHRcdGNvbnN0IGRyb3BFbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcCcpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgZHJvcEVsIG9mIGRyb3BFbExpc3QpIHtcclxuXHRcdFx0ZHJvcGRvd24oZHJvcEVsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8v0L/QvtC60LDQtyDQvtC60L3QsCDRgdGC0LDRgtC40YHRgtC40LrQuCDQuiDQsdC70L7QutC1INC60LXQudGB0LBcclxuXHRpZiAoaXNFbGVtKCcuc2VydmljZS10b29sJykpIHtcclxuXHRcdGxldCBsYXN0T3BlbkVsO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0Y29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlcnZpY2UtdG9vbF9fYnRuJyk7XHJcblxyXG5cdFx0XHRpZiAobGFzdE9wZW5FbCAmJiBsYXN0T3BlbkVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRsYXN0T3BlbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGxhc3RPcGVuRWwgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoYnRuKSB7XHJcblx0XHRcdFx0YnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGxhc3RPcGVuRWwgPSBidG47XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvL3YtbW9kYWxcclxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnYtbW9kYWwnKSkge1xyXG5cdFx0Y29uc3QgbW9kYWxFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52LW1vZGFsJyk7XHJcblx0XHRjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cdFx0Y29uc3QgdHlwZU9wZW4gPSBcIm9wZW5Nb2RhbFwiO1xyXG5cdFx0Y29uc3QgdHlwZUNsb3NlID0gJ2Nsb3NlTW9kYWwnO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0Y29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnV0dG9uLXR5cGVdJyk7XHJcblx0XHRcdGlmIChidG4gJiYgYnRuLmRhdGFzZXQuYnV0dG9uVHlwZSA9PT0gdHlwZU9wZW4pIHtcclxuXHJcblx0XHRcdFx0Y29uc3Qgc2Nyb2xsQmFyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGJvZHkub2Zmc2V0V2lkdGg7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRtb2RhbEVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblx0XHRcdFx0Ym9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3YtbW9kYWxfX2lubmVyJykgfHwgZS50YXJnZXQuZGF0YXNldC5idXR0b25UeXBlID09PSB0eXBlQ2xvc2UpIHtcclxuXHRcdFx0XHRtb2RhbEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdFx0XHRib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1sYWJlbC1maWxlJykpIHtcclxuXHRcdGZvciAoY29uc3QgJHVwbG9hZGVyIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1sYWJlbC1maWxlJykpIHtcclxuXHRcdFx0ZmlsZUlucHV0KCR1cGxvYWRlcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyB2LXVwINC60L3QvtC/0LrQsCDQstCy0LXRgNGFXHJcblx0KGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgXHJcblx0XHQ8ZGl2IGNsYXNzPVwidi11cFwiPjwvZGl2PlxyXG5cdGApO1xyXG5cclxuXHRcdGNvbnN0IGJ0bkRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudi11cCcpO1xyXG5cdFx0bGV0IHZVcFRyaWdnZXJUaW1lciA9IDA7XHJcblxyXG5cdFx0dlVwKGJ0bkRvd24sIGdldFNjcm9sZWRXaW5kb3cpO1xyXG5cclxuXHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGJhY2tUb1RvcCgtNDUsIDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHZVcFRyaWdnZXJUaW1lcik7XHJcblx0XHRcdHZVcFRyaWdnZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHZVcChidG5Eb3duLCBnZXRTY3JvbGVkV2luZG93KTtcclxuXHRcdFx0fSwgMjAwKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly/Qv9GA0L7Qu9C40YHRgtGL0LLQsNC40L3QtSDQvtC60L3QsCDQstCy0LXRgNGFINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDXHJcblx0XHRmdW5jdGlvbiB2VXAoYnRuLCBzY3JvbGVkKSB7XHJcblx0XHRcdGlmIChzY3JvbGVkKCkgPiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAvIDIpKSB7XHJcblx0XHRcdFx0YnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHNjcm9sZWQoKSA8IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMikgfHwgYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvL9C/0YDQvtC60YDRg9GC0LrQsCDQvtC60L3QsCDQstCy0LXRgNGFINCy0L3QuNC3XHJcblx0XHRmdW5jdGlvbiBiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKSB7XHJcblx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPD0gdG8pIHJldHVybjtcclxuXHJcblx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBpbnRlcnZhbCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pXHJcblx0XHRcdH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v0L3QsCDRgdC60L7Qu9GM0LrQviDQv9GA0L7QutGA0YPRh9C10L3QviDQvtC60L3QvlxyXG5cdFx0ZnVuY3Rpb24gZ2V0U2Nyb2xlZFdpbmRvdygpIHtcclxuXHRcdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cdFx0fVxyXG5cdH0oKSk7XHJcblxyXG5cdGlmIChpc0VsZW0oJy5wb3J0Zm9saW8tYicpKSB7XHJcblx0XHRjb25zdCBmaWx0ZXJDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcnRmb2xpby1iIC53b3JrLWNhcmQnKTtcclxuXHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9ydGZvbGlvLWJfX2NhdGVnb3JpZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGZpbHRlckJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWZdJyk7XHJcblxyXG5cdFx0XHRpZiAoZmlsdGVyQnRuKSB7XHJcblx0XHRcdFx0aWYgKGZpbHRlckJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZdLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGZpbHRlckJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgZmlsdGVyQ2xhc3MgPSAnZi0nICsgZS50YXJnZXQuZGF0YXNldFsnZiddO1xyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0IGNhcmQgb2YgZmlsdGVyQ2FyZCkge1xyXG5cdFx0XHRcdFx0Y2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhmaWx0ZXJDbGFzcykgJiYgZmlsdGVyQ2xhc3MgIT09ICdmLWFsbCcpIHtcclxuXHRcdFx0XHRcdFx0Y2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHQvLyDRhNC40LrRgdCw0YbQuNGPINC90LDQstC40LPQsNGG0LjQuCDQv9GA0L7QtNGD0LrRgtCwXHJcblx0aWYgKGlzRWxlbSgnLm5hdi1wYW5lbCcpKSB7XHJcblx0XHRjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG5cdFx0Y29uc3QgJG5hdlBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1wYW5lbCcpO1xyXG5cdFx0bGV0IGlzRml4ZWRIZWFkZXIgPSB0cnVlO1xyXG5cclxuXHRcdGZpeGVkRWxlbVRvcCgkbmF2UGFuZWwpO1xyXG5cclxuXHRcdGNvbnN0IG5hdkxpbmtTZWxlY3RvciA9ICdbaHJlZio9XCIjXCJdJztcclxuXHRcdGNvbnN0ICRuYXZMaW5rcyA9ICRuYXZQYW5lbC5xdWVyeVNlbGVjdG9yQWxsKG5hdkxpbmtTZWxlY3Rvcik7XHJcblx0XHRjb25zdCBzZWN0aW9ucyA9IFtdO1xyXG5cdFx0bGV0IGluZGV4QWN0aXZlTGluayA9IG51bGw7XHJcblxyXG5cdFx0Zm9yIChjb25zdCAkbmF2TGluayBvZiAkbmF2TGlua3MpIHtcclxuXHRcdFx0Y29uc3QgaGFzaCA9ICRuYXZMaW5rLmhhc2g7XHJcblx0XHRcdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhhc2gpO1xyXG5cclxuXHRcdFx0aWYgKHNlY3Rpb24pIHtcclxuXHRcdFx0XHRzZWN0aW9ucy5wdXNoKHNlY3Rpb24pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlY3Rpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdHNldEFjdGl2ZUxpbmtCeVNjcm9sbCgpO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzZXRBY3RpdmVMaW5rQnlTY3JvbGwpO1xyXG5cclxuXHRcdCRuYXZQYW5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGxpbmsgPSBlLnRhcmdldC5jbG9zZXN0KCdhW2hyZWYqPVwiI1wiXScpO1xyXG5cclxuXHRcdFx0aWYgKCFsaW5rKSByZXR1cm47XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGNvbnN0IHNlY3Rpb25JZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblx0XHRcdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlY3Rpb25JZCk7XHJcblxyXG5cdFx0XHRpZiAoIXNlY3Rpb24pIHJldHVybjtcclxuXHJcblx0XHRcdGNvbnN0IHNlY3Rpb25PZmZzZXRUb3AgPSBnZXRPZmZzZXRUb3Aoc2VjdGlvbik7XHJcblxyXG5cdFx0XHRsZXQgc2Nyb2xsUG9pbnQgPSBzZWN0aW9uT2Zmc2V0VG9wIC0gJG5hdlBhbmVsLm9mZnNldEhlaWdodCArIDEwO1xyXG5cclxuXHRcdFx0aWYgKGlzRml4ZWRIZWFkZXIpIHtcclxuXHRcdFx0XHRzY3JvbGxQb2ludCA9IHNjcm9sbFBvaW50IC0gJGhlYWRlci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxQb2ludCk7XHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldEFjdGl2ZUxpbmtCeVNjcm9sbCgpIHtcclxuXHRcdFx0Y29uc3QgdG9wU2VjdGlvbnMgPSBzZWN0aW9ucy5tYXAoJHNlY3Rpb24gPT4ge1xyXG5cdFx0XHRcdHJldHVybiBnZXRPZmZzZXRUb3AoJHNlY3Rpb24pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCBjdXJyZW50QWN0aXZlSW5kZXggPSBudWxsO1xyXG5cdFx0XHRjb25zdCBmaXJzdFNlY3Rpb25Ub3BDb29yZHMgPSB0b3BTZWN0aW9uc1swXTtcclxuXHRcdFx0Y29uc3QgbGFzdFNlY3Rpb25Cb3R0b21Db29yZHMgPSB0b3BTZWN0aW9uc1t0b3BTZWN0aW9ucy5sZW5ndGggLSAxXSArIHNlY3Rpb25zW3RvcFNlY3Rpb25zLmxlbmd0aCAtIDFdLm9mZnNldEhlaWdodDtcclxuXHJcblx0XHRcdGxldCBvZmZzZXRUb3BCeU5vZGVzID0gcGFnZVlPZmZzZXRCeU5vZGVzKCRuYXZQYW5lbCk7XHJcblxyXG5cdFx0XHRpZiAoaXNGaXhlZEhlYWRlcikge1xyXG5cdFx0XHRcdG9mZnNldFRvcEJ5Tm9kZXMgPSBwYWdlWU9mZnNldEJ5Tm9kZXMoJG5hdlBhbmVsLCAkaGVhZGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9mZnNldFRvcEJ5Tm9kZXMgPCBmaXJzdFNlY3Rpb25Ub3BDb29yZHMgfHwgb2Zmc2V0VG9wQnlOb2RlcyA+IGxhc3RTZWN0aW9uQm90dG9tQ29vcmRzKSB7XHJcblx0XHRcdFx0aWYgKGluZGV4QWN0aXZlTGluayA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHQkbmF2TGlua3NbaW5kZXhBY3RpdmVMaW5rXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRpbmRleEFjdGl2ZUxpbmsgPSBudWxsO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0b3BTZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChvZmZzZXRUb3BCeU5vZGVzID4gdG9wU2VjdGlvbnNbaV0pIHtcclxuXHRcdFx0XHRcdGN1cnJlbnRBY3RpdmVJbmRleCA9IGk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXhBY3RpdmVMaW5rICE9PSBjdXJyZW50QWN0aXZlSW5kZXggJiYgY3VycmVudEFjdGl2ZUluZGV4ICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aW5kZXhBY3RpdmVMaW5rID0gY3VycmVudEFjdGl2ZUluZGV4O1xyXG5cdFx0XHRcdGNoYW5nZU5hdkFjdGl2ZSgkbmF2TGlua3NbaW5kZXhBY3RpdmVMaW5rXSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNoYW5nZU5hdkFjdGl2ZShuZXdOYXZMaW5rTm9kZSkge1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8ICRuYXZMaW5rcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdCRuYXZMaW5rc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3TmF2TGlua05vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCAgRlVOQ1RJT05TIFBMVUdJTlNcdFxyXG5cdCovXHJcblx0Ly9zbGlua3kgbWVudVxyXG5cdGZ1bmN0aW9uIGJyb01lbnUoc2VsZWN0b3IsIG9wdGlvbnMpIHtcclxuXHRcdGNvbnN0ICRtZW51ID0gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBzZWxlY3RvcjtcclxuXHRcdGNvbnN0ICRsZXZlbF8xID0gJG1lbnUubGFzdEVsZW1lbnRDaGlsZDtcclxuXHRcdGNvbnN0ICRzdWJNZW51TGlzdCA9ICRtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpID4gdWwnKTtcclxuXHRcdGNvbnN0ICRzdWJNZW51TGluayA9ICRtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpID4gYScpO1xyXG5cdFx0bGV0IGFjdGl2YXRlZDtcclxuXHJcblx0XHRsZXQgZGVmYXVsT3B0aW9ucyA9IHtcclxuXHRcdFx0bmV4dEJ0bjogJy5icm8tbWVudV9fbmV4dC1hcnInLFxyXG5cdFx0XHRhcnJvdzogYFxyXG5cdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcblx0XHRcdDxwYXRoIGQ9XCJNMTIuMjE5IDIuMjgxTDEwLjc4IDMuNzIgMTguMDYyIDExSDJ2MmgxNi4wNjNsLTcuMjgyIDcuMjgxIDEuNDM4IDEuNDM4IDktOSAuNjg3LS43MTktLjY4Ny0uNzE5elwiIC8+XHJcblx0XHRcdDwvc3ZnPlxyXG5cdFx0YFxyXG5cdFx0fVxyXG5cclxuXHRcdE9iamVjdC5hc3NpZ24oZGVmYXVsT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG5cdFx0bGV0ICRhY3RpdmVVbDtcclxuXHRcdGxldCB0cmFuc2xhdGUgPSAwO1xyXG5cclxuXHRcdGNvbnN0IG1ldGhvZCA9IHtcclxuXHRcdFx0aW5pdCgpIHtcclxuXHRcdFx0XHRpZiAoYWN0aXZhdGVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdCRtZW51LmNsYXNzTGlzdC5hZGQoJ2Jyby1tZW51Jyk7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IHN1Ym1lbnUgb2YgJHN1Yk1lbnVMaXN0KSB7XHJcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gc3VibWVudS5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpID4gYScpO1xyXG5cdFx0XHRcdFx0bGluay5jbGFzc0xpc3QuYWRkKCdicm8tbWVudV9fbmV4dCcpO1xyXG5cclxuXHRcdFx0XHRcdF9hZGRCdG5CYWNrKHN1Ym1lbnUsIGxpbmspO1xyXG5cdFx0XHRcdFx0X2FkZEJ0bk5leHQobGluayk7XHJcblxyXG5cdFx0XHRcdFx0YWN0aXZhdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3QgJGxpbmsgb2YgJHN1Yk1lbnVMaW5rKSB7XHJcblx0XHRcdFx0XHQkbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCRtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcclxuXHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF9zZXRIZWlnaE1lbnUpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZGVzdHJveSgpIHtcclxuXHRcdFx0XHRpZiAoIWFjdGl2YXRlZCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRjb25zdCAkYXJyTm9kZXMgPSAkbWVudS5xdWVyeVNlbGVjdG9yQWxsKCcuYnJvLW1lbnVfX2FycicpO1xyXG5cclxuXHRcdFx0XHQkbWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF9zZXRIZWlnaE1lbnUpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0ICRsaW5rIG9mICRtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5rJykpIHtcclxuXHRcdFx0XHRcdGlmICgkbGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2Jyby1tZW51X19iYWNrJykpIHtcclxuXHRcdFx0XHRcdFx0JGxpbmsuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCAkYXJyIG9mICRhcnJOb2Rlcykge1xyXG5cdFx0XHRcdFx0XHQkYXJyLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCRsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuXHRcdFx0XHRcdCRsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2Jyby1tZW51X19uZXh0Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkYWN0aXZlVWwgJiYgJGFjdGl2ZVVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHQkbWVudS5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHRcdFx0XHQkbGV2ZWxfMS5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcclxuXHRcdFx0XHR0cmFuc2xhdGUgPSAwO1xyXG5cdFx0XHRcdGFjdGl2YXRlZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAodGFyZ2V0LmNsb3Nlc3QoZGVmYXVsT3B0aW9ucy5uZXh0QnRuKSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgJG5lc3RlZE1lbnUgPSB0YXJnZXQuY2xvc2VzdCgnbGknKS5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGFjdGl2ZVVsKSAkYWN0aXZlVWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCRuZXN0ZWRNZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdCRuZXN0ZWRNZW51LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblx0XHRcdFx0dHJhbnNsYXRlIC09IDEwMDtcclxuXHJcblx0XHRcdFx0JGxldmVsXzEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGV9JSlgO1xyXG5cdFx0XHRcdCRhY3RpdmVVbCA9ICRuZXN0ZWRNZW51O1xyXG5cclxuXHRcdFx0XHRzY3JvbGxUb1Zpc2libGUoJGFjdGl2ZVVsKTtcclxuXHRcdFx0XHRfc2V0SGVpZ2hNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5icm8tbWVudV9fYmFjaycpKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRjb25zdCAkdXBwZXJNZW51ID0gJGFjdGl2ZVVsLnBhcmVudEVsZW1lbnQuY2xvc2VzdCgndWwnKTtcclxuXHRcdFx0XHQkdXBwZXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHQkYWN0aXZlVWwuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xyXG5cclxuXHRcdFx0XHR0cmFuc2xhdGUgKz0gMTAwO1xyXG5cclxuXHRcdFx0XHQkbGV2ZWxfMS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZX0lKWA7XHJcblx0XHRcdFx0JGFjdGl2ZVVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdCRhY3RpdmVVbCA9ICR1cHBlck1lbnU7XHJcblx0XHRcdFx0X3NldEhlaWdoTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2FkZEJ0bk5leHQoZWxlbSkge1xyXG5cdFx0XHRlbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKVxyXG5cdFx0XHRlbGVtLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnJvLW1lbnVfX25leHQtYXJyXCI+XHJcblx0XHRcdFx0XHQke2RlZmF1bE9wdGlvbnMuYXJyb3d9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRgKTtcclxuXHJcblx0XHRcdGVsZW0ubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdicm8tbWVudV9fYXJyJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2FkZEJ0bkJhY2soZWxlbSwgbGluaykge1xyXG5cdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcblx0XHRcdGVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxyXG5cdFx0XHQ8bGk+XHJcblx0XHRcdFx0PGEgY2xhc3M9XCJicm8tbWVudV9fYmFjayBsaW5rXCIgJHsoaHJlZikgPyBgaHJlZj0ke2hyZWZ9YCA6ICcnfT5cclxuXHRcdFx0XHRcdCR7ZGVmYXVsT3B0aW9ucy5hcnJvd31cclxuXHRcdFx0XHRcdCR7bGluay50ZXh0Q29udGVudH1cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+XHJcblx0XHRgKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfc2V0SGVpZ2hNZW51KCkge1xyXG5cdFx0XHRpZiAoISRhY3RpdmVVbCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0JG1lbnUuc3R5bGUuaGVpZ2h0ID0gJGFjdGl2ZVVsLm9mZnNldEhlaWdodCArIFwicHhcIjtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzY3JvbGxUb1Zpc2libGUoZWwpIHtcclxuXHRcdFx0aWYgKF9nZXRQb3NBYnNXaW5kb3coZWwpID4gd2luZG93LnBhZ2VZT2Zmc2V0KSByZXR1cm47XHJcblxyXG5cdFx0XHRiYWNrVG9Ub3AoLTEwLCBfZ2V0UG9zKGVsKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2dldFBvc0Fic1dpbmRvdyhlbGVtKSB7XHJcblx0XHRcdGNvbnN0IG9mZnNldFRvcCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0cmV0dXJuIG9mZnNldFRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0UG9zKGVsKSB7XHJcblx0XHRcdHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gYmFja1RvVG9wKGludGVydmFsLCB0bykge1xyXG5cdFx0XHRpZiAod2luZG93LnBhZ2VZT2Zmc2V0IDw9IHRvKSByZXR1cm47XHJcblxyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsQnkoMCwgaW50ZXJ2YWwpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKVxyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbWV0aG9kO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZmlsZUlucHV0KGZpZWxkQXJlYVNlbGVjdG9yKSB7XHJcblx0XHRjb25zdCAkcGFyZW50ID0gdHlwZW9mIGZpZWxkQXJlYVNlbGVjdG9yID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmllbGRBcmVhU2VsZWN0b3IpIDogZmllbGRBcmVhU2VsZWN0b3I7XHJcblx0XHRjb25zdCBpbnB1dCA9ICRwYXJlbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuXHRcdGNvbnN0ICR0ZXh0Q29udGFpbmVyID0gJHBhcmVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGFiZWwtZmlsZV9fdGV4dCcpO1xyXG5cclxuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGZpbGVzQ291bnQgPSBlLnRhcmdldC5maWxlcy5sZW5ndGg7XHJcblxyXG5cdFx0XHRpZiAoIWZpbGVzQ291bnQpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZmlsZXNDb3VudCA9PT0gMSkge1xyXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuXHRcdFx0XHQkdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IGZpbGVOYW1lO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCR0ZXh0Q29udGFpbmVyLnRleHRDb250ZW50ID0gYNCS0YvQsdGA0LDQvdC+INGE0LDQudC70L7QsjogJHtmaWxlc0NvdW50fWA7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvLyBzbGlkZXIgIFxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzZWxlY3Rvciwgb3B0aW9uID0ge30pIHtcclxuXHRcdGNvbnN0ICRzbGlkZXIgPSAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IHNlbGVjdG9yO1xyXG5cdFx0Y29uc3QgJHNsaWRlcldyYXAgPSAkc2xpZGVyLmNsb3Nlc3QoJy5zbGlkZXItd3JhcCcpO1xyXG5cclxuXHRcdGNvbnN0IHNldGluZ3MgPSB7XHJcblx0XHRcdG5hdmlnYXRpb246ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItbmF2JyksXHJcblx0XHRcdHBhZ2luYXRpb246ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRvcHRpb25zOiB7XHJcblx0XHRcdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcclxuXHRcdFx0XHQuLi5vcHRpb24sXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRPYmplY3QuYXNzaWduKHNldGluZ3Mub3B0aW9ucywge1xyXG5cdFx0XHR3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IHRydWUsXHJcblx0XHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXHJcblx0XHRcdGF1dG9wbGF5OiAoKyRzbGlkZXIuZGF0YXNldC5zd2lwZXJBdXRvcGxheSA+IDApID8ge1xyXG5cdFx0XHRcdGRlbGF5OiArJHNsaWRlci5kYXRhc2V0LnN3aXBlckF1dG9wbGF5LFxyXG5cdFx0XHRcdHBhdXNlT25Nb3VzZUVudGVyOiB0cnVlLFxyXG5cdFx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuXHRcdFx0fSA6ICcnLFxyXG5cdFx0XHRuYXZpZ2F0aW9uOiBzZXRpbmdzLm5hdmlnYXRpb24gPyB7XHJcblx0XHRcdFx0bmV4dEVsOiAkc2xpZGVyV3JhcC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tbmV4dCcpLFxyXG5cdFx0XHRcdHByZXZFbDogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdFx0fSA6ICcnLFxyXG5cdFx0XHRwYWdpbmF0aW9uOiBzZXRpbmdzLnBhZ2luYXRpb24gPyB7XHJcblx0XHRcdFx0ZWw6ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fSA6ICcnLFxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gbmV3IFN3aXBlcigkc2xpZGVyLCBzZXRpbmdzLm9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0Ly9hY2NhcmRpb25cclxuXHRmdW5jdGlvbiBhY2NhcmRpb24oKSB7XHJcblx0XHRsZXQgaGVhZGVyRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBfbWFpbkVsZW1lbnQgPSB7fSwgLy8gLmFjY29yZGlvbiBcclxuXHRcdFx0XHRfaXRlbXMgPSB7fTsgLy8gLmFjY29yZGlvbi1pdGVtIFxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRpbml0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0X21haW5FbGVtZW50ID0gKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50KTtcclxuXHRcdFx0XHRcdF9pdGVtcyA9IF9tYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjYXJkaW9uX19pdGVtJyk7XHJcblx0XHRcdFx0XHRfc2V0dXBMaXN0ZW5lcnMoX21haW5FbGVtZW50LCAnY2xpY2snLCBfY2xpY2tIYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIF9jbGlja0hhbmRsZXIoZSkge1xyXG5cdFx0XHRcdGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmFjY2FyZGlvbl9faXRlbS1oZWFkZXInKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdGxldCBoZWFkZXIgPSBlLnRhcmdldC5jbG9zZXN0KCcuYWNjYXJkaW9uX19pdGVtLWhlYWRlcicpLFxyXG5cdFx0XHRcdFx0aXRlbSA9IGhlYWRlci5jbG9zZXN0KCcuYWNjYXJkaW9uX19pdGVtJyksXHJcblx0XHRcdFx0XHRpdGVtQWN0aXZlID0gX2dldEl0ZW0oX2l0ZW1zLCAnb3BlbicpO1xyXG5cclxuXHRcdFx0XHRpZiAoaXRlbUFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aXRlbUFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGl0ZW1BY3RpdmUgIT09IGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRzY3JvbGxUb1Zpc2libGUoaXRlbSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX3NldHVwTGlzdGVuZXJzKGVsZW0sIGV2ZW50LCBoYW5kbGVyKSB7XHJcblx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsVG9WaXNpYmxlKGVsKSB7XHJcblx0XHRcdGlmIChfZ2V0UG9zKGVsKSA+IHdpbmRvdy5wYWdlWU9mZnNldCkgcmV0dXJuO1xyXG5cdFx0XHRiYWNrVG9Ub3AoLTEwLCBfZ2V0UG9zKGVsKSAtIGhlYWRlckRvbS5vZmZzZXRIZWlnaHQgLSAzMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2dldFBvcyhlbCkge1xyXG5cdFx0XHRyZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9nZXRJdGVtKGVsZW1lbnRzLCBjbGFzc05hbWUpIHtcclxuXHRcdFx0dmFyIGVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudCA9IGl0ZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5wYWdlWU9mZnNldCA8PSB0bykgcmV0dXJuO1xyXG5cclxuXHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIGludGVydmFsKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0YmFja1RvVG9wKGludGVydmFsLCB0bylcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBiVGFic1xyXG5cdGZ1bmN0aW9uIGJUYWJzKHRhcmdldCkge1xyXG5cdFx0bGV0IF9lbGVtVGFicyA9ICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldCksXHJcblx0XHRcdF9ldmVudFRhYnNTaG93LFxyXG5cdFx0XHRfc2hvd1RhYiA9IGZ1bmN0aW9uICh0YWJzTGlua1RhcmdldCkge1xyXG5cdFx0XHRcdHZhciB0YWJzUGFuZVRhcmdldCwgdGFic0xpbmtBY3RpdmUsIHRhYnNQYW5lU2hvdztcclxuXHRcdFx0XHR0YWJzUGFuZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFic0xpbmtUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xyXG5cdFx0XHRcdHRhYnNMaW5rQWN0aXZlID0gdGFic0xpbmtUYXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYi10YWJzX19saW5rLmFjdGl2ZScpO1xyXG5cdFx0XHRcdHRhYnNQYW5lU2hvdyA9IHRhYnNQYW5lVGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmItdGFic19fcGFuZS5hY3RpdmUnKTtcclxuXHRcdFx0XHQvLyDQtdGB0LvQuCDRgdC70LXQtNGD0Y7RidCw0Y8g0LLQutC70LDQtNC60LAg0YDQsNCy0L3QsCDQsNC60YLQuNCy0L3QvtC5LCDRgtC+INC30LDQstC10YDRiNCw0LXQvCDRgNCw0LHQvtGC0YNcclxuXHRcdFx0XHRpZiAodGFic0xpbmtUYXJnZXQgPT09IHRhYnNMaW5rQWN0aXZlKSByZXR1cm47XHJcblx0XHRcdFx0Ly8g0YPQtNCw0LvRj9C10Lwg0LrQu9Cw0YHRgdGLINGDINGC0LXQutGD0YnQuNGFINCw0LrRgtC40LLQvdGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcblx0XHRcdFx0aWYgKHRhYnNMaW5rQWN0aXZlICE9PSBudWxsKSB0YWJzTGlua0FjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0aWYgKHRhYnNQYW5lU2hvdyAhPT0gbnVsbCkgdGFic1BhbmVTaG93LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGB0Ysg0Log0Y3Qu9C10LzQtdC90YLQsNC8ICjQsiDQt9Cw0LLQuNC80L7RgdGC0Lgg0L7RgiDQstGL0LHRgNCw0L3QvdC+0Lkg0LLQutC70LDQtNC60LgpXHJcblx0XHRcdFx0dGFic0xpbmtUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0dGFic1BhbmVUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChfZXZlbnRUYWJzU2hvdyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdF9zd2l0Y2hUYWJUbyA9IGZ1bmN0aW9uICh0YWJzTGlua0luZGV4KSB7XHJcblx0XHRcdFx0dmFyIHRhYnNMaW5rcyA9IF9lbGVtVGFicy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJzX19saW5rJyk7XHJcblx0XHRcdFx0aWYgKHRhYnNMaW5rcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRpZiAodGFic0xpbmtJbmRleCA+IHRhYnNMaW5rcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0dGFic0xpbmtJbmRleCA9IHRhYnNMaW5rcy5sZW5ndGg7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRhYnNMaW5rSW5kZXggPCAxKSB7XHJcblx0XHRcdFx0XHRcdHRhYnNMaW5rSW5kZXggPSAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0X3Nob3dUYWIodGFic0xpbmtzW3RhYnNMaW5rSW5kZXggLSAxXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdF9ldmVudFRhYnNTaG93ID0gbmV3IEN1c3RvbUV2ZW50KCd0YWIuc2hvdycsIHsgZGV0YWlsOiBfZWxlbVRhYnMgfSk7XHJcblxyXG5cdFx0X2VsZW1UYWJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHRhYnNMaW5rVGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHRcdC8vINC30LDQstC10YDRiNCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhNGD0L3QutGG0LjQuCwg0LXRgdC70Lgg0LrQu9C40LrQvdGD0LvQuCDQvdC1INC/0L4g0YHRgdGL0LvQutC1XHJcblx0XHRcdGlmICghdGFic0xpbmtUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdiLXRhYnNfX2xpbmsnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRfc2hvd1RhYih0YWJzTGlua1RhcmdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93VGFiOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcblx0XHRcdFx0X3Nob3dUYWIodGFyZ2V0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3dpdGNoVGFiVG86IGZ1bmN0aW9uIChpbmRleCkge1xyXG5cdFx0XHRcdF9zd2l0Y2hUYWJUbyhpbmRleCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0Ly9kcm9wZG93blxyXG5cdGZ1bmN0aW9uIGRyb3Bkb3duKHNlbGVjdG9yKSB7XHJcblx0XHRjb25zdCAkZWwgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuXHRcdFx0OiBzZWxlY3RvcixcclxuXHRcdFx0JGJ0biA9ICRlbC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1idG4nKSxcclxuXHRcdFx0JGNvbnRlbnQgPSAkZWwucXVlcnlTZWxlY3RvcignLmRyb3AtY29udGVudCcpO1xyXG5cclxuXHRcdCRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcblxyXG5cdFx0XHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdCRjb250ZW50LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHRcdH0sIDMyMClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkY29udGVudC5zdHlsZS5taW5IZWlnaHQgPSAnJztcclxuXHRcdFx0XHQkY29udGVudC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJyc7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIHJlYWRtb3JlIGpzXHJcblx0ZnVuY3Rpb24gcmVhZG1vcmUoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG5cdFx0bGV0ICRlbCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogc2VsZWN0b3IsXHJcblx0XHRcdCR0b2dnbGU7XHJcblxyXG5cdFx0Y29uc3QgYmFzZUNsYXNzID0gJ2pzLXJlYWRtb3JlJztcclxuXHRcdGNvbnN0IHNlY3Rpb25DbGFzcyA9IGJhc2VDbGFzcyArICctc2VjdGlvbic7XHJcblx0XHRjb25zdCBleHBhbmRlZENsYXNzID0gc2VjdGlvbkNsYXNzICsgJy0tZXhwYW5kZWQnO1xyXG5cdFx0Y29uc3QgY29sbGFwc2VkQ2xhc3MgPSBzZWN0aW9uQ2xhc3MgKyAnLS1jb2xsYXBzZWQnO1xyXG5cdFx0Y29uc3QgZGlzYWJsZWRDbGFzcyA9IHNlY3Rpb25DbGFzcyArICctLWRpc2FibGVkJztcclxuXHRcdGNvbnN0IGJ0blRvZ2dsZUNsYXNzID0gYmFzZUNsYXNzICsgJy10b2dnbGUnO1xyXG5cdFx0Y29uc3QgYnRuVG9nZ2xlTW9yZUNsYXNzID0gYnRuVG9nZ2xlQ2xhc3MgKyAnLS1tb3JlJztcclxuXHRcdGxldCBpc0V4cGFuZGVkID0gZmFsc2U7XHJcblx0XHRsZXQgaXNCdG5Jbml0ID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB7XHJcblx0XHRcdHZpc2libGVIZWlnaHQ6IDIwMCxcclxuXHRcdFx0cG9zaXRpb25Ub2dnbGU6ICdpbnNpZGUnLFxyXG5cdFx0XHRidG5DbGFzc2VzOiBcIlwiLFxyXG5cdFx0XHRjaGFuZ2VOYW1lOiBmYWxzZSxcclxuXHRcdFx0bW9yZUJ0bkNvbnRlbnQ6IFwi0J/QvtC60LDQt9Cw0YLRjCDQstGB0LVcIixcclxuXHRcdFx0bGVzc0J0bkNvbnRlbnQ6IFwi0KHQutGA0YvRgtGMXCIsXHJcblx0XHR9XHJcblxyXG5cdFx0T2JqZWN0LmFzc2lnbihzZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0c2V0dGluZ3MudmlzaWJsZUhlaWdodCA9IHBhcnNlRmxvYXQoJGVsLmRhdGFzZXQucmVhZG1vcmVIZWlnaHQpIHx8IHNldHRpbmdzLnZpc2libGVIZWlnaHQ7XHJcblxyXG5cdFx0JGVsLmNsYXNzTmFtZSA9ICRlbC5jbGFzc05hbWUgKyBgICR7c2VjdGlvbkNsYXNzfWA7XHJcblxyXG5cdFx0Y2hhbmdlU3RhdGUoKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hhbmdlU3RhdGUpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGNoYW5nZVN0YXRlKCkge1xyXG5cdFx0XHRpZiAoJGVsLnNjcm9sbEhlaWdodCA+IHNldHRpbmdzLnZpc2libGVIZWlnaHQpIHtcclxuXHRcdFx0XHRpZiAoIWlzQnRuSW5pdCkge1xyXG5cdFx0XHRcdFx0aXNCdG5Jbml0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdCR0b2dnbGUgPSBjcmVhdGVCdG4oKTtcclxuXHJcblx0XHRcdFx0XHQkdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlclRvZ2dsZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCR0b2dnbGUuaW5uZXJIVE1MID0gc2V0dGluZ3MubW9yZUJ0bkNvbnRlbnQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkZWwuc3R5bGUubWF4SGVpZ2h0ID0gc2V0dGluZ3MudmlzaWJsZUhlaWdodCArICdweCc7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVkQ2xhc3MpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoZXhwYW5kZWRDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGRpc2FibGVkQ2xhc3MpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQnRuKCkge1xyXG5cdFx0XHRjb25zdCAkYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblx0XHRcdCRidG4uaW5uZXJIVE1MID0gc2V0dGluZ3MubW9yZUJ0bkNvbnRlbnQ7XHJcblx0XHRcdCRidG4uY2xhc3NOYW1lID0gYnRuVG9nZ2xlQ2xhc3MgKyBcIiBcIiArIGJ0blRvZ2dsZU1vcmVDbGFzcztcclxuXHJcblx0XHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MuYnRuQ2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHQkYnRuLmNsYXNzTmFtZSA9IHNldHRpbmdzLmJ0bkNsYXNzZXMgKyBcIiBcIiArICRidG4uY2xhc3NOYW1lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRidG4pO1xyXG5cclxuXHRcdFx0cmV0dXJuICRidG47XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaGFuZGxlclRvZ2dsZSgpIHtcclxuXHRcdFx0aWYgKGlzRXhwYW5kZWQpIHtcclxuXHRcdFx0XHRpc0V4cGFuZGVkID0gZmFsc2U7XHJcblx0XHRcdFx0JHRvZ2dsZS5jbGFzc0xpc3QuYWRkKGJ0blRvZ2dsZU1vcmVDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoZXhwYW5kZWRDbGFzcyk7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoY29sbGFwc2VkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5zdHlsZS5tYXhIZWlnaHQgPSBzZXR0aW5ncy52aXNpYmxlSGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5jaGFuZ2VOYW1lKSByZXR1cm5cclxuXHRcdFx0XHQkdG9nZ2xlLmlubmVySFRNTCA9IHNldHRpbmdzLm1vcmVCdG5Db250ZW50O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlzRXhwYW5kZWQgPSB0cnVlO1xyXG5cdFx0XHRcdCR0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZShidG5Ub2dnbGVNb3JlQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGNvbGxhcHNlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuc3R5bGUubWF4SGVpZ2h0ID0gJGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5jaGFuZ2VOYW1lKSByZXR1cm5cclxuXHRcdFx0XHQkdG9nZ2xlLmlubmVySFRNTCA9IHNldHRpbmdzLmxlc3NCdG5Db250ZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmaXhlZEVsZW1Ub3Aoc2VsZWN0b3IpIHtcclxuXHRcdGNvbnN0ICRlbCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IHNlbGVjdG9yO1xyXG5cdFx0Y29uc3QgJHN0YXJ0aW5nUGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuXHRcdCRlbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgJHN0YXJ0aW5nUGxhY2UpO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdFx0bGV0IGlzRml4ZWRIZWFkZXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChnZXRDb21wdXRlZFN0eWxlKCRoZWFkZXIpLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XHJcblx0XHRcdFx0cGFnZVlPZmZzZXQgPSBwYWdlWU9mZnNldEJ5Tm9kZXMoJGhlYWRlcik7XHJcblx0XHRcdFx0aXNGaXhlZEhlYWRlciA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwYWdlWU9mZnNldCA+IGdldE9mZnNldFRvcCgkc3RhcnRpbmdQbGFjZSkpIHtcclxuXHRcdFx0XHQkc3RhcnRpbmdQbGFjZS5zdHlsZS5oZWlnaHQgPSAkZWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcclxuXHRcdFx0XHQkZWwuc3R5bGUudG9wID0gaXNGaXhlZEhlYWRlciA/ICRoZWFkZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JyA6ICcnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRzdGFydGluZ1BsYWNlLnN0eWxlLmhlaWdodCA9ICcnO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKCdmaXhlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAwXHJcblx0XHQpKVxyXG5cdH07XHJcblxyXG5cdC8vdmlkZW9cclxuXHQoZnVuY3Rpb24gKCkge1xyXG5cdFx0ZmluZFZpZGVvcygpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbmRWaWRlb3MoKSB7XHJcblx0XHRcdGxldCB2aWRlb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW8nKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdmlkZW9zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0c2V0dXBWaWRlbyh2aWRlb3NbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0LvQtdC90LjQstCw0Y8g0LfQsNCz0YDRg9C30LrQsCDQstC40LTQtdC+IFxyXG5cdFx0ZnVuY3Rpb24gc2V0dXBWaWRlbyh2aWRlbykge1xyXG5cdFx0XHRsZXQgbGluayA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fbGluaycpO1xyXG5cdFx0XHRjb25zdCBocmVmTGluayA9IGxpbmsuaHJlZjtcclxuXHRcdFx0bGV0IG1lZGlhID0gdmlkZW8ucXVlcnlTZWxlY3RvcignLnZpZGVvX19tZWRpYScpO1xyXG5cdFx0XHRsZXQgYnV0dG9uID0gdmlkZW8ucXVlcnlTZWxlY3RvcignLnZpZGVvX19idXR0b24nKTtcclxuXHRcdFx0bGV0IGRlbGV0ZWRMZW5ndGggPSAnaHR0cHM6Ly95b3V0dS5iZS8nLmxlbmd0aDtcclxuXHRcdFx0bGV0IHZpZGVvSWQgPSBocmVmTGluay5zdWJzdHJpbmcoZGVsZXRlZExlbmd0aCwgaHJlZkxpbmsubGVuZ3RoKTtcclxuXHRcdFx0bGV0IHlvdXR1YmVJbWdTcmMgPSAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS8nICsgdmlkZW9JZCArICcvbWF4cmVzZGVmYXVsdC5qcGcnO1xyXG5cclxuXHRcdFx0bWVkaWEuc3JjID0geW91dHViZUltZ1NyYztcclxuXHJcblx0XHRcdHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdGxldCBpZnJhbWUgPSBjcmVhdGVJZnJhbWUodmlkZW9JZCk7XHJcblxyXG5cdFx0XHRcdGxpbmsucmVtb3ZlKCk7XHJcblx0XHRcdFx0YnV0dG9uLnJlbW92ZSgpO1xyXG5cdFx0XHRcdHZpZGVvLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0bGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHRcdFx0dmlkZW8uY2xhc3NMaXN0LmFkZCgndmlkZW8tLWVuYWJsZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjcmVhdGVJZnJhbWUoaWQpIHtcclxuXHRcdFx0bGV0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG5cclxuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG5cdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvdycsICdhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOycpO1xyXG5cdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBnZW5lcmF0ZVVSTChpZCkpO1xyXG5cdFx0XHRpZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlkZW9fX21lZGlhJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gaWZyYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdlbmVyYXRlVVJMKGlkKSB7XHJcblx0XHRcdGxldCBxdWVyeSA9ICc/cmVsPTAmc2hvd2luZm89MSZhdXRvcGxheT0xJztcclxuXHJcblx0XHRcdHJldHVybiAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIGlkICsgcXVlcnk7XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5zY3JvbGwtdG9baHJlZio9XCIjXCJdJykpIHtcclxuXHRcdFx0Y29uc3QgbGluayA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zY3JvbGwtdG9baHJlZio9XCIjXCJdJyk7XHJcblx0XHRcdGNvbnN0IGlkID0gbGluay5oYXNoO1xyXG5cdFx0XHRjb25zdCAkc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG5cclxuXHRcdFx0aWYgKCEkc2VjdGlvbikgcmV0dXJuO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IGNvb3Jkc1NlY3Rpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQgKyAkc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG5cdFx0XHRpZiAoaXNGaXhlZEhlYWRlcikge1xyXG5cdFx0XHRcdGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcblx0XHRcdFx0Y29vcmRzU2VjdGlvbiA9IGNvb3Jkc1NlY3Rpb24gLSAkaGVhZGVyLm9mZnNldEhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIGNvb3Jkc1NlY3Rpb24pO1xyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdGlmIChpc0VsZW0oJ1tkYXRhLWFjdGl2ZS1jb2luc10nKSkge1xyXG5cdFx0Y29uc3QgY29pblBhcmVudEVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjdGl2ZS1jb2luc10nKTtcclxuXHJcblxyXG5cdFx0Zm9yIChjb25zdCBjb2luUGFyZW50RWwgb2YgY29pblBhcmVudEVscykge1xyXG5cdFx0XHRjb25zdCBjb3VudCA9IGNvaW5QYXJlbnRFbC5kYXRhc2V0LmFjdGl2ZUNvaW5zO1xyXG5cdFx0XHRjb25zdCBjaGlsZHJlbkNvaW5FbHMgPSBjb2luUGFyZW50RWwuY2hpbGRyZW47XHJcblxyXG5cdFx0XHRpZiAoIWNvdW50KSByZXR1cm47XHJcblxyXG5cdFx0XHRBcnJheS5mcm9tKGNoaWxkcmVuQ29pbkVscykuZmlsdGVyKChpdGVtLCBpKSA9PiBpID49IGNvdW50KS5tYXAoaXRlbSA9PiBpdGVtLmRhdGFzZXQuZGlzYWJsZWRDb2luID0gXCJcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKioqKiogVVRJTFMgKioqKioqL1xyXG5cdGZ1bmN0aW9uIGlzRWxlbShzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkgPyB0cnVlIDogZmFsc2U7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcyA9IDUwKSB7XHJcblx0XHRsZXQgbG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKGxvY2tlZCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0Y29uc3QgY29udGV4dCA9IHRoaXM7XHJcblx0XHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdGxvY2tlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdGxvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHR9LCBtcylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vINC/0L7Qu9C+0LbQtdC90LjQtSDQstC10YDRhdCwINCy0YzRjtC/0L7RgNGC0LAg0L7RgiDQvdCw0YfQsNC70LAg0LTQvtC60YPQvNC10L3RgtCwXHJcblx0Ly8gYyDRg9GH0LXRgtC+0Lwg0LfQsNC60YDQtdC/0LvQtdC90L3QvtCz0L4g0YHQstC10YDRhdGDINGN0LvQtdC80LXQvdGC0LBcclxuXHRmdW5jdGlvbiBwYWdlWU9mZnNldEJ5Tm9kZXMobm9kZSkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBzdW1tSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRpZiAoYXJncy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRzdW1tSGVpZ2h0ID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtLCBpdGVtKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjY3VtICsgaXRlbS5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdH0sIHN1bW1IZWlnaHQpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIHN1bW1IZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRPZmZzZXRUb3Aobm9kZSkge1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cdH1cclxufSh3aW5kb3cpKTsiXX0=
