import { MarkedOptions, MarkedRenderer } from "ngx-markdown";

export function markedOptionsCustom(): MarkedOptions {

    const renderer = new MarkedRenderer();

    renderer.code = (text: string) => {
        let html = '<pre>';
        let addCss = '';
        if (text.startsWith('SOLUTION')) {
            //html += '<div class="hover-instructions">Hover to show the solution</div>';
            addCss = ' class="code-solution"';
        }
        
        html += '<code' + addCss + '>' + text + '</code></pre>';
        return html;
    };

    return {
        renderer: renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
    }
}