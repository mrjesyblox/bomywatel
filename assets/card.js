window.addEventListener('DOMContentLoaded', (event) => {
    // Get all the data from the browser's storage
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const nationality = localStorage.getItem('nationality');
    const birthday = localStorage.getItem('birthday');
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
    
    // Safety check for PESEL generation from localStorage
    if (birthday) {
        const pesel = generatePesel(birthday, sex);
        document.getElementById('pesel').textContent = pesel;
        document.getElementById('birthday').textContent = birthday;
    }

    // Populate the HTML elements with the data
    if (name) document.getElementById('name').textContent = name.toUpperCase();
    if (surname) document.getElementById('surname').textContent = surname.toUpperCase();
    if (nationality) document.getElementById('nationality').textContent = nationality.toUpperCase();
    if (familyName) document.getElementById('familyName').textContent = familyName.toUpperCase();
    if (sex) document.getElementById('sex').textContent = sex === 'm' ? 'MĘŻCZYZNA' : 'KOBIETA';
    if (fathersFamilyName) document.getElementById('fathersFamilyName').textContent = fathersFamilyName.toUpperCase();
    if (mothersFamilyName) document.getElementById('mothersFamilyName').textContent = mothersFamilyName.toUpperCase();
    if (birthPlace) document.getElementById('birthPlace').textContent = birthPlace.toUpperCase();
    if (countryOfBirth) document.getElementById('countryOfBirth').textContent = countryOfBirth.toUpperCase();
    
    if (adress1 && adress2 && city) {
        const fullAddress = `${adress1.toUpperCase()}\n${adress2} ${city.toUpperCase()}`;
        document.getElementById('adress').textContent = fullAddress;
    }

    if (userImage) {
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
if (updateText) {
    updateText.innerHTML = localStorage.getItem("update");
}

var update = document.querySelector(".update");
if (update) {
    update.addEventListener('click', () => {
      var newDate = date.toLocaleDateString("pl-PL", options);
      localStorage.setItem("update", newDate);
      updateText.innerHTML = newDate;
      scroll(0, 0)
    });
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock(){
    date = new Date()
    if (time) {
        time.innerHTML = "Czas: " + date.toLocaleTimeString() + " " + date.toLocaleDateString("pl-PL", options);    
    }
    delay(1000).then(() => {
        setClock();
    })
}

var unfold = document.querySelector(".info_holder");
if (unfold) {
    unfold.addEventListener('click', () => {
      if (unfold.classList.contains("unfolded")){
        unfold.classList.remove("unfolded");
      }else{
        unfold.classList.add("unfolded");
      }
    })
}

// --- URL PARAMETERS HANDLING ---
var data = {}
var params = new URLSearchParams(window.location.search);
for (var key of params.keys()){
  data[key] = params.get(key);
}

// FIX: Only run this block if birthday exists in the URL
if (data['birthday']) {
    document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

    var birthdayVal = data['birthday'];
    var birthdaySplit = birthdayVal.split(".");
    var d = parseInt(birthdaySplit[0]);
    var m = parseInt(birthdaySplit[1]);
    var y = parseInt(birthdaySplit[2]);

    var birthdayDate = new Date();
    birthdayDate.setDate(d);
    birthdayDate.setMonth(m-1);
    birthdayDate.setFullYear(y);

    var formattedBirthday = birthdayDate.toLocaleDateString("pl-PL", options);

    var sexVal = data['sex'];
    if (sexVal === "m"){
      sexVal = "Mężczyzna"
    } else if (sexVal === "k"){
      sexVal = "Kobieta"
    }

    setData("name", data['name']?.toUpperCase());
    setData("surname", data['surname']?.toUpperCase());
    setData("nationality", data['nationality']?.toUpperCase());
    setData("birthday", formattedBirthday);
    setData("familyName", data['familyName']);
    setData("sex", sexVal);
    setData("fathersFamilyName", data['fathersFamilyName']);
    setData("mothersFamilyName", data['mothersFamilyName']);
    setData("birthPlace", data['birthPlace']);
    setData("countryOfBirth", data['countryOfBirth']);
    setData("adress", "ul. " + data['adress1'] + "<br>" + data['adress2'] + " " + data['city']);

    // PESEL Generation for URL Data
    var peselMonth = m;
    if (y >= 2000) { peselMonth += 20; }
    
    var genderDigit = (sexVal.toLowerCase() === "mężczyzna") ? "0295" : "0382";
    var pDay = d < 10 ? "0" + d : d;
    var pMonth = peselMonth < 10 ? "0" + peselMonth : peselMonth;
    var peselStr = y.toString().substring(2) + pMonth + pDay + genderDigit + "7";
    setData("pesel", peselStr);
}

if (localStorage.getItem("homeDate") == null){
  var homeDay = getRandom(1, 25);
  var homeMonth = getRandom(0, 11); // Corrected month range
  var homeYear = getRandom(2012, 2019);

  var homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear)

  localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
}

const homeDateEl = document.querySelector(".home_date");
if (homeDateEl) {
    homeDateEl.innerHTML = localStorage.getItem("homeDate");
}

function setData(id, value){
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function generatePesel(birthday, sex) {
    const [day, month, year] = birthday.split('.').map(Number);
    const yy = String(year).slice(-2).padStart(2, '0');

    let mm = month;
    if (year >= 2000 && year <= 2099) {
        mm += 20;
    } else if (year >= 1800 && year <= 1899) {
        mm += 80;
    }
    mm = String(mm).padStart(2, '0');

    const dd = String(day).padStart(2, '0');
    const zzz = String(Math.floor(Math.random() * 900) + 100);

    let x;
    if (sex === 'm') {
        x = String([1, 3, 5, 7, 9][Math.floor(Math.random() * 5)]);
    } else {
        x = String([0, 2, 4, 6, 8][Math.floor(Math.random() * 5)]);
    }

    const first10digits = yy + mm + dd + zzz + x;
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(first10digits[i]) * weights[i];
    }
    
    const controlDigit = (10 - (sum % 10)) % 10;
    return first10digits + controlDigit;
}