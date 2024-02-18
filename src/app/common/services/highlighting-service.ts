export class HighlightingService {

    private static readonly keywords: [RegExp, string][] = [
        [/git|cd|cat|echo|mkdir|touch/, 'command'],
        [/-[-a-zA-Z]+/, 'param'],
    ];

    static buildHTMLString(text: string): string {
        return text.replace(/[^\s]+/g, HighlightingService.buildHTMLWord);
    }

    private static buildHTMLWord(text: string): string {
        let result: string = text;
        HighlightingService.keywords.forEach(entry => {
            if (text.match(entry[0])) {
                result = `<span class="highlight-${entry[1]}">${text}</span>`;
            }
        });
        return result;
    }
    
}