function createServiceCard(service) {
  const article = document.createElement('article');
  article.className = 'service-card';

  const link = document.createElement('a');
  link.href = `${service.id}.html`;
  link.className = 'service-card-link';

  link.innerHTML = `
    <svg class="service-icon service-icon--${service.categoryClass}" viewBox="0 0 48 48" role="img" aria-label="${service.name} ikon">
      <circle cx="24" cy="24" r="22"></circle>
      <text x="24" y="29" text-anchor="middle">${service.iconLetter}</text>
    </svg>
    <h2>${service.name}</h2>
    <p class="category">${service.category}</p>
    <p>${service.shortDescription}</p>
  `;

  article.appendChild(link);
  return article;
}

async function loadServices() {
  const listElement = document.getElementById('service-list');
  const loadingMessage = document.getElementById('loading-message');

  try {
    const response = await fetch('data/services.json');
    if (!response.ok) {
      throw new Error(`HTTP-fel: ${response.status}`);
    }
    const services = await response.json();

    loadingMessage.remove();
    services.forEach((service) => {
      listElement.appendChild(createServiceCard(service));
    });
  } catch (error) {
    loadingMessage.textContent = 'Kunde inte ladda tjänsterna just nu. Försök ladda om sidan.';
    console.error('Fel vid hämtning av services.json:', error);
  }
}

loadServices();
