import { useNavigate, useLocation } from '@tanstack/react-router';
import { useCallback } from 'react';

export function useAnimatedNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const animatedNavigate = useCallback(async (
        options: Parameters<typeof navigate>[0],
        isBack: boolean = false,
        excludeHeaderFooter: boolean = true
    ) => {
        // Check if we're navigating to the same route
        const targetPath = typeof options === 'object' && 'to' in options ? options.to : options;
        const isCurrentRoute = targetPath === location.pathname;

        // Add reverse animation class to all AOS elements
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            if (excludeHeaderFooter) {
                const parent = el.closest('header, footer');
                if (!parent) {
                    el.classList.remove('aos-animate');
                }
            } else {
                el.classList.remove('aos-animate');
            }
        });

        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));

        // If navigating to current route, trigger reappear animation
        if (isCurrentRoute && !isBack) {
            // Re-trigger AOS animations
            aosElements.forEach(el => {
                if (excludeHeaderFooter) {
                    const parent = el.closest('header, footer');
                    if (!parent) {
                        el.classList.add('aos-animate');
                    }
                } else {
                    el.classList.add('aos-animate');
                }
            });
            return;
        }

        // Navigate back or to specified route
        if (isBack) {
            window.history.back();
        } else {
            return navigate(options);
        }
    }, [navigate, location.pathname]);

    return animatedNavigate;
}
