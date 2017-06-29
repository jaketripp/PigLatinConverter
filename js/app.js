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

// take in string
// find every word in string and change to pig latin
function toPigLatin(str){
	// match every word
	var regex = /[a-zA-Z]+/ig;
	return str.replace(regex, getPigLatin);
}

// takes in a piglatin word and returns English word
function getEnglish(str){

	var wordParts = str.split('-');
	
	// pig latin word starts with a vowel
	if (wordParts[1].toLowerCase() === 'way'){

		// word is [a, A, I] || ['we','wo']
		if (wordParts[0].length === 1) {
			// word is a, A, or I
			if (wordParts[0].match(/[ai]/ig)) {
				return wordParts[0];
			// word is 'we' or 'wo'
			} else {
				var consonants = wordParts[1].replace(/ay/ig, '');
				return consonants + wordParts[0];
			}
		// something like 'of' or 'us' 
		} else {
			return '*' + wordParts[0];
		}


	// pig latin word doesn't start with vowel
	} else {
		var consonants = wordParts[1].replace(/ay/ig, '');
		return consonants + wordParts[0];
	}
}

// take in string
// find every pig latin word in string and change to English
function toEnglish(str){
	// one or more letters followed by '-' followed by 1 or more letters followed by 'ay'
	var regex = /[a-z]+[-][a-z]+ay/ig;
	return str.replace(regex, getEnglish);
}

// not perfect, IDK if it CAN be without AI.
// doesn't handle words that start with 'w' and are immediately followed by a vowel.
// crossreferencing a dictionary api might help fix words like 'with' / 'ith-way'
// but that still isn't perfect because of words like 'wart' / 'art-way' ('art' is also 'art-way')
function decideAndTranslate(str){
	var hyphensArray = str.match(/-/g);

	var wordsArray = str.match(/[A-Z]+/ig);

	// initialize values
	var hyphenCount = 0;
	var wordCount = wordsArray.length / 2;

	if (hyphensArray !== null) {
		hyphenCount = hyphensArray.length;
	}
	
	// every word has at least one hyphen (some words might have had a hyphen before becoming pig latin)
	if  (hyphenCount >= wordCount) {
		return toEnglish(str);
	// not very many hyphens relatively speaking
	} else {
		return toPigLatin(str);
	}
}

function handlers(){
	// going to be called a ridiculous number of times but it's fun to watch live so whatever
	$('#from').on('keyup', function(){
		var text = $('#from').val();
		$('#to').val(decideAndTranslate(text));		
	});
	
	$('.red').on('click', function(){
		$('#from').val('');
		$('#to').val('');		
	});

	$('#from, #to').on('focus', function(){
		$(this).select();
	})

	$('.ui.label').on('click', function(){
		$('p').slideToggle();
	})
}

handlers();

});