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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcclxuXHRjb25zdCBicmVha1BvaW50ID0ge1xyXG5cdFx0ZGVzY3RvcDogMTkyMCxcclxuXHRcdGRlc2N0b3BNaWQ6IDE0NTAsXHJcblx0XHRkZXNjdG9wTWluOiAxMjIwLFxyXG5cdFx0dGFibGU6IDEwNzAsXHJcblx0XHRtb2JpbGU6IDc2OCxcclxuXHRcdHRlbDogNDgwLFxyXG5cdH1cclxuXHRjb25zdCBpc0ZpeGVkSGVhZGVyID0gdHJ1ZTtcclxuXHJcblx0Ly8gbW9iaWxlIG1lbnVcclxuXHRpZiAoaXNFbGVtKCcubW9iaWxlLW1lbnUnKSkge1xyXG5cdFx0Y29uc3QgbW9iaWxlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2JpbGUtbWVudScpO1xyXG5cclxuXHRcdGJyb01lbnUobW9iaWxlTWVudSkuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLnNlcnZpY2VzLW1lbnUnKSkge1xyXG5cdFx0Y29uc3Qgc2VydmljZXNNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlcnZpY2VzLW1lbnUnKTtcclxuXHJcblx0XHRicm9NZW51KHNlcnZpY2VzTWVudSwge1xyXG5cdFx0XHRuZXh0QnRuOiAnLmJyby1tZW51X19uZXh0JyxcclxuXHRcdFx0YXJyb3c6IGBcclxuXHRcdDxzdmcgd2lkdGg9XCIyNVwiIGhlaWdodD1cIjI1XCIgdmlld0JveD1cIjAgMCAxOSAxOVwiPlxyXG5cdFx0PHBhdGggZD1cIk0wLjczNTkxNiA5LjUwMDA0QzAuNzM1OTE2IDQuNjU5NzUgNC42NTk3NSAwLjczNTkxOCA5LjUwMDA0IDAuNzM1OTE4QzE0LjM0MDMgMC43MzU5MTggMTguMjY0MiA0LjY1OTc1IDE4LjI2NDIgOS41MDAwNEMxOC4yNjQyIDE0LjM0MDMgMTQuMzQwMyAxOC4yNjQyIDkuNTAwMDQgMTguMjY0MkM0LjY1OTc1IDE4LjI2NDIgMC43MzU5MTYgMTQuMzQwMyAwLjczNTkxNiA5LjUwMDA0WlwiIGZpbGw9XCJpbmhlcml0XCIvPlxyXG5cdFx0PHBhdGggZD1cIk0wIDkuNUMwIDE0LjczNzkgNC4yNjEzOCAxOSA5LjUgMTlDMTQuNzM3OSAxOSAxOSAxNC43Mzc5IDE5IDkuNUMxOSA0LjI2MTM4IDE0LjczNzkgMCA5LjUgMEM0LjI2MTM4IDAgMCA0LjI2MTM4IDAgOS41Wk0xNy41MjgzIDkuNUMxNy41MjgzIDEzLjkyNyAxMy45MjcgMTcuNTI4MyA5LjUgMTcuNTI4M0M1LjA3MzA0IDE3LjUyODMgMS40NzE3MiAxMy45MjcgMS40NzE3MiA5LjVDMS40NzE3MiA1LjA3MzA0IDUuMDczNzggMS40NzE3MiA5LjUgMS40NzE3MkMxMy45MjcgMS40NzE3MiAxNy41MjgzIDUuMDczMDQgMTcuNTI4MyA5LjVaXCIgZmlsbD1cImluaGVyaXRcIi8+XHJcblx0XHQ8cGF0aCBkPVwiTTcuNDU0MzIgNS4yOTgyNEM3LjE2ODggNS41ODUyNSA3LjE2ODggNi4wNDg4MSA3LjQ1NDMyIDYuMzM1ODJMMTAuNjExMiA5LjQ5MjY3TDcuNDU0MzIgMTIuNjQ5NUM3LjE5MDE0IDEyLjk1NzkgNy4yMjYyMSAxMy40MjI5IDcuNTM0NTEgMTMuNjg3MUM3LjgwOTcxIDEzLjkyMzMgOC4yMTY2NiAxMy45MjMzIDguNDkxODYgMTMuNjg3MUwxMi4xNzEyIDEwLjAwNzhDMTIuNDU2NyA5LjcyMDc5IDEyLjQ1NjcgOS4yNTcyMiAxMi4xNzEyIDguOTcwMjFMOC40OTE4NiA1LjI5MDg5QzguMjAyNjcgNS4wMDc1NiA3LjczOTA5IDUuMDEwNTMgNy40NTQzMiA1LjI5ODI0WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XHJcblx0XHQ8L3N2Zz5cclxuXHRcdGBcclxuXHRcdH0pLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5iLXRhYnMnKSkge1xyXG5cdFx0Y29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLXRhYnMnKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IHRhYiBvZiB0YWJzKSB7XHJcblx0XHRcdGJUYWJzKHRhYik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuYWNjYXJkaW9uJykpIHtcclxuXHRcdGNvbnN0IGFjY2FyZGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjYXJkaW9uJyk7XHJcblx0XHRjb25zdCBhY2NhcmRpb25QbGFnaW4gPSBhY2NhcmRpb24oKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgYWNjYXJkaW9ucykge1xyXG5cdFx0XHRhY2NhcmRpb25QbGFnaW4oKS5pbml0KGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYgKHdpbmRvdy5BT1MgJiYgaXNFbGVtKCdbZGF0YS1hb3NdJykpIHtcclxuXHRcdEFPUy5pbml0KHtcclxuXHRcdFx0Ly9kaXNhYmxlOiBcIm1vYmlsZVwiLFxyXG5cdFx0XHRkdXJhdGlvbjogMjAwMCxcclxuXHRcdFx0b2Zmc2V0OiAxMDAsXHJcblx0XHRcdG9uY2U6IHRydWUsXHJcblx0XHRcdGFuY2hvclBsYWNlbWVudDogJ2JvdHRvbS1ib3R0b20nXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5qcy1yZWFkbW9yZScpKSB7XHJcblx0XHRjb25zdCAkcmVhZG1vcmVFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZG1vcmUnKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0ICRpdGVtIG9mICRyZWFkbW9yZUVscykge1xyXG5cclxuXHRcdFx0bGV0IG9wdGlvbnMgPSB7XHJcblx0XHRcdFx0dmlzaWJsZUhlaWdodDogMTcwLFxyXG5cdFx0XHRcdG1vcmVCdG5Db250ZW50OiBgXHJcblx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIxOVwiIGhlaWdodD1cIjExXCIgdmlld0JveD1cIjAgMCAxOSAxMVwiPlxyXG5cdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTguNTQ2MTUgMTAuMTQzMUwwLjIyNDY0NiAxLjYzODM3Qy0wLjA0NzgzODYgMS4zNTk3MyAtMC4wNDczODA1IDAuOTA4NTg3IDAuMjI2MDU1IDAuNjMwNDA2QzAuNDk5NDU2IDAuMzUyNDQgMC45NDIzNDQgMC4zNTMxNTggMS4yMTUwNCAwLjYzMTg0M0w5LjA0MTI2IDguNjMwMzdMMTYuODY3NCAwLjYzMTU1NUMxNy4xNDAyIDAuMzUyOTA3IDE3LjU4MjggMC4zNTIxODggMTcuODU2MiAwLjYzMDExOUMxNy45OTMzIDAuNzY5NTY4IDE4LjA2MTggMC45NTIyNTggMTguMDYxOCAxLjEzNDk1QzE4LjA2MTggMS4zMTcxNyAxNy45OTM3IDEuNDk5MTQgMTcuODU3NiAxLjYzODM0TDkuNTM2MzMgMTAuMTQzMUM5LjQwNTMyIDEwLjI3NzMgOS4yMjcwMiAxMC4zNTI2IDkuMDQxMjYgMTAuMzUyNkM4Ljg1NTQ5IDEwLjM1MjYgOC42Nzc0IDEwLjI3NzEgOC41NDYxNSAxMC4xNDMxWlwiIGZpbGw9XCJpbmhlcml0XCIvPlxyXG5cdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdGAsXHJcblx0XHRcdFx0YnRuQ2xhc3NlczogJ2J0biBidG4tLXNlY29uZGFyeSBidG4tLWNpcmMnLFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZWFkbW9yZSgkaXRlbSwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKioqKiogQ1VTVE9NIFBMVUdJTiAqKioqKiovXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Y29uc3QgJHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuXHRcdGlmICgkdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWNvcHldOm5vdCguZGlzYWJsZWQpJykpIHtcclxuXHRcdFx0Y29uc3QgJGRhdGFDb3B5RWwgPSAkdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWNvcHldJyk7XHJcblx0XHRcdCRkYXRhQ29weUVsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCRkYXRhQ29weUVsLmRhdGFzZXQuY29weSk7XHJcblxyXG5cdFx0XHRjb25zdCBub3RpZmljYXRpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRub3RpZmljYXRpb25FbC5jbGFzc05hbWUgPSAnY29weS1ub3RpZmljYXRpb24nO1xyXG5cdFx0XHRub3RpZmljYXRpb25FbC50ZXh0Q29udGVudCA9ICfQodC60L7Qv9C40YDQvtCy0LDQvdC90L4g0LIg0LHRg9GE0LXRgCDQvtCx0LzQtdC90LAnO1xyXG5cdFx0XHQkZGF0YUNvcHlFbC5hcHBlbmQobm90aWZpY2F0aW9uRWwpO1xyXG5cclxuXHRcdFx0bGV0IGxlZnQgPSAwICsgKCRkYXRhQ29weUVsLm9mZnNldFdpZHRoIC0gbm90aWZpY2F0aW9uRWwub2Zmc2V0V2lkdGgpIC8gMjtcclxuXHRcdFx0bm90aWZpY2F0aW9uRWwuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XHJcblxyXG5cdFx0XHQvLyDRgdC/0L7Qt9C40YbQuNC+0L3QuNGA0YPQtdC8INC10LPQviDRgdCy0LXRgNGF0YMg0L7RgiDQsNC90L3QvtGC0LjRgNGD0LXQvNC+0LPQviDRjdC70LXQvNC10L3RgtCwICh0b3AtY2VudGVyKVxyXG5cdFx0XHRsZXQgY29vcmRzTm90aWZ5ID0gbm90aWZpY2F0aW9uRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdGNvbnN0IHsgdG9wOiBjb29yZFRvcCwgcmlnaHQ6IGNvb3JkUmlnaHQsIGJvdHRvbTogY29vcmRCb3R0b20sIGxlZnQ6IGNvb3JkTGVmdCB9ID0gY29vcmRzTm90aWZ5O1xyXG5cclxuXHRcdFx0aWYgKGNvb3JkTGVmdCA8IDApIHtcclxuXHRcdFx0XHRub3RpZmljYXRpb25FbC5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvb3JkVG9wIDwgMCkge1xyXG5cdFx0XHRcdG5vdGlmaWNhdGlvbkVsLnN0eWxlLnRvcCA9IFwiMTAwJVwiO1xyXG5cdFx0XHRcdG5vdGlmaWNhdGlvbkVsLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdGlmaWNhdGlvbkVsLmNsYXNzTGlzdC5hZGQoJ2NvcHktbm90aWZpY2F0aW9uLS1hbmltYXRlZCcpIH0sIDEwKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdGlmaWNhdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NvcHktbm90aWZpY2F0aW9uLS1hbmltYXRlZCcpIH0sIDIwMTApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRub3RpZmljYXRpb25FbC5yZW1vdmUoKTtcclxuXHRcdFx0XHQkZGF0YUNvcHlFbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9LCAyNTAwKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly9IYW1idXJnZXJcclxuXHQoZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgaGFtYnVyZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faGFtYnVyZ2VyJyk7XHJcblx0XHRjb25zdCBidXJnZXJCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlcicpO1xyXG5cdFx0Y29uc3QgYnVyZ2VySW5uZXIgPSBidXJnZXJCbG9jay5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXItaW5uZXInKTtcclxuXHRcdGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRcdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5cclxuXHRcdGhhbWJ1cmdlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdGJ1cmdlckJsb2NrLnN0eWxlLnRvcCA9IGhlYWRlci5vZmZzZXRIZWlnaHQgLSAxICsgJ3B4JztcclxuXHJcblx0XHRcdGxldCBpc0FjdGl2ZSA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuXHRcdFx0YnVyZ2VyQmxvY2suY2xhc3NMaXN0W2lzQWN0aXZlID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ29wZW4nKTtcclxuXHRcdFx0YnVyZ2VySW5uZXIuc3R5bGUubWF4SGVpZ2h0ID0gKGlzQWN0aXZlKSA/IGBjYWxjKDEwMHZoIC0gJHtoZWFkZXIub2Zmc2V0SGVpZ2h0fXB4KWAgOiAnJztcclxuXHRcdFx0Ym9keUVsLnN0eWxlLm92ZXJmbG93ID0gKGlzQWN0aXZlKSA/ICdoaWRkZW4nIDogJyc7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPiA5NzAgJiYgYnVyZ2VyQmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcclxuXHRcdFx0XHRoYW1idXJnZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0YnVyZ2VyQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cdFx0XHRcdGJvZHlFbC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRidXJnZXJCbG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGlmICghZS50YXJnZXQuY29udGFpbnMoYnVyZ2VyQmxvY2spKSByZXR1cm47XHJcblxyXG5cdFx0XHRoYW1idXJnZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdGJ1cmdlckJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHRcdFx0Ym9keUVsLnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHR9KTtcclxuXHR9KCkpO1xyXG5cclxuXHQvL2ZpeGVkIGhlYWRlclxyXG5cdGlmIChpc0VsZW0oJ2hlYWRlcicpKSB7XHJcblx0XHRsZXQgZml4ZWRIZWFkZXIgPSBzaG93SGVhZGVyKCdoZWFkZXInKTtcclxuXHJcblx0XHRmdW5jdGlvbiBzaG93SGVhZGVyKGVsKSB7XHJcblx0XHRcdGNvbnN0ICRlbCA9ICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIDogZWw7XHJcblx0XHRcdGNvbnN0IGh0bWxFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHRcdFx0bGV0IG9mZnNldFRvcEVsID0gJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IG9mZnNldFRvcEVsICsgMjApIHtcclxuXHRcdFx0XHRcdHNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Zml4ZWQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHR3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0b2Zmc2V0VG9wRWwgPSAkZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBzaG93KCkge1xyXG5cdFx0XHRcdGlmICgkZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaXhlZCcpKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQpIHtcclxuXHRcdFx0XHRcdGh0bWxFbC5zdHlsZS5wYWRkaW5nVG9wID0gJGVsLm9mZnNldEhlaWdodCArIFwicHhcIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aHRtbEVsLnN0eWxlLnBhZGRpbmdUb3AgPSAkZWwub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKCdmaXhlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBmaXhlZCgpIHtcclxuXHRcdFx0XHRpZiAoISRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpeGVkJykpIHJldHVybjtcclxuXHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpeGVkJyk7XHJcblx0XHRcdFx0aHRtbEVsLnN0eWxlLnBhZGRpbmdUb3AgPSAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzaG93LFxyXG5cdFx0XHRcdGZpeGVkLFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDQv9C+0LQg0LzQtdC90Y4g0YEg0LPQsNC80LHRg9GA0LPQtdGA0L7QvCDQstC90YPRgtGA0Lgg0L7RgdC90L7QstC90L7Qs9C+INC80LXQvdGOXHJcblx0aWYgKGlzRWxlbSgnLm1lbnVfX2l0ZW0tLWRyb3AnKSkge1xyXG5cdFx0Y29uc3QgbWVudURyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9faXRlbS0tZHJvcCcpO1xyXG5cdFx0Y29uc3QgdG9nZ2xlID0gbWVudURyb3AucXVlcnlTZWxlY3RvcignLm1lbnVfX2l0ZW0tdG9nZ2xlJyk7XHJcblx0XHRjb25zdCBsaW5rYnRuID0gbWVudURyb3AucXVlcnlTZWxlY3RvcignLm1lbnVfX2l0ZW0tdG9nZ2xlIH4gLm1lbnVfX2xpbmsnKTtcclxuXHJcblx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdFx0bWVudURyb3AuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsaW5rYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRcdG1lbnVEcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdFx0aWYgKCFldi50YXJnZXQuY2xvc2VzdCgnLm1lbnVfX2l0ZW0tLWRyb3AnKSkge1xyXG5cdFx0XHRcdGlmIChtZW51RHJvcC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHR0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRtZW51RHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvLyBtYWluIHNsaWRlciBcclxuXHRpZiAoaXNFbGVtKCcubWFpbi1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLXNsaWRlcicpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qgc2xpZGVyIG9mIHNsaWRlcnMpIHtcclxuXHRcdFx0bmV3IFN3aXBlcihzbGlkZXIsIHtcclxuXHRcdFx0XHRlZmZlY3Q6IFwiY292ZXJmbG93XCIsXHJcblx0XHRcdFx0c3BlZWQ6IDcwMCxcclxuXHRcdFx0XHRhdXRvSGVpZ2h0OiB0cnVlLFxyXG5cdFx0XHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXHJcblx0XHRcdFx0Y292ZXJmbG93RWZmZWN0OiB7XHJcblx0XHRcdFx0XHRyb3RhdGU6IDUwLFxyXG5cdFx0XHRcdFx0c3RyZXRjaDogMCxcclxuXHRcdFx0XHRcdGRlcHRoOiAxMDAsXHJcblx0XHRcdFx0XHRtb2RpZmllcjogMSxcclxuXHRcdFx0XHRcdHNsaWRlU2hhZG93czogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRcdG5leHRFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHRcdHByZXZFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGJhbmQgc2xpZGVyXHJcblx0aWYgKGlzRWxlbSgnLmJhbmQtc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlckJhbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFuZC1zbGlkZXInKTtcclxuXHJcblx0XHRjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlckJhbmQsIHtcclxuXHRcdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcclxuXHRcdFx0bG9vcDogdHJ1ZSxcclxuXHRcdFx0c2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMzIsXHJcblx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0XHRub1N3aXBpbmdTZWxlY3RvcjogJ2J1dHRvbicsXHJcblx0XHRcdHNwZWVkOiA1MDAsXHJcblxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAxMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2OToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEyMjE6IHtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0bmV4dEVsOiBzbGlkZXJCYW5kLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHRwcmV2RWw6IHNsaWRlckJhbmQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRzd2lwZXIub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c3dpcGVyLnVwZGF0ZSgpO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIHJldmlld3Mgc2xpZGVyXHJcblx0aWYgKGlzRWxlbSgnLnJldmlld3Mtc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHJldmlld3NTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3cy1zbGlkZXInKTtcclxuXHJcblx0XHRjb25zdCBzd2lwZXIgPSBzbGlkZXIocmV2aWV3c1NsaWRlciwge1xyXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRzcGFjZUJldHdlZW46IDM1LFxyXG5cdFx0XHRzcGVlZDogNzAwLFxyXG5cdFx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMwMDoge1xyXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAxLFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyNSxcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NDgxOiB7XHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjUsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMSxcclxuXHRcdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1Blckdyb3VwOiAzLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0W2JyZWFrUG9pbnQudGFibGVdOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDQsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDMwLFxyXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmNsaWVudHMtc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGllbnRzLXNsaWRlcicpO1xyXG5cclxuXHRcdG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcblx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMjQsXHJcblx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdHNwZWVkOiA1MDAsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NzY5OiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRuZXh0RWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1uZXh0JyksXHJcblx0XHRcdFx0cHJldkVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWFyci0tcHJldicpLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJy5pbmZvLXNsaWRlcicpKSB7XHJcblx0XHRuZXcgU3dpcGVyKCcuaW5mby1zbGlkZXInLCB7XHJcblx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRzcGFjZUJldHdlZW46IDEwMCxcclxuXHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHQzMjA6IHtcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEwNzE6IHtcclxuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0ZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXNsaWRlci13cmFwIC5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIFx0YmFuZCBzbGlkZXIgXHJcblx0aWYgKGlzRWxlbSgnLmNhcmRzLXNsaWRlcicpKSB7XHJcblx0XHRmb3IgKGNvbnN0ICRzbGlkZXIgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmRzLXNsaWRlcicpKSB7XHJcblx0XHRcdHNsaWRlcigkc2xpZGVyLCB7XHJcblx0XHRcdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcclxuXHRcdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0XHQzMDA6IHtcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRbYnJlYWtQb2ludC50YWJsZSArIDFdOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gcGFnZS1zbGlkZXIgXHJcblx0aWYgKGlzRWxlbSgnLnBhZ2Utc2xpZGVyJykpIHtcclxuXHRcdGZvciAoY29uc3QgJHNsaWRlciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZS1zbGlkZXInKSkge1xyXG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJHNsaWRlci5jbG9zZXN0KCcuc2xpZGVyLXdyYXAnKTtcclxuXHRcdFx0XHJcblx0XHRcdG5ldyBTd2lwZXIoJHNsaWRlciwge1xyXG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiA2MCxcclxuXHRcdFx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcblx0XHRcdFx0bGF6eTogdHJ1ZSxcclxuXHRcdFx0XHRzcGVlZDogNzAwLFxyXG5cdFx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRcdGVsOiAkcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXNsaWRlcl9fYnRucycpLFxyXG5cdFx0XHRcdFx0Y2xpY2thYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0cmVuZGVyQnVsbGV0OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBzbGlkZXMgPSB0aGlzLnNsaWRlcztcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGV4dEJ0biA9IHNsaWRlc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAodGV4dEJ0bikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBgXHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiJHtjbGFzc05hbWV9IGJ0biBidG4tLXdoaXRlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdCR7dGV4dEJ0bn1cclxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdGBcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oXCIudHdlbnR5LWJcIikpIHtcclxuXHRcdCQoXCIudHdlbnR5LWJcIikudHdlbnR5dHdlbnR5KCk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuZ2FsbGVyeS1zbGlkZXInKSkge1xyXG5cdFx0Y29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnktc2xpZGVyJyk7XHJcblxyXG5cdFx0Y29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuXHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDEsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDYwLFxyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2OToge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMDcxOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDAsXHJcblx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0ZWw6IHNsaWRlci5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcGFnaW5hdGlvbicpLFxyXG5cdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0c3dpcGVyLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHN3aXBlci51cGRhdGUoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnLmV4YW1wbGVzLXdvcmstc2xpZGVyJykpIHtcclxuXHRcdGNvbnN0IHNsaWRlckVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGFtcGxlcy13b3JrLXNsaWRlcicpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qgc2xpZGVyIG9mIHNsaWRlckVscykge1xyXG5cdFx0XHRuZXcgU3dpcGVyKHNsaWRlciwge1xyXG5cdFx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxyXG5cdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0YnJlYWtwb2ludHM6IHtcclxuXHRcdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQ3Njk6IHtcclxuXHRcdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdFx0c2xpZGVzUGVyR3JvdXA6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0MTA3MToge1xyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJHcm91cDogMyxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG5hdmlnYXRpb246IHtcclxuXHRcdFx0XHRcdHByZXZFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLXByZXYnKSxcclxuXHRcdFx0XHRcdG5leHRFbDogc2xpZGVyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRcdGVsOiBzbGlkZXIucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXBhZ2luYXRpb24nKSxcclxuXHRcdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHRcdFxyXG5cdH1cclxuXHJcblx0aWYgKGlzRWxlbSgnaGVhZGVyIC5icm8tbWVudScpKSB7XHJcblx0XHRjb25zdCAkbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAuYnJvLW1lbnUnKTtcclxuXHRcdGNvbnN0IG1lbnUgPSBicm9NZW51KCRtZW51KTtcclxuXHJcblx0XHR0b2dnbGVNZW51KCk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRvZ2dsZU1lbnUpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XHJcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEwMjUpIHtcclxuXHRcdFx0XHRtZW51LmluaXQoKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVudS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc0VsZW0oJ1tkYXRhLXRvb2x0aXBdJykpIHtcclxuXHRcdGxldCB0b29sdGlwRWxlbTtcclxuXHJcblx0XHRkb2N1bWVudC5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXBdJyk7XHJcblxyXG5cdFx0XHQvLyDQtdGB0LvQuCDRgyDQvdCw0YEg0LXRgdGC0Ywg0L/QvtC00YHQutCw0LfQutCwLi4uXHJcblx0XHRcdGlmICghdGFyZ2V0KSByZXR1cm47XHJcblxyXG5cdFx0XHR0b29sdGlwRWxlbSA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcudG9vbHRpcCcpO1xyXG5cclxuXHRcdFx0Ly8g0LXRgdC70Lgg0L3QtdGC0YMgZG9tINC/0L7QtNGB0LrQsNC30LrQuCDQvdC+INC10YHRgtGMINGC0LXQutGB0YIg0LIg0LDRgtGA0LjQsdGD0YLQtVxyXG5cdFx0XHRpZiAoIXRvb2x0aXBFbGVtICYmIHRhcmdldC5kYXRhc2V0LnRvb2x0aXApIHtcclxuXHRcdFx0XHR0b29sdGlwRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdHRvb2x0aXBFbGVtLmNsYXNzTmFtZSA9ICd0b29sdGlwIHRvb2x0aXAtLW9wZW4nO1xyXG5cdFx0XHRcdHRvb2x0aXBFbGVtLmlubmVySFRNTCA9IHRhcmdldC5kYXRhc2V0LnRvb2x0aXA7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQodG9vbHRpcEVsZW0pO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5vbm1vdXNlb3V0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdHRvb2x0aXBFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2x0aXAtLW9wZW4nKTtcclxuXHRcdFx0XHRcdHRvb2x0aXBFbGVtID0gbnVsbDtcclxuXHRcdFx0XHRcdGRvY3VtZW50Lm9ubW91c2VvdXQgPSBudWxsO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0gZWxzZSBpZiAoIXRvb2x0aXBFbGVtICYmICF0YXJnZXQuZGF0YXNldC50b29sdGlwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCB3aWR0aFdpbmRvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHJcblx0XHRcdC8vINGB0L/QvtC30LjRhtC40L7QvdC40YDRg9C10Lwg0LXQs9C+INGB0LLQtdGA0YXRgyDQvtGCINCw0L3QvdC+0YLQuNGA0YPQtdC80L7Qs9C+INGN0LvQtdC80LXQvdGC0LAgKHRvcC1jZW50ZXIpXHJcblx0XHRcdGxldCBjb29yZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0XHRsZXQgbGVmdCA9IGNvb3Jkcy5sZWZ0ICsgKHRhcmdldC5vZmZzZXRXaWR0aCAtIHRvb2x0aXBFbGVtLm9mZnNldFdpZHRoKSAvIDI7XHJcblx0XHRcdGlmIChsZWZ0IDwgMCkgbGVmdCA9IDA7IC8vINC90LUg0LfQsNC10LfQttCw0YLRjCDQt9CwINC70LXQstGL0Lkg0LrRgNCw0Lkg0L7QutC90LBcclxuXHJcblx0XHRcdGxldCB0b3AgPSAoY29vcmRzLnRvcCAtIHRvb2x0aXBFbGVtLm9mZnNldEhlaWdodCAtIDUpIC0gNTtcclxuXHJcblx0XHRcdGlmICh0b3AgPCAwKSB7IC8vINC10YHQu9C4INC/0L7QtNGB0LrQsNC30LrQsCDQvdC1INC/0L7QvNC10YnQsNC10YLRgdGPINGB0LLQtdGA0YXRgywg0YLQviDQvtGC0L7QsdGA0LDQttCw0YLRjCDQtdGRINGB0L3QuNC30YNcclxuXHRcdFx0XHR0b3AgPSAoY29vcmRzLnRvcCArIHRhcmdldC5vZmZzZXRIZWlnaHQgKyA1KSAtIDU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0b29sdGlwRWxlbS5vZmZzZXRXaWR0aCArIGxlZnQgPiB3aWR0aFdpbmRvdykge1xyXG5cdFx0XHRcdHRvb2x0aXBFbGVtLnN0eWxlLmxlZnQgPSBgYXV0b2A7XHJcblx0XHRcdFx0dG9vbHRpcEVsZW0uc3R5bGUucmlnaHQgPSBgMTBweGA7XHJcblx0XHRcdFx0dG9vbHRpcEVsZW0uc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRvb2x0aXBFbGVtLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcclxuXHRcdFx0dG9vbHRpcEVsZW0uc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQvtCx0YvRgtC40Lkg0L3QsCDQutC90L7Qv9C+0Log0YHQsNC50YLQsFxyXG5cdC8vINC60L7RgtC+0YDRi9C1INC40LzQtdGO0YIg0LDRgtGA0LjQsdGD0YIgZGF0YS1idG4tdHlwZVxyXG5cdGlmIChpc0VsZW0oJ1tkYXRhLWJ0bi10eXBlXScpKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGlmICghZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnRuLXR5cGVdJykpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpXHJcblx0XHRcdFx0XHQmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnRuLXR5cGVdJykpIHtcclxuXHRcdFx0XHRjb25zdCBidG4gPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1idG4tdHlwZV0nKTtcclxuXHJcblx0XHRcdFx0aWYgKGJ0bi5kYXRhc2V0LmJ0blR5cGUgPT09ICd0b2dnbGVDbGFzcycpIHtcclxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1idG4tdHlwZT1cInRvZ2dsZUNsYXNzXCJdLmFjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi10eXBlPVwidG9nZ2xlQ2xhc3NcIl0uYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRpZiAoaXNFbGVtKCcuZHJvcCcpKSB7XHJcblx0XHRjb25zdCBkcm9wRWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3AnKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGRyb3BFbCBvZiBkcm9wRWxMaXN0KSB7XHJcblx0XHRcdGRyb3Bkb3duKGRyb3BFbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL9C/0L7QutCw0Lcg0L7QutC90LAg0YHRgtCw0YLQuNGB0YLQuNC60Lgg0Log0LHQu9C+0LrQtSDQutC10LnRgdCwXHJcblx0aWYgKGlzRWxlbSgnLnNlcnZpY2UtdG9vbCcpKSB7XHJcblx0XHRsZXQgbGFzdE9wZW5FbDtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZXJ2aWNlLXRvb2xfX2J0bicpO1xyXG5cclxuXHRcdFx0aWYgKGxhc3RPcGVuRWwgJiYgbGFzdE9wZW5FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0bGFzdE9wZW5FbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRsYXN0T3BlbkVsID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGJ0bikge1xyXG5cdFx0XHRcdGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRsYXN0T3BlbkVsID0gYnRuO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly92LW1vZGFsXHJcblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52LW1vZGFsJykpIHtcclxuXHRcdGNvbnN0IG1vZGFsRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudi1tb2RhbCcpO1xyXG5cdFx0Y29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRcdGNvbnN0IHR5cGVPcGVuID0gXCJvcGVuTW9kYWxcIjtcclxuXHRcdGNvbnN0IHR5cGVDbG9zZSA9ICdjbG9zZU1vZGFsJztcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWJ1dHRvbi10eXBlXScpO1xyXG5cdFx0XHRpZiAoYnRuICYmIGJ0bi5kYXRhc2V0LmJ1dHRvblR5cGUgPT09IHR5cGVPcGVuKSB7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHNjcm9sbEJhcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSBib2R5Lm9mZnNldFdpZHRoO1xyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0bW9kYWxFbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0Ym9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cdFx0XHRcdGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyBcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2LW1vZGFsX19pbm5lcicpIHx8IGUudGFyZ2V0LmRhdGFzZXQuYnV0dG9uVHlwZSA9PT0gdHlwZUNsb3NlKSB7XHJcblx0XHRcdFx0bW9kYWxFbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHRcdFx0Ym9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGFiZWwtZmlsZScpKSB7XHJcblx0XHRmb3IgKGNvbnN0ICR1cGxvYWRlciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbGFiZWwtZmlsZScpKSB7XHJcblx0XHRcdGZpbGVJbnB1dCgkdXBsb2FkZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gdi11cCDQutC90L7Qv9C60LAg0LLQstC10YDRhVxyXG5cdChmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYFxyXG5cdFx0PGRpdiBjbGFzcz1cInYtdXBcIj48L2Rpdj5cclxuXHRgKTtcclxuXHJcblx0XHRjb25zdCBidG5Eb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnYtdXAnKTtcclxuXHRcdGxldCB2VXBUcmlnZ2VyVGltZXIgPSAwO1xyXG5cclxuXHRcdHZVcChidG5Eb3duLCBnZXRTY3JvbGVkV2luZG93KTtcclxuXHJcblx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRiYWNrVG9Ub3AoLTQ1LCAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh2VXBUcmlnZ2VyVGltZXIpO1xyXG5cdFx0XHR2VXBUcmlnZ2VyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR2VXAoYnRuRG93biwgZ2V0U2Nyb2xlZFdpbmRvdyk7XHJcblx0XHRcdH0sIDIwMClcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8v0L/RgNC+0LvQuNGB0YLRi9Cy0LDQuNC90LUg0L7QutC90LAg0LLQstC10YDRhSDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRg1xyXG5cdFx0ZnVuY3Rpb24gdlVwKGJ0biwgc2Nyb2xlZCkge1xyXG5cdFx0XHRpZiAoc2Nyb2xlZCgpID4gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLyAyKSkge1xyXG5cdFx0XHRcdGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIGlmIChzY3JvbGVkKCkgPCAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAvIDIpIHx8IGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/Qv9GA0L7QutGA0YPRgtC60LAg0L7QutC90LAg0LLQstC10YDRhSDQstC90LjQt1xyXG5cdFx0ZnVuY3Rpb24gYmFja1RvVG9wKGludGVydmFsLCB0bykge1xyXG5cdFx0XHRpZiAod2luZG93LnBhZ2VZT2Zmc2V0IDw9IHRvKSByZXR1cm47XHJcblxyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsQnkoMCwgaW50ZXJ2YWwpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKVxyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL9C90LAg0YHQutC+0LvRjNC60L4g0L/RgNC+0LrRgNGD0YfQtdC90L4g0L7QutC90L5cclxuXHRcdGZ1bmN0aW9uIGdldFNjcm9sZWRXaW5kb3coKSB7XHJcblx0XHRcdHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cclxuXHRpZiAoaXNFbGVtKCcucG9ydGZvbGlvLWInKSkge1xyXG5cdFx0Y29uc3QgZmlsdGVyQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3J0Zm9saW8tYiAud29yay1jYXJkJyk7XHJcblxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcnRmb2xpby1iX19jYXRlZ29yaWVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRjb25zdCBmaWx0ZXJCdG4gPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1mXScpO1xyXG5cclxuXHRcdFx0aWYgKGZpbHRlckJ0bikge1xyXG5cdFx0XHRcdGlmIChmaWx0ZXJCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mXS5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRmaWx0ZXJCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGZpbHRlckNsYXNzID0gJ2YtJyArIGUudGFyZ2V0LmRhdGFzZXRbJ2YnXTtcclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCBjYXJkIG9mIGZpbHRlckNhcmQpIHtcclxuXHRcdFx0XHRcdGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoZmlsdGVyQ2xhc3MpICYmIGZpbHRlckNsYXNzICE9PSAnZi1hbGwnKSB7XHJcblx0XHRcdFx0XHRcdGNhcmQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblx0Ly8g0YTQuNC60YHQsNGG0LjRjyDQvdCw0LLQuNCz0LDRhtC40Lgg0L/RgNC+0LTRg9C60YLQsFxyXG5cdGlmIChpc0VsZW0oJy5uYXYtcGFuZWwnKSkge1xyXG5cdFx0Y29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuXHRcdGNvbnN0ICRuYXZQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtcGFuZWwnKTtcclxuXHRcdGxldCBpc0ZpeGVkSGVhZGVyID0gdHJ1ZTtcclxuXHJcblx0XHRmaXhlZEVsZW1Ub3AoJG5hdlBhbmVsKTtcclxuXHJcblx0XHRjb25zdCBuYXZMaW5rU2VsZWN0b3IgPSAnW2hyZWYqPVwiI1wiXSc7XHJcblx0XHRjb25zdCAkbmF2TGlua3MgPSAkbmF2UGFuZWwucXVlcnlTZWxlY3RvckFsbChuYXZMaW5rU2VsZWN0b3IpO1xyXG5cdFx0Y29uc3Qgc2VjdGlvbnMgPSBbXTtcclxuXHRcdGxldCBpbmRleEFjdGl2ZUxpbmsgPSBudWxsO1xyXG5cclxuXHRcdGZvciAoY29uc3QgJG5hdkxpbmsgb2YgJG5hdkxpbmtzKSB7XHJcblx0XHRcdGNvbnN0IGhhc2ggPSAkbmF2TGluay5oYXNoO1xyXG5cdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoYXNoKTtcclxuXHJcblx0XHRcdGlmIChzZWN0aW9uKSB7XHJcblx0XHRcdFx0c2VjdGlvbnMucHVzaChzZWN0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWN0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcblx0XHRzZXRBY3RpdmVMaW5rQnlTY3JvbGwoKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2V0QWN0aXZlTGlua0J5U2Nyb2xsKTtcclxuXHJcblx0XHQkbmF2UGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRjb25zdCBsaW5rID0gZS50YXJnZXQuY2xvc2VzdCgnYVtocmVmKj1cIiNcIl0nKTtcclxuXHJcblx0XHRcdGlmICghbGluaykgcmV0dXJuO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRjb25zdCBzZWN0aW9uSWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cdFx0XHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWN0aW9uSWQpO1xyXG5cclxuXHRcdFx0aWYgKCFzZWN0aW9uKSByZXR1cm47XHJcblxyXG5cdFx0XHRjb25zdCBzZWN0aW9uT2Zmc2V0VG9wID0gZ2V0T2Zmc2V0VG9wKHNlY3Rpb24pO1xyXG5cclxuXHRcdFx0bGV0IHNjcm9sbFBvaW50ID0gc2VjdGlvbk9mZnNldFRvcCAtICRuYXZQYW5lbC5vZmZzZXRIZWlnaHQgKyAxMDtcclxuXHJcblx0XHRcdGlmIChpc0ZpeGVkSGVhZGVyKSB7XHJcblx0XHRcdFx0c2Nyb2xsUG9pbnQgPSBzY3JvbGxQb2ludCAtICRoZWFkZXIub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsUG9pbnQpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiBzZXRBY3RpdmVMaW5rQnlTY3JvbGwoKSB7XHJcblx0XHRcdGNvbnN0IHRvcFNlY3Rpb25zID0gc2VjdGlvbnMubWFwKCRzZWN0aW9uID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0T2Zmc2V0VG9wKCRzZWN0aW9uKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRsZXQgY3VycmVudEFjdGl2ZUluZGV4ID0gbnVsbDtcclxuXHRcdFx0Y29uc3QgZmlyc3RTZWN0aW9uVG9wQ29vcmRzID0gdG9wU2VjdGlvbnNbMF07XHJcblx0XHRcdGNvbnN0IGxhc3RTZWN0aW9uQm90dG9tQ29vcmRzID0gdG9wU2VjdGlvbnNbdG9wU2VjdGlvbnMubGVuZ3RoIC0gMV0gKyBzZWN0aW9uc1t0b3BTZWN0aW9ucy5sZW5ndGggLSAxXS5vZmZzZXRIZWlnaHQ7XHJcblxyXG5cdFx0XHRsZXQgb2Zmc2V0VG9wQnlOb2RlcyA9IHBhZ2VZT2Zmc2V0QnlOb2RlcygkbmF2UGFuZWwpO1xyXG5cclxuXHRcdFx0aWYgKGlzRml4ZWRIZWFkZXIpIHtcclxuXHRcdFx0XHRvZmZzZXRUb3BCeU5vZGVzID0gcGFnZVlPZmZzZXRCeU5vZGVzKCRuYXZQYW5lbCwgJGhlYWRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvZmZzZXRUb3BCeU5vZGVzIDwgZmlyc3RTZWN0aW9uVG9wQ29vcmRzIHx8IG9mZnNldFRvcEJ5Tm9kZXMgPiBsYXN0U2VjdGlvbkJvdHRvbUNvb3Jkcykge1xyXG5cdFx0XHRcdGlmIChpbmRleEFjdGl2ZUxpbmsgPT09IG51bGwpIHJldHVybjtcclxuXHJcblx0XHRcdFx0JG5hdkxpbmtzW2luZGV4QWN0aXZlTGlua10uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0aW5kZXhBY3RpdmVMaW5rID0gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG9wU2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAob2Zmc2V0VG9wQnlOb2RlcyA+IHRvcFNlY3Rpb25zW2ldKSB7XHJcblx0XHRcdFx0XHRjdXJyZW50QWN0aXZlSW5kZXggPSBpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4QWN0aXZlTGluayAhPT0gY3VycmVudEFjdGl2ZUluZGV4ICYmIGN1cnJlbnRBY3RpdmVJbmRleCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGluZGV4QWN0aXZlTGluayA9IGN1cnJlbnRBY3RpdmVJbmRleDtcclxuXHRcdFx0XHRjaGFuZ2VOYXZBY3RpdmUoJG5hdkxpbmtzW2luZGV4QWN0aXZlTGlua10pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjaGFuZ2VOYXZBY3RpdmUobmV3TmF2TGlua05vZGUpIHtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAkbmF2TGlua3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQkbmF2TGlua3NbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5ld05hdkxpbmtOb2RlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LypcclxuXHQgIEZVTkNUSU9OUyBQTFVHSU5TXHRcclxuXHQqL1xyXG5cdC8vc2xpbmt5IG1lbnVcclxuXHRmdW5jdGlvbiBicm9NZW51KHNlbGVjdG9yLCBvcHRpb25zKSB7XHJcblx0XHRjb25zdCAkbWVudSA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogc2VsZWN0b3I7XHJcblx0XHRjb25zdCAkbGV2ZWxfMSA9ICRtZW51Lmxhc3RFbGVtZW50Q2hpbGQ7XHJcblx0XHRjb25zdCAkc3ViTWVudUxpc3QgPSAkbWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaSA+IHVsJyk7XHJcblx0XHRjb25zdCAkc3ViTWVudUxpbmsgPSAkbWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaSA+IGEnKTtcclxuXHRcdGxldCBhY3RpdmF0ZWQ7XHJcblxyXG5cdFx0bGV0IGRlZmF1bE9wdGlvbnMgPSB7XHJcblx0XHRcdG5leHRCdG46ICcuYnJvLW1lbnVfX25leHQtYXJyJyxcclxuXHRcdFx0YXJyb3c6IGBcclxuXHRcdFx0PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG5cdFx0XHQ8cGF0aCBkPVwiTTEyLjIxOSAyLjI4MUwxMC43OCAzLjcyIDE4LjA2MiAxMUgydjJoMTYuMDYzbC03LjI4MiA3LjI4MSAxLjQzOCAxLjQzOCA5LTkgLjY4Ny0uNzE5LS42ODctLjcxOXpcIiAvPlxyXG5cdFx0XHQ8L3N2Zz5cclxuXHRcdGBcclxuXHRcdH1cclxuXHJcblx0XHRPYmplY3QuYXNzaWduKGRlZmF1bE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdGxldCAkYWN0aXZlVWw7XHJcblx0XHRsZXQgdHJhbnNsYXRlID0gMDtcclxuXHJcblx0XHRjb25zdCBtZXRob2QgPSB7XHJcblx0XHRcdGluaXQoKSB7XHJcblx0XHRcdFx0aWYgKGFjdGl2YXRlZCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHQkbWVudS5jbGFzc0xpc3QuYWRkKCdicm8tbWVudScpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBzdWJtZW51IG9mICRzdWJNZW51TGlzdCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgbGluayA9IHN1Ym1lbnUucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdsaSA+IGEnKTtcclxuXHRcdFx0XHRcdGxpbmsuY2xhc3NMaXN0LmFkZCgnYnJvLW1lbnVfX25leHQnKTtcclxuXHJcblx0XHRcdFx0XHRfYWRkQnRuQmFjayhzdWJtZW51LCBsaW5rKTtcclxuXHRcdFx0XHRcdF9hZGRCdG5OZXh0KGxpbmspO1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2YXRlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0ICRsaW5rIG9mICRzdWJNZW51TGluaykge1xyXG5cdFx0XHRcdFx0JGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcblxyXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfc2V0SGVpZ2hNZW51KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRlc3Ryb3koKSB7XHJcblx0XHRcdFx0aWYgKCFhY3RpdmF0ZWQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0Y29uc3QgJGFyck5vZGVzID0gJG1lbnUucXVlcnlTZWxlY3RvckFsbCgnLmJyby1tZW51X19hcnInKTtcclxuXHJcblx0XHRcdFx0JG1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xyXG5cdFx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfc2V0SGVpZ2hNZW51KTtcclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCAkbGluayBvZiAkbWVudS5xdWVyeVNlbGVjdG9yQWxsKCcubGluaycpKSB7XHJcblx0XHRcdFx0XHRpZiAoJGxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdicm8tbWVudV9fYmFjaycpKSB7XHJcblx0XHRcdFx0XHRcdCRsaW5rLmNsb3Nlc3QoJ2xpJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAoY29uc3QgJGFyciBvZiAkYXJyTm9kZXMpIHtcclxuXHRcdFx0XHRcdFx0JGFyci5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQkbGluay5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcblx0XHRcdFx0XHQkbGluay5jbGFzc0xpc3QucmVtb3ZlKCdicm8tbWVudV9fbmV4dCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JGFjdGl2ZVVsICYmICRhY3RpdmVVbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JG1lbnUuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcblx0XHRcdFx0JGxldmVsXzEuc3R5bGUudHJhbnNmb3JtID0gYGA7XHJcblx0XHRcdFx0dHJhbnNsYXRlID0gMDtcclxuXHRcdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuXHRcdFx0aWYgKHRhcmdldC5jbG9zZXN0KGRlZmF1bE9wdGlvbnMubmV4dEJ0bikpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0ICRuZXN0ZWRNZW51ID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJykucXVlcnlTZWxlY3RvcigndWwnKTtcclxuXHJcblx0XHRcdFx0aWYgKCRhY3RpdmVVbCkgJGFjdGl2ZVVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHQkbmVzdGVkTWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHQkbmVzdGVkTWVudS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHRcdHRyYW5zbGF0ZSAtPSAxMDA7XHJcblxyXG5cdFx0XHRcdCRsZXZlbF8xLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlfSUpYDtcclxuXHRcdFx0XHQkYWN0aXZlVWwgPSAkbmVzdGVkTWVudTtcclxuXHJcblx0XHRcdFx0c2Nyb2xsVG9WaXNpYmxlKCRhY3RpdmVVbCk7XHJcblx0XHRcdFx0X3NldEhlaWdoTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KCcuYnJvLW1lbnVfX2JhY2snKSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgJHVwcGVyTWVudSA9ICRhY3RpdmVVbC5wYXJlbnRFbGVtZW50LmNsb3Nlc3QoJ3VsJyk7XHJcblx0XHRcdFx0JHVwcGVyTWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JGFjdGl2ZVVsLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcclxuXHJcblx0XHRcdFx0dHJhbnNsYXRlICs9IDEwMDtcclxuXHJcblx0XHRcdFx0JGxldmVsXzEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGV9JSlgO1xyXG5cdFx0XHRcdCRhY3RpdmVVbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHQkYWN0aXZlVWwgPSAkdXBwZXJNZW51O1xyXG5cdFx0XHRcdF9zZXRIZWlnaE1lbnUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9hZGRCdG5OZXh0KGVsZW0pIHtcclxuXHRcdFx0ZWxlbS5jbGFzc0xpc3QuYWRkKCdsaW5rJylcclxuXHRcdFx0ZWxlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcclxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJyby1tZW51X19uZXh0LWFyclwiPlxyXG5cdFx0XHRcdFx0JHtkZWZhdWxPcHRpb25zLmFycm93fVxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0YCk7XHJcblxyXG5cdFx0XHRlbGVtLmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZCgnYnJvLW1lbnVfX2FycicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9hZGRCdG5CYWNrKGVsZW0sIGxpbmspIHtcclxuXHRcdFx0Y29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG5cdFx0XHRlbGVtLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGBcclxuXHRcdFx0PGxpPlxyXG5cdFx0XHRcdDxhIGNsYXNzPVwiYnJvLW1lbnVfX2JhY2sgbGlua1wiICR7KGhyZWYpID8gYGhyZWY9JHtocmVmfWAgOiAnJ30+XHJcblx0XHRcdFx0XHQke2RlZmF1bE9wdGlvbnMuYXJyb3d9XHJcblx0XHRcdFx0XHQke2xpbmsudGV4dENvbnRlbnR9XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0YCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX3NldEhlaWdoTWVudSgpIHtcclxuXHRcdFx0aWYgKCEkYWN0aXZlVWwpIHJldHVybjtcclxuXHJcblx0XHRcdCRtZW51LnN0eWxlLmhlaWdodCA9ICRhY3RpdmVVbC5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsVG9WaXNpYmxlKGVsKSB7XHJcblx0XHRcdGlmIChfZ2V0UG9zQWJzV2luZG93KGVsKSA+IHdpbmRvdy5wYWdlWU9mZnNldCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0YmFja1RvVG9wKC0xMCwgX2dldFBvcyhlbCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9nZXRQb3NBYnNXaW5kb3coZWxlbSkge1xyXG5cdFx0XHRjb25zdCBvZmZzZXRUb3AgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcblx0XHRcdHJldHVybiBvZmZzZXRUb3AgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2dldFBvcyhlbCkge1xyXG5cdFx0XHRyZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5wYWdlWU9mZnNldCA8PSB0bykgcmV0dXJuO1xyXG5cclxuXHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIGludGVydmFsKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0YmFja1RvVG9wKGludGVydmFsLCB0bylcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG1ldGhvZDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZpbGVJbnB1dChmaWVsZEFyZWFTZWxlY3Rvcikge1xyXG5cdFx0Y29uc3QgJHBhcmVudCA9IHR5cGVvZiBmaWVsZEFyZWFTZWxlY3RvciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpZWxkQXJlYVNlbGVjdG9yKSA6IGZpZWxkQXJlYVNlbGVjdG9yO1xyXG5cdFx0Y29uc3QgaW5wdXQgPSAkcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcblx0XHRjb25zdCAkdGV4dENvbnRhaW5lciA9ICRwYXJlbnQucXVlcnlTZWxlY3RvcignLmpzLWxhYmVsLWZpbGVfX3RleHQnKTtcclxuXHJcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRjb25zdCBmaWxlc0NvdW50ID0gZS50YXJnZXQuZmlsZXMubGVuZ3RoO1xyXG5cclxuXHRcdFx0aWYgKCFmaWxlc0NvdW50KSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZpbGVzQ291bnQgPT09IDEpIHtcclxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KCdcXFxcJykucG9wKCk7XHJcblx0XHRcdFx0JHRleHRDb250YWluZXIudGV4dENvbnRlbnQgPSBmaWxlTmFtZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IGDQktGL0LHRgNCw0L3QviDRhNCw0LnQu9C+0LI6ICR7ZmlsZXNDb3VudH1gO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gc2xpZGVyICBcclxuXHRmdW5jdGlvbiBzbGlkZXIoc2VsZWN0b3IsIG9wdGlvbiA9IHt9KSB7XHJcblx0XHRjb25zdCAkc2xpZGVyID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBzZWxlY3RvcjtcclxuXHRcdGNvbnN0ICRzbGlkZXJXcmFwID0gJHNsaWRlci5jbG9zZXN0KCcuc2xpZGVyLXdyYXAnKTtcclxuXHJcblx0XHRjb25zdCBzZXRpbmdzID0ge1xyXG5cdFx0XHRuYXZpZ2F0aW9uOiAkc2xpZGVyV3JhcC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLW5hdicpLFxyXG5cdFx0XHRwYWdpbmF0aW9uOiAkc2xpZGVyV3JhcC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXBhZ2luYXRpb24nKSxcclxuXHRcdFx0b3B0aW9uczoge1xyXG5cdFx0XHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXHJcblx0XHRcdFx0Li4ub3B0aW9uLFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0T2JqZWN0LmFzc2lnbihzZXRpbmdzLm9wdGlvbnMsIHtcclxuXHRcdFx0d2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxyXG5cdFx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHRhdXRvcGxheTogKCskc2xpZGVyLmRhdGFzZXQuc3dpcGVyQXV0b3BsYXkgPiAwKSA/IHtcclxuXHRcdFx0XHRkZWxheTogKyRzbGlkZXIuZGF0YXNldC5zd2lwZXJBdXRvcGxheSxcclxuXHRcdFx0XHRwYXVzZU9uTW91c2VFbnRlcjogdHJ1ZSxcclxuXHRcdFx0XHRkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcblx0XHRcdH0gOiAnJyxcclxuXHRcdFx0bmF2aWdhdGlvbjogc2V0aW5ncy5uYXZpZ2F0aW9uID8ge1xyXG5cdFx0XHRcdG5leHRFbDogJHNsaWRlcldyYXAucXVlcnlTZWxlY3RvcignLnNsaWRlci1hcnItLW5leHQnKSxcclxuXHRcdFx0XHRwcmV2RWw6ICRzbGlkZXJXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYXJyLS1wcmV2JyksXHJcblx0XHRcdH0gOiAnJyxcclxuXHRcdFx0cGFnaW5hdGlvbjogc2V0aW5ncy5wYWdpbmF0aW9uID8ge1xyXG5cdFx0XHRcdGVsOiAkc2xpZGVyV3JhcC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXBhZ2luYXRpb24nKSxcclxuXHRcdFx0XHRjbGlja2FibGU6IHRydWUsXHJcblx0XHRcdH0gOiAnJyxcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIG5ldyBTd2lwZXIoJHNsaWRlciwgc2V0aW5ncy5vcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdC8vYWNjYXJkaW9uXHJcblx0ZnVuY3Rpb24gYWNjYXJkaW9uKCkge1xyXG5cdFx0bGV0IGhlYWRlckRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRsZXQgX21haW5FbGVtZW50ID0ge30sIC8vIC5hY2NvcmRpb24gXHJcblx0XHRcdFx0X2l0ZW1zID0ge307IC8vIC5hY2NvcmRpb24taXRlbSBcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aW5pdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdF9tYWluRWxlbWVudCA9ICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpIDogZWxlbWVudCk7XHJcblx0XHRcdFx0XHRfaXRlbXMgPSBfbWFpbkVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY2FyZGlvbl9faXRlbScpO1xyXG5cdFx0XHRcdFx0X3NldHVwTGlzdGVuZXJzKF9tYWluRWxlbWVudCwgJ2NsaWNrJywgX2NsaWNrSGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBfY2xpY2tIYW5kbGVyKGUpIHtcclxuXHRcdFx0XHRpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5hY2NhcmRpb25fX2l0ZW0taGVhZGVyJykpIHJldHVybjtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRsZXQgaGVhZGVyID0gZS50YXJnZXQuY2xvc2VzdCgnLmFjY2FyZGlvbl9faXRlbS1oZWFkZXInKSxcclxuXHRcdFx0XHRcdGl0ZW0gPSBoZWFkZXIuY2xvc2VzdCgnLmFjY2FyZGlvbl9faXRlbScpLFxyXG5cdFx0XHRcdFx0aXRlbUFjdGl2ZSA9IF9nZXRJdGVtKF9pdGVtcywgJ29wZW4nKTtcclxuXHJcblx0XHRcdFx0aWYgKGl0ZW1BY3RpdmUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGl0ZW1BY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpdGVtQWN0aXZlICE9PSBpdGVtKSB7XHJcblx0XHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG5cclxuXHRcdFx0XHRcdFx0c2Nyb2xsVG9WaXNpYmxlKGl0ZW0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9zZXR1cExpc3RlbmVycyhlbGVtLCBldmVudCwgaGFuZGxlcikge1xyXG5cdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNjcm9sbFRvVmlzaWJsZShlbCkge1xyXG5cdFx0XHRpZiAoX2dldFBvcyhlbCkgPiB3aW5kb3cucGFnZVlPZmZzZXQpIHJldHVybjtcclxuXHRcdFx0YmFja1RvVG9wKC0xMCwgX2dldFBvcyhlbCkgLSBoZWFkZXJEb20ub2Zmc2V0SGVpZ2h0IC0gMzApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9nZXRQb3MoZWwpIHtcclxuXHRcdFx0cmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0SXRlbShlbGVtZW50cywgY2xhc3NOYW1lKSB7XHJcblx0XHRcdHZhciBlbGVtZW50ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQgPSBpdGVtO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fTtcclxuXHJcblx0XHRmdW5jdGlvbiBiYWNrVG9Ub3AoaW50ZXJ2YWwsIHRvKSB7XHJcblx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPD0gdG8pIHJldHVybjtcclxuXHJcblx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBpbnRlcnZhbCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGJhY2tUb1RvcChpbnRlcnZhbCwgdG8pXHJcblx0XHRcdH0sIDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gYlRhYnNcclxuXHRmdW5jdGlvbiBiVGFicyh0YXJnZXQpIHtcclxuXHRcdGxldCBfZWxlbVRhYnMgPSAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkgOiB0YXJnZXQpLFxyXG5cdFx0XHRfZXZlbnRUYWJzU2hvdyxcclxuXHRcdFx0X3Nob3dUYWIgPSBmdW5jdGlvbiAodGFic0xpbmtUYXJnZXQpIHtcclxuXHRcdFx0XHR2YXIgdGFic1BhbmVUYXJnZXQsIHRhYnNMaW5rQWN0aXZlLCB0YWJzUGFuZVNob3c7XHJcblx0XHRcdFx0dGFic1BhbmVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhYnNMaW5rVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcclxuXHRcdFx0XHR0YWJzTGlua0FjdGl2ZSA9IHRhYnNMaW5rVGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmItdGFic19fbGluay5hY3RpdmUnKTtcclxuXHRcdFx0XHR0YWJzUGFuZVNob3cgPSB0YWJzUGFuZVRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iLXRhYnNfX3BhbmUuYWN0aXZlJyk7XHJcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0YHQu9C10LTRg9GO0YnQsNGPINCy0LrQu9Cw0LTQutCwINGA0LDQstC90LAg0LDQutGC0LjQstC90L7QuSwg0YLQviDQt9Cw0LLQtdGA0YjQsNC10Lwg0YDQsNCx0L7RgtGDXHJcblx0XHRcdFx0aWYgKHRhYnNMaW5rVGFyZ2V0ID09PSB0YWJzTGlua0FjdGl2ZSkgcmV0dXJuO1xyXG5cdFx0XHRcdC8vINGD0LTQsNC70Y/QtdC8INC60LvQsNGB0YHRiyDRgyDRgtC10LrRg9GJ0LjRhSDQsNC60YLQuNCy0L3Ri9GFINGN0LvQtdC80LXQvdGC0L7QslxyXG5cdFx0XHRcdGlmICh0YWJzTGlua0FjdGl2ZSAhPT0gbnVsbCkgdGFic0xpbmtBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdGlmICh0YWJzUGFuZVNob3cgIT09IG51bGwpIHRhYnNQYW5lU2hvdy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHQvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgdGLINC6INGN0LvQtdC80LXQvdGC0LDQvCAo0LIg0LfQsNCy0LjQvNC+0YHRgtC4INC+0YIg0LLRi9Cx0YDQsNC90L3QvtC5INCy0LrQu9Cw0LTQutC4KVxyXG5cdFx0XHRcdHRhYnNMaW5rVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdHRhYnNQYW5lVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoX2V2ZW50VGFic1Nob3cpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRfc3dpdGNoVGFiVG8gPSBmdW5jdGlvbiAodGFic0xpbmtJbmRleCkge1xyXG5cdFx0XHRcdHZhciB0YWJzTGlua3MgPSBfZWxlbVRhYnMucXVlcnlTZWxlY3RvckFsbCgnLmItdGFic19fbGluaycpO1xyXG5cdFx0XHRcdGlmICh0YWJzTGlua3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0aWYgKHRhYnNMaW5rSW5kZXggPiB0YWJzTGlua3MubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHRhYnNMaW5rSW5kZXggPSB0YWJzTGlua3MubGVuZ3RoO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0YWJzTGlua0luZGV4IDwgMSkge1xyXG5cdFx0XHRcdFx0XHR0YWJzTGlua0luZGV4ID0gMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF9zaG93VGFiKHRhYnNMaW5rc1t0YWJzTGlua0luZGV4IC0gMV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRfZXZlbnRUYWJzU2hvdyA9IG5ldyBDdXN0b21FdmVudCgndGFiLnNob3cnLCB7IGRldGFpbDogX2VsZW1UYWJzIH0pO1xyXG5cclxuXHRcdF9lbGVtVGFicy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHZhciB0YWJzTGlua1RhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0XHQvLyDQt9Cw0LLQtdGA0YjQsNC10Lwg0LLRi9C/0L7Qu9C90LXQvdC40LUg0YTRg9C90LrRhtC40LgsINC10YHQu9C4INC60LvQuNC60L3Rg9C70Lgg0L3QtSDQv9C+INGB0YHRi9C70LrQtVxyXG5cdFx0XHRpZiAoIXRhYnNMaW5rVGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYi10YWJzX19saW5rJykpIHJldHVybjtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0X3Nob3dUYWIodGFic0xpbmtUYXJnZXQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvd1RhYjogZnVuY3Rpb24gKHRhcmdldCkge1xyXG5cdFx0XHRcdF9zaG93VGFiKHRhcmdldCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHN3aXRjaFRhYlRvOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuXHRcdFx0XHRfc3dpdGNoVGFiVG8oaW5kZXgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8vZHJvcGRvd25cclxuXHRmdW5jdGlvbiBkcm9wZG93bihzZWxlY3Rvcikge1xyXG5cdFx0Y29uc3QgJGVsID0gdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcblx0XHRcdDogc2VsZWN0b3IsXHJcblx0XHRcdCRidG4gPSAkZWwucXVlcnlTZWxlY3RvcignLmRyb3AtYnRuJyksXHJcblx0XHRcdCRjb250ZW50ID0gJGVsLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLWNvbnRlbnQnKTtcclxuXHJcblx0XHQkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkZWwuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG5cclxuXHRcdFx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG5cdFx0XHRcdCRjb250ZW50LnN0eWxlLm1pbkhlaWdodCA9ICRjb250ZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHQkY29udGVudC5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcclxuXHRcdFx0XHR9LCAzMjApXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gJyc7XHJcblx0XHRcdFx0JGNvbnRlbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG5cdFx0XHRcdCRjb250ZW50LnN0eWxlLm1pbkhlaWdodCA9ICcnO1xyXG5cdFx0XHRcdCRjb250ZW50LnN0eWxlLm1pbkhlaWdodCA9ICRjb250ZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvLyByZWFkbW9yZSBqc1xyXG5cdGZ1bmN0aW9uIHJlYWRtb3JlKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcclxuXHRcdGxldCAkZWwgPSAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IHNlbGVjdG9yLFxyXG5cdFx0XHQkdG9nZ2xlO1xyXG5cclxuXHRcdGNvbnN0IGJhc2VDbGFzcyA9ICdqcy1yZWFkbW9yZSc7XHJcblx0XHRjb25zdCBzZWN0aW9uQ2xhc3MgPSBiYXNlQ2xhc3MgKyAnLXNlY3Rpb24nO1xyXG5cdFx0Y29uc3QgZXhwYW5kZWRDbGFzcyA9IHNlY3Rpb25DbGFzcyArICctLWV4cGFuZGVkJztcclxuXHRcdGNvbnN0IGNvbGxhcHNlZENsYXNzID0gc2VjdGlvbkNsYXNzICsgJy0tY29sbGFwc2VkJztcclxuXHRcdGNvbnN0IGRpc2FibGVkQ2xhc3MgPSBzZWN0aW9uQ2xhc3MgKyAnLS1kaXNhYmxlZCc7XHJcblx0XHRjb25zdCBidG5Ub2dnbGVDbGFzcyA9IGJhc2VDbGFzcyArICctdG9nZ2xlJztcclxuXHRcdGNvbnN0IGJ0blRvZ2dsZU1vcmVDbGFzcyA9IGJ0blRvZ2dsZUNsYXNzICsgJy0tbW9yZSc7XHJcblx0XHRsZXQgaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGlzQnRuSW5pdCA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0IHNldHRpbmdzID0ge1xyXG5cdFx0XHR2aXNpYmxlSGVpZ2h0OiAyMDAsXHJcblx0XHRcdHBvc2l0aW9uVG9nZ2xlOiAnaW5zaWRlJyxcclxuXHRcdFx0YnRuQ2xhc3NlczogXCJcIixcclxuXHRcdFx0Y2hhbmdlTmFtZTogZmFsc2UsXHJcblx0XHRcdG1vcmVCdG5Db250ZW50OiBcItCf0L7QutCw0LfQsNGC0Ywg0LLRgdC1XCIsXHJcblx0XHRcdGxlc3NCdG5Db250ZW50OiBcItCh0LrRgNGL0YLRjFwiLFxyXG5cdFx0fVxyXG5cclxuXHRcdE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHNldHRpbmdzLnZpc2libGVIZWlnaHQgPSBwYXJzZUZsb2F0KCRlbC5kYXRhc2V0LnJlYWRtb3JlSGVpZ2h0KSB8fCBzZXR0aW5ncy52aXNpYmxlSGVpZ2h0O1xyXG5cclxuXHRcdCRlbC5jbGFzc05hbWUgPSAkZWwuY2xhc3NOYW1lICsgYCAke3NlY3Rpb25DbGFzc31gO1xyXG5cclxuXHRcdGNoYW5nZVN0YXRlKCk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoYW5nZVN0YXRlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBjaGFuZ2VTdGF0ZSgpIHtcclxuXHRcdFx0aWYgKCRlbC5zY3JvbGxIZWlnaHQgPiBzZXR0aW5ncy52aXNpYmxlSGVpZ2h0KSB7XHJcblx0XHRcdFx0aWYgKCFpc0J0bkluaXQpIHtcclxuXHRcdFx0XHRcdGlzQnRuSW5pdCA9IHRydWU7XHJcblx0XHRcdFx0XHQkdG9nZ2xlID0gY3JlYXRlQnRuKCk7XHJcblxyXG5cdFx0XHRcdFx0JHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJUb2dnbGUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkdG9nZ2xlLmlubmVySFRNTCA9IHNldHRpbmdzLm1vcmVCdG5Db250ZW50O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JGVsLnN0eWxlLm1heEhlaWdodCA9IHNldHRpbmdzLnZpc2libGVIZWlnaHQgKyAncHgnO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGNvbGxhcHNlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LnJlbW92ZShkaXNhYmxlZENsYXNzKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGV4cGFuZGVkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGNvbGxhcHNlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LmFkZChkaXNhYmxlZENsYXNzKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNyZWF0ZUJ0bigpIHtcclxuXHRcdFx0Y29uc3QgJGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cdFx0XHQkYnRuLmlubmVySFRNTCA9IHNldHRpbmdzLm1vcmVCdG5Db250ZW50O1xyXG5cdFx0XHQkYnRuLmNsYXNzTmFtZSA9IGJ0blRvZ2dsZUNsYXNzICsgXCIgXCIgKyBidG5Ub2dnbGVNb3JlQ2xhc3M7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHNldHRpbmdzLmJ0bkNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0JGJ0bi5jbGFzc05hbWUgPSBzZXR0aW5ncy5idG5DbGFzc2VzICsgXCIgXCIgKyAkYnRuLmNsYXNzTmFtZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JGVsLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCAkYnRuKTtcclxuXHJcblx0XHRcdHJldHVybiAkYnRuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGhhbmRsZXJUb2dnbGUoKSB7XHJcblx0XHRcdGlmIChpc0V4cGFuZGVkKSB7XHJcblx0XHRcdFx0aXNFeHBhbmRlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdCR0b2dnbGUuY2xhc3NMaXN0LmFkZChidG5Ub2dnbGVNb3JlQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKGV4cGFuZGVkQ2xhc3MpO1xyXG5cdFx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGNvbGxhcHNlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuc3R5bGUubWF4SGVpZ2h0ID0gc2V0dGluZ3MudmlzaWJsZUhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHRcdGlmICghc2V0dGluZ3MuY2hhbmdlTmFtZSkgcmV0dXJuXHJcblx0XHRcdFx0JHRvZ2dsZS5pbm5lckhUTUwgPSBzZXR0aW5ncy5tb3JlQnRuQ29udGVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpc0V4cGFuZGVkID0gdHJ1ZTtcclxuXHRcdFx0XHQkdG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoYnRuVG9nZ2xlTW9yZUNsYXNzKTtcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LmFkZChleHBhbmRlZENsYXNzKTtcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LnJlbW92ZShjb2xsYXBzZWRDbGFzcyk7XHJcblx0XHRcdFx0JGVsLnN0eWxlLm1heEhlaWdodCA9ICRlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG5cdFx0XHRcdGlmICghc2V0dGluZ3MuY2hhbmdlTmFtZSkgcmV0dXJuXHJcblx0XHRcdFx0JHRvZ2dsZS5pbm5lckhUTUwgPSBzZXR0aW5ncy5sZXNzQnRuQ29udGVudDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZml4ZWRFbGVtVG9wKHNlbGVjdG9yKSB7XHJcblx0XHRjb25zdCAkZWwgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBzZWxlY3RvcjtcclxuXHRcdGNvbnN0ICRzdGFydGluZ1BsYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcblx0XHQkZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsICRzdGFydGluZ1BsYWNlKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRsZXQgcGFnZVlPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHRcdGxldCBpc0ZpeGVkSGVhZGVyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoZ2V0Q29tcHV0ZWRTdHlsZSgkaGVhZGVyKS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xyXG5cdFx0XHRcdHBhZ2VZT2Zmc2V0ID0gcGFnZVlPZmZzZXRCeU5vZGVzKCRoZWFkZXIpO1xyXG5cdFx0XHRcdGlzRml4ZWRIZWFkZXIgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocGFnZVlPZmZzZXQgPiBnZXRPZmZzZXRUb3AoJHN0YXJ0aW5nUGxhY2UpKSB7XHJcblx0XHRcdFx0JHN0YXJ0aW5nUGxhY2Uuc3R5bGUuaGVpZ2h0ID0gJGVsLm9mZnNldEhlaWdodCArICdweCc7XHJcblx0XHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoJ2ZpeGVkJyk7XHJcblx0XHRcdFx0JGVsLnN0eWxlLnRvcCA9IGlzRml4ZWRIZWFkZXIgPyAkaGVhZGVyLm9mZnNldEhlaWdodCArICdweCcgOiAnJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkc3RhcnRpbmdQbGFjZS5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHRcdFx0XHQkZWwuY2xhc3NMaXN0LnJlbW92ZSgnZml4ZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMFxyXG5cdFx0KSlcclxuXHR9O1xyXG5cclxuXHQvL3ZpZGVvXHJcblx0KGZ1bmN0aW9uICgpIHtcclxuXHRcdGZpbmRWaWRlb3MoKTtcclxuXHJcblx0XHRmdW5jdGlvbiBmaW5kVmlkZW9zKCkge1xyXG5cdFx0XHRsZXQgdmlkZW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZGVvJyk7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHNldHVwVmlkZW8odmlkZW9zW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vINC70LXQvdC40LLQsNGPINC30LDQs9GA0YPQt9C60LAg0LLQuNC00LXQviBcclxuXHRcdGZ1bmN0aW9uIHNldHVwVmlkZW8odmlkZW8pIHtcclxuXHRcdFx0bGV0IGxpbmsgPSB2aWRlby5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX2xpbmsnKTtcclxuXHRcdFx0Y29uc3QgaHJlZkxpbmsgPSBsaW5rLmhyZWY7XHJcblx0XHRcdGxldCBtZWRpYSA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fbWVkaWEnKTtcclxuXHRcdFx0bGV0IGJ1dHRvbiA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19fYnV0dG9uJyk7XHJcblx0XHRcdGxldCBkZWxldGVkTGVuZ3RoID0gJ2h0dHBzOi8veW91dHUuYmUvJy5sZW5ndGg7XHJcblx0XHRcdGxldCB2aWRlb0lkID0gaHJlZkxpbmsuc3Vic3RyaW5nKGRlbGV0ZWRMZW5ndGgsIGhyZWZMaW5rLmxlbmd0aCk7XHJcblx0XHRcdGxldCB5b3V0dWJlSW1nU3JjID0gJ2h0dHBzOi8vaS55dGltZy5jb20vdmkvJyArIHZpZGVvSWQgKyAnL21heHJlc2RlZmF1bHQuanBnJztcclxuXHJcblx0XHRcdG1lZGlhLnNyYyA9IHlvdXR1YmVJbWdTcmM7XHJcblxyXG5cdFx0XHR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRsZXQgaWZyYW1lID0gY3JlYXRlSWZyYW1lKHZpZGVvSWQpO1xyXG5cclxuXHRcdFx0XHRsaW5rLnJlbW92ZSgpO1xyXG5cdFx0XHRcdGJ1dHRvbi5yZW1vdmUoKTtcclxuXHRcdFx0XHR2aWRlby5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XHJcblx0XHRcdHZpZGVvLmNsYXNzTGlzdC5hZGQoJ3ZpZGVvLS1lbmFibGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY3JlYXRlSWZyYW1lKGlkKSB7XHJcblx0XHRcdGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHJcblx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcclxuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3cnLCAnYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGNsaXBib2FyZC13cml0ZTsnKTtcclxuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgZ2VuZXJhdGVVUkwoaWQpKTtcclxuXHRcdFx0aWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3ZpZGVvX19tZWRpYScpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGlmcmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZW5lcmF0ZVVSTChpZCkge1xyXG5cdFx0XHRsZXQgcXVlcnkgPSAnP3JlbD0wJnNob3dpbmZvPTEmYXV0b3BsYXk9MSc7XHJcblxyXG5cdFx0XHRyZXR1cm4gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyBpZCArIHF1ZXJ5O1xyXG5cdFx0fVxyXG5cdH0oKSk7XHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmIChlLnRhcmdldC5jbG9zZXN0KCcuc2Nyb2xsLXRvW2hyZWYqPVwiI1wiXScpKSB7XHJcblx0XHRcdGNvbnN0IGxpbmsgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2Nyb2xsLXRvW2hyZWYqPVwiI1wiXScpO1xyXG5cdFx0XHRjb25zdCBpZCA9IGxpbmsuaGFzaDtcclxuXHRcdFx0Y29uc3QgJHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcclxuXHJcblx0XHRcdGlmICghJHNlY3Rpb24pIHJldHVybjtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGxldCBjb29yZHNTZWN0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgJHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0aWYgKGlzRml4ZWRIZWFkZXIpIHtcclxuXHRcdFx0XHRjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5cdFx0XHRcdGNvb3Jkc1NlY3Rpb24gPSBjb29yZHNTZWN0aW9uIC0gJGhlYWRlci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCBjb29yZHNTZWN0aW9uKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cclxuXHRpZiAoaXNFbGVtKCdbZGF0YS1hY3RpdmUtY29pbnNdJykpIHtcclxuXHRcdGNvbnN0IGNvaW5QYXJlbnRFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY3RpdmUtY29pbnNdJyk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Zm9yIChjb25zdCBjb2luUGFyZW50RWwgb2YgY29pblBhcmVudEVscykge1xyXG5cdFx0XHRjb25zdCBjb3VudCA9IGNvaW5QYXJlbnRFbC5kYXRhc2V0LmFjdGl2ZUNvaW5zO1xyXG5cdFx0XHRjb25zdCBjaGlsZHJlbkNvaW5FbHMgPSBjb2luUGFyZW50RWwuY2hpbGRyZW47XHJcblxyXG5cdFx0XHRpZiAoIWNvdW50KSByZXR1cm47XHJcblxyXG5cdFx0XHRBcnJheS5mcm9tKGNoaWxkcmVuQ29pbkVscykuZmlsdGVyKChpdGVtLCBpKSA9PiBpID49IGNvdW50KS5tYXAoaXRlbSA9PiBpdGVtLmRhdGFzZXQuZGlzYWJsZWRDb2luID0gXCJcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKioqKiogVVRJTFMgKioqKioqL1xyXG5cdGZ1bmN0aW9uIGlzRWxlbShzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkgPyB0cnVlIDogZmFsc2U7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcyA9IDUwKSB7XHJcblx0XHRsZXQgbG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKGxvY2tlZCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0Y29uc3QgY29udGV4dCA9IHRoaXM7XHJcblx0XHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdGxvY2tlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdGxvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHR9LCBtcylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vINC/0L7Qu9C+0LbQtdC90LjQtSDQstC10YDRhdCwINCy0YzRjtC/0L7RgNGC0LAg0L7RgiDQvdCw0YfQsNC70LAg0LTQvtC60YPQvNC10L3RgtCwXHJcblx0Ly8gYyDRg9GH0LXRgtC+0Lwg0LfQsNC60YDQtdC/0LvQtdC90L3QvtCz0L4g0YHQstC10YDRhdGDINGN0LvQtdC80LXQvdGC0LBcclxuXHRmdW5jdGlvbiBwYWdlWU9mZnNldEJ5Tm9kZXMobm9kZSkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBzdW1tSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRpZiAoYXJncy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRzdW1tSGVpZ2h0ID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtLCBpdGVtKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjY3VtICsgaXRlbS5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdH0sIHN1bW1IZWlnaHQpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIHN1bW1IZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRPZmZzZXRUb3Aobm9kZSkge1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCArIG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cdH1cclxufSh3aW5kb3cpKTsiXX0=
