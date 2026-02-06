// This runs as soon as id.html loads
window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);

    // 1. Save all data from the URL into localStorage so card.html can find it later
    for (const [key, value] of params) {
        localStorage.setItem(key, value);
    }

    // 2. Set the Welcome Message based on time
    var welcome = "Dzień dobry!";
    var date = new Date();
    if (date.getHours() >= 18) {
        welcome = "Dobry wieczór!";
    }
    const welcomeEl = document.querySelector(".welcome");
    if (welcomeEl) welcomeEl.innerHTML = welcome;
});

// 3. Login Redirect Logic
const loginBtn = document.querySelector(".login");
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log("Redirecting to home...");
        // We move to home.html. Since we saved to localStorage above, 
        // the data will be available even without URL parameters.
        window.location.href = "home.html";
    });
}

// 4. Password Input Masking Logic
var input = document.querySelector(".password_input");
var eye = document.querySelector(".eye");
var dot = "•";
var original = "";

if (input && eye) {
    input.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            document.activeElement.blur();
        }
    });

    input.addEventListener("input", () => {
        var value = input.value.toString();
        var char = value.substring(value.length - 1);
        
        if (value.length < original.length) {
            original = original.substring(0, original.length - 1);
        } else {
            original = original + char;
        }

        if (!eye.classList.contains("eye_close")) {
            var dots = "";
            for (var i = 0; i < value.length - 1; i++) {
                dots = dots + dot;
            }
            input.value = dots + char;
            
            setTimeout(() => {
                if (input.value.length != 0) {
                    input.value = input.value.substring(0, input.value.length - 1) + dot;
                }
            }, 3000);
        }
    });

    eye.addEventListener('click', () => {
        if (eye.classList.contains("eye_close")) {
            eye.classList.remove("eye_close");
            var dots = "";
            for (var i = 0; i < input.value.length; i++) {
                dots = dots + dot;
            }
            input.value = dots;
        } else {
            eye.classList.add("eye_close");
            input.value = original;
        }
    });
}