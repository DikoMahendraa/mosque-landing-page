# Changelog

All notable changes to the Masjid Darussalam website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-08

### Added
- **Fasilitas (Facilities) Section** - New digital facilities for worship
  - Navigation dropdown menu for Fasilitas with 3 sub-pages
  - Hover dropdown on desktop, expandable accordion on mobile
  
- **Waktu Sholat (Prayer Times) Page** (`/fasilitas/waktu-sholat`)
  - Real-time clock with live countdown to next prayer
  - Daily prayer schedule (Subuh, Dzuhur, Ashar, Maghrib, Isya)
  - Visual indicators for upcoming prayer
  - Fetches prayer times from Aladhan API
  - Supports Jakarta coordinates (customizable)
  - Comprehensive documentation and comments for learning
  
- **Arah Kiblat (Qibla Direction) Page** (`/fasilitas/arah-kiblat`)
  - Interactive compass using device orientation sensors
  - Real-time qibla direction based on user location
  - Visual alignment indicator when facing Qibla
  - Great Circle formula for accurate bearing calculation
  - iOS permission handling support
  
- **Masjid Terdekat (Nearby Mosques) Page** (`/fasilitas/masjid-terdekat`)
  - Find nearby mosques within 5km radius
  - Distance calculation from user location
  - Integration with OpenStreetMap via Overpass API
  - Direct navigation to Google Maps
  - Mosque details (name, address, phone, opening hours)
  
- **Floating Prayer Time Widget**
  - Minimal bell icon button at bottom-right (1rem spacing)
  - Real-time countdown to next prayer
  - Expandable panel on hover (desktop) / tap (mobile)
  - Smooth slide animation from left
  - Always visible across all pages
  - Shows hours remaining badge on icon

### Enhanced
- **Mobile Responsiveness**
  - All Fasilitas pages fully optimized for mobile devices
  - Responsive grids: 2-3 columns depending on screen size
  - Touch-friendly button sizes (44px minimum)
  - Proper text wrapping and layout stacking
  - Location info cards adapt to screen width
  
- **Navigation Component**
  - Added support for dropdown menus
  - Smooth animations using Framer Motion
  - Accessible keyboard navigation
  - Mobile-friendly expandable menu items

### Fixed
- **Prayer Time Calculation**
  - Fixed "0j 0m lagi" bug when all prayers have passed
  - Now correctly calculates time until tomorrow's Fajr
  - Proper countdown across midnight
  
- **Nested Anchor Tags**
  - Resolved hydration errors in featured sections
  - Replaced Link wrappers with onClick handlers
  - Fixed nested `<a>` tag issues in event/kajian cards

### Technical Improvements
- Added comprehensive code documentation
  - Detailed inline comments explaining React patterns
  - Algorithm breakdowns for complex calculations
  - Performance optimization notes
  - Type safety with TypeScript guards
  
- Updated sitemap.ts with new Fasilitas pages
- Optimized component rendering with proper memoization
- Enhanced error handling for API calls
- Improved accessibility with ARIA labels

### Documentation
- Added extensive comments in Waktu Sholat page
  - State management explanations
  - useEffect hook documentation
  - Helper function algorithms
  - JSX rendering logic

---

## [1.0.0] - 2026-07-01

### Initial Release
- Homepage with hero section
- Events page with registration
- Kajian (Islamic studies) section
- Berita (News) section
- Keuangan (Finance transparency) page
- Structure/Organization page
- WhatsApp integration
- Dark mode support
- Responsive design
- SEO optimization

---

## Version Numbering

- **Major version** (X.0.0): Breaking changes or major new features
- **Minor version** (0.X.0): New features, backward compatible
- **Patch version** (0.0.X): Bug fixes and minor improvements

---

## Upcoming Features

### Planned for v1.2.0
- [ ] Push notifications for prayer times
- [ ] Islamic calendar (Hijri dates)
- [ ] Zakat calculator
- [ ] Quran reader integration
- [ ] User accounts for event registration
- [ ] Prayer time customization by location

### Under Consideration
- [ ] Mobile app (React Native)
- [ ] Donation tracking dashboard
- [ ] Live streaming for Jumat prayers
- [ ] Multi-language support (English, Arabic)
- [ ] Prayer time alarms/reminders
- [ ] Mosque capacity indicator

---

## Contributors

- Development Team - Masjid Darussalam
- API Integration: Aladhan API (Prayer Times), OpenStreetMap (Nearby Mosques)
- Design System: shadcn/ui, Tailwind CSS
- Animations: Framer Motion

---

## Support

For bug reports or feature requests, please contact the development team.

**Masjid Darussalam Digital Platform**
Version 1.1.0 - Built with ❤️ for the community
