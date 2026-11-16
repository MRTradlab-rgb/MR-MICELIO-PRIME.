const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("lead-form");
const statusEl = document.getElementById("form-status");
const WHATSAPP_DESTINO = "5521978862198";

const setStatus = (message, kind = "") => {
  statusEl.textContent = message;
  statusEl.className = "form-status " + kind;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  if (String(data.get("website") || "").trim()) return;

  if (!form.reportValidity()) return;

  const payload = {
    nome: String(data.get("name") || "").trim(),
    whatsapp: String(data.get("whatsapp") || "").trim(),
    email: String(data.get("email") || "").trim(),
    cidade: String(data.get("city") || "").trim(),
    estado: String(data.get("state") || "").trim()
  };

  const mensagem = [
    "Olá! Quero fazer meu pré-cadastro no MR TradLab ZERO · Micélio Prime.",
    "",
    "Nome: " + payload.nome,
    "Meu WhatsApp: " + payload.whatsapp,
    "E-mail: " + payload.email,
    "Cidade: " + payload.cidade,
    "Estado: " + payload.estado,
    "",
    "Autorizo o uso destes dados para administrar meu pré-cadastro e receber contato sobre o projeto."
  ].join("\n");

  const url = "https://wa.me/" + WHATSAPP_DESTINO + "?text=" + encodeURIComponent(mensagem);
  const opened = window.open(url, "_blank", "noopener,noreferrer");

  if (!opened) {
    window.location.href = url;
  }

  setStatus("O WhatsApp foi aberto com sua mensagem. Para concluir o pré-cadastro, toque em ENVIAR na conversa. Seus dados só serão recebidos depois desse envio.", "success");
});
