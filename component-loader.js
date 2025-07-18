/**
 * Component Loader - Dynamically loads modular components
 * This script loads HTML components and initializes their JavaScript functionality
 */

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    /**
     * Initialize the component loader
     */
    async init() {
        const componentContainers = document.querySelectorAll('[data-component]');
        
        for (const container of componentContainers) {
            const componentName = container.dataset.component;
            await this.loadComponent(componentName, container);
        }
    }

    /**
     * Load a specific component
     * @param {string} componentName - Name of the component to load
     * @param {HTMLElement} container - Container element to load the component into
     */
    async loadComponent(componentName, container) {
        try {
            // Load HTML content
            const htmlResponse = await fetch(`components/${componentName}.html`);
            if (!htmlResponse.ok) {
                throw new Error(`Failed to load ${componentName}.html: ${htmlResponse.status}`);
            }
            
            const htmlContent = await htmlResponse.text();
            container.innerHTML = htmlContent;

            // Initialize component-specific functionality if available
            await this.initializeComponent(componentName, container);
            
            this.loadedComponents.add(componentName);
            console.log(`✅ Component '${componentName}' loaded successfully`);
            
        } catch (error) {
            console.error(`❌ Error loading component '${componentName}':`, error);
            // Fallback content
            container.innerHTML = `<div class="component-error">Failed to load ${componentName} component</div>`;
        }
    }

    /**
     * Initialize component-specific functionality
     * @param {string} componentName - Name of the component
     * @param {HTMLElement} container - Container element
     */
    async initializeComponent(componentName, container) {
        // Check if there's a global initialization function for this component
        const initFunctionName = `init${this.toPascalCase(componentName)}`;
        
        if (typeof window[initFunctionName] === 'function') {
            try {
                await window[initFunctionName](container);
                console.log(`🔧 Initialized ${componentName} functionality`);
            } catch (error) {
                console.error(`❌ Error initializing ${componentName}:`, error);
            }
        }
    }

    /**
     * Convert kebab-case to PascalCase
     * @param {string} str - String to convert
     * @returns {string} PascalCase string
     */
    toPascalCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }

    /**
     * Reload a specific component
     * @param {string} componentName - Name of the component to reload
     */
    async reloadComponent(componentName) {
        const container = document.querySelector(`[data-component="${componentName}"]`);
        if (container) {
            await this.loadComponent(componentName, container);
        }
    }

    /**
     * Check if a component is loaded
     * @param {string} componentName - Name of the component
     * @returns {boolean} Whether the component is loaded
     */
    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }
}

// Initialize the component loader when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ComponentLoader();
    
    // Make loader available globally for debugging
    window.componentLoader = loader;
    
    try {
        await loader.init();
        console.log('🎉 All components loaded successfully');
        
        // Dispatch a custom event when all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded', {
            detail: { loader, loadedComponents: Array.from(loader.loadedComponents) }
        }));
        
    } catch (error) {
        console.error('❌ Error initializing components:', error);
    }
});

// Handle navigation hash changes to ensure components work with SPA-like behavior
window.addEventListener('hashchange', () => {
    // Re-initialize any hash-dependent functionality in components
    if (window.componentLoader) {
        document.dispatchEvent(new CustomEvent('hashChanged', {
            detail: { hash: window.location.hash }
        }));
    }
});
