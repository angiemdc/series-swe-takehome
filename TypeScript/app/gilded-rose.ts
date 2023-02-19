/// variables
export enum ITEMS_CONDITIONAL {
  AGED_BRIE = "Aged Brie",
  BACKSTAGE_CONCERT = "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS = "Sulfuras, Hand of Ragnaros",
  CONJURED = "Conjured Mana Cake",
}

export enum QUALITY {
  MAX_QUALITY = 50,
  MIN_QUALITY = 0,
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  //function for Backstage or items with the same behavior

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const { name, quality, sellIn } = this.items[i];

      if (name === ITEMS_CONDITIONAL.SULFURAS) {
        // Sulfuras can not be sold or modify its quality
        if (quality != 80) {
          throw new Error("Quality of Sulfuras must be 80");
        }
        continue;
      }
      // The sellIn value is decreased for all items except Sulfuras
      if (name !== ITEMS_CONDITIONAL.SULFURAS) {
        this.items[i].sellIn = sellIn - 1;
      }

      if (name === ITEMS_CONDITIONAL.BACKSTAGE_CONCERT) {
        if (sellIn <= 0) {
          this.items[i].quality = QUALITY.MIN_QUALITY;
        } else if (sellIn <= 5) {
          this.items[i].quality = quality + 3;
        } else if (sellIn <= 10) {
          this.items[i].quality = quality + 2;
        } else {
          this.items[i].quality = quality + 1;
        }
      } else if (name === ITEMS_CONDITIONAL.AGED_BRIE) {
        // "Aged Brie" actually increases in Quality the older it gets
        this.items[i].quality = Math.min(quality + 1, QUALITY.MAX_QUALITY);
      } else {
        let qualityFactor = 1;
        // For other items, the quality degrades twice as fast once sellIn is below

        if (sellIn <= 0) {
          qualityFactor *= 2;
        }
        this.items[i].quality = Math.max(
          quality - qualityFactor,
          QUALITY.MIN_QUALITY
        );
      }
      if (name === ITEMS_CONDITIONAL.CONJURED) {
        let qualityFactor = 2;
        if (sellIn <= 0) {
          qualityFactor *= 2;
        }
        this.items[i].quality = Math.max(
          quality - qualityFactor,
          QUALITY.MIN_QUALITY
        );
      }
      if (quality > QUALITY.MAX_QUALITY) {
        this.items[i].quality = QUALITY.MAX_QUALITY;
      }
    }
    return this.items;
  }
}
