const search = document.getElementById('themeSearch');
  const families = document.querySelectorAll('.family');
  const noResults = document.getElementById('noResults');

  search.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    let totalVisible = 0;

    families.forEach(fam => {
      const famName = fam.getAttribute('data-family');
      let famVisible = 0;
      fam.querySelectorAll('.preset-card').forEach(card => {
        const haystack = (famName + ' ' + card.getAttribute('data-search') + ' ' + card.querySelector('h3').textContent).toLowerCase();
        const match = q === '' || haystack.includes(q);
        card.classList.toggle('no-match', !match);
        if(match) famVisible++;
      });
      fam.classList.toggle('no-match', famVisible === 0);
      totalVisible += famVisible;
    });

    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  });