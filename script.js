/**
 * Age Calculator JavaScript
 * A comprehensive age calculation tool with multi-language support and dark mode
 */

// Translations (removed PDF related translations)
const translations = {
  en: {
    title: "Age Calculator",
    birth_date_label: "Birth Date",
    date_help: "Select your birth date to see results instantly",
    years: "Years",
    months: "Months", 
    days: "Days",
    detailed_stats: "Detailed Statistics",
    total_weeks: "Total Weeks:",
    total_days: "Total Days:",
    total_hours: "Total Hours:",
    total_minutes: "Total Minutes:",
    total_seconds: "Total Seconds:",
    next_birthday: "Next Birthday",
    copy_text: "Copy",
    results_title: "Age Calculation Results",
    error_future_date: "Birth date cannot be in the future.",
    error_no_date: "Please enter your birth date.",
    birthday_today: "🎉 Happy Birthday! 🎂",
    copied_success: "Results copied to clipboard!",
    month_names: ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"]
  },
  id: {
    title: "Kalkulator Usia",
    birth_date_label: "Tanggal Lahir",
    date_help: "Pilih tanggal lahir untuk melihat hasil secara langsung",
    years: "Tahun",
    months: "Bulan",
    days: "Hari", 
    detailed_stats: "Statistik Detail",
    total_weeks: "Total Minggu:",
    total_days: "Total Hari:",
    total_hours: "Total Jam:",
    total_minutes: "Total Menit:",
    total_seconds: "Total Detik:",
    next_birthday: "Ulang Tahun Berikutnya",
    copy_text: "Salin",
    results_title: "Hasil Perhitungan Usia",
    error_future_date: "Tanggal lahir tidak boleh di masa depan.",
    error_no_date: "Silakan masukkan tanggal lahir Anda.",
    birthday_today: "🎉 Selamat Ulang Tahun! 🎂",
    copied_success: "Hasil berhasil disalin ke clipboard!",
    month_names: ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                 "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  }
};

// Global variables
let currentLang = 'en';
let currentTheme = 'light';
let countdownInterval;
let ageData = null;

// DOM elements
const birthDateInput = document.getElementById('birthDate');
const resultsContainer = document.getElementById('resultsContainer');
const errorAlert = document.getElementById('errorAlert');
const errorMessage = document.getElementById('errorMessage');
const exportSection = document.getElementById('exportSection');

const yearsValue = document.getElementById('yearsValue');
const monthsValue = document.getElementById('monthsValue');
const daysValue = document.getElementById('daysValue');
const totalWeeks = document.getElementById('totalWeeks');
const totalDays = document.getElementById('totalDays');
const totalHours = document.getElementById('totalHours');
const totalMinutes = document.getElementById('totalMinutes');
const totalSeconds = document.getElementById('totalSeconds');
const birthdayCountdown = document.getElementById('birthdayCountdown');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Age Calculator initialized');
  setupEventListeners();
  loadUserPreferences();
  updateLanguage();
  
  // Set max date to today
  birthDateInput.max = new Date().toISOString().split('T')[0];
  console.log('Max date set to:', birthDateInput.max);
});

// Setup event listeners
function setupEventListeners() {
  console.log('Setting up event listeners');
  birthDateInput.addEventListener('change', calculateAge);
  birthDateInput.addEventListener('keypress', handleKeyPress);
  birthDateInput.addEventListener('blur', updateDateDisplay);
  
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  document.getElementById('copyText').addEventListener('click', copyToClipboard);
}

// Handle keyboard events
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    console.log('Enter key pressed, calculating age');
    calculateAge();
  }
}

// Update formatted date display
function updateDateDisplay() {
  if (birthDateInput.value) {
    const selectedDate = new Date(birthDateInput.value);
    const formattedDate = formatDateText(selectedDate);
    const dateDisplay = document.getElementById('formattedDateDisplay');
    dateDisplay.textContent = formattedDate;
    dateDisplay.classList.remove('d-none');
    console.log('Date display updated:', formattedDate);
  }
}

