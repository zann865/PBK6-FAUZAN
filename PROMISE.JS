// Fungsi untuk mencari pengguna GitHub dengan promise
function searchUserWithPromise(username) {
    // Reset tampilan
    resetDisplay();
    
    // Tampilkan loader
    document.getElementById('loader').style.display = 'block';
    
    // Ambil data pengguna dengan metode promise
    fetchUserWithPromise(username)
        .then(userData => {
            // Tampilkan data pengguna
            displayUserInfo(userData);
            
            // Lanjutkan dengan mengambil repositori
            return fetchReposWithPromise(username);
        })
        .then(reposData => {
            // Tampilkan repositori
            displayRepos(reposData);
        })
        .catch(error => {
            // Tampilkan error
            showError(error);
        })
        .finally(() => {
            // Sembunyikan loader
            document.getElementById('loader').style.display = 'none';
        });
}

// Fungsi untuk mengambil data pengguna dengan fetch (metode promise)
function fetchUserWithPromise(username) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Pengguna tidak ditemukan');
                    }
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error.message));
    });
}

// Fungsi untuk mengambil repositori dengan fetch (metode promise)
function fetchReposWithPromise(username) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`Error mengambil repositori: ${error.message}`));
    });
}
