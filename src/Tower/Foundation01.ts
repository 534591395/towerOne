/**
 * 地基 -01
 */

class Foundation01 extends Foundation {
    public constructor() {
        super();
        this.cacheAsBitmap = true;
        this.addChild( Utiles.createBitmapByName('empty01') );
    }
}