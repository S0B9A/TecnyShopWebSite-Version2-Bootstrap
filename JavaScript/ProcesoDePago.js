document.querySelector('.card-number-input').oninput = () =>{
    const cardNumberInput = document.querySelector('.card-number-input').value;
    document.querySelector('.card-number-box').innerText = cardNumberInput || '############';
}

document.querySelector('.card-holder-input').oninput = () =>{
    const cardHolderInput = document.querySelector('.card-holder-input').value;
    document.querySelector('.card-holder-name').innerText = cardHolderInput || 'full name';
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = "cvv " + document.querySelector('.cvv-input').value;
}