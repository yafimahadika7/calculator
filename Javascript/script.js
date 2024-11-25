// ******************* VIEW FUNCTIONS ******************* //
function switchThemeTo(theme) {
  let toggle = document.getElementById("theme-toggle");
  if (toggle.classList.contains("t-" + theme)) return;
  toggle.classList.remove("t-1");
  toggle.classList.remove("t-2");
  toggle.classList.remove("t-3");
  toggle.classList.add("t-" + theme);
  document.body.classList.remove("theme-1");
  document.body.classList.remove("theme-2");
  document.body.classList.remove("theme-3");
  document.body.classList.add("theme-" + theme);
}

// Menangani input dan operasi kalkulator
let screen = document.querySelector('.screen');
let currentInput = '0';
let previousInput = '';
let operator = null;

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', (event) => {
        let keyValue = event.target.dataset.keyValue;

        // Handle angka dan titik
        if (keyValue >= '0' && keyValue <= '9' || keyValue === '.') {
            if (currentInput === '0' && keyValue !== '.') {
                currentInput = keyValue; // Jika input pertama angka selain 0
            } else {
                currentInput += keyValue; // Tambahkan angka ke input saat ini
            }
            updateScreen(currentInput);
        }

        // Handle operasi matematika
        else if (keyValue === '+' || keyValue === '-' || keyValue === '×' || keyValue === '/') {
            if (previousInput !== '') {
                calculate(); // Hitung jika sudah ada operasi sebelumnya
            }
            operator = keyValue; // Set operator
            previousInput = currentInput; // Simpan input sebelumnya
            currentInput = ''; // Reset input saat ini
        }

        // Handle penghapusan input
        else if (keyValue === 'del') {
            currentInput = currentInput.slice(0, -1); // Hapus karakter terakhir
            if (currentInput === '') currentInput = '0'; // Set ke '0' jika kosong
            updateScreen(currentInput);
        }

        // Handle reset
        else if (keyValue === 'reset') {
            currentInput = '0';
            previousInput = '';
            operator = null;
            updateScreen(currentInput);
        }

        // Handle hasil perhitungan
        else if (keyValue === '=') {
            calculate();
            updateScreen(currentInput);
            previousInput = ''; // Reset setelah menghitung
            operator = null;
        }
    });
});

// Fungsi untuk update layar kalkulator
function updateScreen(value) {
    screen.textContent = value;
}

// Fungsi untuk menghitung hasil operasi
function calculate() {
    let result;
    if (operator === '+') {
        result = parseFloat(previousInput) + parseFloat(currentInput);
    } else if (operator === '-') {
        result = parseFloat(previousInput) - parseFloat(currentInput);
    } else if (operator === '×') {
        result = parseFloat(previousInput) * parseFloat(currentInput);
    } else if (operator === '/') {
        result = parseFloat(previousInput) / parseFloat(currentInput);
    }

    // Update input dengan hasil perhitungan
    currentInput = result.toString();
}
