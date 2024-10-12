import { InfiniteScrollingBackground } from './infiniteScrollingBackground.js';
 
export class MountainsHigh extends InfiniteScrollingBackground {
 
 
    constructor(ctx) {
 
        super(ctx);
 
        this.velocity = 1.05;
        this.spritesheetUrl = 'spritesheets/mountains_high.png';
 
    }
 
}