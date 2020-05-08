$('document').ready(() => {
    $('.input').empty();

})

//BUSCA USUARIO NO GIT
$('.buscar').click(() => {
    if ($('.input').val() == 0) {

        $('.tag').removeClass('is-hidden')
        $('.tag').show().text('É preciso informar um username!')
        setTimeout(() => {
            $('.tag').fadeOut();

        }, 2000);

        $('.buscar').addClass('is-success')

    }

    else {
        search()

        async function search() {

            //alert('não deu')

            try {
                const inputValue = $('.input').val()
                const response = await axios.get(`https://api.github.com/search/users?q=${inputValue}`);

                let data = response.data;
                let items = data.items;
                //
                for (item of items) {

                    Users.push({
                        name: item.login,
                        avatar: item.avatar_url,
                        repositories: item.repos_url
                    });

                    $('.input').empty('');

                    $('.buscar').addClass('is-success')
                    console.log(item)
                }
                

                linkGenerator()
            }
            catch (err) {
                //buttonSearchElement.setAttribute('class', 'button is-success');
                console.warn('error')

            }


        }
    }
})


$('.input').val()


let Users = [];

//GERADOR DE LINKS 
function linkGenerator() {
    for (user of Users) {

        //const name = $('<p></p>').text(user.name);
        const avatar = $(`<img src=${user.avatar}/>`).addClass('avatar');

       //$('#name').append(name).addClass('title is-4');
       //$('.image').append(avatar);

        console.log(Users)
        //createCard()

        var data = {
            userName: user.name,
            avatar: user.avatar,
            respositories:user.repositories
        }
    
        var template = [
            '<div class="card">',
            ' <div class="card-content">',
            '<div class="media">',
            ' <div class="media-left">',
            '<figure class="image">',
                '<img src="{{ avatar }}">',
            '</figure>',
            '</div>',
            '<div class="media-content">',
            '<p class="title is-4">{{ userName }}</p>',
            ' <p class="subtitle is-6"></p>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join("")
    
        var card = Mustache.render(template, data);
        
        $('#users-list').append(card);




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
    // inputElement.value = '';
    $('.input').val;

}

//LIMPAR LISTA

