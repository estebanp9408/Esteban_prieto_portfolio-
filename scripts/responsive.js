// ============================================================
// RESPONSIVE DESIGN MANAGER
// Maneja responsive behavior, hamburguesa menu y breakpoints
// ============================================================

/**
 * ResponsiveManager - Detecta cambios de viewport y maneja transiciones
 */
export const ResponsiveManager = {
  breakpoint: 'lg',
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
  },

  /**
   * Obtiene el breakpoint actual basado en window.innerWidth
   * @returns {string} 'xs' | 'sm' | 'md' | 'lg'
   */
  getBreakpoint() {
    const width = window.innerWidth;
    if (width < this.breakpoints.sm) return 'xs';
    if (width < this.breakpoints.md) return 'sm';
    if (width < this.breakpoints.lg) return 'md';
    return 'lg';
  },

  /**
   * Actualiza breakpoint y ejecuta callbacks si cambió
   */
  updateBreakpoint() {
    const newBreakpoint = this.getBreakpoint();
    if (newBreakpoint !== this.breakpoint) {
      const oldBreakpoint = this.breakpoint;
      this.breakpoint = newBreakpoint;
      this.handleBreakpointChange(oldBreakpoint, newBreakpoint);
    }
  },

  /**
   * Maneja cambio de breakpoint
   * @param {string} oldBreakpoint - Breakpoint anterior
   * @param {string} newBreakpoint - Breakpoint nuevo
   */
  handleBreakpointChange(oldBreakpoint, newBreakpoint) {
    // Si pasamos de mobile a desktop o viceversa
    if ((oldBreakpoint === 'xs' || oldBreakpoint === 'sm') &&
        (newBreakpoint === 'md' || newBreakpoint === 'lg')) {
      // De mobile a tablet/desktop
      this.transitionToDesktop();
    } else if ((oldBreakpoint === 'md' || oldBreakpoint === 'lg') &&
               (newBreakpoint === 'xs' || newBreakpoint === 'sm')) {
      // De tablet/desktop a mobile
      this.transitionToMobile();
    }
  },

  /**
   * Transición a layout desktop
   */
  transitionToDesktop() {
    MobileMenu.hide();
    MobileMenu.cleanup();
    // Restaurar evento mouseenter en container
    const container = document.querySelector('.main-photo_container');
    const mainNav = document.querySelector('.main-nav');
    if (container && mainNav) {
      container.addEventListener('mouseenter', () => {
        mainNav.classList.add('main-nav_hover');
      });
      container.addEventListener('mouseleave', () => {
        mainNav.classList.remove('main-nav_hover');
      });
    }
  },

  /**
   * Transición a layout mobile
   */
  transitionToMobile() {
    // El menú se maneja automáticamente con CSS
  },

  /**
   * Inicializa el responsive manager
   */
  init() {
    this.updateBreakpoint();

    // Event listeners para resize
    window.addEventListener('resize', () => {
      this.updateBreakpoint();
    });

    // Event listener para cambio de orientación
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.updateBreakpoint(), 100);
    });
  },
};

/**
 * MobileMenu - Maneja el menú (en desktop solo sirve para cleanup)
 */
export const MobileMenu = {
  isOpen: false,
  toggleButton: null,
  mainNav: null,

  /**
   * Inicializa el menú
   */
  init() {
    this.toggleButton = document.querySelector('.header-menu-toggle');
    this.mainNav = document.querySelector('.main-nav');

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }

    // En desktop, limpiar clases innecesarias
    if (ResponsiveManager.breakpoint === 'lg') {
      this.cleanup();
    }
  },

  /**
   * Abre el menú (si existe hamburguesa)
   */
  open() {
    if (!this.toggleButton) return;
    this.isOpen = true;
    this.toggleButton.classList.add('active');
    if (this.mainNav) {
      this.mainNav.classList.add('mobile-open');
    }
  },

  /**
   * Cierra el menú
   */
  close() {
    if (!this.toggleButton) return;
    this.isOpen = false;
    this.toggleButton.classList.remove('active');
    if (this.mainNav) {
      this.mainNav.classList.remove('mobile-open');
    }
  },

  /**
   * Alterna el menú
   */
  toggle() {
    if (!this.toggleButton) return;
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  /**
   * Limpia estilos de menú
   */
  cleanup() {
    this.close();
    if (this.toggleButton) {
      this.toggleButton.classList.remove('active');
    }
    if (this.mainNav) {
      this.mainNav.classList.remove('mobile-open');
      this.mainNav.classList.remove('main-nav_hover');
    }
  },

  /**
   * Oculta el menú (sin mostrar)
   */
  hide() {
    if (this.mainNav) {
      this.mainNav.classList.remove('mobile-open');
    }
  },
};

/**
 * Inicializa todos los managers responsive
 */
export function initResponsive() {
  ResponsiveManager.init();
  MobileMenu.init();
}
