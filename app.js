/**
 * ============================================================================
 * ⚡ MOTOR INTERATIVO + ROTACIONADOR AUTOMÁTICO DIÁRIO — NEXUS IA
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.NEXUS_CONFIG;
  if (!config) return;

  initDirectory(config.ferramentasIA);
  initQuiz(config.ferramentasIA);
  initPromptGenerator(config.ferramentasIA);
  initROICalculator(config.ferramentasIA);
  initSetupShowcase(config.produtosSetup);
  initDailyRotatingDeals(config.tagAmazon || "nexus00e-20");
  initOwnProductBanner(config.produtoProprio);
  initSEOGuides(config.guiasSEO, config.ferramentasIA);
});

// Novo: Rotacionador Automático Diário de Ofertas em Alta (Muda sozinho todo dia!)
function initDailyRotatingDeals(tagAmazon) {
  const container = document.getElementById("daily-deals-bar");
  if (!container) return;

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Catálogo amplo de buscas campeãs de conversão na Amazon Brasil
  const bancoOfertas = [
    { nome: "🔥 Ofertas do Dia Amazon", termo: "ofertas+do+dia" },
    { nome: "⚡ Eletrônicos em Promoção", termo: "eletronicos+promocao" },
    { nome: "💻 Notebooks Custo-Benefício", termo: "notebook+oferta" },
    { nome: "🎧 Fones Bluetooth Mais Vendidos", termo: "fone+bluetooth" },
    { nome: "⌚ Smartwatches em Oferta", termo: "smartwatch" },
    { nome: "🏠 Casa Inteligente & Alexa", termo: "casa+inteligente+alexa" },
    { nome: "🖥️ Monitores Home Office & Gamer", termo: "monitor+full+hd+ips" },
    { nome: "🪑 Cadeiras Ergonômicas", termo: "cadeira+ergonomica" },
    { nome: "📱 Smartphones em Oferta", termo: "smartphone+oferta" },
    { nome: "☕ Cafeteiras & Casa", termo: "cafeteira+expresso" },
    { nome: "🤖 Aspiradores Robô", termo: "aspirador+robo" },
    { nome: "📚 Livros Mais Vendidos", termo: "livros+mais+vendidos" }
  ];

  // Seleciona e rotaciona automaticamente com base no dia do ano
  const diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / 86400000);
  const selecionadas = [];
  for (let i = 0; i < 6; i++) {
    selecionadas.push(bancoOfertas[(diaDoAno + i) % bancoOfertas.length]);
  }

  container.innerHTML = `
    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 14px; padding: 16px 20px; margin-bottom: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <span style="font-size:0.85rem; font-weight:700; color:#34d399;">
          🔄 ATUALIZADO AUTOMATICAMENTE HOJE (${dataFormatada}) • ATALHOS RÁPIDOS DE OFERTAS:
        </span>
        <span style="font-size:0.78rem; color:var(--text-muted);">#Publicidade • Amazon.com.br</span>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${selecionadas
          .map(
            (item) => `
          <a href="https://www.amazon.com.br/s?k=${item.termo}&tag=${tagAmazon}" target="_blank" rel="noopener noreferrer" class="pill-btn" style="text-decoration:none; color:#f8fafc; background:rgba(255,255,255,0.07);">
            ${item.nome} ↗
          </a>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  const seoBadge = document.getElementById("daily-seo-badge");
  const seoSummary = document.getElementById("daily-seo-summary");
  const temasDiariosSEO = [
    "Destaque de Hoje: Ergonomia de Punho (Mouse Vertical 57°) e Prevenção de Fadiga Visual",
    "Destaque de Hoje: Foco Profundo em Home Office com Cancelamento Ativo de Ruído (ANC)",
    "Destaque de Hoje: Iluminação Assimétrica de Monitor (Light Bar) para Trabalho Noturno",
    "Destaque de Hoje: Leitura Técnica Sem Luz Azul (Kindle 11ª Geração) e Método Pomodoro",
    "Destaque de Hoje: Postura Cervical no Notebook (Suporte em Alumínio + Teclado Sem Fio)"
  ];
  if (seoBadge) {
    seoBadge.textContent = `RADAR DE BUSCAS ATUALIZADO HOJE (${dataFormatada})`;
  }
  if (seoSummary) {
    seoSummary.textContent = `${temasDiariosSEO[diaDoAno % temasDiariosSEO.length]} — Links e análises revisados pela curadoria.`;
  }
}

// 1. Diretório de Ferramentas de IA com Filtro e Busca
function initDirectory(ferramentas) {
  const grid = document.getElementById("tools-grid");
  const pillsContainer = document.getElementById("category-pills");
  const searchInput = document.getElementById("tool-search");

  let activeCategory = "Todas";
  let searchQuery = "";

  const categorias = ["Todas", ...new Set(ferramentas.map((f) => f.categoria))];

  pillsContainer.innerHTML = categorias
    .map(
      (cat) => `
      <button class="pill-btn ${cat === "Todas" ? "active" : ""}" data-cat="${cat}">
        ${cat}
      </button>
    `
    )
    .join("");

  pillsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill-btn");
    if (!btn) return;
    document.querySelectorAll("#category-pills .pill-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderCards();
  });

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCards();
  });

  function renderCards() {
    const filtradas = ferramentas.filter((f) => {
      const matchCat = activeCategory === "Todas" || f.categoria === activeCategory;
      const matchSearch =
        f.nome.toLowerCase().includes(searchQuery) ||
        f.descricao.toLowerCase().includes(searchQuery) ||
        f.categoria.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtradas.length === 0) {
      grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align:center; padding: 30px;">Nenhuma ferramenta encontrada para essa busca.</p>`;
      return;
    }

    grid.innerHTML = filtradas
      .map(
        (f) => `
      <article class="tool-card">
        <div>
          <div class="card-top">
            <div class="tool-icon">${f.icone}</div>
            <span class="badge-featured">${f.destaque}</span>
          </div>
          <h3>${f.nome}</h3>
          <div class="tool-meta">
            <span>📁 ${f.categoria}</span>
            <span>•</span>
            <span>⭐ ${f.nota}/5.0</span>
            <span>•</span>
            <span>🏷️ ${f.preco}</span>
          </div>
          <p class="tool-desc">${f.descricao}</p>
          <div class="tool-benefit">✨ ${f.beneficioChave}</div>
        </div>
        <a href="${f.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-affiliate">
          ${f.textoBotao} <span>→</span>
        </a>
      </article>
    `
      )
      .join("");
  }

  renderCards();
}

// 2. Quiz Interativo "Descubra sua IA Ideal em 1 Clique"
function initQuiz(ferramentas) {
  const options = document.querySelectorAll(".quiz-option-btn");
  const resultBox = document.getElementById("quiz-result");

  const mapaRecomendacao = {
    videos: {
      ids: ["invideo", "elevenlabs", "opusclip"],
      titulo: "🎬 Kit Criador de Vídeos Educativos (Sem Aparecer)",
      explicacao:
        "Para criar vídeos no TikTok, Reels e YouTube sem mostrar o rosto, esta é a combinação mais utilizada:"
    },
    estudo: {
      ids: ["gamma", "notion-ai"],
      titulo: "📊 Kit Produtividade & Estudos Rápidos",
      explicacao:
        "Para criar apresentações prontas em 1 minuto, resumir PDFs e organizar toda a sua rotina:"
    },
    automacao: {
      ids: ["make", "manychat", "writesonic"],
      titulo: "🤖 Kit Automação & Fluxos Digitais",
      explicacao:
        "Para responder comentários com APIs oficiais, automatizar rotinas e redigir artigos:"
    },
    design: {
      ids: ["leonardo", "heygen"],
      titulo: "🎨 Kit Estúdio Visual & Avatares",
      explicacao:
        "Para gerar ilustrações de alta resolução e apresentadores virtuais:"
    }
  };

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      options.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const goal = btn.dataset.goal;
      const rec = mapaRecomendacao[goal];
      if (!rec) return;

      const recomendadas = ferramentas.filter((f) => rec.ids.includes(f.id));

      resultBox.innerHTML = `
        <h3 style="margin-bottom: 6px; font-size: 1.2rem;">${rec.titulo}</h3>
        <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 16px;">${rec.explicacao}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px;">
          ${recomendadas
            .map(
              (f) => `
            <div style="background: rgba(7,9,19,0.75); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">${f.icone} ${f.nome}</div>
                <p style="font-size: 0.84rem; color: #cbd5e1; margin-bottom: 12px;">${f.beneficioChave}</p>
              </div>
              <a href="${f.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-affiliate" style="padding: 9px 14px; font-size: 0.86rem;">
                ${f.textoBotao} →
              </a>
            </div>
          `
            )
            .join("")}
        </div>
      `;
      resultBox.classList.add("visible");
    });
  });
}

// 3. Micro-Ferramenta Gratuita: Gerador de Super Prompts + Recomendação Afiliada
function initPromptGenerator(ferramentas) {
  const goalSelect = document.getElementById("prompt-goal");
  const topicInput = document.getElementById("prompt-topic");
  const toneSelect = document.getElementById("prompt-tone");
  const generateBtn = document.getElementById("btn-generate-prompt");
  const outputArea = document.getElementById("prompt-output");
  const copyBtn = document.getElementById("btn-copy-prompt");
  const recBanner = document.getElementById("prompt-ai-rec");

  const templates = {
    roteiro_viral: {
      toolId: "invideo",
      build: (tema, tom) =>
        `Atue como um roteirista especialista em retenção para TikTok, Reels e YouTube Shorts.\n\nCrie um roteiro dinâmico de 45 segundos sobre o tema: "${tema}".\nTom da narrativa: ${tom}.\n\nSiga exatamente esta estrutura:\n1. GANCHO (0 a 3s): Uma pergunta instigante ou curiosidade que prenda a atenção.\n2. DESENVOLVIMENTO (3 a 35s): Entregue 3 pontos práticos, diretos e visuais, usando frases curtas.\n3. QUEBRA DE PADRÃO (aos 20s): Uma frase que renove a atenção do espectador.\n4. CHAMADA PARA AÇÃO (últimos 5s): Convide o espectador a acessar o link do perfil.\n\nInclua também sugestões de imagens/cenas [entre colchetes] para cada frase.`
    },
    apresentacao_slides: {
      toolId: "gamma",
      build: (tema, tom) =>
        `Atue como um consultor executivo e designer de apresentações.\n\nCrie a estrutura completa de uma apresentação de 8 slides sobre: "${tema}".\nTom de comunicação: ${tom}.\n\nPara cada slide, forneça:\n- Título objetivo (máximo 7 palavras)\n- 3 tópicos principais (bullet points) com argumentos claros\n- Sugestão visual de gráfico ou imagem para acompanhar o slide\n- Uma frase de transição para o próximo slide.`
    },
    artigo_seo: {
      toolId: "writesonic",
      build: (tema, tom) =>
        `Atue como um especialista em Redação e SEO para Google.\n\nEscreva um guia completo, escaneável e informativo sobre: "${tema}".\nTom de voz: ${tom}.\n\nRequisitos:\n1. Crie 3 opções de títulos claros e atrativos.\n2. Use subtítulos H2 e H3 organizados.\n3. Inclua uma tabela resumida.\n4. Responda às 4 principais dúvidas frequentes (FAQ) sobre o tema no final.`
    },
    automacao_produtividade: {
      toolId: "notion-ai",
      build: (tema, tom) =>
        `Atue como um especialista em gestão do tempo e produtividade.\n\nCrie um plano de ação passo a passo e um sistema de organização semanal para: "${tema}".\nEstilo: ${tom}.\n\nEstruture a resposta com:\n1. As 20% de ações mais importantes que geram 80% do resultado (Princípio de Pareto).\n2. Checklist diário de execução em menos de 30 minutos.\n3. Quais partes desse processo podem ser automatizadas com ferramentas digitais.\n4. Uma tabela pronta para copiar e colar no Notion.`
    },
    imagem_cinematografica: {
      toolId: "leonardo",
      build: (tema, tom) =>
        `Act as a professional prompt engineer for Leonardo.ai and Midjourney.\n\nCreate 3 detailed image generation prompts in English based on the concept: "${tema}".\nVisual Mood/Style: ${tom}.\n\nInclude in each prompt:\n- Subject details and composition\n- Lighting (e.g., volumetric lighting, studio soft light, golden hour)\n- Camera & Lens specs (e.g., 85mm f/1.4, 8k resolution, photorealistic)\n- Aspect ratio suggestion (--ar 9:16 or --ar 16:9).`
    }
  };

  function updatePrompt() {
    const goal = goalSelect.value;
    const tema = topicInput.value.trim() || "Como organizar a rotina semanal usando Inteligência Artificial";
    const tom = toneSelect.value;

    const item = templates[goal];
    if (!item) return;

    outputArea.value = item.build(tema, tom);

    const tool = ferramentas.find((f) => f.id === item.toolId) || ferramentas[0];
    if (tool) {
      recBanner.innerHTML = `
        <div style="font-size: 0.88rem;">
          💡 <strong>Dica Pro:</strong> Para executar esse comando com rapidez, recomendamos usar o <strong>${tool.icone} ${tool.nome}</strong> (${tool.beneficioChave}).
        </div>
        <a href="${tool.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 8px 16px; font-size: 0.84rem;">
          Abrir ${tool.nome} Grátis →
        </a>
      `;
    }
  }

  generateBtn.addEventListener("click", updatePrompt);
  goalSelect.addEventListener("change", updatePrompt);
  toneSelect.addEventListener("change", updatePrompt);

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputArea.value);
    showToast("✅ Super Prompt copiado!");
  });

  updatePrompt();
}

// 4. Calculadora de Economia de Tempo com IA
function initROICalculator(ferramentas) {
  const hoursInput = document.getElementById("calc-hours");
  const rateInput = document.getElementById("calc-rate");
  const hoursDisplay = document.getElementById("hours-val");
  const rateDisplay = document.getElementById("rate-val");
  const savedHoursEl = document.getElementById("saved-hours");
  const savedMoneyEl = document.getElementById("saved-money");
  const ctaLink = document.getElementById("calc-cta-link");

  const makeTool = ferramentas.find((f) => f.id === "make") || ferramentas[0];
  if (makeTool && ctaLink) {
    ctaLink.href = makeTool.linkAfiliado;
  }

  function calculate() {
    const hoursPerDay = parseFloat(hoursInput.value) || 2;
    const hourlyRate = parseFloat(rateInput.value) || 35;

    hoursDisplay.textContent = `${hoursPerDay}h / dia`;
    rateDisplay.textContent = `R$ ${hourlyRate} / hora`;

    const monthlySavedHours = Math.round(hoursPerDay * 22 * 0.7);
    const yearlySavedMoney = Math.round(monthlySavedHours * hourlyRate * 12);

    savedHoursEl.textContent = `${monthlySavedHours} horas livres/mês`;
    savedMoneyEl.textContent = `R$ ${yearlySavedMoney.toLocaleString("pt-BR")} / ano`;
  }

  hoursInput.addEventListener("input", calculate);
  rateInput.addEventListener("input", calculate);
  calculate();
}

// 5. Vitrine Setup & Produtividade (Com Fotos Reais + Botões Amazon e Mercado Livre)
function initSetupShowcase(produtos) {
  const setupGrid = document.getElementById("setup-grid");
  if (!setupGrid || !produtos) return;

  setupGrid.innerHTML = produtos
    .map(
      (p) => `
    <article class="tool-card">
      <div>
        ${
          p.imagem
            ? `<div style="width:100%; height:185px; border-radius:12px; overflow:hidden; margin-bottom:14px; position:relative; border:1px solid rgba(255,255,255,0.08);">
                <img src="${p.imagem}" alt="${p.nome}" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block;" />
                <span class="badge-featured" style="position:absolute; top:10px; right:10px; background:rgba(7,9,19,0.85); backdrop-filter:blur(6px);">${p.tag}</span>
              </div>`
            : `<div class="card-top">
                <div class="tool-icon">${p.icone}</div>
                <span class="badge-featured">${p.tag}</span>
              </div>`
        }
        <h3>${p.icone} ${p.nome}</h3>
        <div class="tool-meta">
          <span>📦 ${p.categoria}</span>
          <span>•</span>
          <span>🏷️ ${p.faixaPreco}</span>
        </div>
        <p class="tool-desc">${p.descricao}</p>
      </div>
      ${
        p.linkMercadoLivre
          ? `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
              <a href="${p.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-affiliate" style="padding: 11px 10px; font-size: 0.85rem;">
                🛒 Ver na Amazon
              </a>
              <a href="${p.linkMercadoLivre}" target="_blank" rel="noopener noreferrer" class="btn-affiliate" style="padding: 11px 10px; font-size: 0.85rem; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); color: #0f172a;">
                💛 Mercado Livre
              </a>
            </div>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Olha esse ${p.nome} para Home Office:\n💛 Mercado Livre: ${p.linkMercadoLivre}\n🛒 Amazon: ${p.linkAfiliado}`
            )}" target="_blank" rel="noopener noreferrer" style="display:block; text-align:center; margin-top:8px; font-size:0.78rem; color:#34d399; text-decoration:none; padding:6px; border-radius:8px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25);">
              📲 Enviar esta oferta no WhatsApp
            </a>`
          : `<div style="margin-top: 8px;">
              <a href="${p.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-affiliate">
                🛒 Ver Oferta na Amazon
              </a>
            </div>`
      }
    </article>
  `
    )
    .join("");
}

// 6. Banner do Produto Próprio (E-book Low Ticket)
function initOwnProductBanner(produto) {
  const container = document.getElementById("own-product-banner");
  if (!container || !produto) return;

  container.innerHTML = `
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.24), rgba(6, 182, 212, 0.2)); border: 1px solid var(--border-glow); border-radius: var(--radius-lg); padding: 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; box-shadow: var(--shadow-glow);">
      <div style="max-width: 680px;">
        <span class="badge-featured" style="display:inline-block; margin-bottom:10px;">📘 GUIA OFICIAL NEXUS IA • ACESSO IMEDIATO</span>
        <h2 style="font-size: 1.7rem; margin-bottom: 8px;">${produto.titulo}</h2>
        <p style="color: #cbd5e1; margin-bottom: 14px;">${produto.subtitulo}</p>
        <div style="display:flex; align-items:center; gap: 12px; font-size: 0.95rem;">
          <span style="text-decoration: line-through; color: var(--text-muted);">De ${produto.precoDe}</span>
          <strong style="color: #34d399; font-size: 1.25rem;">Por ${produto.precoPor} (Acesso Gratuito Liberado Hoje)</strong>
        </div>
      </div>
      <div>
        <a href="${produto.linkCheckout}" target="_blank" class="btn-primary" style="padding: 16px 28px; font-size: 1.05rem;">
          ${produto.textoBotao}
        </a>
      </div>
    </div>
  `;
}

// 7. Guias Rápidos de SEO
function initSEOGuides(guias, ferramentas) {
  const container = document.getElementById("seo-guides-grid");
  if (!container || !guias) return;

  container.innerHTML = guias
    .map((g) => {
      const tool = ferramentas.find((f) => f.id === g.ferramentaDestaqueId) || ferramentas[0];
      return `
      <article class="tool-card">
        <div>
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span class="badge-featured">📖 Guia Prático</span>
            <span style="font-size:0.8rem; color:var(--text-muted);">⏱️ Leitura: ${g.tempoLeitura}</span>
          </div>
          <h3 style="margin-bottom:10px;">${g.titulo}</h3>
          <p class="tool-desc">${g.resumo}</p>
        </div>
        <a href="${tool.linkAfiliado}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-align:center; font-size:0.9rem; padding:10px;">
          Testar ${tool.nome} Recomendado →
        </a>
      </article>
    `;
    })
    .join("");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}
