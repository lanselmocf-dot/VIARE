

function showToast(title, description, type) {
  var container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;

  var icon = type === 'success' ? '✅' : '❌';

  toast.innerHTML =
    '<span class="toast-icon">' + icon + '</span>' +
    '<div class="toast-content">' +
      '<div class="toast-title">' + title + '</div>' +
      '<div class="toast-description">' + description + '</div>' +
    '</div>';

  container.appendChild(toast);

  setTimeout(function() {
    toast.classList.add('hiding');
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function formatCurrency(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function formatNumber(value) {
  return value.toLocaleString('pt-BR');
}

function initProfileDropdown() {
  var profileBtn = document.getElementById('profile-btn');
  var dropdown = document.getElementById('profile-dropdown');

  if (!profileBtn || !dropdown) return;

  profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target) && e.target !== profileBtn) {
      dropdown.classList.remove('open');
    }
  });
}

function initLogin() {
  var form = document.getElementById('login-form');
  if (!form) return;

  var emailInput = document.getElementById('login-email');
  var senhaInput = document.getElementById('login-senha');
  var emailError = document.getElementById('login-email-error');
  var senhaError = document.getElementById('login-senha-error');

  emailInput.addEventListener('input', function() {
    emailError.classList.remove('show');
    emailInput.classList.remove('error');
  });

  senhaInput.addEventListener('input', function() {
    senhaError.classList.remove('show');
    senhaInput.classList.remove('error');
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var emailVazio = emailInput.value.trim() === '';
    var senhaVazia = senhaInput.value.trim() === '';
    var temErro = false;

    if (emailVazio) {
      emailError.classList.add('show');
      emailInput.classList.add('error');
      temErro = true;
    }

    if (senhaVazia) {
      senhaError.classList.add('show');
      senhaInput.classList.add('error');
      temErro = true;
    }

    if (temErro) {
      showToast('Preencha todos os campos', 'E-mail e senha são obrigatórios.', 'error');
      return;
    }

    showToast('Bem-vindo(a) de volta! 👋', 'Login realizado com sucesso.', 'success');

    setTimeout(function() {
      window.location.href = 'hospedagens.html';
    }, 800);
  });
}

function initRegistro() {
  var form = document.getElementById('registro-form');
  if (!form) return;

  var senhaInput = document.getElementById('registro-senha');
  var confirmarInput = document.getElementById('registro-confirmar');
  var senhaError = document.getElementById('registro-senha-error');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var inputs = form.querySelectorAll('input[required]');
    var temCampoVazio = false;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
        temCampoVazio = true;
        break;
      }
    }

    if (temCampoVazio) {
      showToast('Campos obrigatórios', 'Preencha todos os campos.', 'error');
      return;
    }

    if (senhaInput.value !== confirmarInput.value) {
      senhaError.classList.add('show');
      showToast('Senhas diferentes', 'A confirmação de senha deve ser igual à senha.', 'error');
      return;
    }

    senhaError.classList.remove('show');
    showToast('Conta criada! 🎉', 'Cadastro realizado com sucesso.', 'success');

    setTimeout(function() {
      window.location.href = 'hospedagens.html';
    }, 800);
  });

  if (confirmarInput) {
    confirmarInput.addEventListener('input', function() {
      senhaError.classList.remove('show');
    });
  }
}

