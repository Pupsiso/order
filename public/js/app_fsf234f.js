var st_ver="0.100",tg=window.Telegram.WebApp,ball=document.getElementById("load-wrap"),notifier=document.getElementById("notifier");tg.expand();const token="ae88835bdbe058921eb8012bc6b79a7a7e606ac9";var selectedAddress,type="ADDRESS",$street=$("#street"),$house=$("#house"),$message=$("#message"),selection="<option value='now'>⌚️ Ближайшее время</option>";function preload(t){t.style.opacity=1;var e=setInterval(function(){t.style.opacity=t.style.opacity-.05,t.style.opacity<=.05&&(clearInterval(e),ball.style.display="none")},15)}function notify(t){notifier.className;notifier.className="warning show",$("#notifier").text(t),setTimeout(function(){notifier.className="warning"},1500)}function getMachineId(){try{let t=localStorage.getItem("uuid");return t||(t=self.UUID.generate(),localStorage.setItem("uuid",t)),t}catch(t){return console.log(t),"error"}}function zeroFill(t,e){return(e-=t.toString().length)>0?new Array(e+(/\./.test(t)?2:1)).join("0")+t:t+""}function selectAddress(t){console.log(t),t.data.house?console.log("Верно, можно продолжать!"):(console.log("Укажите номер дома, чтобы продолжить"),$("#house")[0].reportValidity(),document.getElementById("house").focus()),selectedAddress=t.data,seladdr=t.data.city_kladr_id,tg_kladrid=t.data.street_kladr_id,tg_street=t.data.street_with_type,tg_house=t.data.house_type+" "+t.data.house,tg_geo_lat=t.data.geo_lat,tg_geo_lon=t.data.geo_lon,tg_qc_geo=t.data.qc_geo,tg_full_street=t.unrestricted_value,null==t.data.block?tg_building="":tg_building=t.data.block_type+" "+t.data.block}function selectNone(){selectedAddress=null}function get_data_load(){let t=localStorage.getItem("t_name"),e=localStorage.getItem("t_phone"),o=localStorage.getItem("t_address"),n=localStorage.getItem("t_flat"),a=localStorage.getItem("t_floor"),l=localStorage.getItem("t_entrance"),r=localStorage.getItem("t_intercom");if(t&&(console.log("Найден: имя"),$("#name").val(t)),e&&(console.log("Найден: Телефон"),$("#phone").val(e)),n&&(console.log("Найден: кв"),$("#flat").val(n)),a&&(console.log("Найден: этаж"),$("#floor").val(a)),l&&(console.log("Найден: подъезд"),$("#entrance").val(l)),r&&(console.log("Найден: домофон"),$("#intercom").val(r)),!limit_streets){console.log("Свободный выбор домов");let t=localStorage.getItem("t_address"),e=localStorage.getItem("t_house");e&&(console.log("Найден: дом"),$("#house").val(e)),t?(console.log("Адрес найден подгружаю"),$("#street").val(o),$house.on("suggestions-fixdata",function(t,e){}),$house.suggestions().fixData()):console.log("Адрес пустой")}window.onload=function(){setTimeout(function(){preload(ball),button_sendData()},350)}}function work(){var t=Number(today.format("HH"));return work_hours_open.format("HH")<=t?t+1:work_hours_open.format("HH")}function button_sendData(){tg.MainButton.show(),tg.MainButton.text="Продолжить",tg.MainButton.setText("Продолжить"),tg.MainButton.textColor="#FFFFFF",tg.MainButton.color="#32746a",tg.MainButton.setParams({color:"#32746a"}),tg.MainButton.enable(),tg.enableClosingConfirmation()}function button_block(){tg.MainButton.show(),tg.MainButton.text="Продолжить",tg.MainButton.setText("Продолжить"),tg.MainButton.textColor="#FFFFFF",tg.MainButton.color="#0e0e10",tg.MainButton.setParams({color:"#0e0e10"}),tg.MainButton.enable(),tg.enableClosingConfirmation()}$street.suggestions({token:token,type:type,scrollOnFocus:!0,onSelect:selectAddress,onSelectNothing:selectNone,hint:"Выберите вариант или продолжите ввод",bounds:"street",constraints:{locations:[{city:"Тюмень"}]},restrict_value:!0}),$house.suggestions({token:token,type:type,scrollOnFocus:!0,onSelect:selectAddress,onSelectNothing:selectNone,hint:!1,noSuggestionsHint:!1,bounds:"house",constraints:$street}),Telegram.WebApp.onEvent("mainButtonClicked",function(){console.log("Вызывает кнопку продолжить: проверка данных на заполнение полей"),notify("Загрузка формы...");try{var t=$("#name").val(),e=$("#phone").val(),o={};if(o.platform=tg.platform,o.guuid=getMachineId(),o.delivery_time=$("#select").val(),o.cutlery=$("#dining-number").val(),o.about=$("#about").val(),o.building="",t.length<3)return document.getElementById("name").focus(),$("#name")[0].reportValidity(),notify("Имя указан некорректно");if(o.name=t,localStorage.setItem("t_name",t),e.length<18)return document.getElementById("phone").focus(),$("#phone")[0].reportValidity(),notify("Телефон указан некорректно");o.phone=e,localStorage.setItem("t_phone",e);for(var n=document.querySelectorAll(".option-input"),a=0;a<n.length;a++)if(n[a].checked){l=n[a].value;break}if(!limit_streets&&"delivery"==l){if(null==selectedAddress)return document.getElementById("street").focus(),$("#street")[0].reportValidity(),notify("Выберите Улицу и дом");if(null==selectedAddress.house)return document.getElementById("house").focus(),$("#house")[0].reportValidity(),notify("Выберите номер Дома");o.kladrid=tg_kladrid,o.street=tg_street,o.house=tg_house,o.building=tg_building,o.geo_lat=tg_geo_lat,o.geo_lon=tg_geo_lon,o.full_street=tg_full_street,o.qc_geo=tg_qc_geo,localStorage.setItem("t_address",tg_street),localStorage.setItem("t_house",tg_house+tg_building)}if("delivery"==l){var l="🚛 Доставка",r=$("#flat").val(),i=$("#floor").val(),s=$("#entrance").val(),m=$("#intercom").val();o.dostavka=l,o.flat=r,o.floor=i,o.entrance=s,o.intercom=m,localStorage.setItem("t_flat",r),localStorage.setItem("t_floor",i),localStorage.setItem("t_entrance",s),localStorage.setItem("t_intercom",m)}else{l="🏃 Навынос";o.dostavka=l}tg.sendData(JSON.stringify(o))}catch(t){console.log("Ошибка",t),$("#error_t").text("Ошибка: "+t),notify("Ошибка: "+t)}}),validParams=["time_zone","work_hours","limit_streets"];const params=window.location.search.substring(1).split("&"),filteredParams=params.filter(t=>([name]=t.split("="),validParams.includes(name))),obj={};for(const t of filteredParams){const[e,o]=t.split("=");obj[e]=o}try{var work_hours=obj.work_hours.split(","),time_zone=obj.time_zone,limit_streets=JSON.parse(obj.limit_streets),work_hours_open=moment(work_hours[0],"HH:mm"),work_hours_close=moment(work_hours[1],"HH:mm"),today=(new moment).format(),tomorrow=(today=moment.tz(today,time_zone),(new moment).add(1,"days").format()),platform=(tomorrow=moment.tz(tomorrow,time_zone),tg.platform),guuid=getMachineId();if(limit_streets){console.log("Включил ограничения");var elem=document.getElementById("streetlimit");elem.parentNode.removeChild(elem)}guuid_platform=" GUID: "+guuid,$("#guuid").text(guuid_platform)}catch(t){console.log(t),notify("Ошибка загрузка сайта"),$("#error_load").text("Ошибка: "+t)}window.addEventListener("DOMContentLoaded",function(){[].forEach.call(document.querySelectorAll(".tel"),function(t){var e;function o(t){t.keyCode&&(e=t.keyCode),this.selectionStart<3&&t.preventDefault();var o="+7 (___) ___-__-__",n=0,a=o.replace(/\D/g,""),l=this.value.replace(/\D/g,""),r=o.replace(/[_\d]/g,function(t){return n<l.length?l.charAt(n++)||a.charAt(n):t});-1!=(n=r.indexOf("_"))&&(n<5&&(n=3),r=r.slice(0,n));var i=o.substr(0,this.value.length).replace(/_+/g,function(t){return"\\d{1,"+t.length+"}"}).replace(/[+()]/g,"\\$&");(!(i=new RegExp("^"+i+"$")).test(this.value)||this.value.length<5||e>47&&e<58)&&(this.value=r),"blur"==t.type&&this.value.length<5&&(this.value="")}t.addEventListener("input",o,!0),t.addEventListener("focus",o,!0),t.addEventListener("blur",o,!0),t.addEventListener("keydown",o,!0)})});var i=0;for(i=work();i<work_hours_close.format("HH");i++){var j=zeroFill(i,2),date=moment(today),timeStr=j,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")});var today_min=Number(today.format("mm"));today_min<=30&&(selection+="<option value='"+date.format()+"'>⌚️ "+j+":00 Сегодня</option>");date=moment(today),timeStr=j+30,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":30 Сегодня</option>"}for(i=work_hours_open.format("HH");i<work_hours_close.format("HH");i++){j=zeroFill(i,2),date=moment(tomorrow),timeStr=j,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":00 Завтра</option>";date=moment(tomorrow),timeStr=j+30,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":30 Завтра</option>"}$("select").html(selection),$("#ver").text("ver: "+st_ver),get_data_load();