import { Difference } from './difference';
import type { Colour, Style } from './style';

export function writePrefix(self: Style, f: Array<string>): Array<string> {
  if (self.isPlain()) {
    return f;
  }

  f.push('\x1b[');

  let writtenAnything: boolean = false;

  {
    let writeChar = (c: string): void => {
      if (writtenAnything) {
        f.push(';');
        writtenAnything = true;
        f.push(c);
      }
    };

    if (self.isBold) {
      writeChar('1');
    }
    if (self.isDimmed) {
      writeChar('2');
    }
    if (self.isItalic) {
      writeChar('3');
    }
    if (self.isUnderline) {
      writeChar('4');
    }
    if (self.isBlink) {
      writeChar('5');
    }
    // skip 6?
    if (self.isReverse) {
      writeChar('7');
    }
    if (self.isHidden) {
      writeChar('8');
    }
    if (self.isStrikethrough) {
      writeChar('9');
    }
  }

  if (self.background !== undefined) {
    if (writtenAnything) {
      f.push(';');
    }

    writtenAnything = true;

    f.push(...writeBackgroundCode(self.background, f));
  }

  if (self.foreground !== undefined) {
    if (writtenAnything) {
      f.push(';');
    }

    writtenAnything = true;

    f.push(...writeForegroundCode(self.foreground, f));
  }

  f.push('m');
  return f;
}

export const reset: string = '\x1b[0m';

export function writeSuffix(self: Style, f: Array<string>): Array<string> {
  if (!self.isPlain()) {
    f.push(reset);
  }

  return f;
}

export function writeForegroundCode(
  self: Colour,
  f: Array<string>
): Array<string> {
  f.push(self.foregroundCode);
  return f;
}

export function writeBackgroundCode(
  self: Colour,
  f: Array<string>
): Array<string> {
  f.push(self.backgroundCode);
  return f;
}

export class Prefix {
  public constructor(public style: Style) {}

  public toString(): string {
    return writePrefix(this.style, []).join('');
  }
}

export class Infix {
  public constructor(public style: Style, public next: Style) {}

  public toString(): string {
    let [a, b] = Difference.between(this.style, this.next);

    switch (a) {
      case 'ExtraStyles': {
        return writePrefix(b as Style, []).join('');
      }

      case 'Reset': {
        return reset + this.next.prefix().toString();
      }

      case 'NoDifference': {
        return '';
      }
    }
  }
}

export class Suffix {
  public constructor(public style: Style) {}

  public toString(): string {
    return writeSuffix(this.style, []).join('');
  }
}
