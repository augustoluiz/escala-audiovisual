const dias = document.querySelector(".dias");
const dataAtual = document.querySelector(".calendario__data_atual");
const prevNextIcon = document.querySelectorAll(".calendario__icones span");

let data = new Date();
let ano = data.getFullYear();
let mes = data.getMonth();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
    let ultimaDataDoMes = new Date(ano, mes + 1, 0).getDate();
    let ultimoDiaDoMes = new Date(ano, mes, ultimaDataDoMes).getDay(); 
    let ultimaDataDoUltimoMes = new Date(ano, mes, 0).getDate();
    let liTag = "";

    for (let i = primeiroDiaDoMes; i > 0; i--) {
        liTag += `<li class="inactive">${ultimaDataDoUltimoMes - i + 1}</li>`;
    }
    for (let i = 1; i <= ultimaDataDoMes; i++) {
        let isToday = i === data.getDate() && mes === new Date().getMonth()
            && ano === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = ultimoDiaDoMes; i < 6; i++) {
        liTag += `<li class="inactive">${i - ultimoDiaDoMes + 1}</li>`
    }
    dataAtual.innerText = `${meses[mes]} ${ano}`;
    dias.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        mes = icon.id === "prev" ? mes - 1 : mes + 1;
        if (mes < 0 || mes > 11) {
            data = new Date(ano, mes, 1);
            ano = data.getFullYear();
            mes = data.getMonth();
        } else {
            data = new Date();
        }
        renderCalendar();
    });
});