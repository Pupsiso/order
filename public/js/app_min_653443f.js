var ball=document.getElementById("load-wrap");function preload(e){e.style.opacity=1;var t=setInterval(function(){e.style.opacity=e.style.opacity-.05,e.style.opacity<=.05&&(clearInterval(t),ball.style.display="none")},15)}window.onload=function(){setTimeout(function(){preload(ball),tg.MainButton.show()},770)};var tg=window.Telegram.WebApp;tg.expand(),tg.MainButton.text="Продолжить",tg.MainButton.setText("Продолжить"),tg.MainButton.textColor="#FFFFFF",tg.MainButton.color="#32746a",tg.MainButton.setParams({color:"#32746a"}),tg.MainButton.enable(),tg.enableClosingConfirmation(),validParams=["time_zone","work_hours","limit_streets"];const params=window.location.search.substring(1).split("&"),filteredParams=params.filter(e=>([name]=e.split("="),validParams.includes(name))),obj={};for(const e of filteredParams){const[t,o]=e.split("=");obj[t]=o}var work_hours=obj.work_hours.split(","),time_zone=obj.time_zone,limit_streets=JSON.parse(obj.limit_streets),work_hours_open=moment(work_hours[0],"HH:mm"),work_hours_close=moment(work_hours[1],"HH:mm"),today=(new moment).format(),tomorrow=(today=moment.tz(today,time_zone),(new moment).add(1,"days").format());tomorrow=moment.tz(tomorrow,time_zone);if(limit_streets){var elem=document.getElementById("streetlimit");elem.parentNode.removeChild(elem)}function work(){var e=Number(today.format("HH"));return work_hours_open.format("HH")<=e?e+1:work_hours_open.format("HH")}var selection="<option value='now'>⌚️ Ближайшее время</option>",i=0;for(i=work();i<work_hours_close.format("HH");i++){var j=zeroFill(i,2),date=moment(today),timeStr=j,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")});var today_min=Number(today.format("mm"));today_min<=30&&(selection+="<option value='"+date.format()+"'>⌚️ "+j+":00 Сегодня</option>");date=moment(today),timeStr=j+30,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":30 Сегодня</option>"}for(i=work_hours_open.format("HH");i<work_hours_close.format("HH");i++){j=zeroFill(i,2),date=moment(tomorrow),timeStr=j,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":00 Завтра</option>";date=moment(tomorrow),timeStr=j+30,time=moment(timeStr,"HH:mm");date.set({hour:time.get("hour"),minute:time.get("minute"),second:time.get("second")}),selection+="<option value='"+date.format()+"'>⌚️ "+j+":30 Завтра</option>"}function zeroFill(e,t){return(t-=e.toString().length)>0?new Array(t+(/\./.test(e)?2:1)).join("0")+e:e+""}function getMachineId(){let e=localStorage.getItem("MachineId");return e||(e=crypto.randomUUID(),console.log(e),localStorage.setItem("MachineId",e)),e}$("select").html(selection),window.addEventListener("DOMContentLoaded",function(){[].forEach.call(document.querySelectorAll(".tel"),function(e){var t;function o(e){e.keyCode&&(t=e.keyCode),this.selectionStart<3&&e.preventDefault();var o="+7 (___) ___-__-__",n=0,a=o.replace(/\D/g,""),l=this.value.replace(/\D/g,""),r=o.replace(/[_\d]/g,function(e){return n<l.length?l.charAt(n++)||a.charAt(n):e});-1!=(n=r.indexOf("_"))&&(n<5&&(n=3),r=r.slice(0,n));var s=o.substr(0,this.value.length).replace(/_+/g,function(e){return"\\d{1,"+e.length+"}"}).replace(/[+()]/g,"\\$&");(!(s=new RegExp("^"+s+"$")).test(this.value)||this.value.length<5||t>47&&t<58)&&(this.value=r),"blur"==e.type&&this.value.length<5&&(this.value="")}e.addEventListener("input",o,!0),e.addEventListener("focus",o,!0),e.addEventListener("blur",o,!0),e.addEventListener("keydown",o,!0)})});const token="ae88835bdbe058921eb8012bc6b79a7a7e606ac9";var selectedAddress,type="ADDRESS",$street=$("#street"),$house=$("#house"),$message=$("#message");function selectAddress(e){console.log(e),e.data.house?console.log("Верно, можно продолжать!"):(console.log("Укажите адрес до дома, чтобы продолжить"),$("#house")[0].reportValidity(),document.getElementById("house").focus()),selectedAddress=e.data,seladdr=e.data.city_kladr_id,tg_kladrid=e.data.street_kladr_id,tg_street=e.data.street_with_type,tg_house=e.data.house_type+" "+e.data.house,tg_geo_lat=e.data.geo_lat,tg_geo_lon=e.data.geo_lon,tg_qc_geo=e.data.qc_geo,tg_full_street=e.unrestricted_value,null==e.data.block?tg_building="":tg_building=e.data.block_type+" "+e.data.block}function selectNone(){selectedAddress=null}function data_verification(e){var t=$("#name").val(),o=$("#phone").val();if(t.length<1)return document.getElementById("name").focus(),$("#name")[0].reportValidity(),!0;if(o.length<18)return document.getElementById("phone").focus(),$("#phone")[0].reportValidity(),!0;if(!limit_streets&&"delivery"==e){$("#street").val(),$("#house").val();if(null==selectedAddress)return document.getElementById("street").focus(),$("#street")[0].reportValidity(),!0;if(null==selectedAddress.house)return document.getElementById("house").focus(),$("#house")[0].reportValidity(),!0}return!1}function get_data_load(){let e=localStorage.getItem("t_name"),t=localStorage.getItem("t_phone"),o=localStorage.getItem("t_address"),n=localStorage.getItem("t_house"),a=localStorage.getItem("t_flat"),l=localStorage.getItem("t_floor"),r=localStorage.getItem("t_entrance"),s=localStorage.getItem("t_intercom");e&&(console.log("Найден: имя"),$("#name").val(e)),t&&(console.log("Найден: Телефон"),$("#phone").val(t)),n&&(console.log("Найден: дом"),$("#house").val(n)),a&&(console.log("Найден: кв"),$("#flat").val(a)),l&&(console.log("Найден: этаж"),$("#floor").val(l)),r&&(console.log("Найден: подъезд"),$("#entrance").val(r)),s&&(console.log("Найден: домофон"),$("#intercom").val(s)),localStorage.getItem("t_address")?(console.log("Адрес найден подгружаю"),$("#street").val(o),$house.on("suggestions-fixdata",function(e,t){}),$house.suggestions().fixData(),preload(ball),tg.MainButton.show()):console.log("Адрес пустой")}$street.suggestions({token:token,type:type,scrollOnFocus:!0,onSelect:selectAddress,onSelectNothing:selectNone,hint:"Выберите вариант или продолжите ввод",bounds:"street",constraints:{locations:[{city:"Тюмень"}]},restrict_value:!0}),$house.suggestions({token:token,type:type,scrollOnFocus:!0,onSelect:selectAddress,onSelectNothing:selectNone,hint:!1,noSuggestionsHint:!1,bounds:"house",constraints:$street});var platform=tg.platform;get_data_load(),Telegram.WebApp.onEvent("mainButtonClicked",function(){console.log("Проверка данных на заполнение полей ");for(var e=document.querySelectorAll(".option-input"),t=0;t<e.length;t++)if(e[t].checked){u=e[t].value;break}if(data_verification(u))return console.log("Ошибка заполнения данных"),!1;var o=tg.platform;if("delivery"==u){if(limit_streets)n="",a="",l="",r="",s="",i="",m="",d=0;else{var n=tg_kladrid,a=tg_street,l=tg_house,r=tg_building,s=tg_geo_lat,i=tg_geo_lon,m=tg_full_street,d=tg_qc_geo;localStorage.setItem("t_address",a),localStorage.setItem("t_house",l)}var u="🚛 Доставка",c=document.getElementById("dining-number").value,g=document.getElementById("select").value,_=document.getElementById("name").value,h=document.getElementById("flat").value,f=document.getElementById("floor").value,v=document.getElementById("entrance").value,p=document.getElementById("intercom").value,y=document.getElementById("phone").value,I=document.getElementById("about").value;localStorage.setItem("t_flat",h),localStorage.setItem("t_floor",f),localStorage.setItem("t_entrance",v),localStorage.setItem("t_intercom",p),data={platform:o,guuid:"1424",dostavka:u,cutlery:c,delivery_time:g,name:_,phone:y,kladrid:n,full_street:m,qc_geo:d,street:a,house:l,building:r,flat:h,floor:f,entrance:v,intercom:p,geo_lat:s,geo_lon:i,about:I}}else{u="🏃 Навынос",c=document.getElementById("dining-number").value,g=document.getElementById("select").value,_=document.getElementById("name").value,y=document.getElementById("phone").value,I=document.getElementById("about").value;data={platform:o,guuid:"1424",dostavka:u,cutlery:c,delivery_time:g,name:_,phone:y,about:I}}localStorage.setItem("t_name",_),localStorage.setItem("t_phone",y),tg.sendData(JSON.stringify(data))});