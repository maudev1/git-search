let inputElement = document.querySelector('input');

let buttonSearchElement = document.querySelector('.buscar');

let limparListElement = document.querySelector('.limpar');

let listElement = document.querySelector('ul');

let navLink = document.querySelector('.nav-link');

//BUSCA USUARIO NO GITHUB
buttonSearchElement.onclick = () => {
    buttonSearchElement.toggleAttribute('class', 'button is-success is-loading');
    listElement.innerHTML = '';

    if (inputElement.value == '') {

        console.log('digite algo')

        buttonSearchElement.setAttribute('class', 'is-primary');

    } else {
        axios.get(`https://api.github.com/search/users?q=${inputElement.value}`)
            .then(response => {
                let userList = response.data;
                let users = userList.items
                for (user of users) {
                    console.log(user.login)

                    userNames.push(user.login)
                    
                    gerarLinks()
                    
                    inputElement.value = '';

                    buttonSearchElement.setAttribute('class', 'button is-success');

                }
            })
            .catch(error => {
                buttonSearchElement.setAttribute('class', 'button is-success');
                console.log('error')

            })

    }
    
    inputElement.value = '';

}

let userNames = [

]

//GERADOR DE LINKS 
function gerarLinks() {
    for (user of userNames) {

        let itemElement = document.createElement('li');
        let itemLink = document.createElement('a');
        itemLink.setAttribute('href', `https://github.com/${user}`);
        itemLink.setAttribute('target', '_BLANK');
        let itemText = document.createTextNode(user);

//        let repoButton = document.createElement('button');
//        
//        repoButton.setAttribute('class', 'button is-danger');
//
//        itemElement.appendChild(repoButton);


        itemElement.appendChild(itemLink);
        itemLink.appendChild(itemText);
        listElement.appendChild(itemElement);
        
    }
    
}

//LISTAR REPOSITORIOS
function listarRepositorio(par) {
    listElement.innerHTML = '';
    console.log('carregando...');
    axios.get(`https://api.github.com/users/${par}/repos`)
    
    

    

        .then(response => {
            

            let todos = response.data;
            for (todo of todos) {

                
                console.log(todo.url)

                let todoElement = document.createElement('td');
                let todoLink = document.createElement('a');
                todoLink.setAttribute('href', todo.html_url);
                todoLink.setAttribute('target', '_BLANK')

                let todoText = document.createTextNode(todo.name);

                todoLink.appendChild(todoText);
                todoElement.appendChild(todoLink);
                listElement.appendChild(todoElement);

                
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
limparListElement.onclick = () => {
    listElement.innerHTML = '';

}

