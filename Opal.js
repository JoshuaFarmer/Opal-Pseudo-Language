var error = false;
var re = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var ram;
var counter;
var subs = [];
var subs_names = [];
var input;

// fükþez ALU // the fucking epic alu

function add(a,b) {
	re[0] = parseInt(a) + parseInt(b);
}

function sub(a,b) {
	re[0] = parseInt(a) - parseInt(b);
}

function adc(a,b) {
	re[0] = parseInt(a) + parseInt(b) + 1;
}

function sbc(a,b) {
	re[0] = parseInt(a) - parseInt(b) - 1;
}

function mul(a,b) {
	re[0] = parseInt(a) * parseInt(b);
}

function div(a,b) {
	re[0] = parseInt(a) / parseInt(b);
}

function cmp(a,b) {
	if (a == b) {
		re[0] = 0;
	} else if (parseInt(a) > parseInt(b)) {
		re[0] = 1;
	} else {
		re[0] = 2;
	}
}

// fükþez skringkenä // the fucking epic jump commands

function jmp(l) {
	counter = parseInt(l);
}

function jme(a,b,l) {
	if (a == b) {
		counter = parseInt(l);
	}
}

function jml(a,b,l) {
	if (parseInt(a) < parseInt(b)) {
		counter = parseInt(l);
	}
}

function jmg(a,b,l) {
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
  input = true;
	re[0] = document.getElementById("value").value;
	input = false;
}

// autput "Transas riteös Mönskas riteös verdiä." // outputs "trans rights are human rights"

console.log("Transas riteös Mönskas riteös verdiä.");

function main() {
  var start = Date.now();
  subs = [];
  subs_names = [];
  document.getElementById('output').value = "";
  re = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  error = false;
  re[0] = 0;
  counter = 0;

	ram = document.getElementById("code").value;
	ram = ram.split('\n');
	ram = ram.join(';').split(';');
	ram = ram.join(',').split(',');
	ram = ram.join('_').split('_');


	while (counter < ram.length) {
		// fükþez ALU // the fucking epic alu
		
		if (ram[counter] == "add") {
			add(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "subtract") {
			sub(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "add-carry") {
			adc(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "subtract-carry") {
			sbc(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "multiply") {
			mul(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "divide") {
			div(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		} else if (ram[counter] == "compare") {
			cmp(re[ram[counter + 1]],re[ram[counter + 2]]);
			counter += 2;
		}
		
		// fükþez skringkenä // the fucking epic jump commands
		
		else if (ram[counter] == "jump") {
			jmp(ram[counter + 1]);
			counter += 1;
		} else if (ram[counter] == "jump-equal") {
			jme(re[ram[counter + 1]],re[ram[counter + 2]],ram[counter + 3]);
			counter += 3;
		} else if (ram[counter] == "jump-less") {
			jml(re[ram[counter + 1]],re[ram[counter + 2]],ram[counter + 3]);
			counter += 3;
		} else if (ram[counter] == "jump-greater") {
			jmg(re[ram[counter + 1]],re[ram[counter + 2]],ram[counter + 3]);
			counter += 1;
		}

		// oppevrig // registers/storage
		
		else if (ram[counter] == "var") {
			sta(ram[counter + 2],ram[counter + 1]);
			counter += 2;
		} else if (ram[counter] == "ram-write") {
			wrm(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		}
		
		// lõdenün // load commands
		
		else if (ram[counter] == "ram-load") {
			lda(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "load") {
			ldr(ram[counter + 1],ram[counter + 2]);
			counter += 2;
		} else if (ram[counter] == "halt") {
			counter = ram.length + 1;
		} else if (ram[counter] == "//") {
		  counter+=1;
		  while (ram[counter] != "//") {
		    counter += 1;
		  }
		  
		  counter += 1;
		} else if (ram[counter] == "out") {
		  document.getElementById('output').value += re[parseInt(ram[counter + 1])] + '\n';
		  counter += 1;
		} else if (ram[counter] == "func") {
		  subs.push(counter);
		  subs_names.push(ram[counter + 1]);
		  counter += 2;

		  while (ram[counter] != "end") {
		    counter += 1;
		  }
		} else if (ram[counter] == "frun") {
		  counter += 1;
		  came = counter;
		  jmp(subs[parseInt(subs_names.indexOf(ram[counter]))] + 1);
		} else if (ram[counter] == "frun-equal") {
		  if (re[ram[counter + 2]] == re[ram[counter + 3]]) {
		    counter += 1;
		    came = counter;
		    jmp(subs[parseInt(subs_names.indexOf(ram[counter]))] + 1);
		    counter += 2;
		  }
		  counter += 1;
		} else if (ram[counter] == "frun-less") {
		  if (parseInt(re[ram[counter + 2]]) < parseInt(re[ram[counter + 3]])) {
		    counter += 1;
		    came = counter;
		    jmp(subs[parseInt(subs_names.indexOf(ram[counter]))] + 1);
		    counter += 2;
		  }
		  counter += 1;
		} else if (ram[counter] == "frun-greater") {
		  if (parseInt(re[ram[counter + 2]]) > parseInt(re[ram[counter + 3]])) {
		    counter += 1;
		    came = counter;
		    jmp(subs[parseInt(subs_names.indexOf(ram[counter]))] + 1);
		    counter += 2;
		  }
		  counter += 1;
		} else if (ram[counter] == "end") {
		  jmp(came);
		} else if (ram[counter] == "") {
		  // do nothing.
		} else if (ram[counter] == "read") {
		  while (input != true) {}
		} else {
		    console.log("\nSyntax Error: " + ram[counter]);
		}
		counter += 1;
	}
	
	var timeTaken = Date.now() - start;
  document.getElementById('output').value += '\nprogram ended\ntime (inaccurrate)\nit took '+timeTaken+' sc';
}
