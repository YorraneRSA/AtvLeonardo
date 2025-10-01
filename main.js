// Função auxiliar para imprimir no HTML
function writeLine(msg) {
  const saida = document.getElementById("saida");
  if (!saida) {
    console.warn("Elemento #saida não encontrado. Mensagem:", msg);
    return;
  }
  saida.textContent += msg + "\n";
}
// ================= MODEL =================
class Aluno {
  constructor(id, nome, idade) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
  }
}
class AlunoModel {
  constructor() {
    this.alunos = [];
  }
  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }
  existeId(id) {
    return this.alunos.some(a => a.id === id);
  }
  listarAlunos() {
    return this.alunos;
  }
}
// ================= VIEW =================
class AlunoView {
  mostrarAlunos(alunos) {
    writeLine("=== Lista de Alunos ===");
    if (alunos.length === 0) {
      writeLine("Nenhum aluno cadastrado.");
    }
    else {
      alunos.forEach(aluno => {
        writeLine(`ID: ${aluno.id} | Nome: ${aluno.nome} | Idade: ${aluno.idade}`);
      });
    }
    writeLine("========================");
  }
  mostrarMensagem(msg) {
    writeLine(`[INFO]: ${msg}`);
  }
  mostrarErro(msg) {
    writeLine(`[ERRO]: ${msg}`);
  }
}
// ================= CONTROLLER =================
class AlunoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  cadastrarAluno(id, nome, idade) {
    if (!Number.isInteger(id) || id <= 0) {
      this.view.mostrarErro("ID inválido. Use um número inteiro positivo.");
      return false;
    }
    if (!nome || nome.trim().length === 0) {
      this.view.mostrarErro("Nome inválido. Informe o nome do aluno.");
      return false;
    }
    if (!Number.isInteger(idade) || idade <= 0) {
      this.view.mostrarErro("Idade inválida. Use um número inteiro positivo.");
      return false;
    }
    if (this.model.existeId(id)) {
      this.view.mostrarErro(`Já existe um aluno com ID ${id}.`);
      return false;
    }
    const novoAluno = new Aluno(id, nome.trim(), idade);
    this.model.adicionarAluno(novoAluno);
    this.view.mostrarMensagem(`Cadastro feito com sucesso: ${novoAluno.nome} (ID ${novoAluno.id})`);
    return true;
  }
  exibirAlunos() {
    const alunos = this.model.listarAlunos();
    this.view.mostrarAlunos(alunos);
  }
}
// ================= INICIALIZAÇÃO E LIGAÇÃO COM O DOM =================
const model = new AlunoModel();
const view = new AlunoView();
const controller = new AlunoController(model, view);
function limparCampos() {
  const idEl = document.getElementById("input-id");
  const nomeEl = document.getElementById("input-nome");
  const idadeEl = document.getElementById("input-idade");
  if (idEl)
    idEl.value = "";
  if (nomeEl)
    nomeEl.value = "";
  if (idadeEl)
    idadeEl.value = "";
}
function lerInteiroDoInput(id) {
  const el = document.getElementById(id);
  if (!el)
    return null;
  const v = Number(el.value);
  if (!Number.isFinite(v))
    return null;
  return Math.trunc(v);
}
const btnCadastrar = document.getElementById("btn-cadastrar");
const btnListar = document.getElementById("btn-listar");
if (btnCadastrar) {
  btnCadastrar.addEventListener("click", () => {
    const id = lerInteiroDoInput("input-id");
    const nomeEl = document.getElementById("input-nome");
    const idade = lerInteiroDoInput("input-idade");
    const nome = nomeEl ? nomeEl.value : "";
    if (id === null) {
      view.mostrarErro("ID inválido. Informe um número.");
      return;
    }
    if (idade === null) {
      view.mostrarErro("Idade inválida. Informe um número.");
      return;
    }
    const ok = controller.cadastrarAluno(id, nome, idade);
    if (ok) {
      limparCampos();
    }
  });
}
if (btnListar) {
  btnListar.addEventListener("click", () => {
    controller.exibirAlunos();
  });
}
