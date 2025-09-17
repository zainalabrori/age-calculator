# 🎂 Age Calculator

A modern, responsive age calculator with multi-language support, dark mode, and real-time birthday countdown. Calculate your exact age in years, months, days, and get detailed statistics including total weeks, hours, minutes, and seconds you've been alive.

![Age Calculator Screenshot](https://via.placeholder.com/800x600/4f46e5/ffffff?text=Age+Calculator+Screenshot)

## ✨ Features

### 🎯 Core Functionality
- **Precise Age Calculation**: Calculates exact age in years, months, and days
- **Detailed Statistics**: Shows total weeks, days, hours, minutes, and seconds
- **Real-time Birthday Countdown**: Live countdown to your next birthday
- **Instant Results**: Updates calculations immediately as you select a date

### 🌍 Internationalization
- **Multi-language Support**: English and Indonesian (Bahasa Indonesia)
- **Localized Date Formats**: Dates displayed in language-appropriate formats
- **Localized Month Names**: Month names shown in selected language

### 🎨 User Interface
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface using Bootstrap 5
- **Smooth Animations**: Elegant transitions and number counting animations
- **Accessibility Features**: Screen reader support and keyboard navigation

### 🔧 Technical Features
- **Lightweight & Fast**: Pure JavaScript with minimal dependencies (only Bootstrap for UI)
- **Offline Ready**: Works completely offline once loaded
- **Local Storage**: Remembers your theme and language preferences
- **Copy to Clipboard**: Export your age calculation results
- **Developer API**: JavaScript API for programmatic access
- **Cross-Platform**: Works on Windows, Mac, Linux, and mobile devices
- **Browser Compatibility**: Works on all modern browsers including IE11

## ⚡ Quick Start

**Ready to use in 3 simple steps:**

1. 📥 Download or clone this repository
2. 📁 Open `index.html` in any web browser
3. 🎉 Start calculating ages immediately!

*No installation, no setup, no dependencies to install!*

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge, or IE11+)
- No server setup required - this is a static HTML application

### Installation

#### Method 1: Direct Use (Recommended)
1. Download the project files
2. Extract to your desired directory
3. Open `index.html` in your web browser
4. Start using the Age Calculator immediately!

#### Method 2: Using a simple HTTP server (Optional)
If you prefer to serve the files via HTTP:

```bash
# Using Python 3
python -m http.server 3000

# Using Node.js http-server
npx http-server -p 3000

# Using PHP
php -S localhost:3000
```

Then open your browser and navigate to `http://localhost:3000`

## 📖 Usage

### Basic Usage
1. Open the application in your web browser
2. Select your birth date using the date picker
3. View your age calculation results instantly
4. Explore additional statistics and birthday countdown

### Advanced Features

#### Theme Toggle
- Click the moon/sun icon in the top controls
- Or use the keyboard shortcut: `Alt + T`
- Your preference is saved automatically

#### Language Switch
- Click the language button in the top controls
- Or use the keyboard shortcut: `Alt + L`
- Choose between English and Indonesian
- Your preference is saved automatically

#### Copy Results
- Click the "Copy" button after calculating your age
- Results are copied to clipboard in text format
- Perfect for sharing or record-keeping

#### Keyboard Shortcuts
- `Alt + T`: Toggle theme (dark/light mode)
- `Alt + L`: Toggle language
- `Enter`: Calculate age (when date input is focused)

## 🏠️ Project Structure

