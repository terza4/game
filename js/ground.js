import { InfiniteScrollingBackground } from './infiniteScrollingBackground.js';
 
export class Ground extends InfiniteScrollingBackground {
 
 
    constructor(ctx) {
 
        super(ctx);
 
        this.velocity = 2;
        this.spritesheetUrl = 'spritesheets/ground.png';
    }
 
}
