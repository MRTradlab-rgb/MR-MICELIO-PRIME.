import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById("lead-form");
const statusEl = document.getElementById("form-status");
const cfg = window.MR_CONFIG || {};
const ready = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
const supabase = ready ? createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
if (!ready) statusEl.textContent = "Portal em configuração: o formulário será ativado após conectar o banco de dados.";
const setStatus = (msg, kind="") => { statusEl.textContent=msg; statusEl.className="form-status "+kind; };
form.addEventListener("submit", async (event) => {
 event.preventDefault();
 if (!ready) { setStatus("O cadastro ainda não está ativo. A conexão segura com o banco de dados está pendente.","error"); return; }
 const data = new FormData(form);
 if (String(data.get("website") || "").trim()) return;
 const button=form.querySelector("button[type=submit]"); button.disabled=true; button.textContent="Enviando…";
 const payload={
  name:String(data.get("name")||"").trim(),
  whatsapp:String(data.get("whatsapp")||"").trim(),
  email:String(data.get("email")||"").trim().toLowerCase(),
  city:String(data.get("city")||"").trim(),
  state:String(data.get("state")||"").trim(),
  consent:true,
  source:"portal-publico"
 };
 try {
  const {error}=await supabase.from("preregistrations").insert(payload);
  if(error) throw error;
  form.reset(); setStatus("Pré-cadastro recebido! Seus dados foram registrados. A equipe fará a análise e poderá entrar em contato. O envio não garante aprovação ou acesso ao Micélio.","success");
 } catch(err) {
  const duplicate = err?.code === "23505";
  setStatus(duplicate ? "Já existe um pré-cadastro com esses dados. Se precisar corrigir alguma informação, aguarde o contato da equipe." : "Não foi possível concluir o cadastro agora. Tente novamente mais tarde.", "error");
 } finally { button.disabled=false; button.innerHTML='Enviar pré-cadastro <span>→</span>'; }
});
