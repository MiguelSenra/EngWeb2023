function task_table(tasks) {
  var pagHTML = `
  <table class="w3-table-all">
  <tr>
    <th>Tarefas Não Realizadas</th>
    <th>Data Limite</th>
    <th>Concluir Tarefa</th>
    <th>Tarefas Realizadas</th>
    <th>Eliminar Tarefa</th>
  </tr>
`;

  var lista_done = [];
  var lista_not_done = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]["done"] == 1) {
      lista_done.push(tasks[i]);
    } else lista_not_done.push(tasks[i]);
  }
  console.log(lista_done);

  lista_not_done.sort(function (a) {
    return a["data_limite"];
  });

  var max = Math.max(lista_done.length, lista_not_done.length);
  for (let i = 0; i < max; i++) {
    pagHTML += `<tr>`;
    if (i < lista_not_done.length)
      pagHTML += ` 
  <td><a href="/tasks/${lista_not_done[i]["id"]}">${lista_not_done[i]["id"]} </a></td>
  <td>${lista_not_done[i]["data_limite"]}</td>
  <td>
    <a href="/tasks/done/${lista_not_done[i]["id"]}">
    <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Done</button>
    <a href="/tasks/edit/${lista_not_done[i]["id"]}">
    <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Edit</button>
    <a href="/tasks/delete/${lista_not_done[i]["id"]}">
    <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Delete</button>
  </a>
  </td>
`;
    else {
      pagHTML += `
  <td></td>
  <td></td>
  <td></td>
`;
    }
    if (i < lista_done.length) {
      pagHTML += `<td><a href="/tasks/${lista_done[i]["id"]}">${lista_done[i]["id"]}</a></td>
                  <td><a href="/tasks/delete/${lista_done[i]["id"]}">
                  <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Delete</button>
                  </td>`;
    } else {
      pagHTML += ` <td></td><td></td> `;
    }
    pagHTML += `</tr>`;
  }

  pagHTML += ` 
  </table>
  `;
  return pagHTML;
}

exports.TasksPage = function (form_pessoa, tasks, data) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="favicon.png" />
        <link rel="stylesheet" href="w3.css" />
        <title>Tasks Management</title>
      </head>
      <body>
        <div class="w3-card-4">
          <header class="w3-container w3-blue">
            <h1>Tasks Management</h1>
          </header>
    <h2>Adicionar um novo utilizador
    <a class="w3-btn w3-round w3-light-blue" href="/users/add">+</a> 
    </h2>

  `;
  if (form_pessoa == 1)
    pagHTML += `
      <form class="w3-container" method="POST">
        <fieldset>
          <legend>Registo de Novo Utilizador</legend>
          <label>Id</label>
          <input class="w3-input w3-round" type="text" name="id" />
          <label>Name</label>
          <input class="w3-input w3-round" type="text" name="nome" />
        </fieldset>
        <br />
        <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Registar</button>
      </form>
      `;

  pagHTML += `<h2>  Lista de Tarefas  
        <a class="w3-btn w3-round w3-light-blue" href="/tasks/add">+</a>
      </h2>
      <div class="w3-container">
    `;
  pagHTML += task_table(tasks);

  pagHTML += `</div>
    <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
  return pagHTML;
};

