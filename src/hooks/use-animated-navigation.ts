import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

export function useAnimatedNavigation() {
    const navigate = useNavigate();

    const animatedNavigate = useCallback(async (
        options: Parameters<typeof navigate>[0],
        excludeHeaderFooter: boolean = true
    ) => {
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
        await new Promise(resolve => setTimeout(resolve, 150));

        // Navigate
        return navigate(options);
    }, [navigate]);

    return animatedNavigate;
}
