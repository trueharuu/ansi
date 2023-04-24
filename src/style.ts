import { Infix, Prefix, Suffix } from './ansi';

export class Style {
  /** The style's background colour, if it has one. */
  public background?: Colour;

  /** The style's foreground colour, if it has one. */
  public foreground?: Colour;

  /** Whether this style is blinking. */
  public isBlink: boolean = false;

  /** Whether this style is bold. */
  public isBold: boolean = false;

  /** Whether this style is dimmed. */
  public isDimmed: boolean = false;

  /** Whether this style is hidden. */
  public isHidden: boolean = false;

  /** Whether this style is italic. */
  public isItalic: boolean = false;

  /** Whether this style has reverse colours. */
  public isReverse: boolean = false;

  /** Whether this style is struckthrough. */
  public isStrikethrough: boolean = false;

  /** Whether this style is underlined. */
  public isUnderline: boolean = false;

  // impl Style

  /**
   * Creates a new Style with no properties set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style();
   * console.log(style.paint("hi"));
   * ```
   */
  public constructor() {
    void 0;
  }

  public clone(): Style {
    const copy: Style = new Style();
    Object.assign(copy, this);
    return copy;
  }

  public infix(next: Style): Infix {
    return new Infix(this, next);
  }

  public prefix(): Prefix {
    return new Prefix(this);
  }

  public suffix(): Suffix {
    return new Suffix(this);
  }

  private mutateCopy<F extends (this: Style) => unknown>(f: F): Style {
    const copy: Style = this.clone();
    f.bind(copy)();
    return copy;
  }

  private setProperty<K extends keyof this>(key: K, value: this[K]): Style {
    return this.mutateCopy(() => {
      this[key] = value;
    });
  }

