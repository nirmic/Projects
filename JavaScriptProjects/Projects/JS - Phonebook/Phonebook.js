var names = [];
var phones = [];

function AddName() {
    var name = document.getElementById("name");
    console.log(name.value);
    names.push(name.value);
    var nameTextArea = document.getElementById("nameTextArea");
    nameTextArea.value = names;
}

function AddPhone() {
    var phone = document.getElementById("phone");
    console.log(phone.value);
    phones.push(phone.value);
    var phoneTextArea = document.getElementById("phoneTextArea");
    phoneTextArea.value = phones;
}

function Search() {
    var nameToSearch = document.getElementById("nameToSearch");
    var searchResult = document.getElementById("searchResult");
    console.log(nameToSearch.value);
    for (var i = 0; i < names.length; i++) {
        if (names[i] === nameToSearch.value) {
            console.log(phones[i]);
            searchResult.innerHTML = phones[i];
            return;
        }
    }
    searchResult.innerHTML = "Not Found";
}