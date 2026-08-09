//This javascript file contains hover on tab previews and the keyword search for the Index page, which adds interacttivity to the website allowing users to navigate efficiently 
 // This object stores the preview content of each page which is realved when user hovers a tab
const previews = {
"index": "<h3>Home</h3><p>Welcome to my Portfolio.</p>",
"lab projects": "<img src='projects-preview.png' alt='Lab Projects Preview' class='preview-img'>",
"contact": "<img src='contact-preview.png' alt='Contact Preview' class='preview-img'>",
"about me": "<img src='about-preview.png' alt='About Me Preview' class='preview-img'>",
"my cv": "<img src='cv-preview.png' alt='My CV Preview' class='preview-img'>"
};
//This function creates the search bar when hovering over the home tab which produces results when user types in keywords 
// 
function showSearch() { 
    document.getElementById('search-results').style.display = 'block'; 
    document.getElementById('google-bar').style.display = 'flex';
}
//This adds mouseover and mouseout event listeners to each tab, which will preview a tab when hovered and hide when user moves mouse(https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
if (document.getElementById('hover-preview')) {
document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('mouseover', function() {
            const key = this.dataset.page;
            if (key === "index") {
                    showSearch();
            } else {
            document.getElementById('hover-preview').innerHTML = previews[key];
            document.getElementById('google-bar').style.display = 'none';
            document.getElementById('search-results').innerHTML = ""; 
            }
        });
        tab.addEventListener('mouseout', function() {
            document.getElementById('hover-preview').innerHTML = "";
            document.getElementById('google-bar').style.display = 'flex';
                document.getElementById('search-results').innerHTML = "";
        });
    });
}
//This creates the search function that allows user to enter keywords with results displaying a description and a link to the relevant page(https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
function runSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim(); //takes the user input and converts it to lowercase and removes extra spaces(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
    const resultsDiv = document.getElementById('search-results'); //gets the search results div to display results through JavaScript(https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
    resultsDiv.innerHTML = ""; //removes previous results (https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

        if (query.length === 0) return;
//This object stores the pages, each page has serveral keywords related to the portfolio. If the user enters a related keyword they will be shown a description with a link to the page (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
const pages = {
    "home": { keywords: ["home", "welcome", "portfolio"], link: "index.html", desc: "Welcome to my portfolio!" },
    "lab projects": { keywords: ["lab", "projects", "assignment", "lab projects", "computer science"], link: "lab_projects.html", desc: "Check out my latest lab projects!" },
    "contact": { keywords: ["contact", "get in touch"], link: "contact.html", desc: "Get in touch with me!" },
    "about me": { keywords: ["about", "me", "media"], link: "about_me.html", desc: "Get to know me better!" },
    "my cv": { keywords: ["cv", "resume", "experience"], link: "my_cv.html", desc: "Education, Skills and Experience." }
};
let found = false;

    Object.entries(pages).forEach(([name, page]) => {
        if (page.keywords.some(keyword => keyword.includes(query))) {
            resultsDiv.innerHTML += `<div class="search-result">
                <a href="${page.link}">${name.toUpperCase()}</a>
                <p>${page.desc}</p></div>`;
            found = true;
        }
    });
    if (!found) {
        resultsDiv.innerHTML = "<p class='no-results'>No results found.</p>";
    }
}
if (document.getElementById('searchBtn')) {
document.getElementById('searchBtn').addEventListener('click', runSearch); //runs the serach funstion when button is clicked
document.getElementById('searchInput').addEventListener('keypress', function(e) { //runs the search button when userv presses enter(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    if (e.key === 'Enter') {
        runSearch();
    }
});
}
// Contact form  - checks user input and show error messages when function cannot be completed, or if input is valid the user will see a success message and inputs will clear (https://www.w3schools.com/js/js_validation.asp)
function validateForm() {
// Gets the value from the input fields and removes whitespace(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();

// Takes the error messages from HTML (https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const successMessage = document.getElementById('form-success');

// Clears previous messages so they dont clutter the form (https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent)
nameError.textContent = "";
emailError.textContent = "";
messageError.textContent = "";
successMessage.classList.remove("show");

let valid = true;

// Name - checks if empty, if so user gets an error message prompting user to enter their name (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
if (name === "") {
    nameError.textContent = "Please enter your name";
    valid = false;
}

// Check email for basic email format, if invlaid shows error message prompting user to enter a valid email
if (email === "") {
    emailError.textContent = "Please enter your email";
    valid = false;
} else if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email";
    valid = false;
}

// Message - checks if empty, if so user gets an error message prompting user to enter a message
if (message === "") {
    messageError.textContent = "Please enter a message";
    valid = false;
}

// When all inputs are valid, the form is submitted to Formspree, user gets a success message and input fields are cleared (https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent)
if (valid) {
    // Sends input data to Formspree (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
    fetch("https://formspree.io/f/xrejqpoq", {
        method: "POST", //sends input data to server as a POST request (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
        headers: {
            //communicates to Formspree that data is using a JSON format (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        //converts the input into a JSON string then send to Formspree (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => {//waits for Formspree responce, if successful shows success message
        if (response.ok) {//confrims message was successful, if not shows error message and asks user to try again (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
            successMessage.classList.add("show");
            document.getElementById('name').value = "";//empties input when submission is successful 
            document.getElementById('email').value = "";
            document.getElementById('message').value = "";
        }
    });
}
}//Send button - event listener function runs validateForm when clicked (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
if (document.getElementById('sendBtn')) {
    document.getElementById('sendBtn').addEventListener('click', validateForm);
}
// like/comment/share buttons
document.querySelectorAll('.post-button').forEach(button => {
    button.addEventListener('click', function() {
        const original = this.textContent;
        this.textContent = '✅ Successful!'; /*when user clciks they are shown this message */
        setTimeout(() => {
            this.textContent = original;
        }, 1500);
    });
});