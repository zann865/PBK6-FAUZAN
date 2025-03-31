// Fungsi untuk mencari pengguna GitHub dengan callback
function searchUserWithCallback(username) {
    // Reset tampilan
    resetDisplay();
    
    // Tampilkan loader
    document.getElementById('loader').style.display = 'block';
    
    // Ambil data pengguna dengan metode callback
    fetchUserWithCallback(username, function(error, userData) {
        if (error) {
            showError(error);
            return;
        }
        
        // Tampilkan data pengguna
        displayUserInfo(userData);
        
        // Ambil repositori dengan metode callback
        fetchReposWithCallback(username, function(error, reposData) {
            // Sembunyikan loader
            document.getElementById('loader').style.display = 'none';
            
            if (error) {
                showError(`Error mengambil repositori: ${error}`);
                return;
            }
            
            // Tampilkan repositori
            displayRepos(reposData);
        });
    });
}

// Fungsi untuk mengambil data pengguna dengan XMLHttpRequest (metode callback)
function fetchUserWithCallback(username, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else if (xhr.status === 404) {
                callback('Pengguna tidak ditemukan');
            } else {
                callback(`Error: ${xhr.status}`);
            }
        }
    };
    
    xhr.open('GET', `https://api.github.com/users/${username}`, true);
    xhr.send();
}

// Fungsi untuk mengambil repositori dengan XMLHttpRequest (metode callback)
function fetchReposWithCallback(username, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback(`Error: ${xhr.status}`);
            }
        }
    };
    
    xhr.open('GET', `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, true);
    xhr.send();
}

// Fungsi untuk menampilkan informasi pengguna
function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    
    const userHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <div class="details">
            <h2>${user.name || user.login}</h2>
            <p>@${user.login}</p>
            <p>${user.bio || 'Tidak ada bio'}</p>
            <p>
                <span>${user.followers} Followers</span> | 
                <span>${user.following} Following</span> | 
                <span>${user.public_repos} Repositori</span>
            </p>
        </div>
    `;
    
    userInfoDiv.innerHTML = userHTML;
}

// Fungsi untuk menampilkan repositori
function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    
    if (repos.length === 0) {
        reposList.innerHTML = '<p>Tidak ada repositori yang ditemukan</p>';
        return;
    }
    
    let reposHTML = '';
    
    repos.forEach(repo => {
        reposHTML += `
            <li>
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'Tidak ada deskripsi'}</p>
                <div class="stats">
                    <span>⭐ ${repo.stargazers_count} stars</span>
                    <span>🍴 ${repo.forks_count} forks</span>
                    <span>📅 Diperbarui: ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </li>
        `;
    });
    
    reposList.innerHTML = reposHTML;
}

// Fungsi untuk menampilkan pesan error
function showError(message) {
    document.getElementById('loader').style.display = 'none';
    
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `<div class="error">${message}</div>`;
    
    document.getElementById('repos-list').innerHTML = '';
}

// Fungsi untuk mereset tampilan
function resetDisplay() {
    document.getElementById('user-info').innerHTML = '';
    document.getElementById('repos-list').innerHTML = '';
}
