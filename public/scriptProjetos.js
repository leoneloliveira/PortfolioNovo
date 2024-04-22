// Obtém o elemento onde os repositórios serão adicionados
const repositoriesContainer = document.getElementById('repositories');

// Fetch para obter os repositórios do GitHub
fetch('/api/github-repos')
  .then(response => response.json())
  .then(repos => {
    // Para cada repositório, cria um card e adiciona ao container de repositórios
    repos.forEach(repo => {
      // Cria um card para o repositório
      const repoCard = document.createElement('div');
      repoCard.classList.add('card');
      
      // Define o link para o repositório
      repoCard.addEventListener('click', () => {
        window.open(repo.html_url, '_blank');
      });

      // Cria um conteúdo para o card
      const repoCardContent = document.createElement('div');
      repoCardContent.classList.add('box');

      // Cria um título para o repositório
      const repoTitle = document.createElement('h3');
      repoTitle.textContent = repo.name;

      // Cria uma descrição para o repositório
      const repoDescription = document.createElement('p');
      repoDescription.textContent = repo.description || 'Sem descrição disponível';
      
      // Adiciona os elementos ao conteúdo do card do repositório
      repoCardContent.appendChild(repoTitle);
      repoCardContent.appendChild(repoDescription);

      // Adiciona o conteúdo ao card do repositório
      repoCard.appendChild(repoCardContent);

      // Adiciona o card do repositório ao container de repositórios
      repositoriesContainer.appendChild(repoCard);
    });
  })
  .catch(error => {
    console.error('Erro ao obter os repositórios do GitHub:', error);
  });
