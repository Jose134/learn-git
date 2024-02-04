import { MarkedOptions, MarkedRenderer } from "ngx-markdown";

export function markedOptionsCustom(): MarkedOptions {

    const GITHUB_AVATAR_URL = 'https://avatars.githubusercontent.com/u/12801876';

    const renderer = new MarkedRenderer();
    
    const rendererParagraph = renderer.paragraph;
    renderer.paragraph = (text: string) => {
        if (text.startsWith('GIT-SVG')) {
            const filename = text.split('\n')[1];
            return filename ? `<img src="assets/svg/${filename}"></img>` : `Could not load ${filename}`;
        }
        return rendererParagraph(text);
    };

    const rendererHeading = renderer.heading;
    renderer.heading = (text: string, level: number, raw: string) => {
        // Header customization for chip support
        const chipSearch = text.matchAll(/\s*<chip>[^<]*<\/chip>\s*/g);
        const matches = [...chipSearch];
        matches.forEach(match => {
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

    const rendererImage = renderer.image;
    renderer.image = (href: string, title: string | null, text: string) => {
        // Customization to apply custom styling to avatar image
        if (href === GITHUB_AVATAR_URL) {
            return `<img class="avatar-img" src="${href}" alt="${text}">${title ?? ''}</img>`;
        }
        return rendererImage(href, title, text);
    };

    return {
        renderer: renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
    }
}