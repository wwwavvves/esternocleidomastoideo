const newsletterLabel = document.querySelector("#newsletter-label");
const emailField = document.querySelector("#email-field");
let toggle = false;


newsletterLabel.addEventListener("click", toggleField);
document.addEventListener("click", toggleField);

function toggleField(e) {
    emailField.style.display = "block";
    
    if (e.target != emailField) {
        emailField.style.display = "none";
        emailField.value = "";
    } 
}