var hoteis = [
  { id: 1, name: 'Resort Mar de Prata', location: 'Porto de Galinhas, PE', stars: 5, price: 950, nota: 9.2, reviews: 1847 },
  { id: 2, name: 'Hotel Pousada das Montanhas', location: 'Gramado, RS', stars: 4, price: 420, nota: 8.5, reviews: 932 },
  { id: 3, name: 'Hostel Vista Bela', location: 'Florianópolis, SC', stars: 3, price: 150, nota: 7.8, reviews: 456 },
  { id: 4, name: 'Eco Lodge Floresta', location: 'Manaus, AM', stars: 4, price: 580, nota: 8.9, reviews: 1203 },
  { id: 5, name: 'Boutique Hotel Centro', location: 'São Paulo, SP', stars: 5, price: 780, nota: 9.0, reviews: 2104 },
  { id: 6, name: 'Pousada Brisa do Mar', location: 'Búzios, RJ', stars: 3, price: 290, nota: 8.1, reviews: 678 },
  { id: 7, name: 'Grand Hotel Express', location: 'Rio de Janeiro, RJ', stars: 4, price: 490, nota: 8.4, reviews: 1567 },
  { id: 8, name: 'Refúgio da Serra', location: 'Campos do Jordão, SP', stars: 5, price: 1100, nota: 9.5, reviews: 3210 },
];

function initHospedagens() {
  var grid = document.getElementById('hotels-grid');
  if (!grid) return;

  var adultos = 2;
  var criancas = 0;
  var filtroAtual = 'todos';
  var termoBusca = '';

  function renderHoteis() {
    var filtrados = hoteis.filter(function(h) {
      
      if (termoBusca !== '') {
        var textoHotel = (h.name + ' ' + h.location).toLowerCase();
        if (textoHotel.indexOf(termoBusca.toLowerCase()) === -1) {
          return false;
        }
      }

      if (filtroAtual === 'todos') return true;
      if (filtroAtual === 'ate300') return h.price <= 300;
      if (filtroAtual === '300a600') return h.price > 300 && h.price <= 600;
      if (filtroAtual === '600mais') return h.price > 600;
      return true;
    });

    if (filtrados.length === 0) {
      grid.innerHTML = '<div class="empty-state">Nenhum hotel encontrado nessa faixa de preço.</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < filtrados.length; i++) {
      var h = filtrados[i];
      var starsHtml = '';
      for (var s = 0; s < h.stars; s++) {
        starsHtml += '★';
      }

      html +=
        '<div class="hotel-card animate-card" style="animation-delay: ' + (i * 0.05) + 's">' +
          '<div class="card-image">📷 Foto do Hotel</div>' +
          '<div class="card-body">' +
            '<div class="card-top-row">' +
              '<div class="stars">' + starsHtml + '</div>' +
              '<span class="rating-badge">' + h.nota.toFixed(1) + '</span>' +
            '</div>' +
            '<h3 class="card-title">' + h.name + '</h3>' +
            '<p class="card-reviews" style="margin-bottom: 0.25rem;">📍 ' + h.location + '</p>' +
            '<p class="card-reviews">' + formatNumber(h.reviews) + ' avaliações</p>' +
            '<div class="card-price-section">' +
              '<span class="card-price-label">Diária a partir de</span>' +
              '<div class="card-price">R$ ' + h.price + '</div>' +
            '</div>' +
            '<button class="btn btn-card" onclick="reservarHotel(' + h.id + ')">Reservar Quarto</button>' +
          '</div>' +
        '</div>';
    }

    grid.innerHTML = html;
  }

  var searchBtn = document.querySelector('.search-btn');
  var searchDestino = document.getElementById('search-destino');
  
  if (searchBtn && searchDestino) {
    searchBtn.addEventListener('click', function() {
      termoBusca = searchDestino.value.trim();
      renderHoteis();
    });
    searchDestino.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        termoBusca = searchDestino.value.trim();
        renderHoteis();
      }
    });
  }

  renderHoteis();

  var filterBtns = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function() {
      
      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }
      this.classList.add('active');
      filtroAtual = this.getAttribute('data-filter');
      renderHoteis();
    });
  }

  var guestsTrigger = document.getElementById('guests-trigger');
  var guestsDropdown = document.getElementById('guests-dropdown');
  var chevron = document.getElementById('guests-chevron');

  if (guestsTrigger && guestsDropdown) {
    guestsTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      guestsDropdown.classList.toggle('open');
      if (chevron) chevron.classList.toggle('rotated');
    });

    document.addEventListener('click', function(e) {
      if (!guestsDropdown.contains(e.target) && e.target !== guestsTrigger) {
        guestsDropdown.classList.remove('open');
        if (chevron) chevron.classList.remove('rotated');
      }
    });
  }

  var adultosValue = document.getElementById('adultos-value');
  var criancasValue = document.getElementById('criancas-value');
  var guestsText = document.getElementById('guests-text');

  function updateGuestsText() {
    var texto = adultos + ' adulto' + (adultos !== 1 ? 's' : '');
    if (criancas > 0) {
      texto += ', ' + criancas + ' criança' + (criancas !== 1 ? 's' : '');
    }
    if (guestsText) guestsText.textContent = texto;
  }

  var btnAdultoMinus = document.getElementById('adulto-minus');
  if (btnAdultoMinus) {
    btnAdultoMinus.addEventListener('click', function() {
      if (adultos > 1) {
        adultos--;
        adultosValue.textContent = adultos;
        this.disabled = adultos <= 1;
        updateGuestsText();
      }
    });
  }

  var btnAdultoPlus = document.getElementById('adulto-plus');
  if (btnAdultoPlus) {
    btnAdultoPlus.addEventListener('click', function() {
      if (adultos < 10) {
        adultos++;
        adultosValue.textContent = adultos;
        if (btnAdultoMinus) btnAdultoMinus.disabled = false;
        this.disabled = adultos >= 10;
        updateGuestsText();
      }
    });
  }

  var btnCriancaMinus = document.getElementById('crianca-minus');
  if (btnCriancaMinus) {
    btnCriancaMinus.addEventListener('click', function() {
      if (criancas > 0) {
        criancas--;
        criancasValue.textContent = criancas;
        this.disabled = criancas <= 0;
        updateGuestsText();
      }
    });
  }

  var btnCriancaPlus = document.getElementById('crianca-plus');
  if (btnCriancaPlus) {
    btnCriancaPlus.addEventListener('click', function() {
      if (criancas < 6) {
        criancas++;
        criancasValue.textContent = criancas;
        if (btnCriancaMinus) btnCriancaMinus.disabled = false;
        this.disabled = criancas >= 6;
        updateGuestsText();
      }
    });
  }

  var guestsApply = document.getElementById('guests-apply');
  if (guestsApply) {
    guestsApply.addEventListener('click', function() {
      guestsDropdown.classList.remove('open');
      if (chevron) chevron.classList.remove('rotated');
    });
  }
}

