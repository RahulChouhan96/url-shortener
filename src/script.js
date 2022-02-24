const signupElem = document.getElementById("signup");

const emailElem = document.getElementById("email");
const passwordElem = document.getElementById("password");

signupElem.addEventListener("click", (event) => {
    console.log(emailElem.value, passwordElem.value)

    fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            email: emailElem.value,
            password: passwordElem.value
        })
    });
});