import { Item, GildedRose, ITEMS_CONDITIONAL, QUALITY } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  describe("updateQuality", () => {
    it("should decrease sellIn value by 1 for all items except Sulfuras", () => {
      const item = new Item("some item", 5, 10);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.sellIn).toBe(4);
    });

    it("should not decrease quality below 0", () => {
      const item = new Item("some item", 5, 0);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.quality).toBe(0);
    });

    it("should not increase quality above 50", () => {
      const item = new Item(ITEMS_CONDITIONAL.AGED_BRIE, 5, 50);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.quality).toBe(50);
    });

    it("should increase quality of Aged Brie by 1", () => {
      const item = new Item(ITEMS_CONDITIONAL.AGED_BRIE, 5, 10);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.quality).toBe(11);
    });

    it("should increase quality of Backstage passes by 1 if sellIn > 10", () => {
      const item = new Item(ITEMS_CONDITIONAL.BACKSTAGE_CONCERT, 15, 10);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.quality).toBe(11);
    });

    it("should set quality of Backstage passes to 0 if sellIn <= 0", () => {
      const item = new Item(ITEMS_CONDITIONAL.BACKSTAGE_CONCERT, 0, 10);
      const gildedRose = new GildedRose([item]);
      gildedRose.updateQuality();

      expect(item.quality).toBe(0);
    });

    it("should degrade quality twice as fast for normal items when sellIn <= 0", () => {
      const item = new Item("some item", 0, 10);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(item.quality).toBe(8);
    });
  });

  it("should degrade quality twice as fast for Conjured Mana Cake", () => {
    const item = new Item("Conjured Mana Cake", 5, 10);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();
    expect(item.quality).toBe(8);
  });
});
