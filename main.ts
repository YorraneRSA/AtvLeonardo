// @ts-ignore
import * as readline from "readline";

// Função auxiliar para imprimir no terminal
function print(msg: string) {
  console.log(msg);
}

// ================= MODEL =================
class Aluno {
  constructor(
    public id: number,
    public nome: string,
    public idade: number
  ) {}
}

class AlunoModel {
  private alunos: Aluno[] = [];

  adicionarAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  listarAlunos(): Aluno[] {
    return this.alunos;
  }
}

// ================= VIEW =================
class AlunoView {
  mostrarAlunos(alunos: Aluno[]): void {
    print("=== Lista de Alunos ===");
    alunos.forEach(aluno => {
      print(`ID: ${aluno.id} | Nome: ${aluno.nome} | Idade: ${aluno.idade}`);
    });
    print("========================");
  }

  mostrarMensagem(msg: string): void {
    print(`[INFO]: ${msg}`);
  }
}

// ================= CONTROLLER =================
class AlunoController {
  constructor(
    private model: AlunoModel,
    private view: AlunoView
  ) {}

  cadastrarAluno(id: number, nome: string, idade: number): void {
    const novoAluno = new Aluno(id, nome, idade);
    this.model.adicionarAluno(novoAluno);
    this.view.mostrarMensagem(`Aluno "${nome}" cadastrado com sucesso!`);
  }

  exibirAlunos(): void {
    const alunos = this.model.listarAlunos();
    this.view.mostrarAlunos(alunos);
  }
}

// ================= ENTRADA DE DADOS VIA TERMINAL =================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const model = new AlunoModel();
const view = new AlunoView();
const controller = new AlunoController(model, view);

print("=== Cadastro de Aluno ===");
rl.question("Digite o ID do aluno: ", (idStr: string) => {
  const id = parseInt(idStr);
  rl.question("Digite o nome do aluno: ", (nome: string) => {
    rl.question("Digite a idade do aluno: ", (idadeStr: string) => {
      const idade = parseInt(idadeStr);
      controller.cadastrarAluno(id, nome, idade);
      print("Cadastrado com sucesso!");
      controller.exibirAlunos();
      rl.close();
    });
  });
});
