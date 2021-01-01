// ====================================================
// ! -------------------- Var ----------------------
// ====================================================
let
	frame		= document.querySelector('.frame'),
	loader		= document.querySelector('.loader'),
	loaderFull	= document.querySelector('.loader__progress_full'),

	wrapper		= document.querySelector('.wrapper'),
	diffSel		= document.querySelector('.diff-sel'),
	play		= document.querySelector('.diff-sel__play'),

	world		= document.querySelector('.world'),
	snow1		= document.querySelector('.world__snow_1'),
	snow3		= document.querySelector('.world__snow_3'),
	tree1		= document.querySelector('.world__tree_1'),
	tree2		= document.querySelector('.world__tree_2'),
	tree3		= document.querySelector('.world__tree_3'),
	tree4		= document.querySelector('.world__tree_4'),
	tree5		= document.querySelector('.world__tree_5'),
	tree6		= document.querySelector('.world__tree_6'),
	tree7		= document.querySelector('.world__tree_new'),
	student		= document.querySelector('.world__student'),
	item		= document.querySelector('.world__item'),

	count		= document.querySelector('.count');

let isJump = false,
	position;

const items = [];
	let x;
	let ind = 0;


// ====================================================
// ! -------------------- Instruction ----------------------
// ====================================================
window.addEventListener('resize', Resize, false);
Resize();
Beginning();


// ====================================================
// ! -------------------- Functions ----------------------
// ====================================================
function Resize() {
	let w = window.innerWidth;
	let h = window.innerHeight;
	let scale;

	if ((w / h) < (1200 / 650)) {
		scale = w/1200
		
	} 
	else {
		scale = h/650
	}
	frame.style.transform = 'scale(' + scale + ')'
}
function Beginning() {
	loaderFull.style.width = '470px';
	let LoadTimeout = setTimeout(function(){
		loader.classList.add('loader-off');
		diffSel.classList.add('diff-sel-on');
		play.addEventListener('click', StartGame)
		clearTimeout(LoadTimeout)
	}, 2500)
}

function StartGame() {
	diffSel.classList.remove('diff-sel-on');
	student.style.opacity = 1;
	setTimeout(function() {
		document.addEventListener('click', Jump);
	},0);

	setTimeout(function() {
		let CreateItems = setInterval(function() {
			x = Math.floor(Math.random() * 4) - 1;
			if (x >= 0) {
				items.push(document.createElement('div'));
				world.append(items[ind]);
				if (x === 0) {
					items[ind].className = 'world__item world__item_course'
				}
				if (x === 1) {
					items[ind].className = 'world__item world__item_zachet'
				}
				if (x === 2) {
					items[ind].className = 'world__item world__item_rgr'
				}
				setTimeout(function() {
					items[ind].classList.add('world__item-moved')
					ind++;
				}, 20)
				if (ind === 1) {
					GameEnd();
					clearInterval(CreateItems)
				}
			}
		},1200);
	},000);
}

setInterval(() => {
	position = parseInt(window.getComputedStyle(student).getPropertyValue("bottom"));
}, 20);
setInterval(() => {
	let howmuch = 0
	for (let i = 0; i < items.length; i++) {
		let ipos = parseInt(window.getComputedStyle(items[i]).getPropertyValue("right"));
		if (ipos > 925 && ipos < 1100 && position < 200) {
			GameOver();
		}
		if (ipos > 1200) {
			howmuch++
			console.log(items[i])
		}
	}
	count.innerHTML = howmuch;
}, 200);

function Jump() {
	if (!isJump) {
		isJump = true;
		student.classList.add('world__student-jump');
		let A = setTimeout(function() {
			student.classList.remove('world__student-jump');
			clearTimeout(A);
		}, 300)
		let B = setTimeout(function() {
			isJump = false;
			clearTimeout(B);
		}, 700)
	}
}

function GameEnd() {
	tree7.style.right = '200px'
	
	setTimeout(function() {
		world.remove()

	}, 5000)
}

function GameOver() {

	
	setTimeout(function() {
		world.remove()

	},5000)
}