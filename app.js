
// CALCULATOR CONTROLLER
const calcController = (function() {

    const data = {
        initSavings: 0,
        months: 0,
        deposit: 0,
        interest: 0
    };

    return {
        saveInput: function(obj) {
            // create array to iterate through 
            const dataArr = ['initSavings', 'months', 'deposit'];
            // iterate through array and assign values to the data object
            dataArr.forEach(function(el, i) {
                // checks if input is not empty then parses string into floating point number else assigns the value 0
                if (obj[el] !== '') {
                    data[el] = parseFloat(obj[el]);
                } else {
                    data[el] = 0;
                }
            });
            obj.interest !== '' ? data.interest = parseFloat((obj.interest / 12) / 100) : data.interest = 0;
        },

        calculateTotal: function () {
            let totalSaved, monthReturn;

            totalSaved = data.initSavings;
            monthReturn = 0;

            for (let i = 0; i < data.months; i++) {
                monthReturn += (totalSaved * data.interest);
                totalSaved += data.deposit + monthReturn;
                monthReturn = 0;
                
            }
            return totalSaved.toFixed(2);
        },

        test: function() {
            return data;
        }
    }

})();



// CALCULATOR UI
const uiController = (function() {

    var DOMstrings = {
        initSavings: 'initSavings',
        months: 'months',
        deposit: 'deposit',
        interest: 'interest',
        result: 'result'
    }

    formatDisplay = function(result) {    
            const formatOptions = { style: 'currency', currency: 'USD' };
            const numberFormat = new Intl.NumberFormat('en-US', formatOptions);
            return numberFormat.format(result);
    };

    return {
        displayResult: function(result) {
            
            const formatedResult = formatDisplay(result);

            document.getElementById(DOMstrings.result).textContent = `${formatedResult}`;
        },

        btnShake: function() {
            const element = document.getElementById('btn');
            element.classList.add('animated', 'shake', 'fast');
        },

        getInput: function() {
            return {
                initSavings: document.getElementById(DOMstrings.initSavings).value.replace(/,/g, ''),
                months: document.getElementById(DOMstrings.months).value.replace(/,/g, ''),
                deposit: document.getElementById(DOMstrings.deposit).value.replace(/,/g, ''),
                interest: document.getElementById(DOMstrings.interest).value.replace(/,/g, '')
            }
        },

        clearInputFields: function() {

            document.getElementById(DOMstrings.initSavings).value = '';
            document.getElementById(DOMstrings.months).value = '';
            document.getElementById(DOMstrings.deposit).value = '';
            document.getElementById(DOMstrings.interest).value = '';
            document.getElementById(DOMstrings.initSavings).focus();


        },

        clearResult: function() {
            document.getElementById(DOMstrings.result).innerText = '';
        },

         DOMstrings: function() {
             return DOMstrings;
         }
    }
})();



// GLOBAL APP CPNTROLLER
const appController = (function() {

    var setUpEventListeners = function() {

        // add submit button on click event listener
        document.getElementById('btn').addEventListener('click', ctrlShowResult);

        // add enter key event listener
        document.addEventListener('keypress', function(event) {
            // check if key that was pressed is the enter key two dif ways to account for compatibility
            if (event.keyCode === 13 || event.which === 13) {
                ctrlShowResult();
            }
        });

        // event lisnter that checks when animation ends and resets is
        document.getElementById('btn').addEventListener('animationend', function () { 
            // remove animated class so that when the button is cliced it can animate again
            document.getElementById('btn').classList.remove('animated', 'shake');
         });

    };

    const ctrlShowResult = function() {
        let inputIsFilled = true
        // get input from input field
        const input = uiController.getInput(); // input returns a object

        // check if all inputs are filled by iteration through input object
        for (let prop in input) {
            // checks if if any property value is empty
            if (input[prop] === '') {
                // changes flag variable from true to false, to use it lower in the func
                inputIsFilled = false;
                // add styling to visualize error in inputs
                document.getElementById(prop).classList.add('red')
                uiController.btnShake();
                // clear any previous results (if any), to make ui cleaner
                uiController.clearResult();
            } else {
                // remove the red class from any input that has been filled
                document.getElementById(prop).classList.remove('red')
            }
        };

        if (inputIsFilled) {
            
            // save input to data structure in calculator controller
            calcController.saveInput(input);

            // calculate total Interest Eraned in calcController
            result = calcController.calculateTotal();

            // show result to ui
            uiController.displayResult(result);

            // clear inout fields
            uiController.clearInputFields();
        }
    }

    return {
        init: function() {
            // uiController.displayResult(' ');
            setUpEventListeners();
            document.getElementById('initSavings').focus();
        }
    };
})();

appController.init()


