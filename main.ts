/**
 * Bloques personalizados para el juego de la oruga
 */
//% color="#008272" weight=100 icon="\uf1b0"
namespace caterpillarGame {

    let NEXT_SECTION_KEY = "__child_node";

    /**
     * Añade una nueva sección al cuerpo de la oruga
     */
    //% block="añadir sección a la oruga cabeza $head"
    export function addToBody(head: Sprite): void {
        const newSection = sprites.create(img`
            . . f f f f . .
            . f 1 1 1 1 f .
            f 1 1 1 1 1 1 f
            f 1 1 1 1 1 1 f
            f 1 1 1 1 1 1 f
            f 1 1 1 1 1 1 f
            . f 1 1 1 1 f .
            . . f f f f . .
        `, SpriteKind.Tail);
        
        newSection.data = {};

        let newColor: number;
        do {
            newColor = randint(0x1, 0xE);
        } while (newColor === 0x6);
        newSection.image.replace(0x1, newColor);

        do {
            newColor = randint(0x1, 0xE);
        } while (newColor === 0x6);
        newSection.image.replace(0xF, newColor);

        newSection.x = head.x;
        newSection.y = head.y;

        newSection.data[NEXT_SECTION_KEY] = head.data[NEXT_SECTION_KEY];
        head.data[NEXT_SECTION_KEY] = newSection;
    }

    /**
     * Mueve el cuerpo de la oruga siguiendo la pieza anterior
     */
    //% block="mover cuerpo de la pieza $piece"
    export function moveBody(piece: Sprite): void {
        const next = piece.data[NEXT_SECTION_KEY];
        if (next) {
            moveBody(next);
            next.x = piece.x;
            next.y = piece.y;
        }
    }
}
