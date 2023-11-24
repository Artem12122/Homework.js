let fuelExpense = 8 / 100 ;
let dailyTrip = prompt("Сколько киллометров вы проезжаете в день?", 40 ) ;
let fluePrice = 55 ;

let monthTrip = dailyTrip * 30 ;
let monthLiters = monthTrip * fuelExpense ;
let monthlyExpenses = fluePrice * monthLiters ;

let result = Math.ceil(monthlyExpenses);

alert (` Ваши месячные затраты на топливо ${result} `) ;