import { x1b } from './common';
import { Style } from './style';

export class Colour {
  public constructor(
    private readonly fgCode: string,
    private readonly bgCode: string
  ) {}

  /** return a new style with this colour set as the foreground colour. */
  public style_fg(): Style {
    const self: Style = new Style();
    self.fg(this);
    return self;
  }

  /** return a new style with this colour set as the foreground colour. */
  public style_bg(): Style {
    const self: Style = new Style();
    self.bg(this);
    return self;
  }

  /** style some text with this colour as the foreground */
  public paint_fg(text: string): string {
    return this.style_fg().paint(text);
  }

  /** style some text with this colour as the foreground */
  public paint_bg(text: string): string {
    return this.style_bg().paint(text);
  }

  /** return the foreground code for this colour */
  public fg(): string {
    return x1b + '[' + this.fgCode + 'm';
  }

  /** return the background code for this colour */
  public bg(): string {
    return x1b + '[' + this.bgCode + 'm';
  }

  /** foreground code: `30`, background code `40` */
  public static black(): Colour {
    return new this('30', '40');
  }

  /** foreground code: `31`, background code `41` */
  public static red(): Colour {
    return new this('31', '41');
  }

  /** foreground code: `32`, background code `42` */
  public static green(): Colour {
    return new this('32', '42');
  }

  /** foreground code: `33`, background code `43` */
  public static yellow(): Colour {
    return new this('33', '43');
  }

  /** foreground code: `34`, background code `44` */
  public static blue(): Colour {
    return new this('34', '44');
  }

  /** foreground code: `35`, background code `45` */
  public static magenta(): Colour {
    return new this('35', '45');
  }

  /** foreground code: `36`, background code `46` */
  public static cyan(): Colour {
    return new this('36', '46');
  }

  /** foreground code: `37`, background code `47` */
  public static white(): Colour {
    return new this('37', '47');
  }

  /** foreground code: `39`, background code `49` */
  public static default(): Colour {
    return new this('39', '49');
  }

  /** foreground code: `0`, background code `0` */
  public static reset(): Colour {
    return new this('0', '0');
  }

  /** foreground code: `90`, background code `100` */
  public static bright_black(): Colour {
    return new this('90', '100');
  }

  /** foreground code: `91`, background code `101` */
  public static bright_red(): Colour {
    return new this('91', '101');
  }

  /** foreground code: `92`, background code `102` */
  public static bright_green(): Colour {
    return new this('92', '102');
  }

  /** foreground code: `93`, background code `103` */
  public static bright_yellow(): Colour {
    return new this('93', '103');
  }

  /** foreground code: `94`, background code `104` */
  public static bright_blue(): Colour {
    return new this('94', '104');
  }

  /** foreground code: `95`, background code `105` */
  public static bright_magenta(): Colour {
    return new this('95', '105');
  }

  /** foreground code: `96`, background code `106` */
  public static bright_cyan(): Colour {
    return new this('96', '106');
  }

  /** foreground code: `97`, background code `107` */
  public static bright_white(): Colour {
    return new this('97', '107');
  }

  /** Fixed 256-colour */
  public static fixed(x: number): Colour {
    return new this(`38;5;${x}`, `48;5;${x}`);
  }

  /** RGB colour */
  public static rgb(r: number, g: number, b: number): Colour {
    return new this(`38;2;${r};${g};${b}`, `48;2;${r};${g};${b}`);
  }
}
