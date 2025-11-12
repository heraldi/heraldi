# Modern Love Message 💕✨

A modern, interactive love message application with beautiful animations, themes, and features. This is an enhanced version of the classic Love Message project with contemporary design and improved user experience.

## Features 🌟

- **Interactive Draggable Notes**: Move and arrange love notes with smooth drag-and-drop functionality
- **Multiple Themes**: Switch between different color themes (Default, Dark, Ocean, Forest)
- **3D Tilt Effects**: Papers respond to mouse movement with subtle 3D tilting
- **Background Music**: Add romantic background music to enhance the experience
- **Floating Hearts**: Animated floating hearts create a romantic atmosphere
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Touch Support**: Full touch support for mobile devices
- **Keyboard Shortcuts**: Use keyboard shortcuts for quick actions
- **Smooth Animations**: Beautiful transitions and micro-interactions throughout

## How to Use 🚀

1. **Open the Application**: Launch the `index.html` file in your favorite web browser
2. **Drag and Drop**: Click and drag any note to rearrange them on the screen
3. **Shuffle Layout**: Click the "Shuffle" button to randomly rearrange all notes
4. **Change Theme**: Click the "Change Theme" button to cycle through different color themes
5. **Play Music**: Click the "Play Music" button to add background music (optional)
6. **Keyboard Shortcuts**:
   - `Ctrl+S`: Shuffle papers
   - `Ctrl+M`: Toggle music
   - `Ctrl+T`: Change theme

## Customization 🎨

### Adding Your Own Photos

Replace the placeholder images in the `assets` folder:
- `photo1.jpg`, `photo2.jpg`, `photo3.jpg` with your own images

### Customizing Messages

Edit the text content in `index.html` to personalize your love messages:

```html
<div class="paper paper2" data-tilt>
    <div class="paper-content">
        <p>Your custom message here</p>
        <p class="highlight">Highlight important text</p>
    </div>
</div>
```

### Adding More Papers

To add more papers, simply add new elements to the main section in `index.html`:

```html
<div class="paper paper11" data-tilt>
    <div class="paper-content">
        <p>Your new message</p>
    </div>
</div>
```

Then add corresponding CSS styles in `style.css`:

```css
.paper11 {
    width: 280px;
    z-index: 2;
    transform: rotate(1deg);
    background: var(--gradient-2);
}
```

## Technical Details 🛠️

### Technologies Used

- **HTML5**: Semantic markup and modern features
- **CSS3**: Advanced styling with animations, transitions, and gradients
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Vanilla Tilt**: 3D tilt effect library
- **Google Fonts**: Beautiful typography

### Browser Compatibility

This application works best on modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Mobile Support

The application is fully responsive and supports touch interactions on mobile devices.

## File Structure 📁

```
modern-love-message/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/             # Images and media
    ├── heart-icon.svg  # Heart icon
    ├── photo1.jpg      # Photo placeholder 1
    ├── photo2.jpg      # Photo placeholder 2
    ├── photo3.jpg      # Photo placeholder 3
    └── love-song.mp3   # Background music (optional)
```

## Credits 🙏

- Original concept inspired by the Love Message project
- Enhanced with modern design principles and interactions
- Created with ❤️ for someone special

## License 📄

This project is open source and available under the MIT License.

---

Made with 💕 for someone special