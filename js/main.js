const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');

const rawData = localStorage.getItem('transactions');

let transactions;

if (rawData !== null) {
	transactions = JSON.parse(rawData);
} else {
	transactions = [];
}

function updateLocalStorage() {
	localStorage.setItem('transactions', JSON.stringify(transactions));
}

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
	<button class="delete-btn" onclick ="removeTransaction(${transaction.id})">Delete</button>
	`;

	const textElement = item.querySelector('.text-content');
	if (textElement) {
		textElement.textContent = transaction.text;
	}

	const list = document.getElementById('list');
	list?.appendChild(item);
}

function updateValues() {
	const amounts = transactions.map(transaction => transaction.amount);

	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const expense = (
		amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

	if (balance) balance.textContent = `$${total}`;
	if (moneyPlus) moneyPlus.textContent = `$${income}`;
	if (moneyMinus) moneyMinus.textContent = `$${expense}`;

}

function init() {
	const list = document.getElementById('list');
	if (list) list.innerHTML = '';

	transactions.forEach(addTransactionDOM);
	updateValues();
}

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

	text.value = '';
	amount.value = '';

	init();
	updateLocalStorage();
}

function removeTransaction(id) {
	transactions = transactions.filter(transaction => transaction.id !== id);
	init();
	updateLocalStorage();
}

init();

form?.addEventListener('submit', addTransaction);