function reservarHotel(id) {
  var hotel = null;
  for (var i = 0; i < hoteis.length; i++) {
    if (hoteis[i].id === id) {
      hotel = hoteis[i];
      break;
    }
  }
  if (!hotel) return;

  var checkinInput = document.getElementById('search-checkin');
  var checkoutInput = document.getElementById('search-checkout');
  
  localStorage.setItem('viare_item', hotel.name);
  localStorage.setItem('viare_location', hotel.location);
  localStorage.setItem('viare_price', hotel.price);
  localStorage.setItem('viare_type', 'Diária');
  
  if (checkinInput && checkoutInput) {
    localStorage.setItem('viare_checkin', checkinInput.value);
    localStorage.setItem('viare_checkout', checkoutInput.value);
  }
  
  window.location.href = 'pagamento.html';
}

var pacotes = [
  { id: 1, title: 'Pacote 7 dias no Nordeste', price: 3490, location: 'Porto de Galinhas, PE' },
  { id: 2, title: 'Fim de semana na Serra Gaúcha', price: 1250, location: 'Gramado, RS' },
  { id: 3, title: 'Expedição Amazônia 5 noites', price: 4200, location: 'Manaus, AM' },
  { id: 4, title: 'Rota Ecológica de Alagoas', price: 2890, location: 'São Miguel dos Milagres, AL' },
];

