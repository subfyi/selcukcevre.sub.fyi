/**
 * CountDown timer with offset
 */
(function($){
  $.fn.downCount = function(options, callback){

    //default settings for timer
    var settings = $.extend({
      date:null,
      offset:null
    }, options);

    //rise error if the date is not set
    if (!settings.date){
      $.error('date is not defined');
    }

    //rise error if date is set incorrectly
    if (!Date.parse(settings.date)){
      $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00');
    }

    //container to save
    var container = this;

    /**
     * Change client's local date to match offset timezone
     * @return {Object} Fixed Date object.
     */

    var currentDate = function(){

      //get client current date
      var date = new Date();

      //turn date to UTC
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

      //set new Date obj
      var new_date = new Date(utc + (3600000*settings.offset));

      return new_date;
    };

    /**
     * Main downCount function that calculates everything
     */
    function countdown(){
      var target_date = new Date(settings.date),
          current_date = currentDate();

      //difference of dates
      var difference = target_date - current_date;

      //if difference is negative than it's pass the target date
      if (difference < 0){

        //stop timer
        clearInterval(interval);

        if (callback && typeof callback === 'function') callback();

        return;

      }

      //basic Math var
      var _second = 1000,
          _minute = _second * 60,
          _hour   = _minute * 60,
          _day    = _hour * 24;

      //calculate dates
      var days    = Math.floor(difference /_day),
          hours   = Math.floor((difference % _day) / _hour),
          minutes = Math.floor((difference % _hour) / _minute),
          seconds = Math.floor((difference % _minute) / _second);

          //fix dates to show only 2 digit's
          days    = (String(days).length >= 2) ? days : '0' + days;
          hours   = (String(hours).length >= 2) ? hours : '0' + hours;
          minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
          seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

      //change the ref wording
      var ref_days    = (days === "001" || days === "01") ? 'Gün' : 'Gün',
          ref_hours   = (hours === "01") ? 'Saat' : 'Saat',
          ref_minutes = (minutes === "01") ? 'Dakika' : 'Dakika',
          ref_seconds = (seconds === "01") ? 'Saniye' : 'Saniye';

      //set the Dom
      container.addClass('countdownHolder');
      container.find('.days').text(days);
      container.find('.hours').text(hours);
      container.find('.minutes').text(minutes);
      container.find('.seconds').text(seconds);

      container.find('.days_ref').text(ref_days);
      container.find('.hours_ref').text(ref_hours);
      container.find('.minutes_ref').text(ref_minutes);
      container.find('.seconds_ref').text(ref_seconds);
    }
    //start
    var interval = setInterval(countdown, 1000);
  };
})(jQuery);