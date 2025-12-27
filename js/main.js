/**
 * Main JavaScript file
 * Handles content loading, mobile navigation toggle and smooth scrolling
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        loadContent();
        initMobileNavigation();
        initSmoothScroll();
        initNetlifyForm();
    });

    /**
     * Initialize mobile navigation toggle
     * Adds hamburger menu button and toggle functionality for mobile devices
     */
    function initMobileNavigation() {
        const nav = document.querySelector('nav');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!nav || !navMenu) return;

        // Create hamburger button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert button before nav menu
        const navContainer = nav.querySelector('.container');
        if (navContainer) {
            navContainer.insertBefore(menuToggle, navMenu);
        }

        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('nav-menu-open');
            menuToggle.classList.toggle('menu-toggle-open');
        });

        // Close menu when clicking on a link (mobile)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 480) {
                    navMenu.classList.remove('nav-menu-open');
                    menuToggle.classList.remove('menu-toggle-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 480) {
                const isClickInsideNav = nav.contains(event.target);
                if (!isClickInsideNav && navMenu.classList.contains('nav-menu-open')) {
                    navMenu.classList.remove('nav-menu-open');
                    menuToggle.classList.remove('menu-toggle-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    /**
     * Load content from JSON files and inject into HTML
     * 
     * Dynamically loads page content based on current page:
     * - index.html: loads /content/home.json
     * - about.html: loads /content/about.json
     */
    function loadContent() {
        // Determine which JSON file to load based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isAboutPage = currentPage === 'about.html';
        const contentFile = isAboutPage ? 'about.json' : 'home.json';
        const contentPath = `/content/${contentFile}`;

        // Fetch content from JSON file
        fetch(contentPath)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(function(data) {
                // Inject content into HTML
                injectContent(data, isAboutPage);
            })
            .catch(function(error) {
                console.error('Error loading content:', error);
                // Content will remain as fallback text in HTML
                // Show user-friendly error message (optional)
                const errorMsg = document.createElement('div');
                errorMsg.className = 'content-error';
                errorMsg.style.cssText = 'padding: 1rem; background: #fee; color: #c33; margin: 1rem; border-radius: 4px;';
                errorMsg.textContent = 'Unable to load content. Please refresh the page.';
                const main = document.querySelector('main');
                if (main) {
                    main.insertBefore(errorMsg, main.firstChild);
                }
            });
    }

    /**
     * Inject content into HTML elements
     * @param {Object} data - Content data from JSON
     * @param {boolean} isAboutPage - Whether this is the about page
     * 
     * Handles:
     * - index.html: Hero title, subtitle, button text, services list, main image
     * - about.html: Page title (document.title), paragraphs, image
     */
    function injectContent(data, isAboutPage) {
        // For about.html: Set document title from pageTitle
        if (isAboutPage && data.pageTitle) {
            document.title = data.pageTitle + ' - Business Name';
        }

        // Inject content into elements with data-content attributes
        document.querySelectorAll('[data-content]').forEach(function(element) {
            const path = element.getAttribute('data-content');
            const value = getNestedValue(data, path);

            if (value !== undefined) {
                // Handle images
                if (element.tagName === 'IMG') {
                    // Update image src and alt from JSON
                    // For index.html: main image (data-content="image")
                    // For about.html: about page image (data-content="image")
                    if (value.src) {
                        element.src = value.src;
                        // Ensure image loads correctly
                        element.onerror = function() {
                            console.error('Failed to load image:', value.src);
                            // Fallback to placeholder if image fails
                            this.src = 'images/placeholder.svg';
                        };
                    }
                    if (value.alt) {
                        element.alt = value.alt;
                    }
                    if (value.width) {
                        element.width = value.width;
                    }
                    if (value.height) {
                        element.height = value.height;
                    }
                } 
                // Handle elements with aria-label
                else if (element.hasAttribute('data-aria-label')) {
                    const ariaPath = element.getAttribute('data-aria-label');
                    const ariaValue = getNestedValue(data, ariaPath);
                    if (ariaValue) {
                        element.setAttribute('aria-label', ariaValue);
                    }
                    element.textContent = value;
                } 
                // Handle template-based content (arrays)
                else if (element.hasAttribute('data-template')) {
                    const template = element.getAttribute('data-template');
                    if (Array.isArray(value)) {
                        element.innerHTML = '';
                        value.forEach(function(item) {
                            const templateElement = createTemplateElement(template, item);
                            if (templateElement) {
                                element.appendChild(templateElement);
                            }
                        });
                    }
                } 
                // Handle regular text content
                else {
                    element.textContent = value;
                }
            }
        });
    }

    /**
     * Get nested value from object using dot notation path
     * @param {Object} obj - Object to search
     * @param {string} path - Dot notation path (e.g., "hero.title")
     * @returns {*} - Value at path or undefined
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce(function(current, key) {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    /**
     * Create element from template
     * @param {string} template - Template name
     * @param {Object} data - Data for template (from CMS)
     * @returns {HTMLElement|null} - Created element or null
     * 
     * CMS INTEGRATION POINT:
     * This function creates HTML elements from CMS array data.
     * CMS provides structured data (e.g., service items, paragraphs),
     * and this function generates the corresponding HTML elements.
     */
    function createTemplateElement(template, data) {
        if (template === 'service-card') {
            // CMS TEXT: Service card data from CMS
            // CMS provides: { icon: "...", title: "...", description: "..." }
            const article = document.createElement('article');
            article.className = 'service-card';
            article.setAttribute('role', 'listitem');
            
            const icon = document.createElement('div');
            icon.className = 'service-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = data.icon || '';
            
            const title = document.createElement('h3');
            title.textContent = data.title || '';
            
            const description = document.createElement('p');
            description.textContent = data.description || '';
            
            article.appendChild(icon);
            article.appendChild(title);
            article.appendChild(description);
            
            return article;
        } else if (template === 'paragraphs') {
            // For about.html: Render all paragraphs dynamically from JSON
            // CMS provides array of text strings, we create <p> elements for each
            const fragment = document.createDocumentFragment();
            if (Array.isArray(data)) {
                data.forEach(function(text) {
                    if (text && typeof text === 'string') {
                        const p = document.createElement('p');
                        p.textContent = text;
                        fragment.appendChild(p);
                    }
                });
            }
            return fragment;
        }
        return null;
    }

    /**
     * Initialize Netlify form handling
     * Handles form submission via AJAX and shows success message
     */
    function initNetlifyForm() {
        const form = document.querySelector('form[name="contact"]');
        const successMessage = document.getElementById('form-success');
        
        if (!form || !successMessage) return;

        // Check for success parameter in URL (when Netlify redirects after submission)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            showSuccessMessage();
            // Clear URL parameter for cleaner URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(function(response) {
                if (response.ok) {
                    showSuccessMessage();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(function(error) {
                console.error('Error submitting form:', error);
                // Show error message (optional)
                alert('There was an error submitting your form. Please try again.');
            });
        });
    }

    /**
     * Show success message
     */
    function showSuccessMessage() {
        const successMessage = document.getElementById('form-success');
        const form = document.querySelector('form[name="contact"]');
        
        if (successMessage && form) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Scroll to success message smoothly
            setTimeout(function() {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }

    /**
     * Initialize smooth scrolling for anchor links
     * Enhances CSS smooth-scroll behavior with JavaScript for better browser support
     */
    function initSmoothScroll() {
        // Find all anchor links that point to sections on the same page
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                
                // Skip empty hash or just "#"
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for sticky header
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
})();
