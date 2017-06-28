$(document).ready(function() {

// takes in a word and returns pig latin
function getPigLatin(str) {
  var pigLatin = '';
  // match vowels (ignore case global)
  var regex = /[aeiou]/gi;

  // first letter is a vowel
  if (str[0].match(regex)) {
    pigLatin = str + '-way';
  // first letter not a vowel
  } else {
  		// 'word' contains a vowel
    	if (str.match(regex)) {
    		// Find how many consonants before the first vowel.
    		var vowelIndice = str.indexOf(str.match(regex)[0]);

    		// Take the string from the first vowel to the last char
		    // then add the consonants that were previously omitted and add the ending.
		    pigLatin = str.substr(vowelIndice) + '-' + str.substr(0, vowelIndice) + 'ay';
		// 'word' doesn't contain a vowel 
    	} else {
    		pigLatin = str;
    	}    
  }
  return pigLatin;
}

// take in string, return the entire string translated.
function translate(str){
	// match every word
	var regex = /[a-zA-Z]+/ig;
	return str.replace(regex, getPigLatin);
}

function handlers(){
	$('.green').on('click', function(){
		var text = $('#english').val();
		$('#pig').val(translate(text));		
	})
	$('.red').on('click', function(){
		$('#english').val('');
		$('#pig').val('');		
	})
}

handlers();

});