# 🌸 Catalina's Gallery

A beautiful, password-protected photo and video gallery website.

## Features

- 🔒 **Password Protection** - Secure access with customizable password
- 📸 **Photo Gallery** - Beautiful grid layout for photos
- 🎥 **Video Support** - Upload and view videos
- 🔍 **Filter by Type** - Filter to show all, photos only, or videos only
- 🖼️ **Lightbox View** - Full-screen viewing with keyboard navigation
- 📱 **Responsive Design** - Works beautifully on mobile and desktop
- 💾 **Browser Storage** - Media stored locally in browser (no server needed)

## Setup

### 1. Change Password

Edit `script.js` and change the password on line 2:

```javascript
const PASSWORD = 'catalina2024'; // Change this to your preferred password
```

### 2. Open in Browser

Simply open `index.html` in your web browser. No server required!

### 3. Login

Enter the password you set to access the gallery.

## Usage

### Adding Media

1. **Using Upload Button**: Click "Choose Files" button and select photos or videos
2. **Direct Upload**: Files are stored in your browser's local storage

### Viewing Media

- Click any photo or video to view in full screen
- Use arrow keys (← →) or navigation buttons to browse
- Press ESC or click the X to close
- Filter by "All", "Photos", or "Videos" using the tabs

### Keyboard Shortcuts

- `←` Previous media
- `→` Next media
- `ESC` Close lightbox

## File Structure

```
cherryfever/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # JavaScript functionality
├── photos/             # Store photos here (optional)
├── videos/             # Store videos here (optional)
└── README.md           # This file
```

## Customization

### Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary: #ff6b9d;      /* Main pink color */
    --secondary: #c44569;    /* Darker pink */
    --light: #ffeef8;        /* Light background */
    --dark: #2d3436;         /* Text color */
}
```

### Design

The entire design is customizable through `style.css`. Feel free to modify colors, layouts, animations, and more!

## Technical Details

- **No Backend Required** - Pure HTML, CSS, and JavaScript
- **Storage**: Uses browser localStorage for media persistence
- **Security**: Session-based password protection (client-side)
- **Compatibility**: Works in all modern browsers

## Important Notes

⚠️ **Storage Limitation**: Browser localStorage has limits (usually 5-10MB). For large galleries, consider using a backend solution.

⚠️ **Security**: This uses client-side password protection, which is suitable for casual privacy but not for highly sensitive content. For production use, implement server-side authentication.

⚠️ **Data Persistence**: Media is stored in browser storage. Clearing browser data will delete all uploaded media.

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to repository Settings > Pages
3. Select main branch as source
4. Your site will be live at `https://yourusername.github.io/cherryfever`

### Other Hosting

Simply upload all files to any web host. No special configuration needed!

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

Made with 💖 for Catalina
