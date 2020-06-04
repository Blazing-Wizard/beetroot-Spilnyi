axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//получение данных с сервера
function getArticles() {
    return axios.get('/articles');
}

//отправка данных из формы на сервер
function addArticle(data) {
    return axios.post('/articles', { ... {}, ...data });
}

function adddArticle(data) {
    return axios.put('/articles', { ... {}, ...data });
}

// функция удаления
function deleteArticle(id) {
    return axios.delete(`/articles/${id}`)
}

// генератор случайных чисел для картинок
function rdm(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Функция показа маленьких карточек в слайдере
function showArticle(article) {
    const $AboutArticle = createSmallArticle(article);
    $('.slider').slick('slickAdd', $AboutArticle);
}

//Функция показа полного содержимого карточки 
function showAboutArticle(article) {
    const $article = createAboutArticle(article);
    $('#bigCard').html($article);
    $('#bigCard').css('display', 'block');
}

//Функция редактирования содержимого карточки 
function editArticle(article) {
    const $editArticle = createEditForm(article);
    $('#bigCard').html($editArticle);
    $('#bigCard').css('display', 'block');
}

// создание маленьких карточек
function createSmallArticle(article) {
    const $AboutArticle = $(`<div class="card smallCard" style="width: 18rem;">
    <img src="${article.picture}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${article.title}<br></h5>
        <p class="card-text hideCardText">${article.about}<br><br><br></p>
        <a class="btn btn-primary">More</a>
    </div>
</div>`);

    //отлавливание события (нажатия на кнопку 'More' в маленьких карточках)
    $AboutArticle.find('.btn').on('click', (e) => {
        showAboutArticle(article);
    })

    return $AboutArticle;
}

// создание большой карточки
function createAboutArticle(article) {
    $cardId = article.id
    const $article = $(`<div class="card-body">
    <h5 id="bigCardTitle" class="card-title">${article.title}</h5>
    <p id="bigCardText" class="card-text">${article.about}</p>
    <a id="edit" class="btn btn-warning">Edit</a>
    <a id="delete" class="btn btn-danger">Delete</a>
</div>`);

    //вызов модального окна подтверждения удаления данных из формы
    $article.find('#delete').on('click', (e) => {
        createModal()
    })

    //логика редактирования карточки
    $article.find('#edit').on('click', e => {
        $('#bigCard').html(createEditForm(article))
    })
    return $article;
}

//форма создания карточки
function createInputForm() {
    const $inputForm = $(`<form class="inputForm">
    <div class="form-group">
        <label for="DishName">Enter dish name</label>
        <input type="text" class="form-control" id="DishName">
        <small class="form-text text-muted">Enter something delicious</small><br>
        <label for="imgUrl">Enter image URL (leave the field empty
            and I will add a random picture)</label>
        <input type="text" class="form-control" id="imgUrl">
    </div>
    <div class="form-group">
        <label for="recipe">Enter recipe</label>
        <textarea class="form-control" id="recipe" rows="15"></textarea>
    </div>
    <button id="cancell" type="button" class="btn btn-secondary" >Cancel</button>
    <button id="save" type="submit" class="btn btn-primary">Save</button>
</form>`)
    $('#bigCard').css('display', 'block');
    //Сохранение данных из формы
    $inputForm.find('#save').on('click', e => {
        const title = $('#bigCard').find('#DishName').val();
        const about = $('#bigCard').find('#recipe').val();

        //добавление случайной картинки или по УРЛ
        if ($('#imgUrl').val().length < 3) {
            const picture = ('https://loremflickr.com/320/240?random=' + rdm(10, 50))
            addArticle({ title, about, picture }).then(resp => {
                //обработка данных
                if (resp.data) {
                    resp.data.forEach(article => {
                        showArticle(article);
                    });
                }
            })
        } else {
            const picture = $('#bigCard').find('#imgUrl').val();
            addArticle({ title, about, picture }).then(resp => {
                //обработка данных
                if (resp.data) {
                    resp.data.forEach(article => {
                        showArticle(article);
                    });
                }
            })
        }
        $inputForm.detach()
    })
    // кнопка отмены
    $inputForm.find('#cancell').on('click', e => {
        $inputForm.detach()
        $('#bigCard').css('display', 'none');
    })
    return $inputForm;
}

//форма редактирования карточки
function createEditForm(article) {
    const $editArticle = $(`<form class="inputForm">
    <div class="form-group">
        <label for="DishName">Dish name</label>
        <input type="text" class="form-control" id="DishName" value="${article.title}"><br>
        <label for="imgUrl">Image URL (leave the field empty
            and I will add a random picture)</label>
        <input type="text" class="form-control" id="imgUrl">
    </div>
    <div class="form-group">
        <label for="recipe">Recipe</label>
        <textarea class="form-control" id="recipe" rows="15" >${article.about}</textarea>
    </div>
    <button id="cancel" type="button" class="btn btn-secondary" >Cancel</button>
    <button id="save" type="submit" class="btn btn-primary">Save</button>
</form>`)
    $('#bigCard').css('display', 'block');

    //Сохранение данных из формы
    $editArticle.find('#save').on('click', e => {
        const title = $('#bigCard').find('#DishName').val();
        const about = $('#bigCard').find('#recipe').val();

        //добавление случайной картинки или по УРЛ
        if ($('#imgUrl').val().length < 3) {
            const picture = ('https://loremflickr.com/320/240?random=' + rdm(10, 50))
            addArticle({ title, about, picture }).then(resp => {
                //обработка данных
                if (resp.data) {
                    resp.data.forEach(article => {
                        showArticle(article);
                    });
                }
            })
        } else {
            const picture = $('#bigCard').find('#imgUrl').val();
            addArticle({ title, about, picture }).then(resp => {
                //обработка данных
                if (resp.data) {
                    resp.data.forEach(article => {
                        showArticle(article);
                    });
                }
            })
        }
        deleteArticle($cardId)
        $editArticle.detach()
    })
    // кнопка отмены в форме
    $editArticle.find('#cancel').on('click', e => {
        showAboutArticle(article);
    })

    return $editArticle;
}

//модалка
function createModal() {
    const $myModal = $(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="exampleModalLabel">Are you sure?</h2>
        </div>
        <div class="modal-body">
        <img src="https://media.giphy.com/media/3ohzAKkcyuLEIiI9Wg/giphy.gif" width="466px" alt="...">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button id="modalYes" type="button" class="btn btn-danger">Yes GTFO</button>
        </div>
      </div>
    </div>
  </div>`);
    // добавление модального окна в ДОМ
    $myModal.appendTo('body');
    $myModal.modal('toggle');
    $myModal.on('hidden.bs.modal', () => {
        $myModal.detach();
    })
    // удаление карточки
    $('#modalYes').on('click', (e) => {
        // console.log('im work')
        deleteArticle($cardId)
        $article.detach()
    })
}

// настройки слайдера
if (window.matchMedia('(max-width: 1020px)').matches) {
    // do functionality on screens smaller than 768px
    $(document).ready(function () {
        // $('.slider').slick({
        //     infinite: true,
        //     аccessibility: true,
        //     slidesToShow: 4,
        //     slidesToScroll: 4
        // });
        $('.slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true
        });
    });
}
else {
    // change functionality for larger screens
    $(document).ready(function () {
        // $('.slider').slick({
        //     infinite: true,
        //     аccessibility: true,
        //     slidesToShow: 6,
        //     slidesToScroll: 6
        // });
        $('.slider').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true
        });
    });
}

//работа с загруженным документом
$(document).ready(() => {
    getArticles().then(resp => {
        //обработка данных
        if (resp.data) {
            resp.data.forEach(article => {
                showArticle(article);
            });
        } else {
            alert('No data!');
        }
    }).catch(error => {
        alert('Error');
        console.log(error);
    });
    //отлавливание события (нажатия на кнопку 'Click to add')
    //показ полного содержимого формы
    $('#newCard').on('click', e => {
        $('#bigCard').html(createInputForm())
    })
    if ($(document).height() <= $(window).height()) {
        $(".page-footer").addClass("fixed-bottom");
    }
});
