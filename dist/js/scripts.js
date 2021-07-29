//  Ivan Eremeev - 2021
//  Skype: ivan.eremeev_1
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Брэйкпоинты js
	var	breakXl = 1400,
			breakLg = 1200,
			breakMd = 1025,
			breakSm = 769,
			breakXs = 500;

	// Запрет перехода по ссылкам с хэшем
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// JQueryMatchHeigh || Одинаковая высота у заголовков карточек товара
	if ($('.card__title').length) {
		$('.card__title').matchHeight();
	}

	// Ховер на карточку товара
	function hoverCard() {
		$('.card').each(function(){
			var card = $(this),
					drop = card.find('.card__drop'),
					time = 200;
			card.hover(function () {
				if ($(window).width() >= breakXs) {
					drop.stop().slideDown(time);
				}
			}, function () {
				drop.stop().slideUp(time);
			})
		})
	}
	hoverCard()

	// Скрыть определенное кол-во пунктов списка и показывать при нажатии на кнопку "показать больше"
	// Добавить класс списку .js-hide-list-items
	// и data-value="" - количество элементов которыеы нужно показывать
	// Добавить пункт в конец списка с классом .js-hide-list-all (будет открывать список)
	// function hideListItems() {
	// 	$('.js-hide-list-items').each(function () {
	// 		var $this = $(this),
	// 			items = $this.find('li'),
	// 			btnAll = $this.find('.js-hide-list-all'),
	// 			valueItem = $this.data('value'),
	// 			img = $this.siblings('.card__wrap').find('.card__imageblock'),
	// 			itemTarget = items.filter(function () {
	// 				return $(this).index() > valueItem - 1
	// 			});
	// 		if ((items.length - 1) > valueItem) { // если кол-во элементов превышает указанное в data-valueItem="", то скрываем остальные
	// 			itemTarget.hide();
	// 			btnAll.show();
	// 		}
	// 		btnAll.on('click', function () { // клик по кнопке "показать еще" (появляются все скрытые пункты списка)
	// 			if (!btnAll.hasClass('active')) {
	// 				$(this).addClass('active');
	// 				itemTarget.show();
	// 				img.addClass('hide');
	// 			} else {
	// 				itemTarget.hide();
	// 				btnAll.show();
	// 				img.removeClass('hide');
	// 				$(this).removeClass('active');
	// 			}
	// 		})
	// 	})
	// }
	// hideListItems();

		function hideListItems() {
		$('.js-hide-list-items').each(function () {
			var $this = $(this),
				items = $this.find('li'),
				btnAll = $this.find('.js-hide-list-all'),
				valueItem = $this.data('value'),
				img = $this.siblings('.card__wrap').find('.card__imageblock'),
				time = 200,
				itemTarget = items.filter(function () {
					return $(this).index() > valueItem - 1
				});
			if ((items.length - 1) > valueItem) { // если кол-во элементов превышает указанное в data-valueItem="", то скрываем остальные
				itemTarget.wrapAll('<div class="card__list-wrap"></div>');
				var wrap = $('.card__list-wrap');
				wrap.hide();
				btnAll.show();
				$this.children().last().before(btnAll);
			}
			btnAll.on('click', function () { // клик по кнопке "показать еще" (появляются все скрытые пункты списка)
				if (!btnAll.hasClass('active')) {
					$(this).addClass('active');
					img.addClass('hide');
					wrap.stop().slideDown(time);
				} else {
					img.removeClass('hide');
					$(this).removeClass('active');
					wrap.stop().slideUp(time);
				}
			})
		})
	}
	hideListItems();

	// Выпадайки при клике по кнопке
	// Задать блокам выпадайкам .js-drop и айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function DropBlock(drop, button) {
		button.on('click', function () { // клик по кнопке
			var $this = $(this),
				data = $this.data('drop');
			if (!$this.hasClass('active')) { // если имеет класс .active скрываем все выпадайки и открываем только относящуюся к кнопке
				drop.removeClass('open');
				button.removeClass('active');
				$this.addClass('active');
				$('#' + data).addClass('open');
			} else { // если не имеет класс .active скрываем все выпадайки
				button.removeClass('active');
				drop.removeClass('open');
			}
		})
		$(document).mouseup(function (e) { // клик по любому месту страницы вне блока (скрываем все выпадайки)
			if (!drop.is(e.target)
				&& drop.has(e.target).length === 0
				&& !button.is(e.target)
				&& button.has(e.target).length === 0) {
				drop.removeClass('open');
				button.removeClass('active');
			}
		});
	}
	DropBlock($('.js-drop'), $('.js-drop-btn'));

});