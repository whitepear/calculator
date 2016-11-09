var answer = ""; // string for storing user inputs
var $numbers = $(".keys button").not(".operator, .equals, .clear, .backspace, .decimal"); // store number keys in jQ var
var decimalAdded = false; // boolean to check if decimal is added to number

$numbers.click(function () {
	answer += $(this).text();
	$(".display").text(answer);
});

$(".operator").click(function () {
	if ( ($(this).text() === "x" && answer.length === 0) || ($(this).text() === "÷" && answer.length === 0) ) {
		return console.log("User attempted to enter x or ÷ as first input.");
	} else if (answer.charAt(answer.length - 1) === "+" || answer.charAt(answer.length - 1) === "-" || answer.charAt(answer.length - 1) === "÷" || answer.charAt(answer.length - 1) === "x") {
		answer = answer.split("");
		var poppedOperator = answer.pop(); // store the popped character in case the string will be made empty by this action
		if ( ($(this).text() === "x" && answer.length === 0) || ($(this).text() === "÷" && answer.length === 0) ) {
			console.log("User attempted to enter x or ÷ as first input.");
			answer.push(poppedOperator); // replace the removed operator to prevent string being returned as empty to the user
		} else {
			answer.push($(this).text());
		}
		answer = answer.join("");		
	} else {
		answer += $(this).text();
	}
	decimalAdded = false;		
	$(".display").text(answer);
}); // first if statement prevents x or ÷ as first inputs
	// else if statement replaces operator with new operator if they would be chained in the string
	// nested within this else if statement are checks to ensure that x or ÷ cannot replace a + or - as first inputs
	// else statement just adds operator to string

$(".clear").click(function () {
	decimalAdded = false;
	answer = "";
	$(".display").text(answer);
}); // delete all input and remove from display

$(".decimal").click(function () {
	if (decimalAdded === true) {
		console.log("You can't place multiple decimals within a number.");
	} else {
		decimalAdded = true;
		answer += $(this).text();
		$(".display").text(answer);
	}
}); // add decimal to string, if statement prevents multiple decimals being added to the same number

$(".backspace").click(function () {
	if (answer.charAt(answer.length - 1) === ".") {
		decimalAdded = false; // decimal has been removed
		answer = answer.split("");
		answer.pop();
		answer = answer.join("");
		$(".display").text(answer);
	} else if (answer.charAt(answer.length - 1) === "+" || answer.charAt(answer.length - 1) === "-" || answer.charAt(answer.length - 1) === "÷" || answer.charAt(answer.length - 1) === "x") {
		answer = answer.split("");
		answer.pop();
		var decimalIndex = answer.lastIndexOf("."); // find latest (ie: highest) decimal index within string
		var operatorArray = ["+", "-", "÷", "x"]; // array of operators
		var currentOperatorIndex // storage var for latest index of current operator
		var latestOperatorIndex; // storage var for latest overall operator index		

		for (var i = 0; i < operatorArray.length; i++) {
			currentOperatorIndex = answer.lastIndexOf(operatorArray[i]);
			if (i === 0) {
				latestOperatorIndex = currentOperatorIndex;
			} else if (i > 0) {
				if (currentOperatorIndex > latestOperatorIndex) {
					latestOperatorIndex = currentOperatorIndex;	
				}
			}
		} // for loop checks for latest (ie: highest) operator index within string
		if (decimalIndex > latestOperatorIndex) {
			decimalAdded = true;
		} else if ( (latestOperatorIndex > decimalIndex) || (decimalIndex === -1) ) {
			decimalAdded = false;
		} // if statements compare operator and decimal index positions, change boolean accordingly		
		answer = answer.join("");
		$(".display").text(answer);
		/* if operator was deleted this if statement checks the next number for presence of decimal.
		   if there is no decimal in the next number, then it's ok to add decimal, otherwise it is not.
		   this is achieved by comparing operator/decimal index positions - if decimal is later than
		   operator then the number contains a decimal. otherwise, it does not. */
	} else {
		answer = answer.split("");
		answer.pop();
		answer = answer.join("");	
		$(".display").text(answer);
	} // else statement removes number from string, displays updated number
});

$(".equals").click(function () {
	if (answer.charAt(answer.length - 1) === "+" || answer.charAt(answer.length - 1) === "-" || answer.charAt(answer.length - 1) === "÷" || answer.charAt(answer.length - 1) === "x") {
		answer = answer.split("");
		answer.pop();
		answer = answer.join("");
	} // if statement to remove operators at end of answer string
	if (answer.length === 0) {
		return console.log("User attempted to press = without making any inputs. Returning in order to prevent undefined from appearing.")
	}
	answer = answer.replace(/x/g, '*').replace(/÷/g, '/'); // replace multiplication and division operators within string with functional versions
	answer = eval(answer); // evaluate string
	$(".display").text(answer); // display evaluation result
	answer = answer.toString();	// convert answer number back to string for further user operations
});