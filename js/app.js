function getNotificationPermission() {
    return new Promise((resolve, reject) => {
        Notification.requestPermission().then(status => {
            if (status == 'granted') {
                resolve()
            } else {
                reject(status)
            }
        })
    })
}

let data = JSON.parse(localStorage.getItem('list')) || []

let description = document.getElementById('description')
let email = document.getElementById('email') 
let amount = document.getElementById('amount')
let value = document.getElementById('value')
let btn = document.getElementById('btn_action')
let tbody = document.getElementById('tbody')
let form = document.getElementById('form')
let secTotal = document.getElementById('total')

moveToTable()

form.onsubmit = function (event) {
    event.preventDefault();
    
    // if (!description.checkValidity() && email.checkValidity() && !value.checkValidity()) {
    //     console.log('ERROR')
    // }

    let obj = {
        description: description.value,
        email: email.value,
        amount: amount.value,
        value: value.value
    }

    data.push(obj)
    localStorage.setItem('list', JSON.stringify(data))
    moveToTable()
    getNotificationPermission()
        .then(() => {
            let notification = new Notification('Bill added', {
                icon: 'https://sonassets.s3.amazonaws.com/img/favicon.png',
                body: `${description.value} - R$${value.value} has been added`,
            })
            clear()
        })
        .catch((err) => {
            console.warn(err)
        })

}

function moveToTable() {
    tbody.innerHTML = ''
    let total = 0
    data.forEach((bill) => {
        let tmpl = `<tr>
            <td>${bill.description}</td>
            <td>${bill.email}</td>
            <td>${bill.amount}</td>
            <td>${bill.value}</td>
            </tr>`

        tbody.innerHTML += tmpl    
        total += bill.amount * bill.value
    })

    secTotal.innerHTML = `<h4>Total: R$${total}</h4>`
    // let tmpl = `<tr>
    //     <td>${data.description}</td>
    //     <td>${data.email}</td>
    //     <td>${data.amount}</td>
    //     <td>${data.value}</td>
    // </tr>`

    // tbody.innerHTML += tmpl
} 

function clear() {
    description.value = ''
    email.value = ''
    amount.value = ''
    value.value = ''
}