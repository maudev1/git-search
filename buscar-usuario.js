let inputElement, buttonSearchElement, cleanListButton, listUserElement, listRepoElement, listRedirectRepo;

inputElement = document.querySelector('input');

buttonSearchElement = document.querySelector('.buscar');

cleanListButton = document.querySelector('.limpar');

listUserElement = document.querySelector('.user-names');

listRedirectRepo = document.querySelector('.redirect-list') 

listRepoElement = document.querySelector('.repositorios')

//BUSCA USUARIO NO GITHUB
buttonSearchElement.onclick = () => {
    buttonSearchElement.setAttribute('class', 'button is-success is-loading');
    listUserElement.innerHTML = '';

    if (inputElement.value == '') {

        console.log('digite algo');

        buttonSearchElement.setAttribute('class', 'button is-success');

    } else {
        axios.get(`https://api.github.com/search/users?q=${inputElement.value}`)
            .then(response => {
                let userList = response.data;
                let users = userList.items

                for (user of users) {
                    console.log(user.login)

                    userNames.push(user.login)

                    inputElement.value = '';

                    buttonSearchElement.setAttribute('class', 'button is-success');

                }
            })
            .catch(error => {
                buttonSearchElement.setAttribute('class', 'button is-success');
                console.log('error')

            }).finally(response => {

                gerarLinks()
            })

    }

    inputElement.value = '';

}

let userNames = [

]

//GERADOR DE LINKS 
function gerarLinks() {
    for (userName of userNames) {

        let itemElement, itemLink, itemText, itemRedirectRepo, repoRedirectButton;

        itemElement = document.createElement('li');
        itemLink = document.createElement('a');
        itemText = document.createTextNode(userName);

        itemRedirectRepo = document.createElement('li');
        repoRedirectButton = document.createElement('button');

        repoRedirectButton.setAttribute('class', 'button is-success is-small');

        repoRedirectButton.setAttribute('onclick', "listarRepositorio('"+userName+"')");

        itemElement.appendChild(itemLink);
        itemLink.appendChild(itemText);
        listUserElement.appendChild(itemElement);

        listRedirectRepo.appendChild(itemRedirectRepo);
        itemRedirectRepo.appendChild(repoRedirectButton);
    }

}

//LISTAR REPOSITORIOS
function listarRepositorio(par) {
    listUserElement.innerHTML = '';
    console.log('carregando...');
    axios.get(`https://api.github.com/users/${par}/repos`)

        .then(response => {


            let todos = response.data;
            for (todo of todos) {


                console.log(todo.url)

                let todoElement = document.createElement('li');
                let todoLink = document.createElement('a');
                todoLink.setAttribute('href', todo.html_url);
                todoLink.setAttribute('target', '_BLANK')

                let todoText = document.createTextNode(todo.name);

                todoLink.appendChild(todoText);
                todoElement.appendChild(todoLink);
                listRepoElement.appendChild(todoElement);

            }

        })
        .catch(error => {
            console.warn('erro ao buscar o repositorio!');

        })
        .then(response => {
            console.log('concluido!');

        })


    inputElement.value = '';

}

//LIMPAR LISTA
cleanListButton.onclick = () => {
    listUserElement.innerHTML = '';
    userNames = [];


}