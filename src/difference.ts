import { Style } from './style';

type RawDifference = ['ExtraStyles', Style] | ['NoDifference'] | ['Reset'];
export class Difference {
  public readonly nul: number = 0;

  public static between(first: Style, next: Style): RawDifference {
    if (first.eq(next)) {
      return ['NoDifference'];
    }

    if (
      first.isBold && !next.isBold ||
      first.isDimmed && !next.isDimmed ||
      first.isItalic && !next.isItalic ||
      first.isUnderline && !next.isUnderline ||
      first.isBlink && !next.isBlink ||
      first.isReverse && !next.isReverse ||
      first.isHidden && !next.isHidden ||
      first.isStrikethrough && !next.isStrikethrough ||
      first.foreground !== undefined && next.foreground === undefined ||
      first.background !== undefined && next.background === undefined
    ) {
      return ['Reset'];
    }

    let extraStyles: Style = new Style();

    if (first.isBold !== next.isBold) {
      extraStyles.isBold = true;
    }
    if (first.isDimmed !== next.isDimmed) {
      extraStyles.isDimmed = true;
    }
    if (first.isItalic !== next.isItalic) {
      extraStyles.isItalic = true;
    }
    if (first.isUnderline !== next.isUnderline) {
      extraStyles.isUnderline = true;
    }
    if (first.isBlink !== next.isBlink) {
      extraStyles.isBlink = true;
    }
    if (first.isReverse !== next.isReverse) {
      extraStyles.isReverse = true;
    }
    if (first.isHidden !== next.isHidden) {
      extraStyles.isHidden = true;
    }
    if (first.isStrikethrough !== next.isStrikethrough) {
      extraStyles.isStrikethrough = true;
    }

    return ['ExtraStyles', extraStyles];
  }
}
