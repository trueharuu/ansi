import type { Colour } from './colour';
import { x1b } from './common';

export class Style {
  public codes(): string {
    let buf: string = '';

    if (this._fg) {
      buf += this._fg.fg();
    }

    if (this._bg) {
      buf += this._bg.fg();
    }

    if (this._bold) {
      buf += x1b + '[1m';
    }

    if (this._dim) {
      buf += x1b + '[2m';
    }

    if (this._italic) {
      buf += x1b + '[3m';
    }

    if (this._underline) {
      buf += x1b + '[4m';
    }

    if (this._blinking) {
      buf += x1b + '[5m';
    }

    if (this._inverse) {
      buf += x1b + '[7m';
    }

    if (this._hidden) {
      buf += x1b + '[8m';
    }

    if (this._strikethrough) {
      buf += x1b + '[9m';
    }

    return buf;
  }

  public paint(text: string): string {
    return `${Style.reset()}${this.codes()}${text}${Style.reset()}`;
  }

  public static reset(): string {
    return x1b + '[0m';
  }

  private _bold: boolean = false;

  /** returns true if this Style has the `bold` property set. */
  public is_bold(): boolean {
    return this._bold;
  }

  /** sets the `bold` property of this Style. */
  public bold(value: boolean = true): this {
    this._bold = value;
    return this;
  }

  /** returns a new Style with the `bold` property set. */
  public static bold(): Style {
    const self: Style = new this();
    return self.bold();
  }

  private _dim: boolean = false;

  /** returns true if this Style has the `dim` property set. */
  public is_dim(): boolean {
    return this._dim;
  }

  /** sets the `dim` property of this Style. */
  public dim(value: boolean = true): this {
    this._dim = value;
    return this;
  }

  /** returns a new Style with the `dim` property set. */
  public static dim(): Style {
    const self: Style = new this();
    return self.dim();
  }

  private _italic: boolean = false;

  /** returns true if this Style has the `italic` property set. */
  public is_italic(): boolean {
    return this._italic;
  }

  /** sets the `italic` property of this Style. */
  public italic(value: boolean = true): this {
    this._italic = value;
    return this;
  }

  /** returns a new Style with the `italic` property set. */
  public static italic(): Style {
    const self: Style = new this();
    return self.italic();
  }

  private _underline: boolean = false;

  /** returns true if this Style has the `underline` property set. */
  public is_underline(): boolean {
    return this._underline;
  }

  /** sets the `underline` property of this Style. */
  public underline(value: boolean = true): this {
    this._underline = value;
    return this;
  }

  /** returns a new Style with the `underline` property set. */
  public static underline(): Style {
    const self: Style = new this();
    return self.underline();
  }

  private _blinking: boolean = false;

  /** returns true if this Style has the `blinking` property set. */
  public is_blinking(): boolean {
    return this._blinking;
  }

  /** sets the `blinking` property of this Style. */
  public blinking(value: boolean = true): this {
    this._blinking = value;
    return this;
  }

  /** returns a new Style with the `blinking` property set. */
  public static blinking(): Style {
    const self: Style = new this();
    return self.blinking();
  }

  private _inverse: boolean = false;

  /** returns true if this Style has the `inverse` property set. */
  public is_inverse(): boolean {
    return this._inverse;
  }

  /** sets the `inverse` property of this Style. */
  public inverse(value: boolean = true): this {
    this._inverse = value;
    return this;
  }

  /** returns a new Style with the `inverse` property set. */
  public static inverse(): Style {
    const self: Style = new this();
    return self.inverse();
  }

  private _hidden: boolean = false;

  /** returns true if this Style has the `hidden` property set. */
  public is_hidden(): boolean {
    return this._hidden;
  }

  /** sets the `hidden` property of this Style. */
  public hidden(value: boolean = true): this {
    this._hidden = value;
    return this;
  }

  /** returns a new Style with the `hidden` property set. */
  public static hidden(): Style {
    const self: Style = new this();
    return self.hidden();
  }

  private _strikethrough: boolean = false;

  /** returns true if this Style has the `strikethrough` property set. */
  public is_strikethrough(): boolean {
    return this._strikethrough;
  }

  /** sets the `strikethrough` property of this Style. */
  public strikethrough(value: boolean = true): this {
    this._strikethrough = value;
    return this;
  }

  /** returns a new Style with the `strikethrough` property set. */
  public static strikethrough(): Style {
    const self: Style = new this();
    return self.strikethrough();
  }

  private _fg?: Colour;

  /** returns true if this Style has a foreground colour. */
  public has_fg(): boolean {
    return this._fg !== undefined;
  }

  /** sets the foreground colour of this Style. */
  public fg(value?: Colour): this {
    this._fg = value;
    return this;
  }

  /** returns a new Style with a foreground colour set. */
  public static fg(value: Colour): Style {
    const self: Style = new this();
    return self.fg(value);
  }

  private _bg?: Colour;

  /** returns true if this Style has a background colour. */
  public has_bg(): boolean {
    return this._bg !== undefined;
  }

  /** sets the background colour of this Style. */
  public bg(value?: Colour): this {
    this._bg = value;
    return this;
  }

  /** returns a new Style with a background colour set. */
  public static bg(value: Colour): Style {
    const self: Style = new this();
    return self.bg(value);
  }
}
