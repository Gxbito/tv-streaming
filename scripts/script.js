import articles from "./data.js";

function createArticleCards(articles) {
  const container = document.getElementById("articles");
  articles.forEach((article) => {

    const cardHTML = `
            <div class="article">
                <img src="${article.image}" alt="" />
                <div class="text">
                    <h4>${article.title}</h4>
                    <a href="${article.link}">Read more</a>
                    <span></span>
                    <h6>Published on 25 May 2024</h6>
                </div>
            </div>
        `;
    container.innerHTML += cardHTML;
  });
}

createArticleCards(articles);

document.getElementById("tvForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    fields: [
      { name: "firstname", value: formData.get("firstName") },
      { name: "lastname", value: formData.get("lastName") },
      { name: "email", value: formData.get("email") },
      { name: "phone", value: formData.get("phone") },
      { name: "zip", value: formData.get("zip") },
      { name: "platformPreference", value: formData.get("platformPreference") }
    ],
  };

  // Validación básica de ejemplo
  if (!formData.get("firstName") || !formData.get("lastName") || !formData.get("email")) {
    alert("Please fill in all required fields.");
    return;
  }

  fetch("https://api.hsforms.com/submissions/v3/integration/submit/example_ID/example_ID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Form successfully submitted!");
      event.target.reset(); // Limpia el formulario después de enviarlo
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error submitting the form: " + error.message);
    });
});