import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

type NavigateOptions = Parameters<typeof useNavigate>[0];
type BackOption = { back: true };

export function useAnimatedNavigation() {
    const navigate = useNavigate();

    const animatedNavigate = useCallback(async (
        options: NavigateOptions | BackOption,
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
        await new Promise(resolve => setTimeout(resolve, 300));

        // Navigate back or to specified route
        if ('back' in options && options.back) {
            window.history.back();
        } else {
            return navigate(options as NavigateOptions);
        }
    }, [navigate]);

    return animatedNavigate;
}
