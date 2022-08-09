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