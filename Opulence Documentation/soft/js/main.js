document.addEventListener('DOMContentLoaded', () => {
  const progress = document.getElementById('progress');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const navSearch = document.getElementById('navSearch');
  const railLinks = document.querySelectorAll('#railList a');
  const sectionNodes = document.querySelectorAll('main section, main .hero');

  function updateProgress() {
    const root = document.documentElement;
    const max = root.scrollHeight - root.clientHeight;
    const value = max > 0 ? (root.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = value + '%';
  }

  if (progress) {
    updateProgress();
    document.addEventListener('scroll', updateProgress, { passive: true });
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  if (navSearch) {
    navSearch.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.querySelectorAll('.nav-group').forEach((group) => {
        let hasMatch = false;
        group.querySelectorAll('.nav-links li').forEach((item) => {
          const text = item.textContent.toLowerCase();
          const visible = !query || text.includes(query);
          item.style.display = visible ? '' : 'none';
          if (visible) hasMatch = true;
        });
        group.style.display = hasMatch ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('.faq-header').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const content = item.querySelector('.faq-content');
      const isOpen = button.classList.contains('active');

      document.querySelectorAll('.faq-header').forEach((header) => {
        header.classList.remove('active');
        const panel = header.parentElement.querySelector('.faq-content');
        if (panel) panel.style.maxHeight = null;
      });

      if (!isOpen) {
        button.classList.add('active');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  if (railLinks.length && sectionNodes.length) {
    const map = {};
    railLinks.forEach((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) map[id] = link;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        if (!map[id]) return;
        railLinks.forEach((link) => link.classList.remove('active'));
        map[id].classList.add('active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sectionNodes.forEach((section) => observer.observe(section));
  }
});