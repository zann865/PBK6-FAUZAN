// Fungsi untuk mencari pengguna GitHub dengan async/await
async function searchUserWithAsyncAwait(username) {
    // Reset tampilan
    resetDisplay();
    
    // Tampilkan loader
    document.getElementById('loader').style.display = 'block';
    
    try {
        // Ambil data pengguna dengan metode async/await
        const userData = await fetchUserWithAsyncAwait(username);
        
        // Tampilkan data pengguna
        displayUserInfo(userData);
        
        // Ambil repositori dengan metode async/await
        const reposData = await fetchReposWithAsyncAwait(username);
        
        // Tampilkan repositori
        displayRepos(reposData);
    } catch (error) {
        // Tampilkan error
        showError(error);
    } finally {
        // Sembunyikan loader
        document.getElementById('loader').style.display = 'none';
    }
}

// Fungsi untuk mengambil data pengguna dengan async/await
async function fetchUserWithAsyncAwait(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw 'Pengguna tidak ditemukan';
        }
        throw `Error: ${response.status}`;
    }
    
    return await response.json();
}

// Fungsi untuk mengambil repositori dengan async/await
async function fetchReposWithAsyncAwait(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    
    if (!response.ok) {
        throw `Error mengambil repositori: ${response.status}`;
    }
    
    return await response.json();
}
