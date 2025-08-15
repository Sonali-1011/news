const newsContainer = document.getElementById("news-container");
const tickerText = document.getElementById("ticker-text");
const refreshBtn = document.getElementById("refresh-btn");
const categoryBtns = document.querySelectorAll(".category-bar button");

let currentCategory = "general";

async function fetchNews(category = "general") {
  newsContainer.innerHTML = "<p>Loading latest news...</p>";

  try {
    const res = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`);
    const data = await res.json();
    displayNews(data.articles);
    updateTicker(data.articles);
  } catch {
    newsContainer.innerHTML = "<p>❌ Failed to load news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = articles.map(article => `
    <div class="news-card">
      <img src="${article.urlToImage || 'https://via.placeholder.com/200x140'}" alt="">
      <div class="news-content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    </div>
  `).join("");
}

function updateTicker(articles) {
  tickerText.textContent = articles.map(a => a.title).join("  •  ");
}

refreshBtn.addEventListener("click", () => fetchNews(currentCategory));
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    fetchNews(currentCategory);
  });
});

fetchNews();
