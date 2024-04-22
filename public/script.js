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

    // script de animação de texto digitado
    var typed = new Typed(".typing", {
        strings: ["Desenvolvimento Web","Manutenção","Hardware"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: [ "Desenvolvedor Web"," Assistente Operações de Rede de Computadores","Assistente de Suporte" ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // script do carrossel de coruja
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});




/*modal resposta e validações*/
$(document).ready(function(){
    $('#enviar-mensagem').click(function(){
        // Obtém os dados do formulário
        var nome = $('#nome').val();
        var email = $('#email').val();
        var assunto = $('#assunto').val();
        var mensagem = $('#mensagem').val();
        
        // Validação dos campos
        var erro = false;

        if (!nome) {
            $('#nome-error').text('Por favor, preencha o campo Nome.');
            erro = true;
        } else {
            $('#nome-error').text('');
        }

        if (!email || !isValidEmail(email)) {
            $('#email-error').text('Por favor, insira um email válido.');
            erro = true;
        } else {
            $('#email-error').text('');
        }

        if (!assunto) {
            $('#assunto-error').text('Por favor, preencha o campo Assunto.');
            erro = true;
        } else {
            $('#assunto-error').text('');
        }

        if (!mensagem) {
            $('#mensagem-error').text('Por favor, preencha o campo Mensagem.');
            erro = true;
        } else {
            $('#mensagem-error').text('');
        }
        
        // Se houver erro, não envia o formulário
        if (erro) {
            return;
        }

        // Envia os dados do formulário via AJAX
        var formData = $('#formulario').serialize();
        $.ajax({
            type: 'POST',
            url: '/enviar-mensagem',
            data: formData,
            success: function(response){
                // Exibe o resultado no modal
                $('#resultado').html('<p class="success-message">' + response + '</p>');
                $('#myModal').css('display', 'block');
            },
            error: function(xhr, status, error){
                console.error(error); // Exibe qualquer erro no console
                $('#resultado').html('<p class="error-message">Erro ao enviar a mensagem. Por favor, tente novamente.</p>'); // Exibe uma mensagem de erro
                $('#myModal').css('display', 'block');
            }
        });
    });

    // Fecha o modal quando o usuário clica no botão de fechar
    $('.close').click(function(){
        $('#myModal').css('display', 'none');

        // Limpa o conteúdo dos campos do formulário
        $('#formulario')[0].reset();
        // Limpa as mensagens de erro
        $('.error-message').text('');
    });

    // Função para validar o email
    function isValidEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
});
