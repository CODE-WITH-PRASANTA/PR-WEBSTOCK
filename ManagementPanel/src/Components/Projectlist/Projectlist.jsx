import React from 'react'
import './Projectlist.css'

const projectsData = [
  {
    id: 'PRJ-A',
    name: 'Project A',
    owner: 'John Doe',
    team: [
      { initials: 'AH', color: '#F472B6' },
      { initials: 'MK', color: '#38BDF8' },
      { initials: 'RT', color: '#818CF8' },
    ],
    extra: 1,
    priority: 'Medium',
    tasksTotal: 19,
    tasksDone: 10,
    status: 'Pending',
  },
  {
    id: 'PRJ-B',
    name: 'Project B',
    owner: 'Sarah Smith',
    team: [
      { initials: 'SS', color: '#FB7185' },
      { initials: 'ON', color: '#34D399' },
    ],
    extra: 0,
    priority: 'Low',
    tasksTotal: 25,
    tasksDone: 18,
    status: 'In Progress',
  },
  {
    id: 'PRJ-C',
    name: 'Project C',
    owner: 'Olivia Brown',
    team: [
      { initials: 'OB', color: '#60A5FA' },
      { initials: 'GC', color: '#A78BFA' },
    ],
    extra: 0,
    priority: 'High',
    tasksTotal: 30,
    tasksDone: 25,
    status: 'Completed',
  },
  {
    id: 'PRJ-D',
    name: 'Project D',
    owner: 'David Martinez',
    team: [
      { initials: 'DM', color: '#F59E0B' },
      { initials: 'JV', color: '#FB7185' },
    ],
    extra: 0,
    priority: 'Low',
    tasksTotal: 15,
    tasksDone: 10,
    status: 'Pending',
  },
  {
    id: 'PRJ-E',
    name: 'Project E',
    owner: 'Ethan Green',
    team: [
      { initials: 'EG', color: '#FB7185' },
      { initials: 'NL', color: '#F472B6' },
      { initials: 'KP', color: '#34D399' },
    ],
    extra: 1,
    priority: 'Medium',
    tasksTotal: 40,
    tasksDone: 30,
    status: 'Completed',
  },
  {
    id: 'PRJ-F',
    name: 'Project F',
    owner: 'Jack Robinson',
    team: [
      { initials: 'JR', color: '#60A5FA' },
      { initials: 'TW', color: '#A78BFA' },
    ],
    extra: 0,
    priority: 'High',
    tasksTotal: 12,
    tasksDone: 10,
    status: 'In Progress',
  },
  {
    id: 'PRJ-G',
    name: 'Project G',
    owner: 'Ava Scott',
    team: [
      { initials: 'AS', color: '#F472B6' },
      { initials: 'BC', color: '#38BDF8' },
    ],
    extra: 2,
    priority: 'Low',
    tasksTotal: 22,
    tasksDone: 14,
    status: 'Completed',
  },
  {
    id: 'PRJ-H',
    name: 'Project H',
    owner: 'Sophia Miller',
    team: [
      { initials: 'SM', color: '#818CF8' },
      { initials: 'LK', color: '#34D399' },
    ],
    extra: 0,
    priority: 'High',
    tasksTotal: 17,
    tasksDone: 16,
    status: 'Completed',
  },
]

const priorityConfig = {
  High: { icon: '↑', className: 'priority--high' },
  Medium: { icon: '↕', className: 'priority--medium' },
  Low: { icon: '↓', className: 'priority--low' },
}

const statusConfig = {
  Pending: 'status--pending',
  'In Progress': 'status--progress',
  Completed: 'status--completed',
}

const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M15 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 12h8M8 16h8M8 8h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 7h16M9 7V4h6v3m-8 0 1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProjectList = () => {
  return (
    <section className="pl-card" aria-labelledby="pl-heading">
      <header className="pl-card__header">
        <h2 className="pl-card__title" id="pl-heading">
          Projects
        </h2>
        <button type="button" className="pl-card__viewall">
          View All
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* Responsive table container wrapper */}
      <div className="pl-table__wrap">
        <table className="pl-table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Team</th>
              <th scope="col">Owner</th>
              <th scope="col">Priority</th>
              <th scope="col">Tasks</th>
              <th scope="col">Progress</th>
              <th scope="col">Status</th>
              <th scope="col" className="pl-table__actionsHead">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project) => {
              const priority = priorityConfig[project.priority]
              const progress = Math.round((project.tasksDone / project.tasksTotal) * 100)

              return (
                <tr className="pl-row" key={project.id}>
                  <td className="pl-cell pl-cell--project" data-label="Project">
                    <div className="pl-project__container">
                      <span className="pl-project__dot" aria-hidden="true" />
                      <span className="pl-project__name">{project.name}</span>
                    </div>
                  </td>

                  <td className="pl-cell pl-cell--team" data-label="Team">
                    <div className="pl-avatars">
                      {project.team.map((member, idx) => (
                        <span
                          className="pl-avatar"
                          key={member.initials + idx}
                          style={{ backgroundColor: member.color, zIndex: project.team.length - idx }}
                          title={member.initials}
                        >
                          {member.initials}
                        </span>
                      ))}
                      {project.extra > 0 && (
                        <span className="pl-avatar pl-avatar--extra" style={{ zIndex: 0 }}>
                          +{project.extra}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="pl-cell pl-cell--owner" data-label="Owner">
                    <span className="pl-cell__value">{project.owner}</span>
                  </td>

                  <td className="pl-cell pl-cell--priority" data-label="Priority">
                    <span className={`pl-priority ${priority.className}`}>
                      <span className="pl-priority__icon" aria-hidden="true">
                        {priority.icon}
                      </span>
                      {project.priority}
                    </span>
                  </td>

                  <td className="pl-cell pl-cell--num" data-label="Tasks">
                    <span className="pl-cell__value">{project.tasksTotal}</span>
                  </td>

                  <td className="pl-cell pl-cell--progress" data-label="Progress">
                    <div className="pl-progress">
                      <span className="pl-progress__count">{project.tasksDone}</span>
                      <div className="pl-progress__track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                        <div className="pl-progress__fill" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </td>

                  <td className="pl-cell pl-cell--status" data-label="Status">
                    <span className={`pl-status ${statusConfig[project.status]}`}>{project.status}</span>
                  </td>

                  <td className="pl-cell pl-cell--actions" data-label="Actions">
                    <div className="pl-actions">
                      <button type="button" className="pl-iconBtn pl-iconBtn--doc" aria-label={`View ${project.name} document`}>
                        <IconDoc />
                      </button>
                      <button type="button" className="pl-iconBtn pl-iconBtn--edit" aria-label={`Edit ${project.name}`}>
                        <IconEdit />
                      </button>
                      <button type="button" className="pl-iconBtn pl-iconBtn--delete" aria-label={`Delete ${project.name}`}>
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProjectList