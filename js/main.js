const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function addTransaction(event) {
	event.preventDefault();

	if (!(text instanceof HTMLInputElement) || !(amount instanceof HTMLInputElement)) {
		return;
	}

	const transactionName = text.value.trim();
	const transactionAmount = amount.value.trim();

	if (transactionName == '' || transactionAmount == '') {
		alert('Please enter the name and amount');
		return;
	}

	const transaction = {
		id: generateId(),
		text: transactionName,
		amount: +transactionAmount,
	};

	transactions.push(transaction);
	console.log(transactions);

	addTransactionDOM(transaction);

	text.value = '';
	amount.value = '';
}

form?.addEventListener('submit', addTransaction);

function generateId() {
	return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
	const sign = transaction.amount < 0 ? '-' : '+';
	const item = document.createElement('li');

	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

	item.innerHTML = `
	<span class="text-content"></span>
	<span>${sign}${Math.abs(transaction.amount)}</span>
	`;

	const textElement = item.querySelector('.text-content');
	if (textElement) {
		textElement.textContent = transaction.text;
	}

	const list = document.getElementById('list');
	list?.appendChild(item);
}
