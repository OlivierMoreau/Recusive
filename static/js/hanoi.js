$(document).ready(function (e) {
	const COLORS = ['bleu', 'jaune', 'marron', 'rose', 'rouge', 'vert'];
	var disk;
	var pillarSize;
	var time = 1;
	var animate;
	var pillarA = [];
	var pillarB = [];
	var pillarC = [];
	var moves = [];
	/*
	 *
	 *
	 *
	 *Init functions
	 *
	 *
	 *
	 */
	function init(disks) {
		moves = [];
		pillarA = [];
		pillarB = [];
		pillarC = [];
		$('#disks, #columns').html('');
		$('#base').remove();

		for (var i = 0; i < disks; i++) {
			$('#disks').append(
				'<div class="disk"><img class="colorbox" src="static/assets/disk_bleu.png"></div>'
			);
		}

		disk = $('.disk').toArray().reverse();
		pillarA = disk;
		$('#columns').append(
			'<div class="column"><div class="colShadow"></div></div><div class="column"><div class="colShadow"></div></div><div class="column"><div class="colShadow"></div></div>'
		);
		$('<div id="base"></div>').appendTo('#towerCont');
		pillarSize = 3 * disk.length + 2;
		$('.column').css({ height: '' });
		$('#disks').css({ bottom: '' });
		diskSquash();
	}

	function diskSquash() {
		$('.column').css({ height: pillarSize + 'em' });
		for (var i = 0; i < disk.length; i++) {
			var padding = i * 15;
			$(disk[i]).css({ bottom: '-' + pillarSize + 'em' });
			$(disk[i]).css({
				'padding-left': padding + 'px',
				'padding-right': padding + 'px',
			});
			$(disk[i])
				.children()
				.attr({
					src: 'static/assets/disk_' + COLORS[i % COLORS.length] + '.png',
				});
		}
	}

	/*
	 *
	 *
	 *
	 *Events listeners
	 *
	 *
	 *
	 */
	$('#disksSelect').change(function () {
		reset();
	});

	$('input[type=radio][name=gridRadios]').change(function () {
		time = this.value;
	});

	$('#start').click(function () {
		start();
	});

	$('#stop').click(function () {
		stopResume($(this));
	});

	$('#reset').click(function () {
		reset();
	});
	//nightmode
	$('.fa-moon').click(function () {
		var color = $('html').css('background-color');
		if (color == 'rgb(20, 20, 20)') {
			$('html').css({ background: 'white', filter: 'invert(0) hue-rotate(0)' });
		} else {
			$('html').css({
				background: 'rgb(20, 20, 20)',
				filter: 'invert(1) hue-rotate(180deg)',
			});
		}
	});
	//back top
	$('#top').click(function () {
		$('html, body').animate({ scrollTop: $('#topNav').offset().top }, 500);
	});
	/*
	 *
	 *
	 *
	 *Logic functions
	 *
	 *
	 *
	 */
	function start() {
		hanoi(disk.length, 'A', 'B', 'C');
		$('html, body').animate({ scrollTop: $(document).height() }, 500);
		setTimeout(function () {
			prepMove(moves);
		}, 1000);
	}

	function reset() {
		clearTimeout(animate);
		setTimeout(function () {
			init($('#disksSelect').val());
		}, 200);
	}

	function stopResume(b) {
		if (b.text() == 'Stop') {
			clearTimeout(animate);
			b.text('Resume');
		} else {
			b.text('Stop');
			prepMove(moves);
		}
	}

	//calls the function perfoming the moves at a set interval
	function prepMove(m) {
		move(m[0][0], m[0][1]);
		m.shift();
		if (m.length != 0) {
			animate = setTimeout(function () {
				prepMove(m);
			}, 1100 * time + 50);
		}
	}

	//moves disks from one pillar to the other
	function move(from, target) {
		var disk;
		var originHeight = 0;
		var targetHeight = 0;

		switch (from) {
			case 'A':
				originHeight = pillarA.length * 3;
				disk = pillarA.pop();
				break;
			case 'B':
				originHeight = pillarB.length * 3;
				disk = pillarB.pop();
				break;
			case 'C':
				originHeight = pillarC.length * 3;
				disk = pillarC.pop();
				break;
		}

		switch (target) {
			case 'A':
				targetHeight = pillarA.length * 3;
				pillarA.push(disk);

				$(disk).animate(
					{ bottom: '+=' + (pillarSize - originHeight + 4) + 'em' },
					200 * time
				);
				$(disk)
					.delay(200 * time)
					.animate({ marginLeft: '0' }, 200 * time);
				$(disk)
					.delay(400 * time)
					.animate(
						{ bottom: '-=' + (pillarSize - targetHeight + 1) + 'em' },
						200 * time
					);
				break;

			case 'B':
				targetHeight = pillarB.length * 3;
				pillarB.push(disk);

				$(disk).animate(
					{ bottom: '+=' + (pillarSize - originHeight + 4) + 'em' },
					200 * time
				);
				$(disk)
					.delay(200 * time)
					.animate({ marginLeft: '33%' }, 200 * time);
				$(disk)
					.delay(400 * time)
					.animate(
						{ bottom: '-=' + (pillarSize - targetHeight + 1) + 'em' },
						200 * time
					);
				break;

			case 'C':
				targetHeight = pillarC.length * 3;
				pillarC.push(disk);

				$(disk).animate(
					{ bottom: '+=' + (pillarSize - originHeight + 4) + 'em' },
					200 * time
				);
				$(disk)
					.delay(200 * time)
					.animate({ marginLeft: '66%' }, 200 * time);
				$(disk)
					.delay(400 * time)
					.animate(
						{ bottom: '-=' + (pillarSize - targetHeight + 1) + 'em' },
						200 * time
					);
				break;
		}
	}

	function hanoi(number, from, helper, target) {
		if (number == 0) {
			//pass
		} else {
			hanoi(number - 1, from, target, helper);
			//stores steps in an array used to animate sequencially
			var m = [from, target];
			moves.push(m);
			hanoi(number - 1, helper, from, target);
		}
	}
});
