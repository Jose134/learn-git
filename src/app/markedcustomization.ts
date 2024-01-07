import { MarkedOptions, MarkedRenderer } from "ngx-markdown";

export function markedOptionsCustom(): MarkedOptions {

    const renderer = new MarkedRenderer();

    renderer.code = (text: string) => {
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