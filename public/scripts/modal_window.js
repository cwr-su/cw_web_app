; (function () {
	const mOpen = document.querySelectorAll('[data-modal]');
	const body = document.querySelector('body');

	if (mOpen.length == 0) return;

	const modals = document.querySelectorAll('.dlg-modal'),
		mClose = document.querySelectorAll('[data-close]');
	let mStatus = false;

	for (let el of mOpen) {
		el.addEventListener('click', function (e) {
			let modalId = el.dataset.modal,
				modal = document.getElementById(modalId),
				overlayClass = 'overlay_' + modalId.split('_')[1],
				overlay = document.querySelector('.' + overlayClass);

			modalShow(modal, overlay);
		});
	}

	for (let el of mClose) {
		el.addEventListener('click', modalClose);
	}

	document.addEventListener('keydown', modalClose);

	function modalShow(modal, overlay) {
		overlay.classList.remove('fadeOut');
		overlay.classList.add('fadeIn');

		if (typeAnimate === 'fade') {
			modal.classList.remove('fadeOut');
			modal.classList.add('fadeIn');
		} else if (typeAnimate === 'slide') {
			modal.classList.remove('slideOutUp');
			modal.classList.add('slideInDown');
		}
		body.classList.add('modal-open');

		mStatus = true;
	}

	function modalClose(event) {
		if (mStatus && (event.type !== 'keydown' || event.keyCode === 27)) {
			for (let modal of modals) {
				let modalId = modal.id,
					overlayClass = 'overlay_' + modalId.split('_')[1],
					overlay = document.querySelector('.' + overlayClass);

				if (typeAnimate == 'fade') {
					if (modal.classList.contains('fadeIn')) {
						overlay.classList.add('fadeOut');
						modal.classList.add('fadeOut');
					}

					overlay.classList.remove('fadeIn');
					modal.classList.remove('fadeIn');
				} else if (typeAnimate == 'slide') {
					if (modal.classList.contains('slideInDown')) {
						modal.classList.add('slideOutUp');
						overlay.classList.add('slideOutUp');
					}
					overlay.classList.remove('slideInDown');
					modal.classList.remove('slideInDown');
				}
			}
			body.classList.remove('modal-open');
			mStatus = false;
		}
	}
})();