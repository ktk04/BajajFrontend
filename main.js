fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    const searchInput = document.getElementById('search-input');

    function renderTable() {
      tbody.innerHTML = '';

      const searchTerm = searchInput.value.toLowerCase();

      data.employees.forEach(employee => {
        const name = employee.name || '';
        if (!searchTerm || name.toLowerCase().includes(searchTerm)) {
          const row = tbody.insertRow();
          const cell1 = row.insertCell();
          const cell2 = row.insertCell();
          const cell3 = row.insertCell();
          const cell4 = row.insertCell();

          cell1.innerHTML = name;
          cell2.innerHTML = employee.designation || '';
          cell3.innerHTML = employee.skills ? employee.skills.join(', ') : '';

          const projects = employee.projects;
          if (projects && projects.length > 0) {
            const projectList = document.createElement('ul');
            projects.forEach(project => {
              const listItem = document.createElement('li');
              const projectDetails = document.createElement('ul');

              const projectName = document.createElement('li');
              projectName.innerHTML = `<strong>Name:</strong> ${project.name || ''}`;
              projectDetails.appendChild(projectName);

              const projectDescription = document.createElement('li');
              projectDescription.innerHTML = `<strong>Description:</strong> ${project.description || ''}`;
              projectDetails.appendChild(projectDescription);

              const projectTeam = document.createElement('li');
              const teamList = document.createElement('ul');
              project.team.forEach(member => {
                const teamMember = document.createElement('li');
                teamMember.innerHTML = `<strong>${member.role || ''}:</strong> ${member.name || ''}`;
                teamList.appendChild(teamMember);
              });
              projectTeam.appendChild(teamList);
              projectDetails.appendChild(projectTeam);

              if (project.tasks && project.tasks.length > 0) {
                const projectTasks = document.createElement('li');
                const taskList = document.createElement('ul');
                project.tasks.forEach(task => {
                  const taskItem = document.createElement('li');
                  taskItem.innerHTML = `<strong>Task:</strong> ${task.name || ''}, <strong>Status:</strong> ${task.status || ''}`;
                  taskList.appendChild(taskItem);
                });
                projectTasks.appendChild(taskList);
                projectDetails.appendChild(projectTasks);
              }

              listItem.appendChild(projectDetails);
              projectList.appendChild(listItem);
            });
            cell4.appendChild(projectList);
          }
        }
      });
    }
    searchInput.addEventListener('input', renderTable);
    renderTable();
  });
