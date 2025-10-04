window.addEventListener('DOMContentLoaded', (event) => {
    // Get all the data from the browser's storage
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const nationality = localStorage.getItem('nationality'); // <-- Gets nationality
    const birthday = localStorage.getItem('birthday');       // <-- Gets birthday
    const familyName = localStorage.getItem('familyName');
    const sex = localStorage.getItem('sex');
    const fathersFamilyName = localStorage.getItem('fathersFamilyName');
    const mothersFamilyName = localStorage.getItem('mothersFamilyName');
    const birthPlace = localStorage.getItem('birthPlace');
    const countryOfBirth = localStorage.getItem('countryOfBirth');
    const adress1 = localStorage.getItem('adress1');
    const adress2 = localStorage.getItem('adress2');
    const city = localStorage.getItem('city');
    const userImage = localStorage.getItem('image');
	const pesel = generatePesel(birthday, sex);

    // Populate the HTML elements with the data
    document.getElementById('name').textContent = name.toUpperCase();
    document.getElementById('surname').textContent = surname.toUpperCase();
    document.getElementById('nationality').textContent = nationality.toUpperCase(); // <-- Sets nationality
    document.getElementById('birthday').textContent = birthday;                       // <-- Sets birthday
    document.getElementById('familyName').textContent = familyName.toUpperCase();
    document.getElementById('sex').textContent = sex === 'm' ? 'MĘŻCZYZNA' : 'KOBIETA';
    document.getElementById('fathersFamilyName').textContent = fathersFamilyName.toUpperCase();
    document.getElementById('mothersFamilyName').textContent = mothersFamilyName.toUpperCase();
    document.getElementById('birthPlace').textContent = birthPlace.toUpperCase();
    document.getElementById('countryOfBirth').textContent = countryOfBirth.toUpperCase();
	document.getElementById('pesel').textContent = pesel;
    
    const fullAddress = `${adress1.toUpperCase()}\n${adress2} ${city.toUpperCase()}`;
    document.getElementById('adress').textContent = fullAddress;

    if(userImage) {
        document.querySelector('.id_own_image').style.backgroundImage = `url('${userImage}')`;
    }
});

var confirmElement = document.querySelector(".confirm");

function closePage(){
  clearClassList();
}

function openPage(page){
  clearClassList();
  var classList = confirmElement.classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function clearClassList(){
  var classList = confirmElement.classList;
  classList.remove("page_open");
  classList.remove("page_1_open");
  classList.remove("page_2_open");
  classList.remove("page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

if (localStorage.getItem("update") == null){
  localStorage.setItem("update", "24.12.2024")
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
  var newDate = date.toLocaleDateString("pl-PL", options);
  localStorage.setItem("update", newDate);
  updateText.innerHTML = newDate;

  scroll(0, 0)
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock(){
    date = new Date()
    time.innerHTML = "Czas: " + date.toLocaleTimeString() + " " + date.toLocaleDateString("pl-PL", options);    
    delay(1000).then(() => {
        setClock();
    })
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {

  if (unfold.classList.contains("unfolded")){
    unfold.classList.remove("unfolded");
  }else{
    unfold.classList.add("unfolded");
  }

})

var data = {}

var params = new URLSearchParams(window.location.search);
for (var key of params.keys()){
  data[key] = params.get(key);
}

document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

var birthday = data['birthday'];
var birthdaySplit = birthday.split(".");
var day = parseInt(birthdaySplit[0]);
var month = parseInt(birthdaySplit[1]);
var year = parseInt(birthdaySplit[2]);

var birthdayDate = new Date();
birthdayDate.setDate(day)
birthdayDate.setMonth(month-1)
birthdayDate.setFullYear(year)

birthday = birthdayDate.toLocaleDateString("pl-PL", options);

var sex = data['sex'];

if (sex === "m"){
  sex = "Mężczyzna"
}else if (sex === "k"){
  sex = "Kobieta"
}

setData("name", data['name'].toUpperCase());
setData("surname", data['surname'].toUpperCase());
setData("nationality", data['nationality'].toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName']);
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName']);
setData("mothersFamilyName", data['mothersFamilyName']);
setData("birthPlace", data['birthPlace']);
setData("countryOfBirth", data['countryOfBirth']);
setData("adress", "ul. " + data['adress1'] + "<br>" + data['adress2'] + " " + data['city']);

if (localStorage.getItem("homeDate") == null){
  var homeDay = getRandom(1, 25);
  var homeMonth = getRandom(0, 12);
  var homeYear = getRandom(2012, 2019);

  var homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear)

  localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
}

document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate")

if (parseInt(year) >= 2000){
  month = 20 + month;
}

var later;

if (sex.toLowerCase() === "mężczyzna"){
  later = "0295"
}else{
  later = "0382"
}

if (day < 10){
  day = "0" + day
}

if (month < 10){
  month = "0" + month
}

var pesel = year.toString().substring(2) + month + day + later + "7";
setData("pesel", pesel)

function setData(id, value){

  document.getElementById(id).innerHTML = value;

}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function generatePesel(birthday, sex) {
    // 1. Parse the date from "DD.MM.YYYY" format
    const [day, month, year] = birthday.split('.').map(Number);
    
    // Get last two digits of the year
    const yy = String(year).slice(-2).padStart(2, '0');

    // Encode the month for the century (add 20 for 2000s)
    let mm = month;
    if (year >= 2000 && year <= 2099) {
        mm += 20;
    } else if (year >= 1800 && year <= 1899) {
        mm += 80;
    }
    mm = String(mm).padStart(2, '0');

    const dd = String(day).padStart(2, '0');

    // 2. Generate a 3-digit random serial number
    const zzz = String(Math.floor(Math.random() * 900) + 100);

    // 3. Generate a random gender digit
    let x;
    if (sex === 'm') { // Male (odd)
        x = String([1, 3, 5, 7, 9][Math.floor(Math.random() * 5)]);
    } else { // Female (even)
        x = String([0, 2, 4, 6, 8][Math.floor(Math.random() * 5)]);
    }

    const first10digits = yy + mm + dd + zzz + x;

    // 4. Calculate the control digit (K)
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(first10digits[i]) * weights[i];
    }
    
    const controlDigit = (10 - (sum % 10)) % 10;

    return first10digits + controlDigit;
}