// Format date according to current language
function formatDateText(date) {
  const day = date.getDate();
  const month = translations[currentLang].month_names[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

// Toggle theme
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', currentTheme);
  
  const themeIcon = document.querySelector('#themeToggle i');
  themeIcon.className = currentTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  
  localStorage.setItem('ageCalc_theme', currentTheme);
  console.log('Theme toggled to:', currentTheme);
}

// Toggle language
function toggleLanguage() {
  const languages = ['en', 'id'];
  const currentIndex = languages.indexOf(currentLang);
  currentLang = languages[(currentIndex + 1) % languages.length];
  
  updateLanguage();
  localStorage.setItem('ageCalc_lang', currentLang);
  console.log('Language changed to:', currentLang);
  
  // Recalculate to update language-specific content
  if (birthDateInput.value) {
    calculateAge();
  }
}

// Update all text based on current language
function updateLanguage() {
  document.documentElement.lang = currentLang;
  document.getElementById('langText').textContent = currentLang.toUpperCase();
  
  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
  
  // Update formatted date display if exists
  if (birthDateInput.value) {
    updateDateDisplay();
  }
  console.log('Language updated to:', currentLang);
}

// Load user preferences
function loadUserPreferences() {
  const savedTheme = localStorage.getItem('ageCalc_theme') || 'light';
  const savedLang = localStorage.getItem('ageCalc_lang') || 'en';
  
  currentTheme = savedTheme;
  currentLang = savedLang;
  
  document.body.setAttribute('data-theme', currentTheme);
  const themeIcon = document.querySelector('#themeToggle i');
  themeIcon.className = currentTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  
  console.log('User preferences loaded:', { theme: currentTheme, language: currentLang });
}

// Main calculation function
function calculateAge() {
  console.log('Starting age calculation');
  
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  const birthDateValue = birthDateInput.value;
  
  hideResults();
  hideError();
  
  if (!birthDateValue) {
    console.log('No birth date provided');
    showError(translations[currentLang].error_no_date);
    return;
  }
  
  const birthDate = new Date(birthDateValue);
  const now = new Date();
  
  if (birthDate > now) {
    console.log('Birth date is in the future');
    showError(translations[currentLang].error_future_date);
    return;
  }
  
  console.log('Calculating age for birth date:', birthDate);
  ageData = calculateAgeComponents(birthDate, now);
  console.log('Age data calculated:', ageData);
  
  displayResults(ageData);
  startCountdown(birthDate, now);
  showResults();
}

// Calculate age components
function calculateAgeComponents(birthDate, now) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const diffMs = now - birthDate;
  const totalSecondsValue = Math.floor(diffMs / 1000);
  const totalMinutesValue = Math.floor(diffMs / (1000 * 60));
  const totalHoursValue = Math.floor(diffMs / (1000 * 60 * 60));
  const totalDaysValue = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeksValue = Math.floor(totalDaysValue / 7);
  
  console.log('Age components calculated:', {
    years, months, days,
    totalWeeks: totalWeeksValue,
    totalDays: totalDaysValue,
    totalHours: totalHoursValue,
    totalMinutes: totalMinutesValue,
    totalSeconds: totalSecondsValue
  });
  
  return {
    years,
    months,
    days,
    totalWeeks: totalWeeksValue,
    totalDays: totalDaysValue,
    totalHours: totalHoursValue,
    totalMinutes: totalMinutesValue,
    totalSeconds: totalSecondsValue
  };
}

// Display results with animation
function displayResults(data) {
  console.log('Displaying results with animation');
  animateValue(yearsValue, 0, data.years, 1000);
  animateValue(monthsValue, 0, data.months, 1000);
  animateValue(daysValue, 0, data.days, 1000);
  
  totalWeeks.textContent = data.totalWeeks.toLocaleString();
  totalDays.textContent = data.totalDays.toLocaleString();
  totalHours.textContent = data.totalHours.toLocaleString();
  totalMinutes.textContent = data.totalMinutes.toLocaleString();
  totalSeconds.textContent = data.totalSeconds.toLocaleString();
}