  public eq(rhs: Style): boolean {
    for (const key in this) {
      if (typeof this[key] === 'function') {
        continue;
      }

      if (this[key] !== rhs[key as keyof Style]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns a `Style` with the bold property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().bold();
   * console.log(style.paint("hey"));
   */
  public bold(): Style {
    return this.setProperty('isBold', true);
  }

  /**
   * Returns a `Style` with the dimmed property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().dimmed();
   * console.log(style.paint("sup"));
   */
  public dimmed(): Style {
    return this.setProperty('isDimmed', true);
  }

  /**
   * Returns a `Style` with the italic property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().italic();
   * console.log(style.paint("greetings"));
   */
  public italic(): Style {
    return this.setProperty('isItalic', true);
  }

  /**
   * Returns a `Style` with the underline property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().underline();
   * console.log(style.paint("salutations"));
   */
  public underline(): Style {
    return this.setProperty('isUnderline', true);
  }

  /**
   * Returns a `Style` with the blink property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().blink();
   * console.log(style.paint("wazzup"));
   */
  public blink(): Style {
    return this.setProperty('isBlink', true);
  }

  /**
   * Returns a `Style` with the reverse property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().reverse();
   * console.log(style.paint("aloha"));
   */
  public reverse(): Style {
    return this.setProperty('isReverse', true);
  }

  /**
   * Returns a `Style` with the hidden property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().hidden();
   * console.log(style.paint("ahoy"));
   */
  public hidden(): Style {
    return this.setProperty('isHidden', true);
  }

  /**
   * Returns a `Style` with the strikethrough property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().strikethrough();
   * console.log(style.paint("yo"));
   */
  public strikethrough(): Style {
    return this.setProperty('isStrikethrough', true);
  }

  /**
   * Returns a `Style` with the foreground colour property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().fg(Color.Yellow);
   * console.log(style.paint("hi"));
   */
  public fg(foreground: Colour): Style {
    return this.setProperty('foreground', foreground);
  }

  /**
   * Returns a `Style` with the background colour property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().on(Color.Blue);
   * console.log(style.paint("eyyyy"));
   */
  public on(background: Colour): Style {
    return this.setProperty('foreground', background);
  }

  /**
   * Return true if this `Style` has no actual styles, and can be written without any control characters.
   *
   * # Examples
   *
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * console.log(new Style().isPlain()); // true
   * console.log(new Style().bold().isPlain()); // false
   */
  public isPlain(): boolean {
    return (
      this.foreground === undefined &&
      this.background === undefined &&
      !this.isBlink &&
      !this.isBold &&
      !this.isDimmed &&
      !this.isHidden &&
      !this.isItalic &&
      !this.isReverse &&
      !this.isStrikethrough &&
      !this.isUnderline
    );
  }
}

export class Colour {
  private constructor(
    public readonly foregroundCode: string,
    public readonly backgroundCode: string
  ) {}

  /**
   * Colour #0 (foreground code `30`, background `40`).
   *
   * This is not necessarily the background colour, and using it as one may render the text hard to read on terminals with dark backgrounds.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Black(): Colour {
    return new Colour('30', '40');
  }

  /**
   * Colour #1 (foreground code `31`, background `41`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Red(): Colour {
    return new Colour('31', '41');
  }

  /**
   * Colour #2 (foreground code `32`, background `42`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Green(): Colour {
    return new Colour('32', '42');
  }

  /**
   * Colour #3 (foreground code `33`, background `43`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Yellow(): Colour {
    return new Colour('33', '43');
  }

  /**
   * Colour #4 (foreground code `34`, background `44`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Blue(): Colour {
    return new Colour('34', '44');
  }

  /**
   * Colour #5 (foreground code `35`, background `45`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Purple(): Colour {
    return new Colour('35', '45');
  }

  /**
   * Colour #6 (foreground code `36`, background `46`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get Cyan(): Colour {
    return new Colour('36', '46');
  }

  /**
   * Colour #7 (foreground code `37`, background `47`).
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static get White(): Colour {
    return new Colour('37', '47');
  }

  /**
   * A colour number from 0 to 255, for use in 256-colour terminal environments.
   *
   * - Colours 0 to 7 are the `Black` to `White` variants respectively.
   *   These colours can usually be changed in the terminal emulator.
   * - Colours 8 to 15 are brighter versions of the eight colours above.
   *   These can also usually be changed in the terminal emulator, or it
   *   could be configured to use the original colours and show the text in
   *   bold instead. It varies depending on the program.
   * - Colours 16 to 231 contain several palettes of bright colours,
   *   arranged in six squares measuring six by six each.
   * - Colours 232 to 255 are shades of grey from black to white.
   *
   * It might make more sense to look at a [colour chart][cc].
   *
   * [cc]: https://upload.wikimedia.org/wikipedia/commons/1/15/Xterm_256color_chart.svg
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Fixed(u8: number): Colour {
    return new Colour('38;5;' + u8.toString(), '48;5;' + u8.toString());
  }

  /**
   * A 24-bit RGB colour, as specified by ISO-8613-3.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static RGB(r: number, g: number, b: number): Colour {
    return new Colour(`38;2;${r};${g};${b}`, `48;2;${r};${g};${b}`);
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour.
   *
   * # Examples
   *
   * ```ts
   * import { Colour } from "@rqft/ansi";
   *
   * let style = Colour.Red.normal();
   * console.log(style.paint("hi"));
   */
  public normal(): Style {
    return new Style().fg(this);
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the bold property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().bold();
   * console.log(style.paint("hey"));
   */
  public bold(): Style {
    return this.normal().bold();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the dimmed property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().dimmed();
   * console.log(style.paint("sup"));
   */
  public dimmed(): Style {
    return this.normal().dimmed();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the italic property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().italic();
   * console.log(style.paint("greetings"));
   */
  public italic(): Style {
    return this.normal().italic();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the underline property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().underline();
   * console.log(style.paint("salutations"));
   */
  public underline(): Style {
    return this.normal().underline();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the blink property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().blink();
   * console.log(style.paint("wazzup"));
   */
  public blink(): Style {
    return this.normal().blink();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the reverse property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().reverse();
   * console.log(style.paint("aloha"));
   */
  public reverse(): Style {
    return this.normal().reverse();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the hidden property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().hidden();
   * console.log(style.paint("ahoy"));
   */
  public hidden(): Style {
    return this.normal().hidden();
  }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the strikethrough property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().strikethrough();
   * console.log(style.paint("yo"));
   */
  public strikethrough(): Style {
    return this.normal().strikethrough();
  }

  // /**
  //  * Returns a `Style` with the foreground colour set to this colour and the foreground colour property set.
  //  *
  //  * # Examples
  //  * ```ts
  //  * import { Style } from "@rqft/ansi";
  //  *
  //  * let style = new Style().fg(Color.Yellow);
  //  * console.log(style.paint("hi"));
  //  */
  // public fg(foreground: Colour): Style {
  //   return this.setProperty('foreground', foreground);
  // }

  /**
   * Returns a `Style` with the foreground colour set to this colour and the background colour property set.
   *
   * # Examples
   * ```ts
   * import { Style } from "@rqft/ansi";
   *
   * let style = new Style().on(Color.Blue);
   * console.log(style.paint("eyyyy"));
   */
  public on(background: Colour): Style {
    return this.normal().on(background);
  }

  public prefix(): Prefix {
    return new Prefix(this.normal());
  }

  public infix(next: Colour): Infix {
    return new Infix(this.normal(), next.normal());
  }

  public suffix(): Suffix {
    return new Suffix(this.normal());
  }
}
