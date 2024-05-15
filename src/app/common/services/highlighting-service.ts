export class HighlightingService {

    private static readonly keywords: [RegExp, string][] = [
        [/git|cd|cat|echo|mkdir|touch|sudo|apt|apt-get/, 'command'],
        [/-[-a-zA-Z]+/, 'param'],
    ];

    static buildHTMLString(text: string): string {
        return text.replace(/[^\s]+/g, HighlightingService.buildHTMLWord)
                   .replace(/(>(\s+)<)/g, (_, $1, $2) => '>' + '&nbsp;'.repeat($2.length) + '<');
    }

    private static buildHTMLWord(text: string): string {
        let result: string = text;
        let match: boolean = false;
        HighlightingService.keywords.forEach(entry => {
            if (text.match(entry[0])) {
                result = `<span class="highlight-${entry[1]}">${text}</span>`;
                match = true;
            }
        });
        if (!match) {
            result = `<span class="highlight-plain">${text}</span>`;
        }
        return result;
    }
    
}