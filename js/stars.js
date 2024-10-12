import { InfiniteScrollingBackground } from './infiniteScrollingBackground.js';
 
export class Stars extends InfiniteScrollingBackground {
 
    constructor(ctx) {
 
        super(ctx);
 
        this.velocity = 1;
        this.spritesheetUrl = 'spritesheets/stars.png';
    }
 
}
