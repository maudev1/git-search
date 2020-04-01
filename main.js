let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app .button');

//FUNÇÃO PARA LISTAR REPOSITORIOS DO GIT de acordo com o USERNAME

let progressBar = document.createElement('p');
progressBarText = document.createTextNode('carregando...');
progressBar.appendChild(progressBarText);

buttonElement.onclick = function listarRepositorio() {
    listElement.innerHTML = '';
    buttonElement.setAttribute('class', 'button is-success is-loading');
    console.log('carregando...');
    //listElement.appendChild(progressBar);

    axios.get('https://api.github.com/users/' + inputElement.value + '/repos')

        .then(response => {
            let todos = response.data;
            for (todo of todos) {
                //console.log(todo.name);
                console.log(todo.url)
                let todoElement = document.createElement('li');
                let todoLink = document.createElement('a');
                todoLink.setAttribute('href', 'https://github.com/maudev1/' + todo.name);
                todoLink.setAttribute('target', '_BLANK')

                let todoText = document.createTextNode(todo.name);

                todoLink.appendChild(todoText);

                todoElement.appendChild(todoLink);
                listElement.appendChild(todoElement);
                //todoElement.appendChild(todoLink)
            }

        })
        .catch(error => {
            console.warn('Usuario não encontrado');
            alert('usuario não encontrado!');

        })
        .then(response => {
            console.log('concluido!');
            //listElement.removeChild(progressBar);
            buttonElement.setAttribute('class', 'button is-success');

        })


    inputElement.value = '';
}

function limpar() {
    listElement.innerHTML = '';

}