exports.PostTasksPage = function (edit, idTask, users, tasks, data) {
  var pagHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" href="favicon.png" />
          <link rel="stylesheet" href="w3.css" />
          <title>Tasks Management</title>
        </head>
        <body>
          <div class="w3-card-4">
            <header class="w3-container w3-blue">
              <h1>Tasks Management</h1>
            </header>
      <h2>Adicionar um novo utilizador
      <a class="w3-btn w3-round w3-light-blue" href="/users/add">+</a> 
      </h2>
  `;
  if (edit == 0) {
    pagHTML += `
      <h2>Adicionar uma nova Tarefa</h2>
        <form class="w3-container" method="POST">
          <fieldset>
            <legend>Tarefa Nova</legend>
            <label>Nome da Tarefa</label>
            <input class="w3-input w3-round" type="text" name="id" />
            `;
    pagHTML += `
            <label>Data Limite</label>
            <input class="w3-input w3-round" type="date" name="data_limite" />
            <label>Descrição</label>
            <input class="w3-input w3-round" type="text" name="descrição" />
            <label for="executor">Executor da Tarefa</label>
            <select name="executor" id="executor">
          `;
    for (let i = 0; i < users.length; i++) {
      pagHTML += `<option value="${users[i]["id"]}">${users[i]["nome"]}</option>`;
    }

    pagHTML += `
            </select>
          </fieldset>
          <br />
          <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Registar</button>
        </form>
        `;
  } else {
    var task;
    for (let i = 0; i < tasks.length; i++) {
      console.log(tasks[i]);
      if (tasks[i]["id"] == idTask) {
        task = tasks[i];
        break;
      }
    }

    pagHTML += `
  <h2>Editar Tarefa</h2>
    <form class="w3-container" method="POST">
      <fieldset>
        <legend>Tarefa atual</legend>
        <label>Nome da Tarefa</label>
        <input class="w3-input w3-round" type="text" name="id" readonly value ="${task["id"]}" />
        `;
    pagHTML += `
        <label>Data Limite</label>
        <input class="w3-input w3-round" type="date" name="data_limite" value="${task["data_limite"]}" />
        <label>Descrição</label>
        <input class="w3-input w3-round" type="text" name="descrição" value="${task["descrição"]}" />
        <label for="executor">Executor da Tarefa</label>
        <select name="executor" id="executor">
      `;
    for (let i = 0; i < users.length; i++) {
      if (users[i]["id"] == task["executor"])
        pagHTML += `<option selected="selected" value="${users[i]["id"]}">${users[i]["nome"]}</option>`;
      else
        pagHTML += `<option value="${users[i]["id"]}">${users[i]["nome"]}</option>`;
    }

    pagHTML += `
        </select>
      </fieldset>
      <br />
      <button class="w3-btn w3-light-blue w3-mb-2 w3-round" type="submit">Registar</button>
    </form>
    `;
  }
  pagHTML += `<h2>  Lista de Tarefas  
          <a class="w3-btn w3-round w3-light-blue" href="/tasks/add">+</a>
        </h2>
        <div class="w3-container">
  `;
  pagHTML += task_table(tasks);

  pagHTML += `
      </div>
      <footer class="w3-container w3-blue">
                      <h5>Generated by RPCW2023 in ${data}</h5>
                  </footer>
              </div>
          </body>
      </html>
      `;
  return pagHTML;
};

exports.DetailTaskPage = function (tasks, idTask, data) {
  var pagHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" href="favicon.png" />
          <link rel="stylesheet" href="w3.css" />
          <title>Tasks Management</title>
        </head>
        <body>
          <div class="w3-card-4">
            <header class="w3-container w3-blue">
              <h1>Tasks Management</h1>
            </header>
      <h2>Adicionar um novo utilizador
      <a class="w3-btn w3-round w3-light-blue" href="/users/add">+</a> 
      </h2>
  
    `;
  pagHTML += `<h2>  Lista de Tarefas  
          <a class="w3-btn w3-round w3-light-blue" href="/tasks/add">+</a>
        </h2>
        <div class="w3-container">
      `;
  pagHTML += task_table(tasks);

  pagHTML += `</div>
      <div class="w3-panel w3-round w3-border w3-border-blue w3-padding-16">
    `;
  var task;
  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i]);
    if (tasks[i]["id"] == idTask) {
      task = tasks[i];
      break;
    }
  }
  for (const key of Object.keys(task))
    pagHTML += `<p><b>${key}</b>: ${task[key]}</p>`;

  pagHTML += `
  </div>
  <footer class="w3-container w3-blue">
                      <h5>Generated by RPCW2023 in ${data}</h5>
                  </footer>
              </div>
          </body>
      </html>
      `;
  return pagHTML;
};
