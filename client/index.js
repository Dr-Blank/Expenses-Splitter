let ce_url = 'https://api.coinbase.com/v2/exchange-rates?currency=ETH';

let Currency;
let Exchange_rate ;
let users_object = {}; 

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
    Object.assign(users_object, { [name] : { public_address: eth_ad }});
    names_list = document.getElementsByClassName('names')[0];
    names_list.innerHTML = names_list.innerHTML + '<div class="names_btn_container"><button type="button" class="btn btn-sm btn-primary names_btn" data-bs-toggle="popover" data-bs-content='+eth_ad+'>'+name+'</button><span><img class="delete_user" src="images/x.png"></span></div>';

    //Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
    })
});

document.addEventListener('click', function(event){
    if(event.target.matches('.delete_user')){
        delete users_object[event.path[2].innerText];
        event.path[2].remove();
    }
},false);

