//Telegram
let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
tg.expand(); //расширяем на все окно

$.mask.definitions['h'] = "[0|1|3|4|5|6|7|9]"
$(".mask-phone").mask("+7 (h99) 999-99-99");

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-mask="phone"]') // ищем все поля с атрибутом data-mask="phone"
    if (!elements) return // если таких нет, прекращаем выполнение функции
    const phoneOptions = { // создаем объект параметров
        mask: '+{7}(000)000-00-00' // задаем единственный параметр mask
    }
    elements.forEach(el => { // для каждого найденного поля с атрибутом [data-mask="phone"]
        IMask(el, phoneOptions) // инициализируем плагин с установленными выше параметрами
    })

})

    //Подсказки Api https://dadata.ru/profile/#subscriptions
    var token = "ae88835bdbe058921eb8012bc6b79a7a7e606ac9";
    var type  = "ADDRESS";
    var $street = $("#street");
    var $house  = $("#house");
    var $message = $("#message");

    // улица
    $street.suggestions({
      token: token,
      type: type,
      scrollOnFocus: true,
      onSelect: selectAddress,
      onSelectNothing: selectNone,
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
        scrollOnFocus: true,
        onSelect: streetkladrid,
        hint: 'Выберите вариант или продолжите ввод',
        noSuggestionsHint: false,
        bounds: "house",
        constraints: $street
    });

function selectAddress(suggestion) {
  console.log(suggestion);

  if (suggestion.data.house) {
    $message.text("Отлично, можно продолжать!");
    tg.MainButton.setParams({"color": "#3c3c3c"});
    tg.MainButton.disable()

  } else {
    //$message.text("Укажите адрес до дома, чтобы продолжить");
    pushNotification("Укажите адрес до дома, чтобы продолжить", "normal");
    tg.MainButton.setParams({"color": "#32746a"});
    tg.MainButton.enable()
  }

  selectedAddress = suggestion.data;
  seladdr = suggestion.data.city_kladr_id;

}

function selectNone() {
  selectedAddress = null;
  $message.text("Вы не ввели адрес");
  pushNotification("Вы не ввели адрес", "red");
  $continue.prop("disabled", true);
}

function streetkladrid(suggestion) {
    tg_kladrid = suggestion.data.kladr_id;
    console.log(tg_kladrid)
}

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

    tg.MainButton.text = "Продолжить"; //изменяем текст кнопки
    tg.MainButton.setText("Продолжить"); //изменяем текст кнопки иначе
    tg.MainButton.textColor = "#FFFFFF"; //изменяем цвет текста кнопки
    tg.MainButton.color = "#1778E0"; //изменяем цвет бэкграунда кнопки
    tg.MainButton.setParams({"color": "#3c3c3c"}); //так изменяются все параметры
    tg.MainButton.show() //Показать окно
    tg.MainButton.disable()

function checkParams() {
    var street = $('#street').val();
    var house = $('#house').val();
    var phone = $('#phone').val();


    let radio = document.querySelectorAll('.option-input');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
           dostavka = radio[i].value;
           break;
        }
    }

    console.log(dostavka)

    if (dostavka == "delivery") {
        if (street.length > 0 && house.length > 0 && phone.length > 0) {
            tg.MainButton.setParams({"color": "#32746a"});
            tg.MainButton.enable()
        } else {
            tg.MainButton.setParams({"color": "#3c3c3c"});
            tg.MainButton.disable()
        }
    } else {
        if (phone.length > 0) {
            tg.MainButton.setParams({"color": "#32746a"});
            tg.MainButton.enable()
        } else {
            tg.MainButton.setParams({"color": "#3c3c3c"});
            tg.MainButton.disable()
        }
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

    let kladrid = tg_kladrid
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

        data = {kladrid,dostavka,street,house,flat,floor,entrance,intercom,phone,about}

    } else {
        let dostavka = 'Навынос'
        console.log(dostavka)
        let phone = document.getElementById("phone").value;
        let about = document.getElementById("about").value;

        data = {kladrid,dostavka,phone,about}
    }

    console.log(data)

    tg.sendData(JSON.stringify(data));
    //при клике на основную кнопку отправляем данные в строковом виде
});


notifications_container = document.querySelector(".notifications");
var pushNotification = function (message, color) {
  notification = document.createElement("div");
  x_close = document.createElement("div");
  x_close.appendChild(document.createElement("div"));
  x_close.appendChild(document.createElement("div"));
  notification.appendChild(x_close);
  notification.appendChild(
    document.createElement("p").appendChild(document.createTextNode(message))
  );
  notification.classList.add(color);
  notifications_container.appendChild(notification);
  notification.firstChild.addEventListener("click", function () {
    this.parentNode.classList.add("fading_out");
    setTimeout(function () {
      notification.parentNode.removeChild(notification);
    }, 1000);
  });
  setTimeout(function () {
    notification.parentNode.removeChild(notification);
  }, 7000);
};
//pushNotification("I am green", "green");
//pushNotification("I am red", "red");
//pushNotification("I am normal", "normal");
