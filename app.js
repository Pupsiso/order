//Telegram
let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
tg.expand(); //расширяем на все окно
tg.MainButton.text = "Продолжить"; //изменяем текст кнопки
tg.MainButton.setText("Продолжить"); //изменяем текст кнопки иначе
tg.MainButton.textColor = "#FFFFFF"; //изменяем цвет текста кнопки
tg.MainButton.color = "#1778E0"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({"color": "#3c3c3c"}); //так изменяются все параметры
tg.MainButton.show() //Показать окно
tg.MainButton.disable()

document.querySelector('.option-input').addEventListener('click', () => {
    //Подсказки Api https://dadata.ru/profile/#subscriptions

    var token = "ae88835bdbe058921eb8012bc6b79a7a7e606ac9";
    var type  = "ADDRESS";
    var $street = $("#street");
    var $house  = $("#house");

    // улица
    $street.suggestions({
      token: token,
      type: type,
      hint: 'Выберите вариант или продолжите ввод',
      bounds: "street",
      constraints: {
          "locations": [{
            "region": "Тюменская",
            "city": "Тюмень"
          }]
        },
      count: 15,
      restrict_value: true
    });

    // дом
    $house.suggestions({
        token: token,
        type: type,
        hint: 'Выберите вариант или продолжите ввод',
        noSuggestionsHint: false,
        bounds: "house",
        constraints: $street
    });
});

//тестовая кнопка отправки
document.getElementById('add-from').addEventListener('submit', function(event){
    let radio = document.querySelectorAll('.option-input');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            dostavka = radio[i].value;
            break;
        }
    }
    console.log(dostavka)
    //получить kladr_id"72000001000010500"
});


//street - Улица //house - номер дома //flat - Кв./офис //floor - Этаж
//entrance - Подъезд  //Intercom - Домофон //phone - Телефон //about - Комментарий


function checkParams() {
    var street = $('#street').val();
    var house = $('#house').val();
    var phone = $('#phone').val();

    if (street.length > 0 && house.length > 0 && phone.length > 0) {
        tg.MainButton.setParams({"color": "#228B22"});
        tg.MainButton.enable()
    } else {
        tg.MainButton.setParams({"color": "#3c3c3c"});
        tg.MainButton.disable()
    }

}


//tg отправка формы
Telegram.WebApp.onEvent('mainButtonClicked', function(){
    console.log('Обробатываю данные tg')

    let radio = document.querySelectorAll('.option-input');

    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
           dostavka = radio[i].value;
           console.log(dostavka)
           break;
        }
    }


    if (dostavka == "delivery") {
        let dostavka = 'Доставка'
        console.log(dostavka)
        let street = document.getElementById("street").value;
        let house = document.getElementById("house").value;
        let flat = document.getElementById("flat").value;
        let floor = document.getElementById("floor").value;
        let entrance = document.getElementById("entrance").value;
        let intercom = document.getElementById("intercom").value;
        let phone = document.getElementById("phone").value;
        let about = document.getElementById("about").value;

        data = {dostavka,street,house,flat,floor,entrance,intercom,phone,about}

    } else {
        let dostavka = 'Навынос'
        console.log(dostavka)
        let phone = document.getElementById("phone").value;
        let about = document.getElementById("about").value;

        data = {dostavka,phone,about}
    }

    console.log(data)

    tg.sendData(JSON.stringify(data));
    //при клике на основную кнопку отправляем данные в строковом виде
});