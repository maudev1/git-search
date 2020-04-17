let inputElement, buttonSearchElement, cleanListButton, listUserElement, listRepoElement, listRedirectRepo;

inputElement = document.querySelector('input');

buttonSearchElement = document.querySelector('.buscar');

cleanListButton = document.querySelector('.limpar');

listUserElement = document.querySelector('.user-names');

listRedirectRepo = document.querySelector('.redirect-list');

listRepoElement = document.querySelector('.repositorios');

let userAvatar = document.querySelector('.user-avatar')

//BUSCA USUARIO NO GITHUB
buttonSearchElement.onclick = () => {
    buttonSearchElement.setAttribute('class', 'button is-success is-loading');
    //listUserElement.innerHTML = '';

    if (inputElement.value == '') {

        let tagAlert = document.querySelector('.tag');
        tagAlert.setAttribute('class', 'tag is-danger');
        console.log('digite algo');

        setTimeout(() => {
            tagAlert.setAttribute('class', 'tag is-danger is-hidden');
        }, 2000);

        buttonSearchElement.setAttribute('class', 'button is-success');

    } else {

        const buscarPorNome = async () => {
            try {
                const response = await axios.get(`https://api.github.com/search/users?q=${inputElement.value}`);
                let userList = response.data;
                let users = userList.items;

                for (user of users) {

                    userNames.push(user.login)

                    inputElement.value = '';

                    buttonSearchElement.setAttribute('class', 'button is-success');

                }

                gerarLinks();

            }
            catch (err) {
                buttonSearchElement.setAttribute('class', 'button is-success');
                console.warn('error')

            }

        }
        buscarPorNome();
    }

    inputElement.value = '';

}

let userNames = [

]

//GERADOR DE LINKS 
function gerarLinks() {
    for (userName of userNames) {

        let itemElement, itemLink, itemText, itemDivider, avatar;

        itemElement = document.createElement('li');
        itemLink = document.createElement('a');
        itemText = document.createTextNode(userName);

        //avatar = document.createTextNode(userName);

        //itemRedirectRepo = document.createElement('li');

        itemLink.setAttribute('onclick', "listarRepositorios('" + userName + "')");

        itemDivider = document.createElement('hr');

        itemElement.appendChild(itemLink);

        //itemElement.appendChild(avatar)
        itemLink.appendChild(itemText);
        listUserElement.appendChild(itemElement);

        itemElement.appendChild(itemDivider);


    }

}

//LISTAR REPOSITORIOS

const listarRepositorios = async (par) => {
    console.log('carregando...');

    try {
        const response = await axios.get(`https://api.github.com/users/${par}/repos`);

        listRepoElement.innerHTML = '';

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
            console.log('concluido!');
        }
    }
    catch (err) {
        console.warn('erro ao buscar o repositorio!');
    }
    inputElement.value = '';
}

//LIMPAR LISTA
cleanListButton.onclick = () => {
    listUserElement.innerHTML = '';

    listRepoElement.innerHTML = '';

    userNames = [];


}

