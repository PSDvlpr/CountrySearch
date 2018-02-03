$(function() {

var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');


$('#search').click(searchCountries);

function searchCountries() {
  var countryName = $('#country-name').val();

  if(!countryName.length) countryName = 'Poland';

  $.ajax({
    url: url + countryName,
    method: 'GET',
    success: showCountriesList
    });
}

function showCountriesList(resp) {
  var countries = [],
      country;

  resp.forEach(function(item){
    country = $('<li>').addClass('country').text(item.name);
    country.append($('<div>').addClass("flag").html('<img src="' + item.flag + '"></img>'));
    country.append($('<p>').text('Region: ' + item.subregion));
    country.append($('<p>').text('Powierzchnia: ' + item.area + ' m2'));
    country.append($('<p>').text('Populacja: ' + item.population + ' osób'));

    countries.push(country);
  });

  countriesList.empty().append(countries);

  $('li p').each(function() {
    var $this = $(this),
        text = $this.text().split(':');

        $this.html('<span>' + text[0] + ':</span>' + text[1]);
  });
}

});
