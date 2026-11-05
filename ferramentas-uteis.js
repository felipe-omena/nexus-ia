// ============================================================================
// MOTOR INTERATIVO DE FERRAMENTAS ÚTEIS GRATUITAS (CSP-Compliant & Anti-XSS)
// ============================================================================

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", () => {
  const hojeStr = new Date().toLocaleDateString("pt-BR");
  const recData = document.getElementById("rec-data");
  if (recData) recData.value = hojeStr;

  // 1. Navegação entre Abas
  const tabBtns = document.querySelectorAll(".tool-tab-btn");
  const panels = document.querySelectorAll(".tool-panel");
  const printableWrapper = document.getElementById("printable-wrapper");
  const printableArea = document.getElementById("printable-area");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
      if (printableWrapper) printableWrapper.style.display = "none";
    });
  });

  // 2. Rotação Automática do Banner de Ofertas Patrocinadas (7 Produtos Meli.la + Amazon)
  const ofertas = [
    {
      texto: "Sente dor no pulso no computador? Veja o Mouse Vertical Ergonômico 57° Sem Fio em oferta!",
      ml: "https://meli.la/2FfFjJo",
      amz: "https://www.amazon.com.br/s?k=mouse+vertical+ergonomico+sem+fio&tag=nexus00e-20"
    },
    {
      texto: "Trabalha ou estuda no notebook? Confira o Suporte Articulado em Alumínio Dobrável!",
      ml: "https://meli.la/247JmCK",
      amz: "https://www.amazon.com.br/s?k=suporte+notebook+aluminio+ergonomico&tag=nexus00e-20"
    },
    {
      texto: "Precisa de silêncio para estudar ou trabalhar? Veja o Headphone Bluetooth ANC (69h bateria)!",
      ml: "https://meli.la/27VaWsg",
      amz: "https://www.amazon.com.br/s?k=headphone+bluetooth+cancelamento+de+ruido+anc&tag=nexus00e-20"
    },
    {
      texto: "Vista cansada à noite no monitor? Conheça a Barra de Luz LED Assimétrica (Light Bar)!",
      ml: "https://meli.la/14pbi6E",
      amz: "https://www.amazon.com.br/s?k=light+bar+monitor+led&tag=nexus00e-20"
    }
  ];
  let idxOferta = 0;
  setInterval(() => {
    idxOferta = (idxOferta + 1) % ofertas.length;
    const o = ofertas[idxOferta];
    const elTxt = document.getElementById("rotating-sponsor-text");
    const elMl = document.getElementById("rotating-sponsor-ml");
    const elAmz = document.getElementById("rotating-sponsor-amz");
    if (elTxt) elTxt.textContent = o.texto;
    if (elMl) elMl.href = o.ml;
    if (elAmz) elAmz.href = o.amz;
  }, 6500);

  // 3. Gerador de Currículo Profissional
  const btnCvAutofill = document.getElementById("btn-cv-autofill");
  if (btnCvAutofill) {
    btnCvAutofill.addEventListener("click", () => {
      const cargo = document.getElementById("cv-cargo").value.trim() || "area administrativa e operacional";
      document.getElementById("cv-resumo").value =
        `Atuar na área de ${cargo}, contribuindo com organização, pontualidade, facilidade de aprendizado rápido e foco no cumprimento de metas e excelência no atendimento.`;
    });
  }

  const btnCvGerar = document.getElementById("btn-cv-gerar");
  if (btnCvGerar) {
    btnCvGerar.addEventListener("click", () => {
      const nome = esc(document.getElementById("cv-nome").value.trim() || "SEU NOME COMPLETO");
      const cargo = esc(document.getElementById("cv-cargo").value.trim() || "Profissional Qualificado");
      const tel = esc(document.getElementById("cv-tel").value.trim() || "(00) 90000-0000");
      const local = esc(document.getElementById("cv-local").value.trim() || "Brasil");
      const resumo = esc(
        document.getElementById("cv-resumo").value.trim() ||
          "Profissional dedicado, organizado, com facilidade de trabalho em equipe e foco em resultados práticos."
      );
      const exp = esc(
        document.getElementById("cv-exp").value.trim() ||
          "• Experiência no atendimento ao público, organização de rotinas administrativas e resolução ágil de demandas."
      ).replace(/\n/g, "<br>");
      const edu = esc(
        document.getElementById("cv-edu").value.trim() ||
          "• Ensino Médio Completo\n• Conhecimentos em Informática, Ferramentas Digitais e Atendimento"
      ).replace(/\n/g, "<br>");

      printableArea.innerHTML = `
        <div style="border-bottom: 3px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="font-size: 1.8rem; text-transform: uppercase; letter-spacing: 0.5px;">${nome}</h2>
          <p style="font-size: 1.1rem; font-weight: 700; margin-top: 4px;">Cargo Pretendido: ${cargo}</p>
          <p style="font-size: 0.92rem; margin-top: 4px;">📞 Contato: ${tel} &nbsp;|&nbsp; 📍 ${local}</p>
        </div>
        <div style="margin-bottom: 18px;">
          <h3 style="font-size: 1.05rem; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">1. Objetivo e Resumo Profissional</h3>
          <p style="font-size: 0.96rem; line-height: 1.6;">${resumo}</p>
        </div>
        <div style="margin-bottom: 18px;">
          <h3 style="font-size: 1.05rem; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">2. Experiência Profissional</h3>
          <p style="font-size: 0.96rem; line-height: 1.6;">${exp}</p>
        </div>
        <div>
          <h3 style="font-size: 1.05rem; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">3. Escolaridade, Cursos e Habilidades</h3>
          <p style="font-size: 0.96rem; line-height: 1.6;">${edu}</p>
        </div>
      `;
      printableWrapper.style.display = "block";
      printableWrapper.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 4. Gerador de Recibo
  const btnRecGerar = document.getElementById("btn-rec-gerar");
  if (btnRecGerar) {
    btnRecGerar.addEventListener("click", () => {
      const valor = esc(document.getElementById("rec-valor").value.trim() || "0,00");
      const data = esc(document.getElementById("rec-data").value.trim() || hojeStr);
      const pagador = esc(document.getElementById("rec-pagador").value.trim() || "NOME DO PAGADOR");
      const recebedor = esc(document.getElementById("rec-recebedor").value.trim() || "NOME DO RECEBEDOR");
      const ref = esc(document.getElementById("rec-ref").value.trim() || "prestação de serviços / venda");

      printableArea.innerHTML = `
        <div style="border: 2px solid #0f172a; padding: 28px; border-radius: 8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="font-size: 1.5rem;">RECIBO DE PAGAMENTO</h2>
            <strong style="font-size: 1.35rem; background:#f1f5f9; padding:6px 14px; border-radius:6px; border:1px solid #94a3b8;">R$ ${valor}</strong>
          </div>
          <p style="font-size: 1.05rem; line-height: 1.85; margin-bottom: 28px;">
            Recebi(emos) de <strong>${pagador}</strong> a importância de <strong>R$ ${valor}</strong>, referente a <strong>${ref}</strong>, dando plena, rasa e geral quitação pelo valor recebido nesta data.
          </p>
          <p style="text-align: right; margin-bottom: 42px;">Data do pagamento: <strong>${data}</strong></p>
          <div style="text-align: center; margin-top: 30px;">
            <p>________________________________________________________</p>
            <strong style="display:block; margin-top: 6px;">${recebedor}</strong>
            <span style="font-size: 0.85rem;">Assinatura do Recebedor / Prestador</span>
          </div>
        </div>
      `;
      printableWrapper.style.display = "block";
      printableWrapper.scrollIntoView({ behavior: "smooth" });
    });
  }

  const btnRecZap = document.getElementById("btn-rec-zap");
  if (btnRecZap) {
    btnRecZap.addEventListener("click", () => {
      const valor = document.getElementById("rec-valor").value.trim() || "0,00";
      const data = document.getElementById("rec-data").value.trim() || hojeStr;
      const pagador = document.getElementById("rec-pagador").value.trim() || "Cliente";
      const recebedor = document.getElementById("rec-recebedor").value.trim() || "Prestador";
      const ref = document.getElementById("rec-ref").value.trim() || "serviço prestado";

      const msg = `🧾 *RECIBO DE PAGAMENTO CONFIRMADO*\n\nRecebi de *${pagador}* o valor de *R$ ${valor}* em *${data}*, referente a: *${ref}*.\n\nAssinado: *${recebedor}*\n---\n_Gerado gratuitamente em:_ https://felipe-omena.github.io/nexus-ia/ferramentas-uteis.html`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    });
  }

  // 5. Gerador de Orçamento Comercial
  const btnOrcGerar = document.getElementById("btn-orc-gerar");
  if (btnOrcGerar) {
    btnOrcGerar.addEventListener("click", () => {
      const empresa = esc(document.getElementById("orc-empresa").value.trim() || "SUA EMPRESA / PROFISSIONAL");
      const cliente = esc(document.getElementById("orc-cliente").value.trim() || "CLIENTE");
      const valor = esc(document.getElementById("orc-valor").value.trim() || "0,00");
      const prazo = esc(document.getElementById("orc-prazo").value.trim() || "Pix ou Cartão • Entrega a combinar");
      const itens = esc(document.getElementById("orc-itens").value.trim() || "1. Prestação de serviço conforme solicitado.").replace(/\n/g, "<br>");

      printableArea.innerHTML = `
        <div style="border: 2px solid #0f172a; padding: 28px; border-radius: 8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px;">
            <div>
              <h2 style="font-size: 1.45rem;">PROPOSTA DE ORÇAMENTO COMERCIAL</h2>
              <p style="font-size: 0.92rem;">Emitido por: <strong>${empresa}</strong> | Data: ${hojeStr}</p>
            </div>
            <strong style="font-size: 1.3rem; background:#f1f5f9; padding:6px 14px; border-radius:6px; border:1px solid #94a3b8;">Total: R$ ${valor}</strong>
          </div>
          <p style="margin-bottom: 14px;"><strong>Cliente:</strong> ${cliente}</p>
          <div style="background:#f8fafc; border:1px solid #cbd5e1; padding:16px; border-radius:6px; margin-bottom:16px;">
            <strong style="display:block; margin-bottom:8px;">Descrição dos Serviços / Produtos Inclusos:</strong>
            <p style="line-height: 1.7;">${itens}</p>
          </div>
          <p style="margin-bottom: 24px;"><strong>Condições de Pagamento e Prazo:</strong> ${prazo}</p>
          <p style="font-size: 0.85rem; text-align:center;">Orçamento válido por 7 dias a partir da data de emissão (${hojeStr}).</p>
        </div>
      `;
      printableWrapper.style.display = "block";
      printableWrapper.scrollIntoView({ behavior: "smooth" });
    });
  }

  const btnOrcZap = document.getElementById("btn-orc-zap");
  if (btnOrcZap) {
    btnOrcZap.addEventListener("click", () => {
      const empresa = document.getElementById("orc-empresa").value.trim() || "Profissional";
      const cliente = document.getElementById("orc-cliente").value.trim() || "Cliente";
      const valor = document.getElementById("orc-valor").value.trim() || "0,00";
      const prazo = document.getElementById("orc-prazo").value.trim() || "A combinar";
      const itens = document.getElementById("orc-itens").value.trim() || "Serviço conforme combinado";

      const msg = `📋 *ORÇAMENTO COMERCIAL — ${empresa}*\n\n👤 *Cliente:* ${cliente}\n📅 *Data:* ${hojeStr}\n\n*Itens Inclusos:*\n${itens}\n\n💰 *Valor Total:* R$ ${valor}\n⚡ *Condições e Prazo:* ${prazo}\n---\n_Gerado gratuitamente no portal:_ https://felipe-omena.github.io/nexus-ia/ferramentas-uteis.html`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    });
  }

  // 6. Botão Salvar PDF / Imprimir
  const btnPrintNow = document.getElementById("btn-print-now");
  if (btnPrintNow) {
    btnPrintNow.addEventListener("click", () => {
      window.print();
    });
  }

  // 7. Calculadora Trabalhista (Férias + 1/3, 13º Proporcional e Horas Extras)
  function calcularTrabalhista() {
    const sal = parseFloat(document.getElementById("trab-salario").value) || 0;
    const meses = Math.min(12, Math.max(1, parseInt(document.getElementById("trab-meses").value) || 12));
    const qtdHe = Math.max(0, parseFloat(document.getElementById("trab-he").value) || 0);

    const feriasProp = (sal / 12) * meses;
    const tercoFerias = feriasProp / 3;
    const totalFerias = feriasProp + tercoFerias;
    const decimoTerceiro = (sal / 12) * meses;
    const valorHoraNormal = sal / 220;
    const valorHoraExtra50 = valorHoraNormal * 1.5;
    const totalHorasExtras = valorHoraExtra50 * qtdHe;
    const somaGeral = totalFerias + decimoTerceiro + totalHorasExtras;

    const fmt = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const box = document.getElementById("trab-resultado");
    if (box) {
      box.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:14px; margin-bottom:16px;">
          <div style="background:rgba(255,255,255,0.04); padding:14px; border-radius:10px;">
            <span style="font-size:0.82rem; color:#94a3b8;">Férias Proporcionais + 1/3:</span>
            <strong style="display:block; font-size:1.3rem; color:#34d399; margin-top:4px;">${fmt(totalFerias)}</strong>
            <span style="font-size:0.78rem; color:#cbd5e1;">(${fmt(feriasProp)} + 1/3 de ${fmt(tercoFerias)})</span>
          </div>
          <div style="background:rgba(255,255,255,0.04); padding:14px; border-radius:10px;">
            <span style="font-size:0.82rem; color:#94a3b8;">13º Salário Proporcional (${meses}/12):</span>
            <strong style="display:block; font-size:1.3rem; color:#67e8f9; margin-top:4px;">${fmt(decimoTerceiro)}</strong>
          </div>
          <div style="background:rgba(255,255,255,0.04); padding:14px; border-radius:10px;">
            <span style="font-size:0.82rem; color:#94a3b8;">Horas Extras no Mês (${qtdHe}h a +50%):</span>
            <strong style="display:block; font-size:1.3rem; color:#fde047; margin-top:4px;">${fmt(totalHorasExtras)}</strong>
            <span style="font-size:0.78rem; color:#cbd5e1;">(${fmt(valorHoraExtra50)} por hora extra)</span>
          </div>
        </div>
        <div style="border-top:1px solid rgba(255,255,255,0.12); padding-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span style="font-size:1rem; font-weight:700;">💰 Total Bruto Acumulado (Férias + 13º + Horas Extras): <strong style="color:#34d399; font-size:1.25rem;">${fmt(somaGeral)}</strong></span>
          <a href="achadinhos-home-office.html" class="pill-btn" style="text-decoration:none; color:#fde047; border-color:#fde047;">🔥 Ver Ofertas da Semana →</a>
        </div>
      `;
    }
  }

  const btnTrabCalc = document.getElementById("btn-trab-calc");
  if (btnTrabCalc) {
    btnTrabCalc.addEventListener("click", calcularTrabalhista);
    calcularTrabalhista();
  }
});
