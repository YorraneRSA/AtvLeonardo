// IIFE para isolar o escopo e evitar colisões globais
(() => {
  // Função auxiliar para imprimir no HTML (expressão const para evitar redeclaração)
  const writeLine = (msg: string): void => {
    const saida = document.getElementById("saida");
    if (!saida) {
      console.warn("Elemento #saida não encontrado. Mensagem:", msg);
      return;
    }
    saida.textContent += msg + "\n";
  };

  // ================= MODEL =================
  class Aluno {
    constructor(public id: number, public nome: string, public idade: number) {}
  }

  class AlunoModel {
    private alunos: Aluno[] = [];
    adicionarAluno(aluno: Aluno): void { this.alunos.push(aluno); }
    existeId(id: number): boolean { return this.alunos.some(a => a.id === id); }
    listarAlunos(): Aluno[] { return this.alunos; }
  }

  // ================= VIEW =================
  class AlunoView {
    mostrarAlunos(alunos: Aluno[]): void {
      writeLine("=== Lista de Alunos ===");
      if (alunos.length === 0) writeLine("Nenhum aluno cadastrado.");
      else alunos.forEach(a => writeLine(`ID: ${a.id} | Nome: ${a.nome} | Idade: ${a.idade}`));
      writeLine("========================");
    }
    mostrarMensagem(msg: string): void { writeLine(`[INFO]: ${msg}`); }
    mostrarErro(msg: string): void { writeLine(`[ERRO]: ${msg}`); }
  }

  // ================= CONTROLLER =================
  class AlunoController {
    constructor(private model: AlunoModel, private view: AlunoView) {}
    cadastrarAluno(id: number, nome: string, idade: number): boolean {
      if (!Number.isInteger(id) || id <= 0) { this.view.mostrarErro("ID inválido. Use um número inteiro positivo."); return false; }
      if (!nome || nome.trim().length === 0) { this.view.mostrarErro("Nome inválido. Informe o nome do aluno."); return false; }
      if (!Number.isInteger(idade) || idade <= 0) { this.view.mostrarErro("Idade inválida. Use um número inteiro positivo."); return false; }
      if (this.model.existeId(id)) { this.view.mostrarErro(`Já existe um aluno com ID ${id}.`); return false; }
      const novoAluno = new Aluno(id, nome.trim(), idade);
      this.model.adicionarAluno(novoAluno);
      this.view.mostrarMensagem(`Cadastro feito com sucesso: ${novoAluno.nome} (ID ${novoAluno.id})`);
      return true;
    }
    exibirAlunos(): void { this.view.mostrarAlunos(this.model.listarAlunos()); }
  }

  // ================= INICIALIZAÇÃO E LIGAÇÃO COM O DOM =================
  const model = new AlunoModel();
  const view = new AlunoView();
  const controller = new AlunoController(model, view);

  const clearInputs = (): void => {
    (document.getElementById("input-id") as HTMLInputElement | null)!.value = "";
    (document.getElementById("input-nome") as HTMLInputElement | null)!.value = "";
    (document.getElementById("input-idade") as HTMLInputElement | null)!.value = "";
  };

  const readIntegerInput = (id: string): number | null => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (!el) return null;
    const v = Number(el.value);
    if (!Number.isFinite(v)) return null;
    return Math.trunc(v);
  };

  const btnCadastrar = document.getElementById("btn-cadastrar") as HTMLButtonElement | null;
  const btnListar = document.getElementById("btn-listar") as HTMLButtonElement | null;

  if (btnCadastrar) {
    btnCadastrar.addEventListener("click", () => {
      const id = readIntegerInput("input-id");
      const nomeEl = document.getElementById("input-nome") as HTMLInputElement | null;
      const idade = readIntegerInput("input-idade");
      const nome = nomeEl ? nomeEl.value : "";

      if (id === null) { view.mostrarErro("ID inválido. Informe um número."); return; }
      if (idade === null) { view.mostrarErro("Idade inválida. Informe um número."); return; }

      const ok = controller.cadastrarAluno(id, nome, idade);
      if (ok) clearInputs();
    });
  }

  if (btnListar) btnListar.addEventListener("click", () => controller.exibirAlunos());

})(); // fim IIFE
