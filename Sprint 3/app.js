let isBattleMode = false;

function toggleMode() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    isBattleMode = mode === 'battle';
    
    const battleInput = document.getElementById('battle-input-container');
    const btnText = document.getElementById('btn-text');
    
    document.getElementById('error-state').classList.add('hidden');
    
    if (isBattleMode) {
        battleInput.classList.remove('hidden');
        btnText.textContent = 'Battle';
        document.getElementById('result-1').classList.remove('hidden');
        document.getElementById('result-2').classList.remove('hidden');
    } else {
        battleInput.classList.add('hidden');
        btnText.textContent = 'Search';
        document.getElementById('result-2').classList.add('hidden');
        document.getElementById('result-1').classList.remove('hidden');
        document.getElementById('battle-status-1').classList.add('hidden');
        document.getElementById('battle-status-2').classList.add('hidden');
    }
}

function resetUI() {
    document.getElementById('error-state').classList.add('hidden');
    document.getElementById('result-1').classList.add('hidden');
    document.getElementById('result-2').classList.add('hidden');
    
    const status1 = document.getElementById('battle-status-1');
    const status2 = document.getElementById('battle-status-2');
    
    status1.classList.add('hidden');
    status2.classList.add('hidden');
    
    status1.className = "battle-status hidden";
    status2.className = "battle-status hidden";
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        performAction();
    }
}

function setLoader(isLoading) {
    const btnText = document.getElementById('btn-text');
    const loader = document.getElementById('btn-loader');
    
    if (isLoading) {
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

async function fetchUserData(username) {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) {
        throw new Error(`Failed to fetch user: ${username}`);
    }
    const user = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const repos = await reposRes.json();
    
    const allReposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const allRepos = await allReposRes.json();
    
    let totalStars = 0;
    if (allRepos && allRepos.length > 0) {
        allRepos.forEach(repo => {
            totalStars += repo.stargazers_count;
        });
    }
    
    return { user, repos, totalStars };
}

function renderUser(data, playerIndex) {
    const { user, repos, totalStars } = data;
    
    document.getElementById(`avatar-${playerIndex}`).src = user.avatar_url;
    document.getElementById(`name-${playerIndex}`).textContent = user.name || user.login;
    document.getElementById(`username-${playerIndex}`).textContent = `@${user.login}`;
    document.getElementById(`bio-${playerIndex}`).textContent = user.bio || 'No bio provided.';
    
    const joinDate = new Date(user.created_at).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    document.getElementById(`joined-${playerIndex}`).textContent = `Joined ${joinDate}`;
    
    const urlEl = document.getElementById(`url-${playerIndex}`);
    if (user.blog) {
        urlEl.href = user.blog.includes('http') ? user.blog : `https://${user.blog}`;
        urlEl.textContent = user.blog.replace(/^https?:\/\//, '');
        urlEl.parentElement.classList.remove('hidden');
    } else {
        urlEl.parentElement.classList.add('hidden');
    }
    
    document.getElementById(`stars-${playerIndex}`).textContent = `${totalStars} Stars`;
    document.getElementById(`github-link-${playerIndex}`).href = user.html_url;
    
    const reposList = document.getElementById(`repos-${playerIndex}`);
    reposList.innerHTML = '';
    
    if (!repos || repos.length === 0) {
        reposList.innerHTML = '<li style="color: var(--color-on-surface-variant); font-size: 0.875rem;">No repositories found.</li>';
    } else {
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.className = 'repo-item';
            li.innerHTML = `
                <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
                <div class="repo-stats">
                    <span class="repo-stat-item"><span class="material-symbols-outlined">star</span>${repo.stargazers_count}</span>
                    <span class="repo-stat-item"><span class="material-symbols-outlined">fork_right</span>${repo.forks_count}</span>
                </div>
            `;
            reposList.appendChild(li);
        });
    }
    document.getElementById(`result-${playerIndex}`).classList.remove('hidden');
}

function renderBattleResult(data1, data2) {
    const status1 = document.getElementById('battle-status-1');
    const status2 = document.getElementById('battle-status-2');
    
    status1.classList.remove('hidden');
    status2.classList.remove('hidden');
    
    if (data1.totalStars > data2.totalStars) {
        status1.textContent = 'WINNER';
        status1.classList.add('is-winner');
        status2.textContent = 'LOSER';
        status2.classList.add('is-loser');
    } else if (data2.totalStars > data1.totalStars) {
        status2.textContent = 'WINNER';
        status2.classList.add('is-winner');
        status1.textContent = 'LOSER';
        status1.classList.add('is-loser');
    } else {
        status1.textContent = 'TIE';
        status1.classList.add('is-tie');
        status2.textContent = 'TIE';
        status2.classList.add('is-tie');
    }
}

async function performAction() {
    const u1 = document.getElementById('user-input-1').value.trim();
    const u2 = document.getElementById('user-input-2').value.trim();
    
    if (u1 === '') {
        console.warn('Player 1 username is required.');
        return;
    }
    
    if (isBattleMode && u2 === '') {
        console.warn('Player 2 username is required for battle mode.');
        return;
    }

    resetUI();
    setLoader(true);
    
    try {
        if (!isBattleMode) {
            const data = await fetchUserData(u1);
            renderUser(data, 1);
        } else {
            const [data1, data2] = await Promise.all([
                fetchUserData(u1),
                fetchUserData(u2)
            ]);
            renderUser(data1, 1);
            renderUser(data2, 2);
            renderBattleResult(data1, data2);
        }
    } catch (error) {
        console.error(error);
        document.getElementById('error-state').classList.remove('hidden');
    } finally {
        setLoader(false);
    }
}