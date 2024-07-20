export enum CodeHighlightType {
    Command = 'command',
    Param = 'param',
    Operator = 'operator',
    Plain = 'plain',
    WhiteSpace = 'whitespace'
}

export interface CodeHighlight {
    text: string;
    type: CodeHighlightType;
}