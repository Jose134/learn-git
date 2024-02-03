import { MarkedOptions, MarkedRenderer } from "ngx-markdown";

export function markedOptionsCustom(): MarkedOptions {

    const renderer = new MarkedRenderer();
    
    const rendererHeading = renderer.heading;
    renderer.heading = (text: string, level: number, raw: string) => {
        // Header customization for chip support
        const chipSearch = text.matchAll(/\s*<chip>[^<]*<\/chip>\s*/g);
        const matches = [...chipSearch];
        matches.forEach(match => {
            console.log(match);
            const chipText = match[0].replace(/\s+<chip>/, '').replace(/<\/chip>/, '');
            text = text.replace(match[0], ` <span class="chip chip-${chipText}">${chipText}</span> `);
        });
        return rendererHeading(text, level, raw);
    };

    renderer.code = (text: string) => {
        // Codeblock customization to support solution censoring
        let html = '<div class="codeblock">';
        let addCss = '';
        if (text.startsWith('SOLUTION')) {
            html += '<div class="hover-instructions">Hover to show the solution</div>';
            html += '<pre>';
            addCss = ' class="code-solution"';
            text = text.replace('SOLUTION\n', '');
        }
        
        html += '<code' + addCss + '>' + text + '</code></pre></div>';
        return html;
    };

    return {
        renderer: renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
    }
}