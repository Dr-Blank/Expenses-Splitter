let ce_url = 'https://api.coinbase.com/v2/exchange-rates?currency=ETH';

let Client_public_address = "0x000000(placeholder)";
let Currency;
let Exchange_rate;
let Users_object = {};
let Expenses = [];
let User_privilege = "Owner";

//Public address
function show_public_address(){
    cpa = document.getElementsByClassName("client_public_address");
    for (let i = 0; i < cpa.length; i++) {
        cpa[i].innerText = Client_public_address;
    }
};


//Current User privilege
cup = document.querySelector(".navbar-brand");
cup.innerHTML = "Expenses-Splitter | <span class='user_privilege'>"+User_privilege+"</span>";


// Fetches Current exchange rate of ETH and fills the data in dropbox, chosen currency and exchange_rate to a variable
fetch(ce_url)
    .then(response => response.json())
    .then(d => {
        // console.log(Object.keys(d.data.rates));
        curr_names = Object.keys(d.data.rates)
        const dropdown = document.getElementsByClassName("dropdown-menu")[0];
        for (let i = 0; i < curr_names.length; i++) {
            const dd_item = document.createElement("li");
            dd_item.innerHTML = '<a class="dropdown-item" href="#">'+curr_names[i]+'</a>';
            dropdown.appendChild(dd_item);
            dd_item.addEventListener("click",e =>{
                Currency = e.target.innerText;
                Exchange_rate = d.data.rates[Currency];
                document.getElementById("navbarDropdown").innerText="Currency: "+ Currency;
            })
        }
    })


//To Search Currencies
function filterFunction() {
    var input, filter, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    div = document.getElementById("scrollable");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}


//add user and his eth address into a variable and display name to client!
document.getElementById("add_user_btn").addEventListener("click", () => {
    let name = document.getElementById("username").value;
    let eth_ad = document.getElementById("eth_address").value;
    Object.assign(Users_object, { [name] : { public_address: eth_ad ,amount_due:[0]}});
    names_list = document.getElementsByClassName('names')[0];
    names_list.innerHTML = names_list.innerHTML + '<div class="names_btn_container"><button type="button" class="btn btn-sm btn-primary names_btn">'+
    name+'</button><span><img class="delete_user" src="images/x.png"></span></div>';
    document.getElementById("username").value = "";
    document.getElementById("eth_address").value="";
});


//Universal event listener
document.addEventListener('click', function(event){

    // Delete User Event listener
    if(event.target.matches('.delete_user')){
        delete Users_object[event.path[2].innerText];
        event.path[2].remove();
    };

    // Select Users Event listener
    if(event.target.matches('.names_btn')){
        event.target.classList.toggle('btn-success');
        event.target.classList.toggle('selected_user');
    };

    // Add Expense Event Listener
    if(event.target.matches('#add_exp_btn')){
        let selected_users = document.getElementsByClassName("selected_user");
        let expense = document.getElementById('total_expense').valueAsNumber;
        let total_users = document.getElementsByClassName('names_btn');
        let expense_details = document.getElementById("expense_details").value;
        let individual_due = expense/selected_users.length;
        if(Currency == null){
            alert("choose Currency");
        }
        else if(selected_users.length <1){
            alert("Choose at least one user");
        }
        else{
            for (let i = 0; i < total_users.length; i++) {
                if(total_users[i].classList.contains("selected_user")){
                    Users_object[total_users[i].innerText].amount_due.push(individual_due);
                }
                else{
                    Users_object[total_users[i].innerText].amount_due.push(0);
                }
            }
            document.querySelector('tbody').insertAdjacentHTML("beforeend","<td>"+expense+"</td>"+"<td>"+ Array.from(selected_users,x => x.innerText).join(', ') +"</td>"+"<td>"+individual_due+"</td>"+"<td><button class='btn btn-danger expense_delete'>Delete</button></td>");
            Expenses.push([expense,expense_details,selected_users,individual_due]);
        }
        document.getElementById('total_expense').value = "";
        document.getElementById("expense_details").value ="";
    };

    if(event.target.matches(".expense_delete")){
        let index = event.target.parentElement.parentElement.rowIndex;
        users_to_delete = event.target.parentElement.parentElement.childNodes[1].outerText.split(", ");
        for (let i = 0; i < users_to_delete.length; i++) {
            Users_object[users_to_delete[i]].amount_due.splice(index,1)
        }
        Expenses.splice(index-1,1);
        event.path[2].remove();
    }
},false);



/*
░██╗░░░░░░░██╗███████╗██████╗░██████╗░
░██║░░██╗░░██║██╔════╝██╔══██╗╚════██╗
░╚██╗████╗██╔╝█████╗░░██████╦╝░█████╔╝
░░████╔═████║░██╔══╝░░██╔══██╗░╚═══██╗
░░╚██╔╝░╚██╔╝░███████╗██████╦╝██████╔╝
░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░╚═════╝░
*/

import Web3 from 'web3';
// import configuration1 from '../build/contracts/FriendsExpenseSplitter.json';
// import configuration2 from '../build/contracts/Ownable.json';

// const contract_address = configuration1.networks['5777'].address;
// const contract_abi1 = configuration1.abi;
// const contract_abi2 = configuration2.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

// const contract1 = new web3.eth.Contract(contract_address,contract_abi1);
// const contract2 = new web3.eth.Contract(contract_address,contract_abi2);

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    Client_public_address = account;
    show_public_address();
}

main();