function initViagens() {
  var container = document.getElementById('packages-container');
  if (!container) return;

  var html = '';
  for (var i = 0; i < pacotes.length; i++) {
    var p = pacotes[i];
    html +=
      '<div class="package-card animate-card" style="animation-delay: ' + (i * 0.08) + 's">' +
        '<div class="package-image">📷 Foto do Destino</div>' +
        '<div class="package-body">' +
          '<div>' +
            '<p class="package-location">' + p.location + '</p>' +
            '<h3 class="package-title">' + p.title + '</h3>' +
            '<div class="package-tags">' +
              '<span class="package-tag"><span class="tag-icon">🏨</span> Hotel</span>' +
              '<span class="package-tag"><span class="tag-icon">🚗</span> Transfer</span>' +
              '<span class="package-tag"><span class="tag-icon">🗺️</span> Passeio</span>' +
            '</div>' +
          '</div>' +
          '<div class="package-footer">' +
            '<div>' +
              '<div class="package-price-label">Preço Total do Pacote</div>' +
              '<div class="package-price">R$ ' + p.price + '</div>' +
            '</div>' +
            '<button class="btn btn-primary btn-lg" onclick="comprarPacote(' + p.id + ')">Comprar Pacote</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

function comprarPacote(id) {
  var pacote = null;
  for (var i = 0; i < pacotes.length; i++) {
    if (pacotes[i].id === id) {
      pacote = pacotes[i];
      break;
    }
  }
  if (!pacote) return;

  localStorage.setItem('viare_item', pacote.title);
  localStorage.setItem('viare_price', pacote.price);
  localStorage.setItem('viare_type', 'Pacote');
  window.location.href = 'pagamento.html';
}

var ofertas = [
  { id: 1, name: 'Rio de Janeiro - Voo + Hotel (5 noites)', oldPrice: 2500, newPrice: 1750, discount: '30%' },
  { id: 2, name: 'Florianópolis - Feriado Prolongado', oldPrice: 2200, newPrice: 1100, discount: '50%' },
  { id: 3, name: 'Gramado - 4 noites com Passeio', oldPrice: 1900, newPrice: 1520, discount: '20%' },
  { id: 4, name: 'Porto Seguro - Resort All Inclusive', oldPrice: 4500, newPrice: 2700, discount: '40%' },
  { id: 5, name: 'Natal - 7 noites (Voo direto)', oldPrice: 3200, newPrice: 2080, discount: '35%' },
  { id: 6, name: 'Búzios - Fim de Semana a dois', oldPrice: 1800, newPrice: 1350, discount: '25%' },
];

function initOfertas() {
  var container = document.getElementById('offers-grid');
  if (!container) return;

  var html = '';
  for (var i = 0; i < ofertas.length; i++) {
    var o = ofertas[i];
    html +=
      '<div class="offer-card animate-card" style="animation-delay: ' + (i * 0.06) + 's">' +
        '<span class="discount-badge">-' + o.discount + '</span>' +
        '<div class="offer-image">📷 Foto do Destino</div>' +
        '<div class="offer-body">' +
          '<h3 class="offer-title">' + o.name + '</h3>' +
          '<div class="offer-old-price">De: R$ ' + o.oldPrice + '</div>' +
          '<div class="offer-new-price">R$ ' + o.newPrice + '</div>' +
          '<button class="btn btn-card btn-lg" onclick="aproveitarOferta(' + o.id + ')">Aproveitar Oferta</button>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

function aproveitarOferta(id) {
  var oferta = null;
  for (var i = 0; i < ofertas.length; i++) {
    if (ofertas[i].id === id) {
      oferta = ofertas[i];
      break;
    }
  }
  if (!oferta) return;

  localStorage.setItem('viare_item', oferta.name);
  localStorage.setItem('viare_price', oferta.newPrice);
  localStorage.setItem('viare_type', 'Oferta');
  window.location.href = 'pagamento.html';
}

function initPagamento() {
  var summarySection = document.getElementById('summary-section');
  var form = document.getElementById('payment-form');
  if (!summarySection || !form) return;

  function formatarData(dataStr) {
    if (!dataStr) return '';
    var partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return partes[2] + ' de ' + meses[parseInt(partes[1]) - 1] + '. de ' + partes[0];
  }

  var item = localStorage.getItem('viare_item') || 'Reserva Padrão';
  var locationItem = localStorage.getItem('viare_location') || 'Brasil';
  var price = parseFloat(localStorage.getItem('viare_price')) || 0;
  var type = localStorage.getItem('viare_type') || 'Diária';
  
  var checkinVal = localStorage.getItem('viare_checkin') || '2026-04-10';
  var checkoutVal = localStorage.getItem('viare_checkout') || '2026-04-15';

  var isPacote = (type === 'Pacote' || type === 'Oferta');

  var date1 = new Date(checkinVal + 'T00:00:00');
  var date2 = new Date(checkoutVal + 'T00:00:00');
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  var nights = diffDays > 0 ? diffDays : 1; 

  var taxa = 50;
  var subtotal = isPacote ? price : (price * nights);
  var total = isPacote ? price : (subtotal + taxa);

  var dataTexto = formatarData(checkinVal) + ' a ' + formatarData(checkoutVal);

  var summaryHtml = '';

  if (!isPacote) {
    summaryHtml =
      '<div class="summary-type-label">Hospedagem</div>' +
      '<div class="summary-item-name">' + item + '</div>' +
      '<div class="summary-dates">' + dataTexto + '</div>' +
      '<div class="summary-divider"></div>' +
      '<div class="summary-line"><span>' + nights + ' Diária' + (nights > 1 ? 's' : '') + ' x R$ ' + price.toFixed(2) + '</span><span>R$ ' + subtotal.toFixed(2) + '</span></div>' +
      '<div class="summary-line"><span>Taxas e Impostos</span><span>R$ ' + taxa.toFixed(2) + '</span></div>';
  } else {
    summaryHtml =
      '<div><span class="summary-badge">Pacote Fechado</span></div>' +
      '<div class="summary-item-name">' + item + '</div>' +
      '<div class="summary-inclusions">' +
        '<div class="summary-inclusions-title">Inclusões do Pacote:</div>' +
        '<ul>' +
          '<li>Acomodação Principal</li>' +
          '<li>Passagens Aéreas (Ida e Volta)</li>' +
          '<li>Transfer e Passeios Locais</li>' +
        '</ul>' +
      '</div>' +
      '<div class="summary-divider"></div>' +
      '<div class="summary-line"><span>Preço Fixo Único</span><span>R$ ' + price.toFixed(2) + '</span></div>';
  }

  summaryHtml +=
    '<div class="summary-total-line">' +
      '<span class="summary-total-label">Total a Pagar</span>' +
      '<span class="summary-total-value">R$ ' + total.toFixed(2) + '</span>' +
    '</div>';

  summarySection.innerHTML = summaryHtml;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var inputs = form.querySelectorAll('input[required]');
    var temCampoVazio = false;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
        temCampoVazio = true;
        break;
      }
    }

    if (temCampoVazio) {
      showToast('Campos obrigatórios', 'Preencha todos os campos para continuar.', 'error');
      return;
    }

    showToast('Compra Realizada! 🎉', 'Seu pagamento foi aprovado com sucesso.', 'success');

    salvarReserva(item, price, type, locationItem, checkinVal, checkoutVal, nights);

    localStorage.removeItem('viare_item');
    localStorage.removeItem('viare_location');
    localStorage.removeItem('viare_price');
    localStorage.removeItem('viare_type');
    localStorage.removeItem('viare_checkin');
    localStorage.removeItem('viare_checkout');

    setTimeout(function() {
      window.location.href = 'hospedagens.html';
    }, 2000);
  });
}

