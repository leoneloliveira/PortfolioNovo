
$(document).ready(function(){
  $(window).scroll(function(){
      // script para navbar fixa ao rolar
      if(this.scrollY > 20){
          $('.navbar').addClass("sticky");
      }else{
          $('.navbar').removeClass("sticky");
      }
      
      // script para mostrar/ocultar botão de rolar para cima
      if(this.scrollY > 500){
          $('.scroll-up-btn').addClass("show");
      }else{
          $('.scroll-up-btn').removeClass("show");
      }
  });

  // script para rolar para cima
  $('.scroll-up-btn').click(function(){
      $('html').animate({scrollTop: 0});
      // removendo rolagem suave ao clicar no botão de rolar para cima
      $('html').css("scrollBehavior", "auto");
  });

  $('.navbar .menu li a').click(function(){
      // aplicando novamente rolagem suave ao clicar nos itens do menu
      $('html').css("scrollBehavior", "smooth");
  });

  // script para alternar menu/navbar
  $('.menu-btn').click(function(){
      $('.navbar .menu').toggleClass("active");
      $('.menu-btn i').toggleClass("active");
  });

});



fetch('/api/github-repos', {
  headers: {
    Authorization: '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'
  }
})
.then(response => response.json())
.then(repos => {
  // Verifica se repos é um array
  if (!Array.isArray(repos)) {
    throw new Error('Os repositórios não foram retornados como um array.');
  }

  // Obtém o elemento onde os repositórios serão adicionados
  const repositoriesContainer = document.getElementById('repositories');

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
  // Aqui você pode adicionar uma mensagem de erro à interface do usuário
});

