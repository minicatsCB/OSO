import { markIsValid, wordMarker } from "./algorithm";

test('marked word is valid', () => {
    const mark: Array<string> = ['O', 'S', 'O'];
    expect(markIsValid(mark)).toBe(true);
});

test('marked word is invalid', () => {
    const invalidMarks: Array<Array<string>> = [
        ['O', 'O', 'O'],
        ['O', 'O', 'S'],
        ['O', 'S', 'S'],
        ['S', 'S', 'S'],
        ['S', 'S', 'O'],
        ['S', 'O', 'O'],
        ['S', 'O', 'S']
    ];
    for (const mark of invalidMarks) {
        expect(markIsValid(mark)).toBe(false);   
    }
});

test('marker generator returns 3 indexes', () => {
    const generator = wordMarker();
    generator.next();
    generator.next(4);
    generator.next(0);
    const { value } = generator.next(6);
    expect((value as Array<number>).length).toBe(3);
});