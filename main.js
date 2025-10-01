"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var readline = require("readline");
// Função auxiliar para imprimir no terminal
function print(msg) {
    console.log(msg);
}
// ================= MODEL =================
var Aluno = /** @class */ (function () {
    function Aluno(id, nome, idade) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
    }
    return Aluno;
}());
var AlunoModel = /** @class */ (function () {
    function AlunoModel() {
        this.alunos = [];
    }
    AlunoModel.prototype.adicionarAluno = function (aluno) {
        this.alunos.push(aluno);
    };
    AlunoModel.prototype.listarAlunos = function () {
        return this.alunos;
    };
    return AlunoModel;
}());
// ================= VIEW =================
var AlunoView = /** @class */ (function () {
    function AlunoView() {
    }
    AlunoView.prototype.mostrarAlunos = function (alunos) {
        print("=== Lista de Alunos ===");
        alunos.forEach(function (aluno) {
            print("ID: ".concat(aluno.id, " | Nome: ").concat(aluno.nome, " | Idade: ").concat(aluno.idade));
        });
        print("========================");
    };
    AlunoView.prototype.mostrarMensagem = function (msg) {
        print("[INFO]: ".concat(msg));
    };
    return AlunoView;
}());
// ================= CONTROLLER =================
var AlunoController = /** @class */ (function () {
    function AlunoController(model, view) {
        this.model = model;
        this.view = view;
    }
    AlunoController.prototype.cadastrarAluno = function (id, nome, idade) {
        var novoAluno = new Aluno(id, nome, idade);
        this.model.adicionarAluno(novoAluno);
        this.view.mostrarMensagem("Aluno \"".concat(nome, "\" cadastrado com sucesso!"));
    };
    AlunoController.prototype.exibirAlunos = function () {
        var alunos = this.model.listarAlunos();
        this.view.mostrarAlunos(alunos);
    };
    return AlunoController;
}());
// ================= ENTRADA DE DADOS VIA TERMINAL =================
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var model = new AlunoModel();
var view = new AlunoView();
var controller = new AlunoController(model, view);
print("=== Cadastro de Aluno ===");
rl.question("Digite o ID do aluno: ", function (idStr) {
    var id = parseInt(idStr);
    rl.question("Digite o nome do aluno: ", function (nome) {
        rl.question("Digite a idade do aluno: ", function (idadeStr) {
            var idade = parseInt(idadeStr);
            controller.cadastrarAluno(id, nome, idade);
            print("ID: " + id + " |Aluno/a: " + nome + " | Idade: " + idade);
            controller.exibirAlunos();
            rl.close();
        });
    });
});
