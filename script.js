const nextBtn = document.getElementsByClassName('nextBtn');
const perBtn = document.getElementsByClassName('perBtn');
const formSteps = document.getElementsByClassName('formSteps');
const numLabal = document.getElementsByClassName('container')[0].children;
const inputField = document.getElementsByClassName('input');
const errorText = document.getElementsByClassName('error');
const totalPayment = document.getElementById('totalPayment');
const planName = document.getElementsByClassName('planName')[0];
const totalPrice = document.getElementById('totalPrice');
const plan_radio = document.getElementsByClassName('plan_radio');
const plan_label_name = document.getElementsByClassName('plan_label_name');
const planPrice = document.getElementById('planPrice');
const optionInput = document.getElementsByClassName('optionInput');
const addPrice = document.getElementsByClassName('addPrice');
const addHeading = document.getElementsByClassName('addHeading');
const addOn_billing = document.getElementsByClassName('addOn_billing')[0];
const changeBtn = document.getElementById('changeBtn');
const thankNote = document.getElementsByClassName('thankNote')[0];
const confirm = document.getElementsByClassName('confirm');
const form = document.getElementsByTagName('form');
const freeMonth = document.getElementsByClassName('freeMonths');
const monthBtn = document.getElementById('paymentWay');
const planPricing = document.getElementsByClassName('pricing');
const addOn_billingPrice = document.getElementsByClassName('addOn_billing-price');



// function for reload page 
const reloadPage = () => {
    window.location.reload()
}


// confirm btn for finishing step 
confirm[0].addEventListener('click', (event) => {
    event.preventDefault();
    thankNote.style.display = "block";
    for(let i =0; i<numLabal.length;i++){
        numLabal[i].classList.remove('current');
    }
    form[0].style.display = 'none';
    setTimeout(reloadPage, 4000)
})



// total price in finishing step 
const finalPrice = () => {
    let planPriceYear = planPrice.innerHTML.split('/')[0];
    let x = 0;
    for(let i= 0; i<addOn_billingPrice.length; i++){
      let y = addOn_billingPrice[i].innerHTML.split('$')[1].split('/')[0];
      x = x+Number(y);
    }
    x = x+Number(planPriceYear)
    if(monthBtn.checked){
        totalPrice.innerHTML =  `$${x}/yr`
        
    } else{
        totalPrice.innerHTML =  `$${x}/mo`

    }
}


// EventListener for input field for checking the input updates

for(let i=0; i<inputField.length; i++){
    inputField[i].addEventListener('input', ()=> {
        if(inputField[i].value.length < 0){
            errorText[i].innerHTML = "This field is required";
            inputField[i].setCustomValidity("Invalid field.");
        } else {
            errorText[i].innerHTML = "";
            inputField[i].setCustomValidity("");
        }
    })
}


// function for checking the input values 

const checkInputField = () => {
    for(let a = 0; a < inputField.length; a++){
        if(inputField[a].value.length < 3){
            errorText[a].innerHTML = "This field is required";
            inputField[a].setCustomValidity("Invalid field.");
        } else {
            errorText[a].innerHTML = "";
            inputField[a].setCustomValidity("");
        }
    };
}


// Next form step function 

const nextStep = (a) => {
    formSteps[a].style.display = 'none';
    numLabal[a].classList.remove('current');
    formSteps[++a].style.display = 'flex';
    numLabal[a].classList.add('current');
}


// EventListener for next btns

for(let i = 0 ; i < nextBtn.length; i++){
    nextBtn[i].addEventListener('click', function(event){
        event.preventDefault();
        let a = i;
        if(i === 0){
            checkInputField();
            if(inputField[0].checkValidity() && inputField[1].checkValidity() && inputField[2].checkValidity()){
                nextStep(a);
            };
        } else {
            nextStep(a);
        }
    }) 
}


// EventListener for pervious btns

for(let i=0; i<perBtn.length; i++){
    perBtn[i].addEventListener('click', function(event){
        event.preventDefault();
        let a = i;
        numLabal[a].classList.add('current');
        formSteps[a].style.display = 'flex';
        formSteps[++a].style.display = 'none';
        numLabal[a].classList.remove('current');
    })
}


// change the price based on month and year

const changePrice = () => {
    if(monthBtn.checked){
        for(let i=0; i<freeMonth.length; i++){
            freeMonth[i].innerHTML = "2 months free";
            let a = planPricing[i].innerHTML
            let b = a.split('/')[0]
            let year = Number(b)*10;
            planPricing[i].innerHTML = `${year}/yr`;

            if(plan_radio[i].checked){
                planName.children[0].innerHTML = plan_label_name[i].innerHTML;
                planPrice.innerHTML = planPricing[i].innerHTML;
            }
            let m = addPrice[i].innerHTML.split('$')[1].split('/')[0];
            let n = Number(m)*10;
            addPrice[i].innerHTML = `+$${n}/yr`;
            if(optionInput[i].checked){
               document.getElementById(`${i}`).children[1].innerHTML = addPrice[i].innerHTML;
            }
        }
        totalPayment.innerHTML = 'per year';
        planName.children[1].innerHTML = '(Yearly)';
    } else {
        for(let i= 0; i< freeMonth.length; i++){
            freeMonth[i].innerHTML = "";
            let c = planPricing[i].innerHTML
            let d = c.split('/')[0]
            let mon = Number(d)/10;
            planPricing[i].innerHTML = `${mon}/mo`
            if(plan_radio[i].checked){
                planName.children[0].innerHTML = plan_label_name[i].innerHTML;
                planPrice.innerHTML = planPricing[i].innerHTML;
            }
            let m = addPrice[i].innerHTML.split('$')[1].split('/')[0];
            let n = Number(m)/10;
            addPrice[i].innerHTML = `+$${n}/mo`
            if(optionInput[i].checked){
                document.getElementById(`${i}`).children[1].innerHTML = addPrice[i].innerHTML;
             }
        }
        totalPayment.innerHTML = 'per month';
        planName.children[1].innerHTML = '(Monthly)';
    }

    finalPrice();
}

monthBtn.addEventListener('change', changePrice);
changeBtn.addEventListener('click',() => {
    if(monthBtn.checked){
        monthBtn.checked = false;   
    } else {
        monthBtn.checked = true;
    }
    changePrice()
} );


// select package and updating the billing

for(let i=0 ; i<plan_radio.length; i++){
    plan_radio[i].addEventListener('change', function() {
        planName.children[0].innerHTML = plan_label_name[i].innerHTML;
        planPrice.innerHTML = planPricing[i].innerHTML;
        finalPrice();
    })
}

//add on checkbox

for(let i=0; i< optionInput.length; i++){
    optionInput[i].addEventListener('change',()=> {
        if(optionInput[i].checked){
            const div = document.createElement('div');
            div.id = i;
            const p1 = document.createElement('p');
            p1.innerText = addHeading[i].innerHTML;
            div.appendChild(p1);
            const p2 = document.createElement('p');
            p2.innerText = addPrice[i].innerHTML;
            p2.classList.add('addOn_billing-price');
            div.appendChild(p2);
            addOn_billing.appendChild(div);
        } else {
            document.getElementById(`${i}`).remove();
        }
        finalPrice();
    })
}