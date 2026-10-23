/**
 * Bloques personalizados para la lógica del juego de la oruga
 */
//% color="#008272" weight=100 icon="\uf1b0"
namespace caterpillarGame {

    let NEXT_SECTION_KEY = "__child_node";

    /**
     * Inicializa y añade una sección al cuerpo de la oruga
     */
    //% block="añadir sección a la oruga cabeza $head"
    export function addToBody(head: Sprite) {
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
        
        // Asignar colores aleatorios al cuerpo
        let newColor = randint(0x1, 0xE);
        newSection.image.replace(0x1, newColor);

        newSection.x = head.x;
        newSection.y = head.y;

        // Manejo de nodos enlazados
        newSection.data[NEXT_SECTION_KEY] = head.data[NEXT_SECTION_KEY];
        head.data[NEXT_SECTION_KEY] = newSection;
    }

    /**
     * Mueve el cuerpo de la oruga siguiendo la cabeza
     */
    //% block="mover cuerpo de la pieza $piece"
    export function moveBody(piece: Sprite) {
        const next = piece.data[NEXT_SECTION_KEY];
        if (next) {
            moveBody(next);
            next.x = piece.x;
            next.y = piece.y;
        }
    }
}
