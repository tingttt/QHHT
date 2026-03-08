async function loadQA() {
  const qaList = document.getElementById("qaList");
  const searchInput = document.getElementById("searchInput");

  if (!qaList) return;

  try {
    const response = await fetch("./data/qa.json");
    const qaData = await response.json();

    function renderQA(items) {
      qaList.innerHTML = "";

      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "qa-card";

        card.innerHTML = `
          <h3>${item.question}</h3>
          <p>${item.answer}</p>
        `;

        qaList.appendChild(card);
      });
    }

    renderQA(qaData);

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.toLowerCase().trim();

        const filtered = qaData.filter((item) => {
          const questionText = item.question.toLowerCase();
          const answerText = item.answer.toLowerCase();
          const keywordsText = (item.keywords || []).join(" ").toLowerCase();

          return (
            questionText.includes(keyword) ||
            answerText.includes(keyword) ||
            keywordsText.includes(keyword)
          );
        });

        renderQA(filtered);
      });
    }
  } catch (error) {
    qaList.innerHTML = "<p>Sorry, Q&A content could not be loaded.</p>";
    console.error("Error loading qa.json:", error);
  }
}

async function loadResources() {
  const resourcesList = document.getElementById("resourcesList");

  if (!resourcesList) return;

  try {
    const response = await fetch("./data/resources.json");
    const resourcesData = await response.json();

    resourcesList.innerHTML = "";

    resourcesData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "resource-card";

      card.innerHTML = `
        <span class="tag">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        ${
          item.link && item.link !== "#"
            ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">Learn More →</a>`
            : ""
        }
      `;

      resourcesList.appendChild(card);
    });
  } catch (error) {
    resourcesList.innerHTML = "<p>Sorry, resource content could not be loaded.</p>";
    console.error("Error loading resources.json:", error);
  }
}
async function loadSiteInfo() {
  try {
    const response = await fetch("./data/site.json");
    const data = await response.json();

    const copyrightEls = document.querySelectorAll(".copyright");
    const contactEmails = document.querySelectorAll(".contactEmail");

    contactEmails.forEach(el => {
      el.textContent = data.email;

      if (el.tagName === "A") {
        el.href = "mailto:" + data.email;
      }
    });

    copyrightEls.forEach(el => {
      el.textContent = data.copyright;
    });

  } catch (error) {
    console.error("Error loading site.json:", error);
  }
}

loadSiteInfo();
loadQA();
loadResources();
