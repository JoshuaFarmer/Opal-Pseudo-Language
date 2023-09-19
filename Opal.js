// the comments that are not in english are in a language i made

var error = false;
var re = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var acc = 0;
var ram;
var counter;
var subs = [];
var subs_names = [];

// fükþez ALU // the fucking epic alu

function add(a,b) {
	acc = parseInt(a) + parseInt(b);
}

function sub(a,b) {
	acc = parseInt(a) - parseInt(b);
}

function adc(a,b) {
	acc = parseInt(a) + parseInt(b) + 1;
}

function sbc(a,b) {
	acc = parseInt(a) - parseInt(b) - 1;
}

function mul(a,b) {
	acc = parseInt(a) * parseInt(b);
}

function div(a,b) {
	acc = parseInt(a) / parseInt(b);
}

function cmp(a,b) {
	if (a == b) {
		acc = 0;
	} else if (parseInt(a) > parseInt(b)) {
		acc = 1;
	} else {
		acc = 2;
	}
}

// fükþez skringkenä // the fucking epic jump commands

function jmp(l) {
	counter = parseInt(l);
}

function jme(l,a,b) {
	if (a == b) {
		counter = parseInt(l);
	}
}

function jml(l,a,b) {
	if (parseInt(a) < parseInt(b)) {
		counter = parseInt(l);
	}
}

function jmg(l,a,b) {
	if (parseInt(a) > parseInt(b)) {
	  counter = parseInt(l);
	}
}

// oppevrig // registers / storage

function sta(a,r) {
	re[parseInt(r)] = a;
}

// RAM

function wrm(a,r) {
	ram[parseInt(a)] = re[parseInt(r)];
}

// lõdenün // load commands

function ldr(a,b) {
  re[parseInt(b)] = re[parseInt(a)];  
}

// RAM
function lda(a,r) {
	re[parseInt(r)] = ram[parseInt(a)];
}

function insert() {
	ram[parseInt(document.getElementById("address").value)] = document.getElementById("value").value;
}

// autput "Transas riteös Mönskas riteös verdiä." // outputs "trans rights are human rights"

console.log("Transas riteös Mönskas riteös verdiä.");

function main() {
  subs = [];
  subs_names = [];
  document.getElementById('output').value = "";
  re = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  error = false;
  acc = 0;
  counter = 0;

	ram = document.getElementById("code").value.split('\n');
	ram = ram.join(';').split(';');

	while (counter < ram.length) {
		// fükþez ALU // the fucking epic alu
		
		if (ram[counter] == "ADD") {
			add(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "SUB") {
			sub(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "ADC") {
			adc(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "SBC") {
			sbc(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "MUL") {
			mul(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "DIV") {
			div(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "CMP") {
			cmp(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		}
		
		// fükþez skringkenä // the fucking epic jump commands
		
		else if (ram[counter] == "JMP") {
			jmp(ram[counter + 1]);
			counter += 1;
		} else if (ram[counter] == "JME") {
			jme(ram[counter + 1],ram[counter + 2],ram[counter + 3]);
			counter += 3;
		} else if (ram[counter] == "JML") {
			jml(ram[counter + 1],ram[counter + 2],ram[counter + 3]);
			counter += 3;
		} else if (ram[counter] == "JMG") {
			jmg(ram[counter + 1],ram[counter + 2],ram[counter + 3]);
			counter += 1;
		}

		// oppevrig // registers/storage
		
		else if (ram[counter] == "STA") {
			sta(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "WRM") {
			wrm(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		}
		
		// lõdenün // load commands
		
		else if (ram[counter] == "LDA") {
			lda(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "LDR") {
			ldr(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "HLT") {
			counter = ram.length + 1;
		} else if (ram[counter] == "//") {
			counter += 1;
		} else if (ram[counter] == "OUT") {
		  document.getElementById('output').value += re[parseInt(ram[counter + 1])] + '\n';
		  counter += 1;
		} else if (ram[counter] == ":") {
		  subs.push(counter);
		  subs_names.push(ram[counter + 1]);
		  counter += 2;
		  while (ram[counter] != "END") {
		    counter += 1;
		  }
		} else if (ram[counter] == "JSR") {
		  counter += 1;
		  came = counter;
		  jmp(subs[parseInt(subs_names.indexOf(ram[counter]))] + 1);
		} else if (ram[counter] == "END") {
		  jmp(came);
		} else if (ram[counter] == "-") {
		  // do nothing.
		} else {
		    console.log("\nSyntax Error: " + ram[counter]);
		}
		counter += 1;
	  re[0] = acc;
	}
	
  document.getElementById('output').value += '\nprogram ended';
}