```
age-calculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

### File Descriptions

#### `index.html`
The main HTML structure containing:
- Semantic HTML5 markup
- Bootstrap 5 integration
- Accessibility features (ARIA labels, screen reader support)
- Multi-language content structure

#### `styles.css`
Comprehensive CSS including:
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Dark/light mode support
- Smooth animations and transitions
- Accessibility enhancements (high contrast, reduced motion)

#### `script.js`
JavaScript functionality featuring:
- Age calculation algorithms
- Multi-language translation system
- Theme management
- Local storage for preferences
- Birthday countdown functionality
- Developer API for external integration

## 🔧 Configuration

### Customizing Languages
To add or modify languages, edit the `translations` object in `script.js`:

```javascript
const translations = {
  en: {
    title: "Age Calculator",
    // ... other translations
  },
  id: {
    title: "Kalkulator Usia",
    // ... other translations
  },
  // Add new language here
  fr: {
    title: "Calculateur d'Âge",
    // ... add French translations
  }
};
```

### Customizing Themes
Modify CSS custom properties in `styles.css`:

```css
:root {
  --primary-color: #4f46e5;        /* Main brand color */
  --primary-hover: #6366f1;        /* Hover state color */
  --background-main: #f9fafb;      /* Main background */
  /* ... other theme variables */
}
```

## 🌐 Browser Support

### Fully Supported
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Partial Support
- Internet Explorer 11 (with some limitations)
  - No CSS Grid support (falls back to flexbox)
  - No modern JavaScript features (ES6+)
  - No CSS custom properties (static colors used)

### Mobile Browsers
- iOS Safari 13+
- Android Chrome 80+
- Samsung Internet 12+

## 📱 Responsive Design

The application is fully responsive and optimized for:

### Desktop (1200px+)
- Full-width layout with all features visible
- Hover effects and advanced interactions
- Keyboard navigation support

### Tablet (768px - 1199px)
- Optimized touch targets
- Adjusted spacing and font sizes
- Maintained functionality

### Mobile (320px - 767px)
- Stacked layout for better touch interaction
- Larger buttons and touch targets
- Simplified navigation
- Optimized typography

## 🎯 API Reference

The application exposes a developer API via `window.ageCalculatorAPI`:

### Methods

#### `calculate(birthDateString)`
Calculate age for a given birth date.

```javascript
const result = window.ageCalculatorAPI.calculate('1990-05-15');
console.log(result);
// Output:
// {
//   success: true,
//   data: {
//     birthDate: '1990-05-15',
//     calculatedOn: '2024-01-15T12:00:00.000Z',
//     age: { years: 33, months: 8, days: 0 },
//     totals: { weeks: 1758, days: 12307, hours: 295368, minutes: 17722080, seconds: 1063324800 }
//   }
// }
```

#### `getCurrentLanguage()`
Get current language setting.

```javascript
const lang = window.ageCalculatorAPI.getCurrentLanguage();
console.log(lang); // 'en' or 'id'
```

#### `getCurrentTheme()`
Get current theme setting.

```javascript
const theme = window.ageCalculatorAPI.getCurrentTheme();
console.log(theme); // 'light' or 'dark'
```

#### `getUserTimezone()`
Get user's timezone.

```javascript
const timezone = window.ageCalculatorAPI.getUserTimezone();
console.log(timezone); // 'America/New_York'
```

## 🧪 Testing

### Manual Testing Checklist

#### Functionality Tests
- [ ] Age calculation accuracy for various dates
- [ ] Future date validation
- [ ] Empty date field validation
- [ ] Birthday countdown accuracy
- [ ] Copy to clipboard functionality

#### UI/UX Tests
- [ ] Theme toggle works correctly
- [ ] Language switching updates all text
- [ ] Responsive design on different screen sizes
- [ ] Animation smoothness
- [ ] Keyboard navigation

#### Browser Tests
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Internet Explorer 11 (basic functionality)

#### Accessibility Tests
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] High contrast mode support
- [ ] Reduced motion preference

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly across different browsers
5. Commit changes: `git commit -m "Add feature description"`
6. Push to branch: `git push origin feature-name`
7. Create a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test on multiple browsers and devices
- Update documentation if needed
- Consider accessibility in all changes

### Areas for Contribution
- Additional language translations
- New themes and color schemes
- Additional calculation features (zodiac signs, life events, etc.)
- Enhanced accessibility features
- Mobile app version
- Bug fixes and improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

### Reporting Issues
If you encounter any problems:
1. Check the browser console for errors
2. Try refreshing the page
3. Test in a different browser
4. Create an issue on GitHub with:
   - Browser and version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior

### Feature Requests
We'd love to hear your ideas! Create an issue on GitHub with:
- Clear description of the feature
- Use case or problem it solves
- Any mockups or examples

## 🏆 Acknowledgments

### Technologies Used
- **Bootstrap 5.3.3** - UI framework and components
- **Bootstrap Icons 1.11.0** - Icon set
- **JavaScript ES2021** - Core functionality
- **CSS3** - Styling and animations
- **HTML5** - Semantic markup

### Inspiration
This project was created to provide a modern, accessible, and feature-rich alternative to basic age calculators available online. Special attention was paid to internationalization, accessibility, and user experience.

---

**Made with ❤️ for everyone who wants to know exactly how long they've been around!**

---

*Last updated: January 2025*