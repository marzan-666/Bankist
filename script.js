'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Marzan Khan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Natalie Portman',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account3 = {
  owner: 'Kate winslet',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account4 = {
  owner: 'Kareena Kapoor Khan',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};



const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(acc,sort = false){
  containerMovements.innerHTML = '';
  //console.log(acc.movements);
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
    const date = new Date(acc.movementsDates[i]);

    const day = `${date.getDate()}`.padStart(2,0);
    const month = `${date.getMonth()+1}`.padStart(2,0);
    const year = date.getFullYear();
    
    const displayDate = `${day}/${month}/${year}`;

    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)
        }€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin',html); // beforeend works before
  });
};

//displayMovements(account1.movements);

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov,0);

  labelBalance.textContent = `${acc.balance}€`;
};

//calcDisplayBalance(account1.movements);


const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov => mov >0)
  .reduce((acc,mov) => acc+mov,0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc,mov) => acc+mov,0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
  .filter(mov => mov >0)
  .map(deposit => (deposit*acc.interestRate)/100)
  .filter((int,i,arr) => {
    return int >= 1;
  })
  .reduce((acc,int) => acc + int,0);

  labelSumInterest.textContent = `${interest}€`;
};

//calcDisplaySummary(account1.movements);

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
     .toLowerCase()
     .split(' ')
     .map(name => name[0])
     .join('');
});
};

createUsernames(accounts);

const updateUI = function(acc){
  // Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

// Event handler

let currentAccount;

// Fake always logged in

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100 ;

const now = new Date();
const day = `${now.getDate()}`.padStart(2,0);
const month = `${now.getMonth()+1}`.padStart(2,0);
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

// day/month/year
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;






btnLogin.addEventListener('click',function(e){
  // Prevent from form submitting
  e.preventDefault();
  //console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and welcome message
    labelWelcome.textContent =`Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //console.log('LOGIN');
     
    // Create current date and time
    const now = new Date(); 
    const day = `${now.getDate()}`.padStart(2,0);
    const month = `${now.getMonth()+1}`.padStart(2,0);
    const year = `${now.getFullYear()}`.padStart(2,0);
    const hour = `${now.getHours()}`.padStart(2,0);
    const min = `${now.getMinutes()}`.padStart(2,0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();


    // Display movements
    //displayMovements(currentAccount.movements);

    //Display balance
    //calcDisplayBalance(currentAccount);

    //Display summary
    //calcDisplaySummary(currentAccount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  //console.log(amount,receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username && receiverAcc){
    //console.log('Transfer Valid...');
  }
  {
    //doing transfer

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());


    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount *0.1)){
    currentAccount.movements.push(amount);
    

    // add loan date

    currentAccount.movementsDates.push(new Date());
    
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  //console.log('DELETE');
  
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin);
  {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    console.log(index);

    // Delete account
    accounts.splice(index,1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);

  sorted = !sorted ;
});


//console.log(accounts);
/*const username = user.toLowerCase().split(' ').map(function(name){
  return name[0];
}).join('');
*/