function salvarReserva(item, price, type, locationItem, checkinVal, checkoutVal, nights) {
  var reservas = JSON.parse(localStorage.getItem('viare_reservas') || '[]');

  function shortDate(dStr) {
    if(!dStr) return '';
    var p = dStr.split('-');
    if(p.length !== 3) return dStr;
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return p[2] + ' ' + meses[parseInt(p[1]) - 1] + ' ' + p[0];
  }
  
  var novaReserva = {
    id: Date.now(),
    nome: item,
    local: locationItem || 'Brasil',
    checkIn: shortDate(checkinVal),
    checkOut: shortDate(checkoutVal),
    noites: nights || 5,
    preco: type === 'Pacote' || type === 'Oferta' ? price : (price * (nights || 5)) + 50,
    status: 'confirmada'
  };

  reservas.push(novaReserva);
  localStorage.setItem('viare_reservas', JSON.stringify(reservas));
}

var reservasPadrao = [
  {
    id: 1,
    nome: 'Resort Mar de Prata',
    local: 'Porto de Galinhas, PE',
    checkIn: '10 Abr 2026',
    checkOut: '15 Abr 2026',
    noites: 5,
    preco: 4750,
    status: 'confirmada'
  },
  {
    id: 2,
    nome: 'Pacote 7 dias no Nordeste',
    local: 'Recife, PE',
    checkIn: '22 Mai 2026',
    checkOut: '29 Mai 2026',
    noites: 7,
    preco: 3490,
    status: 'pendente'
  },
  {
    id: 3,
    nome: 'Hotel Pousada das Montanhas',
    local: 'Gramado, RS',
    checkIn: '01 Fev 2026',
    checkOut: '04 Fev 2026',
    noites: 3,
    preco: 1260,
    status: 'concluida'
  }
];

