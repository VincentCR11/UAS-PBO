// 1. Fungsi untuk Menambahkan Nilai ke Layar
function openValue(value) {
    // Mengambil elemen display berdasarkan ID
    document.getElementById('display').value += value;
}

// Fungsi pembantu untuk mengkonversi Derajat ke Radian
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

// 2. Fungsi untuk Menghitung Hasil
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;

    try {
        // --- Modifikasi untuk fungsi trigonometri ---

        // 1. Ganti 'x' dengan '*'
        expression = expression.replace(/x/g, '*'); 

        // 2. Ganti sin(X), cos(X), tan(X) menjadi Math.sin/cos/tan(degToRad(X))
        // Pola regex mencari 'sin(' diikuti oleh angka/ekspresi (hingga kurung tutup)
        
        // Mengganti sin(X)
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => {
            // Evaluasi ekspresi di dalam kurung (p1) terlebih dahulu, lalu konversi ke radian
            const degrees = eval(p1); 
            return `Math.sin(${degToRad(degrees)})`;
        });
        
        // Mengganti cos(X)
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => {
            const degrees = eval(p1); 
            return `Math.cos(${degToRad(degrees)})`;
        });

        // Mengganti tan(X)
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => {
            const degrees = eval(p1); 
            return `Math.tan(${degToRad(degrees)})`;
        });
        
        // ---------------------------------------------
        
        // Menggunakan fungsi eval() untuk menghitung ekspresi matematika akhir
        let result = eval(expression);

        // Membulatkan hasil untuk menghindari masalah floating-point yang panjang, misalnya ke 10 desimal
        display.value = Math.round(result * 10000000000) / 10000000000;
    } catch (error) {
        // Menangani jika ada ekspresi yang tidak valid
        display.value = 'Error'; 
    }
}

// 3. Fungsi untuk Menghapus Layar
function clearDisplay() {
    // Mengatur nilai display menjadi string kosong
    document.getElementById('display').value = '';
}