// Animate number changes
function animateValue(element, start, end, duration) {
  const startTimestamp = Date.now();
  const step = () => {
    const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Start birthday countdown
function startCountdown(birthDate, now) {
  console.log('Starting birthday countdown');
  let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (now > nextBirthday) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  
  function updateCountdown() {
    const currentTime = new Date();
    const diff = nextBirthday - currentTime;
    
    if (diff <= 0) {
      birthdayCountdown.innerHTML = `<span class="text-warning">${translations[currentLang].birthday_today}</span>`;
      clearInterval(countdownInterval);
      console.log('Birthday is today!');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const timeFormat = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    birthdayCountdown.innerHTML = timeFormat;
  }
  
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Show/hide functions
function showResults() {
  console.log('Showing results');
  resultsContainer.classList.remove('d-none');
  resultsContainer.classList.add('fade-in');
  exportSection.classList.remove('d-none');
}

function hideResults() {
  resultsContainer.classList.add('d-none');
  resultsContainer.classList.remove('fade-in');
  exportSection.classList.add('d-none');
}

function showError(message) {
  console.log('Showing error:', message);
  errorMessage.textContent = message;
  errorAlert.classList.remove('d-none');
}

function hideError() {
  errorAlert.classList.add('d-none');
}

// Copy to clipboard (PDF export functionality removed)
async function copyToClipboard() {
  if (!ageData || !birthDateInput.value) {
    console.log('No data to copy');
    return;
  }
  
  console.log('Copying results to clipboard');
  const birthDate = new Date(birthDateInput.value);
  const currentDate = new Date();
  
  const text = `
${translations[currentLang].title}

${translations[currentLang].birth_date_label}: ${formatDateText(birthDate)}
Generated on: ${formatDateText(currentDate)}

Age Breakdown:
${translations[currentLang].years}: ${ageData.years}
${translations[currentLang].months}: ${ageData.months}
${translations[currentLang].days}: ${ageData.days}

${translations[currentLang].detailed_stats}:
${translations[currentLang].total_weeks} ${ageData.totalWeeks.toLocaleString()}
${translations[currentLang].total_days} ${ageData.totalDays.toLocaleString()}
${translations[currentLang].total_hours} ${ageData.totalHours.toLocaleString()}
${translations[currentLang].total_minutes} ${ageData.totalMinutes.toLocaleString()}
${translations[currentLang].total_seconds} ${ageData.totalSeconds.toLocaleString()}
  `.trim();
  
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied successfully');
    
    // Show success feedback
    const copyBtn = document.getElementById('copyText');
    const originalContent = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="bi bi-check"></i> ' + translations[currentLang].copied_success;
    copyBtn.style.backgroundColor = 'var(--success-color)';
    
    setTimeout(() => {
      copyBtn.innerHTML = originalContent;
      copyBtn.style.backgroundColor = 'var(--primary-color)';
    }, 2000);
    
  } catch (err) {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    console.log('Text copied using fallback method');
  }
}

// API endpoint simulation (for demonstration)
function getAgeCalculationAPI(birthDateString) {
  console.log('API call simulation for:', birthDateString);
  const birthDate = new Date(birthDateString);
  const now = new Date();
  
  if (birthDate > now) {
    return {
      error: "Birth date cannot be in the future",
      success: false
    };
  }
  
  const ageData = calculateAgeComponents(birthDate, now);
  
  return {
    success: true,
    data: {
      birthDate: birthDateString,
      calculatedOn: now.toISOString(),
      age: {
        years: ageData.years,
        months: ageData.months,
        days: ageData.days
      },
      totals: {
        weeks: ageData.totalWeeks,
        days: ageData.totalDays,
        hours: ageData.totalHours,
        minutes: ageData.totalMinutes,
        seconds: ageData.totalSeconds
      }
    }
  };
}

// Detect user timezone (for professional addon)
function getUserTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('User timezone:', timezone);
  return timezone;
}

// Remove fade-in animation class after animation completes
resultsContainer.addEventListener('animationend', function() {
  this.classList.remove('fade-in');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    console.log('Theme toggle via keyboard shortcut');
    toggleTheme();
  }
  if (e.altKey && e.key === 'l') {
    e.preventDefault();
    console.log('Language toggle via keyboard shortcut');
    toggleLanguage();
  }
});

// Console API for developers
window.ageCalculatorAPI = {
  calculate: getAgeCalculationAPI,
  getCurrentLanguage: () => currentLang,
  getCurrentTheme: () => currentTheme,
  getUserTimezone: getUserTimezone
};

console.log('Age Calculator API available:', window.ageCalculatorAPI);