function initReservas() {
  var container = document.getElementById('reservas-container');
  var countEl = document.getElementById('reservas-count');
  if (!container) return;

  var reservasSalvas = JSON.parse(localStorage.getItem('viare_reservas') || '[]');
  var todasReservas = reservasPadrao.concat(reservasSalvas);

  if (countEl) {
    countEl.textContent = todasReservas.length + ' reservas no total';
  }

  var html = '';
  for (var i = 0; i < todasReservas.length; i++) {
    var r = todasReservas[i];
    
    var statusClass = 'status-' + r.status;
    var statusLabel = '';
    if (r.status === 'confirmada') statusLabel = 'Confirmada';
    else if (r.status === 'pendente') statusLabel = 'Pendente';
    else statusLabel = 'Concluída';

    html +=
      '<div class="reserva-card animate-card" style="animation-delay: ' + (i * 0.08) + 's">' +
        '<div class="reserva-inner">' +
          '<div class="reserva-info">' +
            '<div class="reserva-status ' + statusClass + '">' +
              '<span class="status-dot"></span>' +
              statusLabel +
            '</div>' +
            '<h3 class="reserva-nome">' + r.nome + '</h3>' +
            '<div class="reserva-details">' +
              '<span class="reserva-detail"><span class="detail-icon">📍</span> ' + r.local + '</span>' +
              '<span class="reserva-detail"><span class="detail-icon">📅</span> ' + r.checkIn + ' → ' + r.checkOut + '</span>' +
              '<span class="reserva-detail" style="color: var(--gray-400);">(' + r.noites + ' noites)</span>' +
            '</div>' +
          '</div>' +
          '<div class="reserva-actions">' +
            '<div>' +
              '<div class="reserva-price-label">Total pago</div>' +
              '<div class="reserva-price">R$ ' + formatNumber(r.preco) + '</div>' +
            '</div>' +
            '<a href="hospedagens.html" class="reserva-link">Ver detalhes →</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  initProfileDropdown();
  initLogin();
  initRegistro();
  initHospedagens();
  initViagens();
  initOfertas();
  initPagamento();
  initReservas();
});
