import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null,
    rtl: false,
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const changeMarginRTl = () => {
        const elements = document.querySelectorAll('svg, i, .mr-3, .field, button, input, .ml-4, span, .p-checkbox.p-treetable-checkbox');

        elements.forEach((element) => {
            const marginRight = window.getComputedStyle(element).getPropertyValue('margin-right');
            const marginLeft = window.getComputedStyle(element).getPropertyValue('margin-left');

            if (marginRight) {
                element.style.marginLeft = marginRight;
                element.style.marginRight = 0;
            } else if (marginLeft) {
                element.style.marginRight = marginLeft;
                element.style.marginLeft = 0;
            }
        });
    }

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem, changeMarginRTl };
}
