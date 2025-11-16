import {BlockMath} from 'react-katex';
import {useMemo} from 'react';

// Define the props for the component
interface KaTeXRendererProps {
    /**
     * The raw LaTeX string from the source (e.g., MathLive).
     * Can be in \displaylines{...} format or just have \\ newlines.
     */
    rawFormula: string;
}

/**
 * A component that renders a LaTeX string, automatically handling
 * MathLive's \displaylines{...} and simple newlines (\\)
 * by converting them to a KaTeX-friendly 'aligned' environment.
 */
export default function KaTeXRenderer({ rawFormula }: KaTeXRendererProps) {

    const processedFormula = useMemo(() => {
        if (!rawFormula) {
            return "";
        }

        // CASE 1: Handle MathLive's \displaylines{...} output
        if (
            rawFormula.startsWith('\\displaylines{') &&
            rawFormula.endsWith('}')
        ) {
            const content = rawFormula.slice('\\displaylines{'.length, -1);
            const modifiedContent = `&${content.replace(/\\\\/g, '\\\\&')}`;
            return `\\begin{align*}${modifiedContent}\\end{align*}`;
        }

        // CASE 2: Fallback for simple newlines (\\)
        if (
            rawFormula.includes('\\\\') &&
            !rawFormula.includes('\\begin{')
        ) {
            return `\\begin{align*}${rawFormula}\\end{align*}`;
        }

        // CASE 3: It's a standard formula, return as is.
        return rawFormula;

    }, [rawFormula]);


    if (!processedFormula) {
        return null;
    }

    return (
        <BlockMath>
            {processedFormula}
        </BlockMath>
    );
};