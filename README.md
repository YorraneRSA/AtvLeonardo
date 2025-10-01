# Passo a passo para rodar o sistema de cadastro de alunos letsgooooo

1. **Instale o Node.js**  
   Baixe e instale em: https://nodejs.org/

2. **Abra o terminal na pasta do projeto**  
  No VS Code: Ctrl + ' 
   ```sh
   cd "C:\Users\YourUser\YourFolder\YourFolder"
   ```
   
3. **Cheque o node**
    ```sh
   node -v
   ```
    
4. **Cheque o node**
    ```sh
   npm -v
   ```
    
5. **Inicialize o npm (se não existir package.json)**  
   ```sh
   npm init -y
   ```

6. **Instale o TypeScript e os tipos do Node**  
   ```sh
   npm install --save-dev typescript @types/node
   ```

7. **Se aparecer erro de execução de scripts no PowerShell:**  
   Execute o PowerShell como administrador e rode:  
   ```sh
   Set-ExecutionPolicy RemoteSigned
   ```
   Em seguinte aperte S ou Y para confirmar
   
   Depois feche e abra o terminal novamente.

8. **Compile o arquivo TypeScript**  
   ```sh
   npx tsc main.ts
   ```

9. **Execute o arquivo gerado**  
   ```sh
   node main.js
   ```

---

### Erros comuns e soluções

- **"Cannot find module 'readline'"**  
  Solução: Instale `@types/node` (passo 6).

- **"A execução de scripts foi desabilitada neste sistema"**  
  Solução: Altere a política de execução (passo 7).

- **"This is not the tsc command you are looking for"**  
  Solução: Instale o TypeScript no projeto (passo 6)

---
