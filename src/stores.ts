import { writable } from 'svelte/store';

export const roundToEdit = writable(0);

export const players = writable([
    {
        id: 0,
        name: 'Abby'
    },
    {
        id: 1,
        name: 'Jason'
    }
]);

export const scores = writable([
    [
        {
            id: 0,
            points: 10
        },
        {
            id: 1,
            points: 5
        },
    ],
    [
        {
            id: 0,
            points: 20
        },
        {
            id: 1,
            points: 12
        },
    ],
]);