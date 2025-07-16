
    const moodConfig = {
      english: [
        { key: 'sunset', label: 'Sunset Feels', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWUNIrSzKgQbP' },
        { key: 'coding', label: 'Coding Flow', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS' },
        { key: 'zen', label: 'Zen Mode', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u' },
        { key: 'road', label: 'On the Road', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa' },
        { key: 'dance', label: 'Dance Mood', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0BcQWzuB7ZO' },
        { key: 'cool', label: 'Cool & Confident', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb' }
      ],
      hindi: [
        { key: 'evening', label: 'Evening Vibes', url: 'https://open.spotify.com/embed/playlist/33zhqSa1b6BTFVnRTkQ4XY' },
        { key: 'brain', label: 'Brain Fuel', url: 'https://open.spotify.com/embed/playlist/14KtkIpsvzDSCXR24EqHCL' },
        { key: 'bollywood', label: 'Bollywood Beats', url: 'https://open.spotify.com/embed/playlist/1IndfFbwCx8WDLJAmBpj7w' },
        { key: 'calm', label: 'Calm Zone', url: 'https://open.spotify.com/embed/playlist/6oXpnfyh2iygnt9b8xtPch' },
        { key: 'retro', label: 'Retro Hindi', url: 'https://open.spotify.com/embed/playlist/6Y51Pek9Z7oxzCuUYz2Dcf' }
      ],
      punjabi: [
        { key: 'swag', label: 'Swag Vibe', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWStljCmevj7t' },
        { key: 'bhangra', label: 'Bhangra Beat', url: 'https://open.spotify.com/embed/playlist/6Z2bJGMn2uV2GSiM0wKvSv' },
        { key: 'road', label: 'Raah Da Safar', url: 'https://open.spotify.com/embed/playlist/3lot3HM1GHmXDzJFt1cjTb' },
        { key: 'sunset', label: 'Sohni Shaam', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcQNdt1GHNdg' },
        { key: 'old', label: 'Purane Geet', url: 'https://open.spotify.com/embed/playlist/1dXgxDANOqIcEX61lu46bq' }
      ]
    };

    let currentLanguage = 'english';
    let currentMood = null;
    let moodHistory = [];

    function renderMoodButtons() {
      const moodBox = document.getElementById('moodButtons');
      currentLanguage = document.getElementById('languageSelector').value;
      moodBox.innerHTML = "";
      moodConfig[currentLanguage].forEach(mood => {
        const btn = document.createElement('button');
        btn.textContent = mood.label;
        btn.onclick = () => selectMood(mood, btn);
        moodBox.appendChild(btn);
      });
    }

    function selectMood(mood, btn) {
      currentMood = mood;
      document.querySelectorAll('#moodButtons button').forEach(b => b.classList.remove('selected-btn'));
      btn.classList.add('selected-btn');
      fetchAndDisplaySongs(mood.url);
      displayQuote(mood.label);
      trackMood(mood.label);
      updateHistory();
      document.getElementById('introContent').style.display = 'none';
    }

    function fetchAndDisplaySongs(url) {
      const songBox = document.getElementById('songBox');
      songBox.innerHTML = `<iframe src="${url}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    }

    function displayQuote(label) {
      const quotes = [
        `You chose "${label}". Let the music set the mood.`,
        `${label} - Your vibe, your rhythm.`
      ];
      const quoteBox = document.getElementById('quoteBox');
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      quoteBox.innerText = random;
    }

    function trackMood(label) {
      const timestamp = new Date().toLocaleTimeString();
      moodHistory.unshift({ mood: label, language: currentLanguage, time: timestamp });
      if (moodHistory.length > 5) moodHistory.pop();
    }

    function updateHistory() {
      const historyBox = document.getElementById('historyBox');
      if (!moodHistory.length) return historyBox.innerHTML = '';
      let html = `<strong>Recent moods:</strong><ul>`;
      moodHistory.forEach(entry => {
        html += `<li>${entry.time} - Mood: <em>${entry.mood}</em> [${entry.language}]</li>`;
      });
      html += '</ul>';
      historyBox.innerHTML = html;
    }

    function resetApp() {
      document.getElementById('songBox').innerHTML = '';
      document.getElementById('quoteBox').innerHTML = '';
      document.getElementById('historyBox').innerHTML = '';
      document.getElementById('introContent').style.display = 'block';
      document.querySelectorAll('#moodButtons button').forEach(btn => btn.classList.remove('selected-btn'));
    }

    window.onload = renderMoodButtons;

