import { CodeHighlight, CodeHighlightType } from "../models/code-highlight";

export class HighlightingService {

    private static readonly keywords: [RegExp, string][] = [
        [/git|cd|cat|echo|mkdir|touch|sudo|apt|apt-get/, CodeHighlightType.Command],
        [/ [|&><] /, CodeHighlightType.Operator],
        [/-[-a-zA-Z]+/, CodeHighlightType.Param],
        [/\s+/, CodeHighlightType.WhiteSpace],
    ];

    static buildHighlighting(code: string): CodeHighlight[] {
        return code.split(/(\s+)/).map(HighlightingService.buildHightlightingNode);
    }

    private static buildHightlightingNode(text: string): CodeHighlight {
        let result: CodeHighlight = { text: text, type: CodeHighlightType.Plain };
        HighlightingService.keywords.forEach(entry => {
            if (text.match(entry[0])) {
                result.type = entry[1] as CodeHighlightType;
            }
        });
        return result;
    }
    
}