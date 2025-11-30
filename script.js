/* ...existing code... */
// Remove cinematic effects and add viewfinder functionality
document.addEventListener('DOMContentLoaded', function() {
    // --- CONSTANTS ---
    const FONT_OPTIONS = [
        // Sans-serif (clean modern)
        { name: 'Poppins', value: "'Poppins', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Inter', value: "'Inter', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Roboto', value: "'Roboto', sans-serif", weights: [100, 300, 400, 500, 700, 900] },
        { name: 'Open Sans', value: "'Open Sans', sans-serif", weights: [300, 400, 500, 600, 700, 800] },
        { name: 'Montserrat', value: "'Montserrat', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Lato', value: "'Lato', sans-serif", weights: [100, 300, 400, 700, 900] },
        { name: 'Source Sans Pro', value: "'Source Sans Pro', sans-serif", weights: [200, 300, 400, 600, 700, 900] },
        // Serif (luxury/classic)
        { name: 'Playfair Display', value: "'Playfair Display', serif", weights: [400, 500, 600, 700, 800, 900] },
        { name: 'Merriweather', value: "'Merriweather', serif", weights: [300, 400, 700, 900] },
        { name: 'Lora', value: "'Lora', serif", weights: [400, 500, 600, 700] },
        { name: 'Cinzel', value: "'Cinzel', serif", weights: [400, 500, 600, 700, 800, 900] },
        // Stylish/creative
        { name: 'Raleway', value: "'Raleway', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Josefin Sans', value: "'Josefin Sans', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700] },
        { name: 'Quicksand', value: "'Quicksand', sans-serif", weights: [300, 400, 500, 600, 700] },
        { name: 'Nunito', value: "'Nunito', sans-serif", weights: [200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Outfit', value: "'Outfit', sans-serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
        { name: 'Space Grotesk', value: "'Space Grotesk', sans-serif", weights: [300, 400, 500, 600, 700] },
        { name: 'DM Sans', value: "'DM Sans', sans-serif", weights: [400, 500, 700] },
        // Elegant/luxury accents
        { name: 'Great Vibes', value: "'Great Vibes', cursive", weights: [400] },
        { name: 'Dancing Script', value: "'Dancing Script', cursive", weights: [400, 500, 600, 700] },
        { name: 'Cormorant Garamond', value: "'Cormorant Garamond', serif", weights: [300, 400, 500, 600, 700] },
    ];

    const FONT_WEIGHT_NAME_MAP = {
        100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular',
        500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black'
    };

    const TEXT_ALIGN_OPTIONS = [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'right' },
    ];
    
    const socialOptions = {
        instagram: { icon: 'fab fa-instagram', label: 'Instagram', brandColor: '#E4405F', ariaLabel: 'Open Instagram profile' },
        youtube: { icon: 'fab fa-youtube', label: 'YouTube', brandColor: '#FF0000', ariaLabel: 'Open YouTube channel' },
        x: { 
            svgContent: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" style="fill:currentColor;"><path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path></svg>',
            label: 'X (Twitter)',
            brandColor: '#FFFFFF', // Brand color white for glow on dark background
            ariaLabel: 'Open X (Twitter) profile' 
        },
        facebook: { icon: 'fab fa-facebook', label: 'Facebook', brandColor: '#1877F2', ariaLabel: 'Open Facebook profile' },
        linkedin: { icon: 'fab fa-linkedin', label: 'LinkedIn', brandColor: '#0A66C2', ariaLabel: 'Open LinkedIn profile' },
        tiktok: { icon: 'fab fa-tiktok', label: 'TikTok', brandColor: '#00F2EA', ariaLabel: 'Open TikTok profile' }, // Primary color for glow (cyan)
        snapchat: { icon: 'fab fa-snapchat', label: 'Snapchat', brandColor: '#FFFC00', ariaLabel: 'Open Snapchat profile' },
        whatsapp: { icon: 'fab fa-whatsapp', label: 'WhatsApp', brandColor: '#25D366', ariaLabel: 'Open WhatsApp chat' },
        telegram: { icon: 'fab fa-telegram', label: 'Telegram', brandColor: '#24A1DE', ariaLabel: 'Open Telegram chat' },
        pinterest: { icon: 'fab fa-pinterest', label: 'Pinterest', brandColor: '#E60023', ariaLabel: 'Open Pinterest profile' },
        email: { icon: 'fas fa-envelope', label: 'Email', brandColor: '#EA4335', ariaLabel: 'Send an email' },
        phone: { icon: 'fas fa-phone', label: 'Phone', brandColor: '#00b894', ariaLabel: 'Call phone number' },
        custom: { icon: 'fas fa-link', label: 'Custom Link', brandColor: '#7A8C98', ariaLabel: 'Open custom link' }, // New custom link option
    };

    // --- STATE MANAGEMENT ---
    let cardState = {
        name: 'Alex Morgan',
        title: 'Creative Director',
        company: 'Visionary Studio',
        quote: 'Design is intelligence made visible.',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        address: '1234 Sunset Blvd, Los Angeles, CA', 
        photo: 'ai_avatar.png', 
        photoSettings: { 
            size: 140, 
            borderRadius: 50, 
            filter: 'none', 
            filterValue: 100, 
            glow: {
                enabled: false,
                color: '#D4AF37', 
                spread: 0 
            },
            show: true // NEW: whether profile photo is shown
        },
        theme: 'luxury',
        emojis: {
            enabled: true,
            size: 'medium',
            // `speed` is kept in state but no UI control for it currently
            speed: 'normal', 
            custom: '', 
            density: 50 
        },
        socialLinks: [
            { type: 'instagram', url: 'https://instagram.com/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
            { type: 'linkedin', url: 'https://linkedin.com/in/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
            { type: 'x', url: 'https://x.com/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
        ],
        socialLayout: 'full-label',
        fullLabelAlignment: 'center',
        defaultSocialIconColor: '#FFFFFF',
        typography: {
            name: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: 35.2, 
                fontWeight: '600',
                textAlign: 'center',
                color: '#FFFFFF'
            },
            title: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16, 
                fontWeight: '400',
                textAlign: 'center',
                color: '#AAAAAA'
            },
            company: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: 16, 
                fontWeight: '400',
                textAlign: 'center',
                color: '#FFFFFF'
            },
            address: { 
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                fontWeight: '400',
                textAlign: 'center',
                color: '#CCCCCC'
            },
            quote: {
                fontFamily: "'Playfair Display', serif",
                fontSize: 17.6, 
                fontWeight: '700', 
                textAlign: 'center',
                color: '#FFFFFF'
            },
            label: {                                            // NEW: Label typography defaults
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
                fontWeight: '700',
                textAlign: 'center',
                color: '#FFFFFF'
            },
        },
        textElementOrder: ['photo', 'name', 'title', 'company', 'address', 'quote', 'links', 'vcard'] 
    };

    // --- UNDO/REDO HISTORY ---
    let history = [];
    let historyPointer = -1;
    const MAX_HISTORY_SIZE = 50; 

    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function pushStateToHistory() {
        if (historyPointer >= 0 && JSON.stringify(history[historyPointer]) === JSON.stringify(cardState)) {
            return; 
        }

        if (historyPointer < history.length - 1) {
            history.splice(historyPointer + 1);
        }
        
        history.push(deepCopy(cardState));
        historyPointer++;

        if (history.length > MAX_HISTORY_SIZE) {
            history.shift();
            historyPointer--;
        }
        updateUndoRedoButtons();
    }

    function undo() {
        if (historyPointer > 0) {
            historyPointer--;
            cardState = deepCopy(history[historyPointer]);
            renderPreview();
            updateControls(); 
            renderSocialLinksBuilder();
            generateTextElementOrderBuilder();
            updateUndoRedoButtons();
        }
    }

    function redo() {
        if (historyPointer < history.length - 1) {
            historyPointer++;
            cardState = deepCopy(history[historyPointer]);
            renderPreview();
            updateControls(); 
            renderSocialLinksBuilder();
            generateTextElementOrderBuilder();
            updateUndoRedoButtons();
        }
    }

    function updateUndoRedoButtons() {
        const undoDisabled = historyPointer <= 0;
        const redoDisabled = historyPointer >= history.length - 1;
        if (controls.undoBtns && controls.undoBtns.length) {
            controls.undoBtns.forEach(b => b.disabled = undoDisabled);
        }
        if (controls.redoBtns && controls.redoBtns.length) {
            controls.redoBtns.forEach(b => b.disabled = redoDisabled);
        }
    }

    // --- DOM ELEMENT SELECTORS ---
    // Declare controls object, will be populated in initialize
    const controls = {}; 
    // Ensure ecard element is defined before it's used
    let ecard;
    let preview = {};
    let globalDropdownContainer = null;
    let activeSocialLinkIndex = -1; 

    const EMOJI_OPTIONS = [
  // Luxury / Celebration
  '✨', '💎', '👑', '🌟', '⚜️', '🥂', '💖', '💯', '🎉', '🎁', '🎈', '🚀',
  '🔥', '❤️', '🤩', '🥳', '🏆', '🥇', '📈', '🍀', '😎',

  // Beauty & Makeup
  '💄', '💋', '👄', '💅', '🌸', '🌹', '🌺', '🌷', '🪞', '👗', '👠',

  // Barber / Salon
  '💈', '✂️', '💇‍♂️', '💇‍♀️', '🪒', '🧴', '🪮', '🕶️',

  // Photography / Videography
  '📸', '🎥', '📹', '📷', '🎞️', '🎬', '📽️', '💿', '🖼️',

  // Music / Events
  '🎶', '🎤', '🎧', '🎼',

  // Tech / Digital
  '💡', '📱', '💻', '🖥️', '🌐',

  // Food / Café / Lifestyle
  '🍸', '☕', '🍷', '🍽️'
];

    // NEW: map themes to emoji sets so themes only spawn relevant emojis
    const THEME_EMOJI_MAP = {
        luxury: ['✨','💎','👑','🌟','⚜️','🥂','🎉'],
        tech: ['💡','📱','💻','🖥️','🌐','🚀'],
        beauty: ['💄','💋','💅','🌸','🌹','🌺','👗'],
        barber: ['💈','✂️','💇‍♂️','💇‍♀️','🪒','🧴'],
        media: ['📸','🎥','🎬','📷','🎞️'],
        fun: ['🎉','🎈','🎁','😎','🔥','🍸','🍷']
    };

    function setupEventListeners() {
        controls.name.addEventListener('input', e => updateState({ name: e.target.value }));
        controls.title.addEventListener('input', e => updateState({ title: e.target.value }));
        controls.company.addEventListener('input', e => updateState({ company: e.target.value }));
        controls.quote.addEventListener('input', e => updateState({ quote: e.target.value }));
        controls.email.addEventListener('input', e => updateState({ email: e.target.value }));
        controls.phone.addEventListener('input', e => updateState({ phone: e.target.value }));
        controls.address.addEventListener('input', e => updateState({ address: e.target.value })); 
        controls.photoUpload.addEventListener('change', (e) => {
            handlePhotoUpload(e);
            animateCardRefresh();
        });
        
        controls.photoSize.addEventListener('input', e => updatePhotoSetting('size', parseInt(e.target.value, 10)));
        controls.photoBorderRadius.addEventListener('input', e => updatePhotoSetting('borderRadius', parseInt(e.target.value, 10)));
        
        controls.photoFilter.addEventListener('change', e => {
            const newFilter = e.target.value;
            let newFilterValue;

            switch (newFilter) {
                case 'none':
                    newFilterValue = 0; 
                    break;
                case 'grayscale':
                case 'sepia':
                case 'invert':
                case 'hue-rotate':
                    newFilterValue = 100; 
                    break;
                case 'blur':
                    newFilterValue = 0; 
                    break;
                case 'brightness':
                case 'contrast':
                case 'saturate':
                    newFilterValue = 50; 
                    break;
                default:
                    newFilterValue = 100;
            }

            updatePhotoSetting('filter', newFilter);
            updatePhotoSetting('filterValue', newFilterValue); 
        });

        controls.photoFilterIntensity.addEventListener('input', e => {
            updatePhotoSetting('filterValue', parseInt(e.target.value, 10), false); 
        });
        controls.photoFilterIntensity.addEventListener('change', e => {
            updatePhotoSetting('filterValue', parseInt(e.target.value, 10), true); 
        });
        
        controls.photoGlowToggle.addEventListener('change', e => {
            updatePhotoSetting('glow', { ...cardState.photoSettings.glow, enabled: e.target.checked });
        });
        controls.photoGlowColor.addEventListener('input', e => {
            updatePhotoSetting('glow', { ...cardState.photoSettings.glow, color: e.target.value }, false);
        });
        controls.photoGlowColor.addEventListener('change', e => {
            updatePhotoSetting('glow', { ...cardState.photoSettings.glow, color: e.target.value }, true);
        });
        controls.photoGlowSpread.addEventListener('input', e => {
            updatePhotoSetting('glow', { ...cardState.photoSettings.glow, spread: parseInt(e.target.value, 10) }, false);
        });
        controls.photoGlowSpread.addEventListener('change', e => {
            updatePhotoSetting('glow', { ...cardState.photoSettings.glow, spread: parseInt(e.target.value, 10) }, true);
        });

        // NEW: show/hide profile photo toggle
        controls.photoShowToggle.addEventListener('change', e => {
            updatePhotoSetting('show', e.target.checked);
        });

        // Theme and Emoji controls
        controls.themeSelector.addEventListener('click', e => {
            if (e.target.classList.contains('theme-option')) {
                updateState({ theme: e.target.dataset.theme });
            }
        });
        controls.emojiToggle.addEventListener('change', e => updateState({ emojis: { ...cardState.emojis, enabled: e.target.checked } }));
        controls.emojiSize.addEventListener('change', e => updateState({ emojis: { ...cardState.emojis, size: e.target.value } }));
        // Removed controls.emojiSpeed.addEventListener - no UI for it
        controls.emojiDensityInput.addEventListener('input', e => {
            updateState({ emojis: { ...cardState.emojis, density: parseInt(e.target.value, 10) } }, false);
        });
        controls.emojiDensityInput.addEventListener('change', e => {
            updateState({ emojis: { ...cardState.emojis, density: parseInt(e.target.value, 10) } }, true);
        });

        // Social Links controls
        controls.addSocialBtn.addEventListener('click', addSocialLink);
        controls.addLabelBtn.addEventListener('click', addLabel);
        controls.socialLinksBuilder.addEventListener('click', handleSocialLinkActions);
        controls.socialLinksBuilder.addEventListener('input', handleSocialLinkInput);
        // Also listen for 'change' so edits that finalize with change (e.g., color pickers, file inputs, blur) are handled and can push to history
        controls.socialLinksBuilder.addEventListener('change', handleSocialLinkInput);
        controls.socialLayoutSelector.addEventListener('click', e => {
            if (e.target.classList.contains('layout-option')) {
                updateState({ socialLayout: e.target.dataset.layout });
            }
        });
        controls.defaultSocialIconColor.addEventListener('input', e => updateState({ defaultSocialIconColor: e.target.value }, false));
        controls.defaultSocialIconColor.addEventListener('change', e => updateState({ defaultSocialIconColor: e.target.value }, true));
        controls.fullLabelAlignment.addEventListener('change', e => updateState({ fullLabelAlignment: e.target.value }));

        // Save/Clear/Undo/Redo
        controls.saveBtn.addEventListener('click', saveCardState);
        controls.clearBtn.addEventListener('click', clearAll);
        // Attach undo/redo to all matching buttons (desktop + mobile)
        if (controls.undoBtns && controls.undoBtns.length) {
            controls.undoBtns.forEach(btn => btn.addEventListener('click', undo));
        }
        if (controls.redoBtns && controls.redoBtns.length) {
            controls.redoBtns.forEach(btn => btn.addEventListener('click', redo));
        }

        // Tab navigation
        controls.builderTabs.addEventListener('click', e => {
            if (e.target.classList.contains('tab-link')) {
                const tab = e.target.dataset.tab;
                switchTab(tab);
            }
        });

        // Typography controls
        const typographyElements = ['name', 'title', 'company', 'address', 'quote'];
        typographyElements.forEach(element => {
            controls[`${element}FontFamily`].addEventListener('change', e => updateTypography(element, 'fontFamily', e.target.value));
            controls[`${element}FontSize`].addEventListener('input', e => updateTypography(element, 'fontSize', parseFloat(e.target.value), false));
            controls[`${element}FontSize`].addEventListener('change', e => updateTypography(element, 'fontSize', parseFloat(e.target.value), true));
            controls[`${element}FontWeight`].addEventListener('change', e => updateTypography(element, 'fontWeight', e.target.value));
            controls[`${element}TextAlign`].addEventListener('change', e => updateTypography(element, 'textAlign', e.target.value));
            controls[`${element}Color`].addEventListener('input', e => updateTypography(element, 'color', e.target.value), false);
            controls[`${element}Color`].addEventListener('change', e => updateTypography(element, 'color', e.target.value), true);
        });

        // NEW: photo show/hide toggle
        controls.photoShowToggle.addEventListener('change', e => {
            updatePhotoSetting('show', e.target.checked);
        });

        // Emoji picker
        controls.openEmojiPickerBtn.addEventListener('click', toggleEmojiPicker);
        controls.emojiPickerPopup.addEventListener('click', handleEmojiSelection);
        controls.customEmojisDisplay.addEventListener('click', handleRemoveSelectedEmoji);
        document.addEventListener('click', closeEmojiPickerOutside);

        // Accordion functionality for mobile
        document.querySelectorAll('.tab-pane .section-content details').forEach((detail, index) => {
            if (index === 0) { // Keep "Basic Info" expanded by default
                detail.setAttribute('open', '');
            } else {
                detail.removeAttribute('open');
            }
        });

        // Drag and Drop for Social Links
        setupSortableList(controls.socialLinksBuilder, (newOrder) => {
            // newOrder will be an array of dataset.index (string numbers) when items have data-index.
            // Map those indices to actual link objects to create the reordered array.
            const indices = newOrder.map(v => parseInt(v, 10)).filter(n => !isNaN(n));
            if (indices.length === newOrder.length) {
                const reorderedLinks = indices.map(i => cardState.socialLinks[i]).filter(Boolean);
                updateState({ socialLinks: reorderedLinks });
                // Re-render builder to refresh data-index attributes / UI
                renderSocialLinksBuilder();
            } else {
                // Fallback: try existing id-based method
                const reorderedLinks = newOrder.map(id => cardState.socialLinks.find(link => `social-link-group-${cardState.socialLinks.indexOf(link)}` === id));
                updateState({ socialLinks: reorderedLinks });
                renderSocialLinksBuilder();
            }
        });

        // Drag and Drop for Text Elements
        setupSortableList(controls.textElementsOrderBuilder, (newOrder) => {
            updateState({ textElementOrder: newOrder });
        });
    }

    // --- STATE UPDATE AND RENDERING ---
    function updateState(newState, pushToHistory = true) {
        // Deep merge for nested objects like typography or emojis
        const mergedState = deepMerge(cardState, newState);

        cardState = mergedState;
        renderPreview();
        updateControls();
        if (pushToHistory) {
            pushStateToHistory();
        }
    }

    // Helper for deep merging objects
    function deepMerge(target, source) {
        const output = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    output[key] = deepMerge(target[key] || {}, source[key]);
                } else {
                    output[key] = source[key];
                }
            }
        }
        return output;
    }

    function updatePhotoSetting(key, value, pushToHistory = true) {
        const newPhotoSettings = { ...cardState.photoSettings, [key]: value };
        // Special handling for filter and filter intensity visibility
        if (key === 'filter') {
            if (value === 'none') {
                controls.photoFilterIntensityGroup.style.display = 'none';
            } else {
                controls.photoFilterIntensityGroup.style.display = 'flex';
                // Adjust intensity slider max/min/step based on filter type
                if (value === 'blur') {
                    controls.photoFilterIntensity.min = '0';
                    controls.photoFilterIntensity.max = '10'; // Max blur 10px
                    controls.photoFilterIntensity.step = '0.5';
                } else if (value === 'hue-rotate') {
                    controls.photoFilterIntensity.min = '0';
                    controls.photoFilterIntensity.max = '360'; // Max hue-rotate 360deg
                    controls.photoFilterIntensity.step = '1';
                } else if (value === 'brightness' || value === 'contrast' || value === 'saturate') {
                    controls.photoFilterIntensity.min = '0';
                    controls.photoFilterIntensity.max = '200'; // Max 200% for these
                    controls.photoFilterIntensity.step = '1';
                } else {
                    controls.photoFilterIntensity.min = '0';
                    controls.photoFilterIntensity.max = '100'; // Default 0-100 for others
                    controls.photoFilterIntensity.step = '1';
                }
            }
        }
        updateState({ photoSettings: newPhotoSettings }, pushToHistory);
    }

    function updateTypography(element, property, value, pushToHistory = true) {
        const newTypography = {
            ...cardState.typography,
            [element]: {
                ...cardState.typography[element],
                [property]: value
            }
        };
        updateState({ typography: newTypography }, pushToHistory);

        // Update font weight options if font family changes
        if (property === 'fontFamily') {
            const fontFamilySelect = controls[`${element}FontFamily`];
            const fontWeightSelect = controls[`${element}FontWeight`];
            if (fontFamilySelect && fontWeightSelect) { // Ensure elements exist
                populateFontWeights(fontFamilySelect, fontWeightSelect, value);
            }
        }
    }

    function renderPreview() {
        // Update basic info
        preview.name.textContent = cardState.name;
        preview.title.textContent = cardState.title;
        preview.company.textContent = cardState.company;
        preview.address.textContent = cardState.address;
        preview.quote.textContent = cardState.quote;
        preview.photo.src = cardState.photo;

        // Show/hide photo based on photoSettings.show
        if (cardState.photoSettings && cardState.photoSettings.show === false) {
            preview.photo.style.display = 'none';
        } else {
            preview.photo.style.display = ''; // reset to default (CSS)
        }

        // Update photo settings
        preview.photo.style.width = `${cardState.photoSettings.size}px`;
        preview.photo.style.height = `${cardState.photoSettings.size}px`;
        preview.photo.style.borderRadius = `${cardState.photoSettings.borderRadius}%`;
        
        // Apply filter
        let filterStyle = 'none';
        if (cardState.photoSettings.filter !== 'none') {
            const value = cardState.photoSettings.filterValue;
            switch (cardState.photoSettings.filter) {
                case 'grayscale': filterStyle = `grayscale(${value}%)`; break;
                case 'sepia': filterStyle = `sepia(${value}%)`; break;
                case 'blur': filterStyle = `blur(${value}px)`; break;
                case 'brightness': filterStyle = `brightness(${value}%)`; break;
                case 'contrast': filterStyle = `contrast(${value}%)`; break;
                case 'saturate': filterStyle = `saturate(${value}%)`; break;
                case 'hue-rotate': filterStyle = `hue-rotate(${value}deg)`; break;
                case 'invert': filterStyle = `invert(${value}%)`; break;
            }
        }
        preview.photo.style.filter = filterStyle;

        // Apply glow
        if (cardState.photoSettings.glow.enabled) {
            preview.photo.style.boxShadow = `0 5px 20px rgba(0,0,0,0.3), 0 0 ${cardState.photoSettings.glow.spread}px ${cardState.photoSettings.glow.color}`;
        } else {
            preview.photo.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        }

        // Update card theme
        ecard.className = `ecard theme-${cardState.theme}`;

        // Update typography
        applyTypography(preview.name, cardState.typography.name);
        applyTypography(preview.title, cardState.typography.title);
        applyTypography(preview.company, cardState.typography.company);
        applyTypography(preview.address, cardState.typography.address);
        applyTypography(preview.quote, cardState.typography.quote);

        // Render social links
        renderSocialLinks();

        // Render text element order
        renderTextElementOrder();

        // Render floating emojis
        renderFloatingEmojis();
        
        // Update vCard
        updateVCard();
    }

    function applyTypography(element, styles) {
        element.style.fontFamily = styles.fontFamily;
        element.style.fontSize = `${styles.fontSize}px`;
        element.style.fontWeight = styles.fontWeight;
        element.style.textAlign = styles.textAlign;
        element.style.color = styles.color;
    }

    function updateControls() {
        // Update basic info controls
        controls.name.value = cardState.name;
        controls.title.value = cardState.title;
        controls.company.value = cardState.company;
        controls.quote.value = cardState.quote;
        controls.email.value = cardState.email;
        controls.phone.value = cardState.phone;
        controls.address.value = cardState.address;

        // Update photo settings controls
        controls.photoSize.value = cardState.photoSettings.size;
        controls.photoBorderRadius.value = cardState.photoSettings.borderRadius;
        controls.photoFilter.value = cardState.photoSettings.filter;
        controls.photoFilterIntensity.value = cardState.photoSettings.filterValue;
        controls.emojiDensityInput.value = cardState.emojis.density;
        controls.emojiDensityValue.textContent = `(${cardState.emojis.density}%)`; // Update emoji density value display

        if (cardState.photoSettings.filter === 'none') {
            controls.photoFilterIntensityGroup.style.display = 'none';
        } else {
            controls.photoFilterIntensityGroup.style.display = 'flex';
            // Also ensure the min/max/step are correct for the current filter
            if (cardState.photoSettings.filter === 'blur') {
                controls.photoFilterIntensity.min = '0';
                controls.photoFilterIntensity.max = '10';
                controls.photoFilterIntensity.step = '0.5';
            } else if (cardState.photoSettings.filter === 'hue-rotate') {
                controls.photoFilterIntensity.min = '0';
                controls.photoFilterIntensity.max = '360';
                controls.photoFilterIntensity.step = '1';
            } else if (cardState.photoSettings.filter === 'brightness' || cardState.photoSettings.filter === 'contrast' || cardState.photoSettings.filter === 'saturate') {
                controls.photoFilterIntensity.min = '0';
                controls.photoFilterIntensity.max = '200';
                controls.photoFilterIntensity.step = '1';
            } else {
                controls.photoFilterIntensity.min = '0';
                controls.photoFilterIntensity.max = '100';
                controls.photoFilterIntensity.step = '1';
            }
        }

        controls.photoGlowToggle.checked = cardState.photoSettings.glow.enabled;
        controls.photoGlowColor.value = cardState.photoSettings.glow.color;
        controls.photoGlowSpread.value = cardState.photoSettings.glow.spread;

        // NEW: reflect show/hide state in toggle
        controls.photoShowToggle.checked = cardState.photoSettings.show !== false; // default true if undefined

        // Update theme selector active state
        controls.themeSelector.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === cardState.theme);
        });

        // Update emoji controls
        controls.emojiToggle.checked = cardState.emojis.enabled;
        controls.emojiSize.value = cardState.emojis.size;
        // Removed controls.emojiSpeed.value = cardState.emojis.speed; - no UI for it
        controls.emojiDensityInput.value = cardState.emojis.density;

        // Update custom emojis display
        renderCustomEmojisDisplay();

        // Update social layout selector active state
        controls.socialLayoutSelector.querySelectorAll('.layout-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layout === cardState.socialLayout);
        });
        
        controls.defaultSocialIconColor.value = cardState.defaultSocialIconColor;
        
        // Show/hide default icon color and full label alignment based on social layout
        if (cardState.socialLayout === 'icon-only') {
            controls.defaultIconColorGroup.style.display = 'flex';
            document.getElementById('full-label-alignment-group').style.display = 'none';
        } else {
            controls.defaultIconColorGroup.style.display = 'none';
            document.getElementById('full-label-alignment-group').style.display = 'flex';
            controls.fullLabelAlignment.value = cardState.fullLabelAlignment;
        }

        // Update typography controls
        const typographyElements = ['name', 'title', 'company', 'address', 'quote'];
        typographyElements.forEach(element => {
            const fontFamilySelect = controls[`${element}FontFamily`];
            const fontWeightSelect = controls[`${element}FontWeight`];
            const fontSizeInput = controls[`${element}FontSize`];
            const textAlignSelect = controls[`${element}TextAlign`];
            const colorInput = controls[`${element}Color`];

            // Defensive checks for typography controls
            if (fontFamilySelect) {
                populateFontFamilies(fontFamilySelect);
                fontFamilySelect.value = cardState.typography[element].fontFamily;
            }
            if (fontFamilySelect && fontWeightSelect) {
                populateFontWeights(fontFamilySelect, fontWeightSelect, cardState.typography[element].fontFamily);
                fontWeightSelect.value = cardState.typography[element].fontWeight;
            }
            if (fontSizeInput) {
                fontSizeInput.value = cardState.typography[element].fontSize;
            }
            if (textAlignSelect) {
                populateTextAlign(textAlignSelect);
                textAlignSelect.value = cardState.typography[element].textAlign;
            }
            if (colorInput) {
                colorInput.value = cardState.typography[element].color;
            }
        });

        // NEW: populate label typography controls
        if (controls.labelFontFamily) {
            populateFontFamilies(controls.labelFontFamily);
            controls.labelFontFamily.value = cardState.typography.label.fontFamily;
        }
        if (controls.labelFontWeight && controls.labelFontFamily) {
            populateFontWeights(controls.labelFontFamily, controls.labelFontWeight, cardState.typography.label.fontFamily);
            controls.labelFontWeight.value = cardState.typography.label.fontWeight;
        }
        if (controls.labelFontSize) controls.labelFontSize.value = cardState.typography.label.fontSize;
        if (controls.labelTextAlign) { populateTextAlign(controls.labelTextAlign); controls.labelTextAlign.value = cardState.typography.label.textAlign; }
        if (controls.labelColor) controls.labelColor.value = cardState.typography.label.color;

        updateUndoRedoButtons();
    }

    // --- PHOTO UPLOAD ---
    async function handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            try {
                let imageUrl = null;
                // Prefer websim.uploadFile if available
                if (window.websim && typeof window.websim.uploadFile === 'function') {
                    imageUrl = await window.websim.uploadFile(file);
                } else if (window.websim && typeof window.websim.upload === 'function') {
                    // Backwards compatible: try upload()
                    imageUrl = await window.websim.upload(file);
                } else {
                    // Fallback: create a local object URL so the user can see the image immediately
                    imageUrl = URL.createObjectURL(file);
                }
                updateState({ photo: imageUrl });
                // Reset input so selecting the same file again will trigger change
                event.target.value = '';
            } catch (error) {
                console.error('Error uploading photo:', error);
                // If the upload failed but we still have a file, show it locally as a fallback
                try {
                    const fallbackUrl = URL.createObjectURL(file);
                    updateState({ photo: fallbackUrl });
                    event.target.value = '';
                } catch (e) {
                    alert('Failed to upload photo. Please try again.');
                }
            }
        }
    }

    function animateCardRefresh() {
        ecard.classList.add('card-refresh');
        ecard.addEventListener('animationend', () => {
            ecard.classList.remove('card-refresh');
        }, { once: true });
    }

    // --- TYPOGRAPHY FUNCTIONS ---
    function populateFontFamilies(selectElement) {
        selectElement.innerHTML = ''; // Clear existing options
        FONT_OPTIONS.forEach(font => {
            const option = document.createElement('option');
            option.value = font.value;
            option.textContent = font.name;
            selectElement.appendChild(option);
        });
    }

    function populateFontWeights(fontFamilySelect, fontWeightSelect, selectedFontFamily) {
        fontWeightSelect.innerHTML = ''; // Clear existing options
        const font = FONT_OPTIONS.find(f => f.value === selectedFontFamily);
        if (font) {
            font.weights.forEach(weight => {
                const option = document.createElement('option');
                option.value = weight.toString();
                option.textContent = FONT_WEIGHT_NAME_MAP[weight];
                fontWeightSelect.appendChild(option);
            });
        }
    }

    function populateTextAlign(selectElement) {
        selectElement.innerHTML = '';
        TEXT_ALIGN_OPTIONS.forEach(align => {
            const option = document.createElement('option');
            option.value = align.value;
            option.textContent = align.name;
            selectElement.appendChild(option);
        });
    }

    // --- SOCIAL LINKS ---
    function generateSocialLinkHtml(link, index) {
        const socialInfo = socialOptions[link.type] || socialOptions.custom; // Fallback to custom if type unknown
        const isCustom = link.type === 'custom';
        const iconHtml = socialInfo.icon 
            ? `<i class="${socialInfo.icon}"></i>` 
            : (socialInfo.svgContent ? socialInfo.svgContent : '<i class="fas fa-link"></i>');
        
        let displayIcon = iconHtml;
        if (isCustom && link.customIconUrl) {
            displayIcon = `<img src="${link.customIconUrl}" alt="${link.customName || 'Custom Link Icon'}">`;
        }

        const classList = `social-link social-${link.type}`;
        const style = `
            --icon-color: ${link.customColor || cardState.defaultSocialIconColor};
            --outline-glow-color: ${link.outlineGlowColor || socialInfo.brandColor};
        `;

        // Use per-link typography when present, otherwise fallback to global label typography
        const typ = link.typography || cardState.typography.label || {};
        const labelStyle = `
            font-family: ${typ.fontFamily || "inherit"};
            font-size: ${typ.fontSize ? typ.fontSize + 'px' : 'inherit'};
            font-weight: ${typ.fontWeight || 'inherit'};
            text-align: ${typ.textAlign || 'inherit'};
            color: ${typ.color || 'inherit'};
        `;

        const labelText = isCustom && link.customName ? link.customName : socialInfo.label;

        // Determine if this is a phone/email link to use appropriate schema
        let href = link.url;
        if (link.type === 'phone' && !link.url.startsWith('tel:')) {
            href = `tel:${link.url.replace(/\s/g, '')}`;
        } else if (link.type === 'email' && !link.url.startsWith('mailto:')) {
            href = `mailto:${link.url}`;
        }

        return `
            <a href="${href}" target="_blank" rel="noopener noreferrer" 
               class="${classList}" style="${style}" 
               aria-label="${socialInfo.ariaLabel || labelText}">
                ${displayIcon}
                <span style="${labelStyle}">${escapeHtml(labelText)}</span>
            </a>
        `;
    }

    function renderSocialLinks() {
        const linksHtml = cardState.socialLinks.map((link, index) => {
            if (link.type === 'label') {
                // Prefer per-label typography when available, otherwise fallback to global label typography
                const lab = link.typography || cardState.typography.label || {};
                const labelStyle = `
                    font-family: ${lab.fontFamily || cardState.typography.label.fontFamily};
                    font-size: ${lab.fontSize ? lab.fontSize + 'px' : cardState.typography.label.fontSize + 'px'};
                    font-weight: ${lab.fontWeight || cardState.typography.label.fontWeight};
                    text-align: ${lab.textAlign || cardState.typography.label.textAlign};
                    color: ${lab.color || cardState.typography.label.color};
                    display: block;
                `;
                return `
                    <div class="social-link social-label" style="pointer-events:none; cursor:default; background: transparent; gap:0.5rem; padding:0.25rem 0.5rem; min-width: auto; border: none;">
                        <span style="${labelStyle}">${escapeHtml(link.text || '')}</span>
                    </div>
                `;
            } else {
                return generateSocialLinkHtml(link);
            }
        }).join('');
        preview.linksContainer.innerHTML = linksHtml;
        preview.linksContainer.className = `links-${cardState.socialLayout}`;

        // Apply text alignment for full-label layout
        if (cardState.socialLayout === 'full-label') {
            switch (cardState.fullLabelAlignment) {
                case 'left':
                    preview.linksContainer.style.alignItems = 'flex-start';
                    preview.linksContainer.style.marginLeft = '0';
                    preview.linksContainer.style.marginRight = 'auto';
                    break;
                case 'right':
                    preview.linksContainer.style.alignItems = 'flex-end';
                    preview.linksContainer.style.marginLeft = 'auto';
                    preview.linksContainer.style.marginRight = '0';
                    break;
                case 'center':
                default:
                    preview.linksContainer.style.alignItems = 'center';
                    preview.linksContainer.style.marginLeft = 'auto';
                    preview.linksContainer.style.marginRight = 'auto';
                    break;
            }
        } else {
            preview.linksContainer.style.alignItems = 'center'; // Center for icon-only
            preview.linksContainer.style.marginLeft = 'auto';
            preview.linksContainer.style.marginRight = 'auto';
        }
    }

    function addSocialLink() {
        const newLink = { type: 'instagram', url: 'https://', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null };
        updateState({ socialLinks: [...cardState.socialLinks, newLink] });
        // Scroll to bottom of the social links builder to show the new link
        setTimeout(() => controls.socialLinksBuilder.scrollTop = controls.socialLinksBuilder.scrollHeight, 100);
        // Re-render the social links builder so the new input appears in the UI
        renderSocialLinksBuilder();
    }

    function addLabel() {
        const newLabel = { type: 'label', text: 'New Label' };
        updateState({ socialLinks: [...cardState.socialLinks, newLabel] });
        // Re-render builder so the new label appears
        setTimeout(() => {
            renderSocialLinksBuilder();
            controls.socialLinksBuilder.scrollTop = controls.socialLinksBuilder.scrollHeight;
        }, 50);
    }

    function handleSocialLinkActions(e) {
        // reliably find the container that holds the data-index attribute
        const container = e.target.closest('[data-index]');
        const index = parseInt(container?.dataset.index, 10);
        if (isNaN(index)) return;

        if (e.target.closest('.remove-social-btn')) {
            const newLinks = cardState.socialLinks.filter((_, i) => i !== index);
            updateState({ socialLinks: newLinks });
            // Ensure builder UI updates immediately to reflect the removed form
            renderSocialLinksBuilder();
        } else if (e.target.closest('.dropdown-selected-value')) {
            activeSocialLinkIndex = index;
            openSocialDropdown(e.target.closest('.dropdown-selected-value'), index);
        } else if (e.target.closest('.upload-custom-icon-btn')) {
            // Trigger hidden file input
            e.target.closest('.social-type-dropdown').querySelector('.custom-icon-upload-input').click();
        } else if (e.target.closest('.custom-icon-upload-input')) {
            handleCustomIconUpload(e.target, index);
        }
    }

    function handleSocialLinkInput(e) {
        // Find nearest social-link-group container safely
        const container = e.target.closest('.social-link-group');

        // NEW: Handle delegated change from custom icon file input directly
        if (e.target.classList && e.target.classList.contains('custom-icon-upload-input')) {
            // Try to find index from input dataset, or from closest container as fallback
            const indexFromInput = e.target.dataset.index !== undefined ? parseInt(e.target.dataset.index, 10) : NaN;
            const index = !isNaN(indexFromInput) ? indexFromInput : parseInt(container?.dataset.index, 10);
            if (!isNaN(index)) {
                handleCustomIconUpload(e.target, index);
            }
            return; // handled, don't continue with other input logic
        }

        if (!container) return; // Not inside a social link row — ignore

        const index = parseInt(container.dataset.index, 10);
        if (isNaN(index) || !cardState.socialLinks[index]) return;

        const updatedLinks = [...cardState.socialLinks];
        let needsUpdate = false;

        if (e.target.classList.contains('social-url')) {
            updatedLinks[index].url = e.target.value;
            needsUpdate = true;
        } else if (e.target.classList.contains('social-custom-name')) {
            updatedLinks[index].customName = e.target.value;
            // Also update the label in the dropdown button itself (if present)
            const dropdownButton = container.querySelector('.social-type-dropdown .dropdown-selected-value');
            if (dropdownButton) {
                const labelTextSpan = dropdownButton.querySelector('.dropdown-label-text');
                if (labelTextSpan) {
                    labelTextSpan.textContent = e.target.value;
                }
            }
            needsUpdate = true;
        } else if (e.target.classList.contains('social-custom-color')) {
            updatedLinks[index].customColor = e.target.value;
            needsUpdate = true;
        } else if (e.target.classList.contains('social-outline-glow-color')) {
            updatedLinks[index].outlineGlowColor = e.target.value;
            needsUpdate = true;
        } else if (e.target.classList.contains('social-title-font-family')) {
            updatedLinks[index].typography = { ...(updatedLinks[index].typography || {}), fontFamily: e.target.value };
            needsUpdate = true;
        } else if (e.target.classList.contains('social-title-font-size')) {
            updatedLinks[index].typography = { ...(updatedLinks[index].typography || {}), fontSize: parseFloat(e.target.value) || 0 };
            needsUpdate = true;
        } else if (e.target.classList.contains('social-title-font-weight')) {
            updatedLinks[index].typography = { ...(updatedLinks[index].typography || {}), fontWeight: e.target.value };
            needsUpdate = true;
        } else if (e.target.classList.contains('social-title-text-align')) {
            updatedLinks[index].typography = { ...(updatedLinks[index].typography || {}), textAlign: e.target.value };
            needsUpdate = true;
        } else if (e.target.classList.contains('social-title-color')) {
            updatedLinks[index].typography = { ...(updatedLinks[index].typography || {}), color: e.target.value };
            needsUpdate = true;
        } else if (e.target.classList.contains('label-name-input')) {
            updatedLinks[index].text = e.target.value;
            needsUpdate = true;
        }

        if (needsUpdate) {
            updateState({ socialLinks: updatedLinks }, e.type === 'change'); // Only push to history on 'change'
        }
    }

    async function handleCustomIconUpload(inputElement, index) {
        const file = inputElement.files[0];
        if (file) {
            try {
                let imageUrl = null;
                if (window.websim && typeof window.websim.uploadFile === 'function') {
                    imageUrl = await window.websim.uploadFile(file);
                } else if (window.websim && typeof window.websim.upload === 'function') {
                    imageUrl = await window.websim.upload(file);
                } else {
                    imageUrl = URL.createObjectURL(file);
                }
                const updatedLinks = [...cardState.socialLinks];
                updatedLinks[index].customIconUrl = imageUrl;
                updateState({ socialLinks: updatedLinks });
                // Reset input so re-upload of same file works
                inputElement.value = '';
            } catch (error) {
                console.error('Error uploading custom icon:', error);
                // Try local fallback
                try {
                    const fallbackUrl = URL.createObjectURL(file);
                    const updatedLinks = [...cardState.socialLinks];
                    updatedLinks[index].customIconUrl = fallbackUrl;
                    updateState({ socialLinks: updatedLinks });
                    inputElement.value = '';
                } catch (e) {
                    alert('Failed to upload custom icon. Please try again.');
                }
            }
        }
    }

    function createSocialLinkDropdownOption(key, socialInfo, currentIndex) {
        const option = document.createElement('li');
        option.dataset.type = key;
        option.classList.add(`social-${key}`);

        const currentLinkType = cardState.socialLinks[currentIndex]?.type;
        if (key === currentLinkType) {
            option.classList.add('selected');
        }

        if (socialInfo.icon) {
            option.innerHTML = `<i class="${socialInfo.icon}"></i> ${socialInfo.label}`;
        } else if (socialInfo.svgContent) {
            option.innerHTML = `${socialInfo.svgContent} ${socialInfo.label}`;
        } else {
            option.innerHTML = `<i class="fas fa-link"></i> ${socialInfo.label}`;
        }
        return option;
    }

    function openSocialDropdown(button, index) {
        if (globalDropdownContainer) {
            globalDropdownContainer.remove();
        }

        const dropdownOptionsList = document.createElement('ul');
        dropdownOptionsList.classList.add('dropdown-options-list');

        for (const key in socialOptions) {
            const option = createSocialLinkDropdownOption(key, socialOptions[key], index);
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent dropdown from closing immediately
                const newType = e.currentTarget.dataset.type;
                const newLinks = [...cardState.socialLinks];
                newLinks[index].type = newType;
                // Clear custom icon and name if switching from custom
                if (newType !== 'custom') {
                    newLinks[index].customIconUrl = null;
                    newLinks[index].customName = null;
                }
                updateState({ socialLinks: newLinks });
                // Immediately update the builder UI so the changed type shows in the builder panel
                renderSocialLinksBuilder();
                dropdownOptionsList.remove();
                globalDropdownContainer = null;
                activeSocialLinkIndex = -1;
            });
            dropdownOptionsList.appendChild(option);
        }

        // Position the dropdown right below the button
        const rect = button.getBoundingClientRect();
        dropdownOptionsList.style.top = `${rect.bottom + window.scrollY + 5}px`;
        dropdownOptionsList.style.left = `${rect.left + window.scrollX}px`;
        dropdownOptionsList.style.minWidth = `${rect.width}px`; // Match width of button

        document.body.appendChild(dropdownOptionsList);
        globalDropdownContainer = dropdownOptionsList; // Store reference to close it later
        dropdownOptionsList.classList.add('show');
    }

    document.addEventListener('click', (e) => {
        if (globalDropdownContainer && !globalDropdownContainer.contains(e.target) && !e.target.closest('.dropdown-selected-value')) {
            globalDropdownContainer.remove();
            globalDropdownContainer = null;
            activeSocialLinkIndex = -1;
        }
    });

    // --- SORTABLE LISTS (DRAG & DROP) ---
    let draggedItem = null;

    function setupSortableList(listElement, onDropCallback) {
        // Guard: if the list element isn't present, silently skip to avoid runtime errors
        if (!listElement) return;
        listElement.addEventListener('dragstart', (e) => {
            draggedItem = e.target.closest('.draggable-item');
            if (draggedItem) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', draggedItem.dataset.id || draggedItem.id); // Use ID for text elements
                setTimeout(() => {
                    draggedItem.classList.add('dragging');
                }, 0);
            }
        });

        listElement.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            const currentItem = e.target.closest('.draggable-item');
            // Safety guards: ensure both draggedItem and currentItem are valid Nodes and different
            if (!draggedItem || !currentItem || draggedItem === currentItem) return;
            const bounding = currentItem.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            // Only attempt insert when both nodes are valid
            if (e.clientY - offset > 0) {
                if (currentItem.nextSibling) {
                    listElement.insertBefore(draggedItem, currentItem.nextSibling);
                } else {
                    listElement.appendChild(draggedItem);
                }
            } else {
                listElement.insertBefore(draggedItem, currentItem);
            }
        });

        listElement.addEventListener('dragend', () => {
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                draggedItem = null;
                // After drag ends, get the new order of items
                // Prefer dataset.index (used by social-link-group) when available so reordering maps to original indices.
                const newOrder = Array.from(listElement.children).map(item => {
                    return (item.dataset.index !== undefined) ? item.dataset.index : (item.dataset.id || item.id);
                });
                onDropCallback(newOrder);
            }
        });
    }

    // --- TEXT ELEMENT ORDERING ---
    function generateTextElementOrderBuilder() {
        controls.textElementsOrderBuilder.innerHTML = '';
        const orderableElements = {
            'photo': 'Profile Photo',
            'name': 'Full Name',
            'title': 'Job Title',
            'company': 'Company',
            'address': 'Address',
            'quote': 'Quote',
            'links': 'Social Links',
            'vcard': 'Save Contact Button'
        };

        cardState.textElementOrder.forEach(key => {
            const item = document.createElement('div');
            item.classList.add('text-element-item', 'draggable-item');
            item.setAttribute('draggable', 'true');
            item.id = key; // Use ID for identification
            item.innerHTML = `
                <i class="fas fa-grip-vertical drag-handle"></i>
                <span>${orderableElements[key]}</span>
            `;
            controls.textElementsOrderBuilder.appendChild(item);
        });
    }

    function renderTextElementOrder() {
        const orderedElements = cardState.textElementOrder.map(key => {
            switch (key) {
                case 'photo': return preview.photo;
                case 'name': return preview.name;
                case 'title': return preview.title;
                case 'company': return preview.company;
                case 'address': return preview.address;
                case 'quote': return preview.quote;
                case 'links': return preview.linksContainer;
                case 'vcard': return preview.vcard;
                default: return null;
            }
        }).filter(el => el !== null);

        // Clear and re-append elements in the new order
        preview.cardContent.innerHTML = ''; // Clear all children first
        orderedElements.forEach(el => preview.cardContent.appendChild(el));
    }

    // --- VCARD GENERATION ---
    function updateVCard() {
        const { name, title, company, email, phone, address } = cardState;
        
        let vcardContent = `BEGIN:VCARD\nVERSION:3.0\n`;
        vcardContent += `FN:${name}\n`; // Full Name
        vcardContent += `N:${name.split(' ').slice(-1)[0]};${name.split(' ').slice(0,-1).join(' ')};;;\n`; // Last;First;Middle;Prefix;Suffix
        if (title) vcardContent += `TITLE:${title}\n`;
        if (company) vcardContent += `ORG:${company}\n`;
        if (email) vcardContent += `EMAIL;TYPE=INTERNET:${email}\n`;
        if (phone) vcardContent += `TEL;TYPE=WORK,VOICE:${phone}\n`;
        if (address) vcardContent += `ADR;TYPE=WORK:;;${address};;;\n`;

        // Add social links to notes or custom fields if possible (vCard 3.0 has limited social link support, usually goes into notes)
        if (cardState.socialLinks.length > 0) {
            const socialNotes = cardState.socialLinks
                .filter(link => link.url && link.url !== 'https://')
                .map(link => {
                    const socialInfo = socialOptions[link.type] || { label: 'Custom Link' };
                    const label = link.type === 'custom' && link.customName ? link.customName : socialInfo.label;
                    return `${label}: ${link.url}`;
                })
                .join('\\n'); // vCard uses \n for new lines within a field
            if (socialNotes) {
                vcardContent += `NOTE:Social Profiles:\\n${socialNotes}\n`;
            }
        }
        
        vcardContent += `END:VCARD\n`;

        const blob = new Blob([vcardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        preview.vcard.href = url;
        preview.vcard.download = `${name.replace(/\s/g, '_')}_contact.vcf`;
    }

    // --- FLOATING EMOJIS ---
    let emojiInterval;
    function renderFloatingEmojis() {
        // Clear existing emojis
        preview.emojiContainer.innerHTML = '';
        clearInterval(emojiInterval);

        if (!cardState.emojis.enabled) {
            return;
        }

        // Use Array.from to correctly split Unicode/grapheme emoji sequences
        // Prefer custom emojis if present; otherwise choose by active theme to avoid out-of-place emojis
        const customList = Array.from(cardState.emojis.custom || '').filter(e => e.trim() !== '');
        const themeList = THEME_EMOJI_MAP[cardState.theme] || EMOJI_OPTIONS;
        const selectedEmojis = customList.length > 0 ? customList : themeList;
        if (selectedEmojis.length === 0) return;

        const emojiSizeMap = {
            small: { min: 15, max: 25 },
            medium: { min: 25, max: 40 },
            large: { min: 40, max: 60 }
        };
        const emojiSpeedMap = {
            slow: { min: 15, max: 30 },
            normal: { min: 10, max: 20 },
            fast: { min: 5, max: 10 }
        };

        const currentSizeRange = emojiSizeMap[cardState.emojis.size];
        // Use cardState.emojis.speed (which is defaulted to 'normal') as there's no UI control
        const currentSpeedRange = emojiSpeedMap[cardState.emojis.speed]; 
        const baseDensity = cardState.emojis.density / 100; // 0.01 to 1
        const spawnInterval = 300 - (baseDensity * 250); // Faster interval for higher density (e.g., 300ms down to 50ms)
        const maxEmojis = 20 + (baseDensity * 80); // More emojis for higher density (e.g., 20 up to 100)

        const spawnEmoji = () => {
            if (preview.emojiContainer.children.length >= maxEmojis) return;

            const emoji = document.createElement('span');
            emoji.classList.add('emoji-float');
            emoji.textContent = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)];

            const size = Math.random() * (currentSizeRange.max - currentSizeRange.min) + currentSizeRange.min;
            const leftPosition = Math.random() * 100;
            const animationDuration = Math.random() * (currentSpeedRange.max - currentSpeedRange.min) + currentSpeedRange.min;
            const delay = Math.random() * -animationDuration; // Start some with a negative delay

            emoji.style.fontSize = `${size}px`;
            emoji.style.left = `${leftPosition}%`;
            emoji.style.animationDuration = `${animationDuration}s`;
            emoji.style.animationDelay = `${delay}s`;

            preview.emojiContainer.appendChild(emoji);

            // Remove emoji after it finishes animation to prevent DOM bloat
            emoji.addEventListener('animationiteration', () => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            });
            // Fallback for animationend (if animation-iteration doesn't trigger for some reason)
            setTimeout(() => {
                 if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, animationDuration * 1000 + Math.abs(delay * 1000) + 100);
        };

        // Initial spawn
        for (let i = 0; i < maxEmojis / 2; i++) { // Spawn half max immediately
            spawnEmoji();
        }
        emojiInterval = setInterval(spawnEmoji, spawnInterval);
    }

    function renderCustomEmojisDisplay() {
        controls.customEmojisDisplay.innerHTML = '';
        // Use Array.from to preserve multi-codepoint emojis (skin tones, flags, combined glyphs)
        const customEmojis = Array.from(cardState.emojis.custom || '').filter(e => e.trim() !== '');
 
        if (customEmojis.length === 0) {
            controls.customEmojisDisplay.textContent = 'Click "Select Emojis" to add.'; // Simplified message
            controls.customEmojisDisplay.style.color = 'var(--text-secondary)';
            controls.customEmojisDisplay.style.fontStyle = 'italic';
            controls.customEmojisDisplay.style.fontSize = '0.9rem';
            return;
        }

        controls.customEmojisDisplay.style.color = 'var(--text-primary)';
        controls.customEmojisDisplay.style.fontStyle = 'normal';
        controls.customEmojisDisplay.style.fontSize = '1.2rem';

        customEmojis.forEach(emojiChar => {
            const emojiItem = document.createElement('span');
            emojiItem.classList.add('selected-emoji-item');
            emojiItem.innerHTML = `
                ${emojiChar}
                <button class="remove-emoji-btn" aria-label="Remove emoji ${emojiChar}">&times;</button>
            `;
            emojiItem.dataset.emoji = emojiChar; // Store emoji for removal
            controls.customEmojisDisplay.appendChild(emojiItem);
        });
    }

    function populateEmojiPicker() {
        controls.emojiPickerPopup.innerHTML = '';
        const currentCustomEmojis = Array.from(cardState.emojis.custom || '');
 
        EMOJI_OPTIONS.forEach(emojiChar => {
            const button = document.createElement('button');
            button.textContent = emojiChar;
            button.dataset.emoji = emojiChar;
            if (currentCustomEmojis.includes(emojiChar)) {
                button.classList.add('selected');
            }
            controls.emojiPickerPopup.appendChild(button);
        });
    }

    function toggleEmojiPicker(e) {
        e.stopPropagation(); // Prevent document click from closing it immediately
        controls.emojiPickerPopup.classList.toggle('show');
        if (controls.emojiPickerPopup.classList.contains('show')) {
            populateEmojiPicker(); // Ensure content is generated for accurate dimensions

            const buttonRect = controls.openEmojiPickerBtn.getBoundingClientRect();
            const popupWidth = controls.emojiPickerPopup.offsetWidth;
            const popupHeight = controls.emojiPickerPopup.offsetHeight; // To prevent vertical overflow if button is near bottom

            const gap = 10; // Desired space between button and popup
            const viewportMargin = 10; // Margin from viewport edges

            let newLeft;
            let newTop = buttonRect.top; // Align vertically with the button's top edge (since popup is now fixed)

            // Attempt to position to the right of the button
            const candidateLeftRight = buttonRect.right + gap;

            // Check if there's enough space on the right
            if (candidateLeftRight + popupWidth + viewportMargin <= window.innerWidth) {
                newLeft = candidateLeftRight;
            } else {
                // Not enough space on the right, try positioning to the left
                const candidateLeftLeft = buttonRect.left - popupWidth - gap;
                if (candidateLeftLeft >= viewportMargin) {
                    newLeft = candidateLeftLeft;
                } else {
                    // Not enough space on either side, align with button's left and constrain within viewport
                    newLeft = Math.max(viewportMargin, buttonRect.left);
                    // If even aligning left overflows right (e.g., button is wide), snap to right edge
                    if (newLeft + popupWidth + viewportMargin > window.innerWidth) {
                        newLeft = window.innerWidth - popupWidth - viewportMargin;
                    }
                }
            }

            // Ensure the popup doesn't go off the bottom of the viewport
            if (newTop + popupHeight + viewportMargin > window.innerHeight) {
                newTop = window.innerHeight - popupHeight - viewportMargin;
                // If it now overflows the top (e.g., button is near bottom and popup is tall), snap to top
                if (newTop < viewportMargin) {
                    newTop = viewportMargin;
                }
            }

            controls.emojiPickerPopup.style.top = `${newTop}px`;
            controls.emojiPickerPopup.style.left = `${newLeft}px`;
        }
    }

    function handleEmojiSelection(e) {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.emoji) {
            const clickedEmoji = e.target.dataset.emoji;
            let currentCustomEmojis = Array.from(cardState.emojis.custom || '').filter(em => em.trim() !== '');
 
            if (currentCustomEmojis.includes(clickedEmoji)) {
                // Remove emoji
                currentCustomEmojis = currentCustomEmojis.filter(emoji => emoji !== clickedEmoji);
            } else {
                // Add emoji
                currentCustomEmojis.push(clickedEmoji);
            }
            // Update state with new custom emoji string
            updateState({ emojis: { ...cardState.emojis, custom: currentCustomEmojis.join('') } });
            // Re-render picker to update selection state visually
            populateEmojiPicker();
        }
    }

    function handleRemoveSelectedEmoji(e) {
        if (e.target.classList.contains('remove-emoji-btn')) {
            const emojiToRemove = e.target.closest('.selected-emoji-item').dataset.emoji;
            let currentCustomEmojis = Array.from(cardState.emojis.custom || '').filter(em => em.trim() !== '');
            currentCustomEmojis = currentCustomEmojis.filter(emoji => emoji !== emojiToRemove);
            updateState({ emojis: { ...cardState.emojis, custom: currentCustomEmojis.join('') } });
             // If picker is open, re-render it to update selection state
             if (controls.emojiPickerPopup.classList.contains('show')) {
                 populateEmojiPicker();
             }
        }
    }

    function closeEmojiPickerOutside(e) {
        if (!controls.emojiPickerPopup.contains(e.target) && !controls.openEmojiPickerBtn.contains(e.target) && controls.emojiPickerPopup.classList.contains('show')) {
            controls.emojiPickerPopup.classList.remove('show');
        }
    }

    // --- TAB SWITCHING ---
    function switchTab(tabId) {
        controls.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tabId}`);
        });
        controls.builderTabs.querySelectorAll('.tab-link').forEach(link => {
            link.classList.toggle('active', link.dataset.tab === tabId);
        });

        // For mobile accordions, close all except the active one on tab switch
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.tab-pane .section-content details').forEach(detail => {
                detail.removeAttribute('open');
            });
            // Open the first detail in the newly active tab
            const activeTabPane = document.getElementById(`tab-${tabId}`);
            const firstDetail = activeTabPane?.querySelector('.section-content details');
            if (firstDetail) {
                firstDetail.setAttribute('open', '');
            }
        }
    }

    // --- SAVE / CLEAR ---
    function saveCardState() {
        localStorage.setItem('ecardState', JSON.stringify(cardState));
        showSaveFeedback();
    }

    function loadCardState() {
        const savedState = localStorage.getItem('ecardState');
        if (savedState) {
            // Merge saved state with default to ensure new properties are added
            cardState = deepMerge(cardState, JSON.parse(savedState));
        } else {
            // Load default placeholder image if no state saved
            updateState({ photo: 'ai_avatar.png' }, false);
        }
        pushStateToHistory(); // Push the loaded/default state to history
    }

    function clearAll() {
        if (confirm('Are you sure you want to clear all customizations? This cannot be undone (except by hitting Undo right after).')) {
            localStorage.removeItem('ecardState');
            cardState = {
                name: 'Alex Morgan',
                title: 'Creative Director',
                company: 'Visionary Studio',
                quote: 'Design is intelligence made visible.',
                email: 'alex.morgan@example.com',
                phone: '+1 (555) 123-4567',
                address: '1234 Sunset Blvd, Los Angeles, CA',
                photo: 'ai_avatar.png',
                photoSettings: { 
                    size: 140, 
                    borderRadius: 50, 
                    filter: 'none', 
                    filterValue: 100, 
                    glow: {
                        enabled: false,
                        color: '#D4AF37', 
                        spread: 0 
                    }
                },
                theme: 'luxury',
                emojis: {
                    enabled: true,
                    size: 'medium',
                    speed: 'normal',
                    custom: '',
                    density: 50
                },
                socialLinks: [
                    { type: 'instagram', url: 'https://instagram.com/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
                    { type: 'linkedin', url: 'https://linkedin.com/in/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
                    { type: 'x', url: 'https://x.com/example', customColor: null, outlineGlowColor: null, customIconUrl: null, customName: null },
                ],
                socialLayout: 'full-label',
                fullLabelAlignment: 'center',
                defaultSocialIconColor: '#FFFFFF',
                typography: {
                    name: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 35.2, 
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#FFFFFF'
                    },
                    title: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 16, 
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#AAAAAA'
                    },
                    company: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 16, 
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#FFFFFF'
                    },
                    address: { 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 14,
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#CCCCCC'
                    },
                    quote: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 17.6, 
                        fontWeight: '700', 
                        textAlign: 'center',
                        color: '#FFFFFF'
                    },
                    label: {                                    // NEW: match defaults in clear/reset
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 14,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#FFFFFF'
                    },
                },
                textElementOrder: ['photo', 'name', 'title', 'company', 'address', 'quote', 'links', 'vcard']
            };
            // Clear history and restart
            history = [];
            historyPointer = -1;
            pushStateToHistory(); 
            renderPreview();
            updateControls();
            // Ensure builder-specific UIs match cleared state immediately
            renderSocialLinksBuilder();
            generateTextElementOrderBuilder();
            updateUndoRedoButtons();
        }
    }

    function showSaveFeedback() {
        const feedbackElement = document.getElementById('save-feedback');
        feedbackElement.classList.add('show');
        setTimeout(() => {
            feedbackElement.classList.remove('show');
        }, 3000);
    }

    // --- INITIALIZATION ---
    function initialize() {
        // Query key preview DOM elements here so they exist
        ecard = document.getElementById('ecard-preview');
        preview = {
            name: document.getElementById('preview-name'),
            title: document.getElementById('preview-title'),
            company: document.getElementById('preview-company'),
            address: document.getElementById('preview-address'),
            quote: document.getElementById('preview-quote'),
            photo: document.getElementById('preview-photo'),
            linksContainer: document.getElementById('preview-links-container'),
            vcard: document.getElementById('preview-vcard'),
            emojiContainer: ecard.querySelector('.floating-emoji-container'),
            cardContent: ecard.querySelector('.card-content')
        };
        // Populate the `controls` object here to ensure all elements are fetched
        controls.name = document.getElementById('name');
        controls.title = document.getElementById('title');
        controls.company = document.getElementById('company');
        controls.quote = document.getElementById('quote');
        controls.email = document.getElementById('email');
        controls.phone = document.getElementById('phone');
        controls.address = document.getElementById('address'); 
        controls.photoUpload = document.getElementById('photo-upload');
        controls.photoSize = document.getElementById('photo-size'); 
        controls.photoBorderRadius = document.getElementById('photo-border-radius'); 
        controls.photoFilter = document.getElementById('photo-filter'); 
        controls.photoFilterIntensityGroup = document.getElementById('photo-filter-intensity-group'); 
        controls.photoFilterIntensity = document.getElementById('photo-filter-intensity'); 
        controls.photoGlowToggle = document.getElementById('photo-glow-toggle'); 
        controls.photoGlowColor = document.getElementById('photo-glow-color'); 
        controls.photoGlowSpread = document.getElementById('photo-glow-spread'); 
        controls.themeSelector = document.getElementById('theme-selector');
        controls.emojiToggle = document.getElementById('emoji-toggle');
        controls.emojiSize = document.getElementById('emoji-size');
        // controls.emojiSpeed = document.getElementById('emoji-speed'); // Element removed
        controls.emojiDensityInput = document.getElementById('emoji-density'); 
        controls.emojiDensityValue = document.getElementById('emoji-density-value'); 
        controls.socialLinksBuilder = document.getElementById('social-links-builder');
        controls.textElementsOrderBuilder = document.getElementById('text-elements-order-builder');
        controls.addSocialBtn = document.getElementById('add-social-btn');
        controls.addLabelBtn = document.getElementById('add-label-btn');
        controls.socialLayoutSelector = document.getElementById('social-layout-selector');
        controls.defaultSocialIconColor = document.getElementById('default-social-icon-color');
        controls.defaultIconColorGroup = document.getElementById('default-icon-color-group');
        controls.saveBtn = document.getElementById('save-btn');
        controls.clearBtn = document.getElementById('clear-btn');
        // Mobile clear button (if present) - wire it to same clear handler
        const mobileClearBtn = document.getElementById('clear-btn-mobile');
        if (mobileClearBtn && !controls.clearBtn) {
            // If desktop clear not found, use mobile as primary
            controls.clearBtn = mobileClearBtn;
        }
        if (mobileClearBtn) {
            mobileClearBtn.addEventListener('click', (e) => {
                // Reuse existing clearAll function
                clearAll();
            });
        }
        // Collect all undo/redo buttons (desktop + mobile) so they work on every device
        controls.undoBtns = Array.from(document.querySelectorAll('#undo-btn'));
        controls.redoBtns = Array.from(document.querySelectorAll('#redo-btn'));
        
        controls.builderTabs = document.querySelector('.builder-tabs');
        controls.tabPanes = document.querySelectorAll('.tab-pane');
        controls.fullLabelAlignment = document.getElementById('full-label-alignment');

        controls.undoBtn = controls.undoBtns[0] || null;
        controls.redoBtn = controls.redoBtns[0] || null;

        controls.nameFontFamily = document.getElementById('name-font-family');
        controls.nameFontSize = document.getElementById('name-font-size');
        controls.nameFontWeight = document.getElementById('name-font-weight');
        controls.nameTextAlign = document.getElementById('name-text-align');
        controls.nameColor = document.getElementById('name-color');

        controls.titleFontFamily = document.getElementById('title-font-family');
        controls.titleFontSize = document.getElementById('title-font-size');
        controls.titleFontWeight = document.getElementById('title-font-weight');
        controls.titleTextAlign = document.getElementById('title-text-align');
        controls.titleColor = document.getElementById('title-color');

        controls.companyFontFamily = document.getElementById('company-font-family');
        controls.companyFontSize = document.getElementById('company-font-size');
        controls.companyFontWeight = document.getElementById('company-font-weight');
        controls.companyTextAlign = document.getElementById('company-text-align');
        controls.companyColor = document.getElementById('company-color');

        controls.addressFontFamily = document.getElementById('address-font-family'); 
        controls.addressFontSize = document.getElementById('address-font-size');     
        controls.addressFontWeight = document.getElementById('address-font-weight'); 
        controls.addressTextAlign = document.getElementById('address-text-align');   
        controls.addressColor = document.getElementById('address-color');           

        controls.quoteFontFamily = document.getElementById('quote-font-family');
        controls.quoteFontSize = document.getElementById('quote-font-size');
        controls.quoteFontWeight = document.getElementById('quote-font-weight');
        controls.quoteTextAlign = document.getElementById('quote-text-align');
        controls.quoteColor = document.getElementById('quote-color');

        // NEW: photo show/hide toggle
        controls.photoShowToggle = document.getElementById('photo-show-toggle');

        // Emoji picker controls (ensure these exist before listeners use them)
        controls.openEmojiPickerBtn = document.getElementById('open-emoji-picker-btn');
        controls.emojiPickerPopup = document.getElementById('emoji-picker-popup');
        controls.customEmojisDisplay = document.getElementById('custom-emojis-display');
        
        loadCardState(); // Load state or set initial defaults
        setupEventListeners(); // Set up all event listeners, now controls are populated
        renderPreview(); // Render the initial state of the card
        updateControls(); // Update builder controls to reflect initial state (calls are safe now)

        // Initialize sortable social links
        // Build initial social links builder UI
        renderSocialLinksBuilder();
        
        // Initialize text element order builder
        generateTextElementOrderBuilder();

        // Mobile accordion initial state: basic info open, others closed
        if (window.innerWidth <= 768) {
            switchTab('basic'); 
        }
    }

    // Add this helper function near other render helpers (e.g., generateSocialLinkHtml)
    function renderSocialLinksBuilder() {
        if (!controls.socialLinksBuilder) return;
        controls.socialLinksBuilder.innerHTML = cardState.socialLinks.map((link, index) => {
            const socialInfo = socialOptions[link.type] || socialOptions.custom;
            const isCustom = link.type === 'custom';
            const iconHtml = socialInfo.icon 
                ? `<i class="${socialInfo.icon}"></i>` 
                : (socialInfo.svgContent ? socialInfo.svgContent : '<i class="fas fa-link"></i>');
            
            let displayIcon = iconHtml;
            if (isCustom && link.customIconUrl) {
                displayIcon = `<img src="${link.customIconUrl}" alt="${link.customName || 'Custom Link Icon'}">`;
            }

            // LABEL TYPE: render as a draggable builder row with editable text and inline Typography controls
            if (link.type === 'label') {
                const lt = link.typography || cardState.typography.label || {};
                const fontFamilyVal = lt.fontFamily || cardState.typography.label.fontFamily || '';
                const fontSizeVal = lt.fontSize || cardState.typography.label.fontSize || '';
                const fontWeightVal = lt.fontWeight || cardState.typography.label.fontWeight || '';
                const textAlignVal = lt.textAlign || cardState.typography.label.textAlign || 'center';
                const titleColorVal = lt.color || cardState.typography.label.color || '#FFFFFF';

                return `
                    <div class="form-group social-link-group draggable-item" draggable="true" data-index="${index}" data-id="social-link-group-${index}">
                        <div class="drag-handle">
                            <i class="fas fa-grip-vertical"></i>
                        </div>
                        <div style="display:flex;align-items:center;gap:0.75rem;width:100%;">
                            <div style="width:40px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-tag" style="color:var(--gold)"></i>
                            </div>
                            <input type="text" class="label-name-input" placeholder="Label title" value="${escapeHtml(link.text || '')}" data-index="${index}" style="flex:1;padding:0.5rem 0.75rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                            <button class="remove-social-btn" data-index="${index}" title="Remove label"><i class="fas fa-trash"></i></button>
                        </div>

                        <!-- Inline Label Typography Controls -->
                        <div style="display:grid;grid-template-columns:1fr 70px;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                            <select class="social-title-font-family" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                                ${FONT_OPTIONS.map(f => `<option value="${f.value}" ${f.value===fontFamilyVal ? 'selected' : ''}>${f.name}</option>`).join('')}
                            </select>
                            <input type="number" class="social-title-font-size" min="8" max="48" step="1" value="${fontSizeVal}" placeholder="Size" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                        </div>
                        <div style="display:grid;grid-template-columns:1fr;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                            <select class="social-title-font-weight" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                                ${ (FONT_OPTIONS.find(f=>f.value===fontFamilyVal)?.weights || [400,700]).map(w => `<option value="${w}" ${String(w)===String(fontWeightVal) ? 'selected' : ''}>${FONT_WEIGHT_NAME_MAP[w] || w}</option>`).join('') }
                            </select>
                        </div>
                        <div style="display:flex;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                            <input type="color" class="social-title-color" value="${titleColorVal}" data-index="${index}" title="Title Color" style="height:44px;border-radius:8px;border:1px solid var(--border-color);">
                        </div>
                    </div>
                `;
            }

            // Per-link typography defaults for builder inputs (fallback from link.typography or global label typography)
            const lt = link.typography || cardState.typography.label || {};
            const fontFamilyVal = lt.fontFamily || '';
            const fontSizeVal = lt.fontSize || '';
            const fontWeightVal = lt.fontWeight || '';
            const textAlignVal = lt.textAlign || 'left';
            const titleColorVal = lt.color || '#FFFFFF';

            return `
                <div class="form-group social-link-group draggable-item" draggable="true" data-index="${index}" data-id="social-link-group-${index}">
                    <div class="drag-handle">
                        <i class="fas fa-grip-vertical"></i>
                    </div>
                    <div class="social-type-dropdown">
                        <button class="dropdown-selected-value" aria-label="${socialInfo.ariaLabel}" data-index="${index}">
                            ${displayIcon}
                            <span class="dropdown-label-text">${isCustom && link.customName ? link.customName : socialInfo.label}</span>
                        </button>
                        ${isCustom ? `
                            <button class="upload-custom-icon-btn" title="Upload Custom Icon" data-index="${index}"><i class="fas fa-upload"></i></button>
                            <input type="file" class="custom-icon-upload-input" accept="image/svg+xml,image/png" style="display: none;" data-index="${index}">
                        ` : ''}
                    </div>
                    ${isCustom ? `<input type="text" class="social-custom-name" placeholder="Link Name" value="${link.customName || ''}" data-index="${index}">` : ''}
                    <input type="text" class="social-url" placeholder="Enter URL" value="${link.url || ''}" data-index="${index}">
                    <div style="display:grid;grid-template-columns:1fr 60px;gap:0.5rem;margin-top:0.5rem;">
                        <input type="color" class="social-custom-color" value="${link.customColor || '#7A8C98'}" title="Icon Color" data-index="${index}">
                        <input type="color" class="social-outline-glow-color" value="${link.outlineGlowColor || socialInfo.brandColor}" title="Outline Glow Color" data-index="${index}">
                    </div>
                    <!-- Per-link Typography Controls -->
                    <div style="display:grid;grid-template-columns:1fr 70px;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                        <select class="social-title-font-family" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                            ${FONT_OPTIONS.map(f => `<option value="${f.value}" ${f.value===fontFamilyVal ? 'selected' : ''}>${f.name}</option>`).join('')}
                        </select>
                        <input type="number" class="social-title-font-size" min="8" max="48" step="1" value="${fontSizeVal}" placeholder="Size" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                        <select class="social-title-font-weight" data-index="${index}" style="padding:0.45rem;background:var(--light-bg);border:1px solid var(--border-color);border-radius:8px;">
                            ${ (FONT_OPTIONS.find(f=>f.value===fontFamilyVal)?.weights || [400,700]).map(w => `<option value="${w}" ${String(w)===String(fontWeightVal) ? 'selected' : ''}>${FONT_WEIGHT_NAME_MAP[w] || w}</option>`).join('') }
                        </select>
                    </div>
                    <div style="display:flex;gap:0.5rem;margin-top:0.5rem;align-items:center;">
                        <input type="color" class="social-title-color" value="${titleColorVal}" data-index="${index}" title="Title Color" style="height:44px;border-radius:8px;border:1px solid var(--border-color);">
                        <button class="remove-social-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        }).join('');
        // Ensure sortable is aware of new children by re-initializing drag behaviour bindings are generic on container
        // (setupSortableList uses event listeners on the container and will still work)
    }

    // Helper escapeHtml to avoid injecting quotes/newlines into value attributes
    function escapeHtml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    initialize();
});
