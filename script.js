const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const cursorLight = document.querySelector(".cursor-light");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
const slider = document.querySelector("[data-slider]");
const sliderRange = document.querySelector("[data-range]");
const form = document.querySelector("[data-form]");
const formStatus = document.querySelector("[data-form-status]");
const whatsappNumber = "5566992306879";
const defaultWhatsAppMessage = "Olá, gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT.";

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("is-active"));
      active?.classList.add("is-active");
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => navObserver.observe(section));

if (slider && sliderRange) {
  const updateSlider = () => {
    slider.style.setProperty("--position", `${sliderRange.value}%`);
  };

  sliderRange.addEventListener("input", updateSlider);
  updateSlider();
}

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorLight.style.opacity = "1";
      cursorLight.style.left = `${event.clientX}px`;
      cursorLight.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    cursorLight.style.opacity = "0";
  });
}

const getWhatsAppUrl = (message = defaultWhatsAppMessage) => {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome");
    const whatsapp = data.get("whatsapp");
    const interesse = data.get("interesse");
    const message = `Olá, sou ${nome}. Gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT para ${interesse}. Meu WhatsApp é ${whatsapp}.`;

    if (formStatus) {
      formStatus.textContent = "Abrindo conversa no WhatsApp...";
    }

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

const specialties = {
  cirurgias: {
    eyebrow: "Destaque LIMADENTT",
    title: "Cirurgias odontológicas",
    summary: "Procedimentos cirúrgicos conduzidos pelo Dr. Weslen Lima com diagnóstico, planejamento e acompanhamento para mais segurança em cada etapa.",
    kicker: "Cirurgia",
    heading: "Precisão cirúrgica com cuidado humanizado.",
    description:
      "A cirurgia odontológica exige avaliação individual, controle técnico e comunicação clara. Na LIMADENTT, o paciente recebe orientação sobre o procedimento, preparo, execução e pós-operatório, com foco em previsibilidade, conforto e recuperação.",
    points: [
      "Avaliação clínica e análise de indicação cirúrgica.",
      "Planejamento de procedimentos como extrações, cirurgias orais e etapas associadas a implantes.",
      "Orientações pré e pós-operatórias para reduzir dúvidas e aumentar a segurança.",
      "Acompanhamento próximo para conforto, cicatrização e estabilidade."
    ]
  },
  harmonizacao: {
    eyebrow: "Destaque LIMADENTT",
    title: "Harmonização orofacial",
    summary: "Tratamentos para equilíbrio facial, naturalidade e valorização da expressão, sempre com avaliação individual e visão odontológica.",
    kicker: "HOF",
    heading: "Equilíbrio entre sorriso, face e identidade.",
    description:
      "A harmonização orofacial considera proporções, função, pele, sorriso e expressão. O objetivo é alcançar resultados naturais, respeitando a anatomia e a identidade do paciente.",
    points: [
      "Avaliação facial individualizada com foco em naturalidade.",
      "Planejamento para equilíbrio entre sorriso, lábios, contorno facial e expressão.",
      "Indicação responsável de procedimentos conforme necessidade real.",
      "Atendimento para adultos que buscam estética com segurança e discrição."
    ]
  },
  implantes: {
    eyebrow: "Implantodontia",
    title: "Implantodontia premium",
    summary: "Reposição dentária planejada para recuperar mastigação, estabilidade, estética e confiança.",
    kicker: "Implantes",
    heading: "Função e estética para voltar a sorrir com segurança.",
    description:
      "Os implantes podem restaurar dentes ausentes e melhorar a qualidade de vida. O plano considera estrutura óssea, saúde gengival, estética, função mastigatória e expectativas do paciente.",
    points: [
      "Diagnóstico para avaliar viabilidade e planejamento do caso.",
      "Reposição de dentes ausentes de forma individualizada.",
      "Integração com reabilitação oral quando necessário.",
      "Acompanhamento de manutenção para longevidade do tratamento."
    ]
  },
  estetica: {
    eyebrow: "Estética dental",
    title: "Lentes, facetas e estética dental",
    summary: "Tratamentos estéticos para cor, formato, proporção e harmonia do sorriso sem perder naturalidade.",
    kicker: "Estética",
    heading: "Um sorriso sofisticado precisa parecer seu.",
    description:
      "A estética dental deve valorizar a expressão, e não padronizar rostos. O planejamento observa dentes, gengiva, lábios, face e personalidade para propor um resultado coerente e elegante.",
    points: [
      "Avaliação de cor, formato, proporção e simetria.",
      "Planejamento de lentes, facetas ou outras soluções estéticas conforme indicação.",
      "Integração com clareamento, gengiva e reabilitação quando necessário.",
      "Busca por naturalidade, refinamento e durabilidade."
    ]
  },
  reabilitacao: {
    eyebrow: "Reabilitação oral",
    title: "Reconstrução e reabilitação oral",
    summary: "Tratamentos integrados para recuperar mastigação, estética, conforto e saúde bucal.",
    kicker: "Reabilitação",
    heading: "Recuperar função também transforma autoestima.",
    description:
      "A reabilitação oral reúne diferentes áreas para reconstruir dentes, mordida, estética e conforto. É indicada para pacientes com perdas dentárias, desgaste, dor, dificuldade mastigatória ou necessidade de tratamentos combinados.",
    points: [
      "Análise de função mastigatória, estética e saúde bucal.",
      "Plano por fases para organizar prioridades e tempo de tratamento.",
      "Integração entre implantes, próteses, estética e prevenção.",
      "Manutenção orientada para preservar o resultado."
    ]
  },
  familia: {
    eyebrow: "Todas as idades",
    title: "Odontologia para crianças, jovens, adultos e idosos",
    summary: "Cuidado odontológico completo para a família, com abordagem adequada para cada fase da vida.",
    kicker: "Família",
    heading: "Cada idade pede um tipo de atenção.",
    description:
      "A LIMADENTT atende pacientes de todas as faixas etárias, da prevenção infantil aos tratamentos de maior complexidade em adultos e idosos. O plano respeita idade, rotina, histórico e objetivo de cada pessoa.",
    points: [
      "Crianças: prevenção, orientação familiar e acompanhamento do desenvolvimento.",
      "Adolescentes: prevenção, estética, alinhamento e hábitos saudáveis.",
      "Adultos: cirurgias, harmonização orofacial, estética, implantes e reabilitação.",
      "Idosos: conforto mastigatório, próteses, implantes, manutenção e saúde oral."
    ]
  },
  prevencao: {
    eyebrow: "Saúde bucal",
    title: "Clínica geral e prevenção",
    summary: "Avaliações, limpezas, restaurações e manutenção para preservar dentes, gengivas e tratamentos.",
    kicker: "Prevenção",
    heading: "Prevenir é o cuidado mais elegante.",
    description:
      "A odontologia preventiva mantém a saúde bucal estável e reduz a necessidade de tratamentos complexos. Consultas periódicas ajudam a identificar alterações cedo e preservar os resultados conquistados.",
    points: [
      "Avaliação odontológica completa.",
      "Limpeza, prevenção e orientação de higiene.",
      "Restaurações e cuidados de clínica geral.",
      "Acompanhamento de manutenção para todas as idades."
    ]
  },
  ortodontia: {
    eyebrow: "Alinhamento",
    title: "Ortodontia e planejamento do sorriso",
    summary: "Acompanhamento para alinhamento dentário, função mastigatória e harmonia do sorriso.",
    kicker: "Ortodontia",
    heading: "Alinhamento com função, estética e planejamento.",
    description:
      "A ortodontia ajuda a melhorar posição dos dentes, encaixe da mordida e estética do sorriso. A indicação depende de avaliação clínica e planejamento individual para crianças, adolescentes ou adultos.",
    points: [
      "Avaliação de mordida, alinhamento e função.",
      "Planejamento conforme idade e necessidade do paciente.",
      "Integração com estética, prevenção e reabilitação quando indicado.",
      "Acompanhamento para evolução organizada do tratamento."
    ]
  }
};

const renderSpecialtyPage = () => {
  const specialtyRoot = document.querySelector("[data-specialty-page]");
  if (!specialtyRoot) return;

  const params = new URLSearchParams(window.location.search);
  const area = params.get("area") || "cirurgias";
  const specialty = specialties[area] || specialties.cirurgias;
  const message = `Olá, gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT sobre ${specialty.title}.`;

  document.title = `${specialty.title} | Centro Especializado LIMADENTT`;
  document.querySelector("[data-specialty-eyebrow]").textContent = specialty.eyebrow;
  document.querySelector("[data-specialty-title]").textContent = specialty.title;
  document.querySelector("[data-specialty-summary]").textContent = specialty.summary;
  document.querySelector("[data-specialty-kicker]").textContent = specialty.kicker;
  document.querySelector("[data-specialty-heading]").textContent = specialty.heading;
  document.querySelector("[data-specialty-description]").textContent = specialty.description;

  const points = document.querySelector("[data-specialty-points]");
  points.innerHTML = specialty.points.map((point) => `<li>${point}</li>`).join("");

  document.querySelectorAll("[data-specialty-whatsapp]").forEach((link) => {
    link.href = getWhatsAppUrl(message);
  });
};

renderSpecialtyPage();
