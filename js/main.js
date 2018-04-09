$(document).ready(function() {


// SHRINK HEADER

// Shrink header only on homepage
if ($('body').hasClass('home')) {

	// Test if page is scrolled on load
	$(window).load(function() {
		if ($(document).scrollTop() > 10) {
			$(".site-header").addClass("shrink").removeClass("no-bg");
		} else {
			$(".site-header").removeClass("shrink").addClass("no-bg");
		}
	})

	// Normal scroll header shrink
	$(document).on("scroll", function() {
		if ($(document).scrollTop() > 10) {
			$(".site-header").addClass("shrink").removeClass("no-bg");
		} else {
			$(".site-header").removeClass("shrink").addClass("no-bg");
		}
	});
}


// CLOSE NAVBAR ON TAP - FOR MOBILE

$('.navbar-toggle').click(function() {
  $(".site-header").addClass("shrink").removeClass("no-bg");
});

$('.menu-item-link').click(function() {
  $('.navbar-toggle').click();
});



// SMOOTH SCROLL

$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 50
      }, 600);
      return false;
    }
  }
});



// COUNTER

if ($('body').hasClass('home')) {

	(function() {

		var deadline = '2017-11-21T12:00:00.00-07:00';

		function getTimeRemaining(endtime){
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor( (t/1000) % 60 );
			var minutes = Math.floor( (t/1000/60) % 60 );
			var hours = Math.floor( (t/(1000*60*60)) % 24 );
			var days = Math.floor( t/(1000*60*60*24) );
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function initializeClock(id, endtime) {
			var clock = document.getElementById(id);
			var daysSpan = clock.querySelector('.days');
			var hoursSpan = clock.querySelector('.hours');
			var minutesSpan = clock.querySelector('.minutes');
			var secondsSpan = clock.querySelector('.seconds');

			function updateClock() {
				var t = getTimeRemaining(endtime);

				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
				minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
				secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

				if (t.total<=0) {
					clearInterval(timeinterval);
					clock.style.display = "none";
				} else {
					clock.style.display = "block";
				}
			}

			updateClock(); // run function once at first to avoid delay
			var timeinterval = setInterval(updateClock,1000);
		}

		initializeClock('clockdiv', deadline);

	})();
};




// FORM

$("#ts-form").submit(function(e) {
  e.preventDefault();

  var $form = $(this);
  $.post($form.attr("action"), $form.serialize()).then(function() {
    //alert("Thank you for your interest in Karma's Token Sale. One of our representatives will be in touch with you shortly.");
		$('#modal-form-submit').modal();
		$('#ts-form')[0].reset();
  });
});

});
