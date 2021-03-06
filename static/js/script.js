//Adds the onclick to the values and operands
var values = document.querySelectorAll(".calc");
var query = "";
for (i=0; i<values.length; i++) {
	values[i].setAttribute("onclick", "getValue(this);");
}
document.getElementById("E1").setAttribute("onclick", "toBinary();");
document.getElementById("E2").setAttribute("onclick", "toDecimal();");
document.getElementById("F1").setAttribute("onclick", "setBin();");
document.getElementById("F2").setAttribute("onclick", "setDec();");
document.getElementById("F3").setAttribute("onclick", "calcSqrt();");
document.getElementById("F4").setAttribute("onclick", "addPow();");

//Gets the values from the keys
function getValue(val) {
	query += val.innerText;
	updateQuery(query);
}

//Deletes the last value 
function del() {
	query = query.slice(0, -1);
	updateQuery(query);
}

//Reloads/restarts the calculator
function rel() {
	document.location.reload();
}

//Updates/refreshes the output
function updateQuery(query) {
	document.getElementById("text").innerHTML = query + '<buttton id="quickAct" onclick="del();"><img src="static/img/backspace.svg" width="80em" height="35em"/></buttton>'
	document.querySelector("#quickAct").style.display = "inline";
}

//Defines the query as binary
function setBin() {
	if (query.length > 0 && isBinary()) {
		updateQuery(query + "₂");
	}
}

//Defines the query as decimal
function setDec() {
	if (query.length > 0) {
		updateQuery(query + "₁₀");
	}
}

//Calculates the square root of the query
function calcSqrt() {
	if (query.length > 0) {
		if (onlyValue()) {
			query = Math.sqrt(query);
			updateQuery(query);
			document.getElementById("text").innerHTML = query + '<buttton id="quickAct" onclick="rel();"><img src="static/img/reload.svg" width="70em" height="30em"/></buttton></p> </h1>';
	document.querySelector("#quickAct").style.display = "inline";
		} else {
			alert("Warning! \n\nCalculate the expression before requesting the Square Root.");
		}
	}
}

//Lets you insert a power into the expression
function addPow() {
	query += "^";
	updateQuery(query);
}

//Converts the given decimal value/result into a binary (base 2) one
function toBinary() {
	if (onlyValue()) {
		var binQuery = document.getElementById("text").innerText;
		//console.log("BQ: " + binQuery);
		if (!query.includes("₂")) {
			if (binQuery.includes("₁₀")) {
				binQuery = binQuery.slice(0, -2);
			}
			var rest = "";
			while (binQuery >= 1) {
				if ((binQuery % 2) == 0) {
					binQuery = parseInt(binQuery / 2);
					rest = '0' + rest;
				} else {
					binQuery = parseInt(binQuery / 2);
					rest = '1' + rest;
				}
			}
			if (rest.length > 0) {
				updateQuery(rest + "₂");
			}
		}
				
	} else {
		alert("Warning! \n\nCalculate the expression before converting it in binary.");
	}
}

//Converts the given binary value/result into a decimal (base 10) one
function toDecimal() {
	if (onlyValue()) {
		var binQuery = document.getElementById("text").innerText;
		if (binQuery.includes("₂")) {
			var prod = 0;
			binQuery = binQuery.slice(0, -1);
			for (i=binQuery.length-1; i>=0; i--) {
				prod += binQuery[i] * Math.pow(2, binQuery.length-(i+1));
			}
			if (prod > 0) {
				query = prod.toString();
				updateQuery(prod + "₁₀");
			}
		}
				
	} else {
		alert("Warning! \n\nCalculate the expression before converting it in binary.");
	}
}

//Checks if there are only numbers in the query
function onlyValue() {
	var hasNotOperands = false;
	if (!(query.includes("x") || 
		query.includes("÷") || 
		query.includes("-") || 
		query.includes("+"))) {
			hasNotOperands = true;
	}
	return hasNotOperands;
}

//Checks if the input query could be binary type (base 2)
function isBinary() {
	var itIsBinary = false;
	if (!(query.includes("2") || 
		query.includes("3") || 
		query.includes("4") || 
		query.includes("5") || 
		query.includes("6") || 
		query.includes("7") || 
		query.includes("8") || 
		query.includes("9") || 
		query.includes(","))) {
			itIsBinary = true;
	}
	return itIsBinary;
}

//Does the math and shows the result
function calculate() {
	query = query.replace(',','.');
	query = query.replaceAll('÷', '/');
	query = query.replaceAll('x', '*');
	query = query.replaceAll('^', '**');
	var result = eval(query);
	result = result.toString();
	result = result.replace('.',',');
	query = query.replaceAll('/', '÷');
	query = query.replaceAll('*', 'x');
	query = query.replaceAll('**', '^');
	document.getElementById("text").innerHTML = result + '<buttton id="quickAct" onclick="rel();"><img src="static/img/reload.svg" width="70em" height="30em"/></buttton></p> </h1>';
	document.querySelector("#quickAct").style.display = "inline";
	query = result;
}
