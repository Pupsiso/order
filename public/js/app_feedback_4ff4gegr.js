var st_ver="0.140",tg=window.Telegram.WebApp,ball=document.getElementById("load-wrap"),notifier=document.getElementById("notifier");function preload(t){t.style.opacity=1;var o=setInterval(function(){t.style.opacity=t.style.opacity-.05,t.style.opacity<=.05&&(clearInterval(o),ball.style.display="none")},15)}function notify(t){notifier.className;notifier.className="warning show",$("#notifier").text(t),setTimeout(function(){notifier.className="warning"},1500)}function getMachineId(){try{let t=localStorage.getItem("uuid");return t||(t=self.UUID.generate(),localStorage.setItem("uuid",t)),t}catch(t){return console.log(t),"error"}}function get_data_load(){window.onload=function(){setTimeout(function(){preload(ball),button_sendData()},350)}}function button_sendData(){tg.MainButton.show(),tg.MainButton.text="Отправить",tg.MainButton.setText("Отправить"),tg.MainButton.textColor="#FFFFFF",tg.MainButton.color="#32746a",tg.MainButton.setParams({color:"#32746a"}),tg.MainButton.enable(),tg.enableClosingConfirmation()}function button_block(){tg.MainButton.show(),tg.MainButton.text="Продолжить",tg.MainButton.setText("Продолжить"),tg.MainButton.textColor="#FFFFFF",tg.MainButton.color="#0e0e10",tg.MainButton.setParams({color:"#0e0e10"}),tg.MainButton.enable(),tg.enableClosingConfirmation()}tg.expand(),Telegram.WebApp.onEvent("mainButtonClicked",function(){console.log("Вызывает кнопку продолжить: проверка данных на заполнение полей"),notify("Загрузка формы...");try{var t={};t.platform=tg.platform,t.guuid=getMachineId(),t.num_order=0,t.num_bot=0;for(var o=document.querySelectorAll(".num_order"),e=0;e<o.length;e++)if(o[e].checked){num_order=o[e].value,t.num_order=num_order,console.log(num_order);break}for(o=document.querySelectorAll(".num_bot"),e=0;e<o.length;e++)if(o[e].checked){num_bot=o[e].value,t.num_bot=num_bot,console.log(num_bot);break}t.order_about=$("#order_about").val(),t.bot_about=$("#bot_about").val(),console.log(t),tg.sendData(JSON.stringify(t))}catch(t){console.log("Ошибка",t),$("#error_t").text("Ошибка: "+t),notify("Ошибка: "+t)}}),validParams=["paycheck"];const params=window.location.search.substring(1).split("&"),filteredParams=params.filter(t=>([name]=t.split("="),validParams.includes(name))),obj={};for(const t of filteredParams){const[o,e]=t.split("=");obj[o]=e}try{var paycheck=obj.paycheck,platform=tg.platform,guuid=getMachineId();guuid_platform=" GUID: "+guuid,$("#guuid").text(guuid_platform),$("#ver").text("ver: "+st_ver),get_data_load()}catch(t){console.log(t),notify("Ошибка загрузка сайта"),$("#error_load").text("Ошибка: "+t)}