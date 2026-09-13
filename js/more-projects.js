(function () {
  const PROJECTS = [
    {
      id: 'halleder',
      title: 'Halleder',
      href: 'project-halleder.html',
      cover: 'img_/halleder_01.png?v=png4',
      tags: ['Fintech', 'B2B', 'Mobile', 'Super App'],
    },
    {
      id: 'roamly',
      title: 'Roamly',
      href: 'project-roamly.html',
      cover: 'img_/roamly_cover.png',
      tags: ['Travel', 'Mobile', 'UI/UX'],
    },
    {
      id: 'voya',
      title: 'Voya',
      href: 'project-voya.html',
      cover: 'img_/voya_cover.png?v=png2',
      tags: ['Travel', 'AI', 'Mobile', 'UI/UX'],
    },
    {
      id: 'tam-finans',
      title: 'Tam Finans Mobile',
      href: 'project1.html',
      cover: 'img_/Thumbnail.png',
      tags: ['Finance', 'UI/UX', 'User Flow'],
    },
    {
      id: 'lupi',
      title: 'Lupi',
      href: 'project2.html',
      cover: 'img_/product2.jpg',
      tags: ['Social', 'Matchmaking', 'UI/UX'],
    },
  ];

  const section = document.querySelector('.more-projects');
  const grid = document.querySelector('.more-projects-grid');
  if (!section || !grid) return;

  const currentId = (section.getAttribute('data-current') || '').trim();
  const currentPage = (window.location.pathname.split('/').pop() || '').trim();
  const pool = PROJECTS.filter(
    (project) => project.id !== currentId && project.href !== currentPage
  );

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = pool[i];
    pool[i] = pool[j];
    pool[j] = swap;
  }

  grid.innerHTML = pool
    .slice(0, 2)
    .map(
      (project) => `
      <a class="more-project-card" href="${project.href}" data-cursor="view" data-motion>
        <div class="more-project-cover">
          <span class="more-project-cover-img" style="background-image: url('${project.cover}')"></span>
        </div>
        <div class="more-project-body">
          <div class="tag-group">
            ${project.tags
              .map(
                (tag) =>
                  `<span class="tag"><span class="tag-text">${tag}</span></span>`
              )
              .join('')}
          </div>
          <h3 class="more-project-title">${project.title}</h3>
          <span class="more-project-cta">Explore <i class="bi bi-arrow-right"></i></span>
        </div>
      </a>`
    )
    .join('');
})();
