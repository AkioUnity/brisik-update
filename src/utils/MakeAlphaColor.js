function hex2RGB(hex) {
  let bigint, r, g, b;

  if (hex.indexOf('#') >= 0) {
    hex = hex.replace(hex[hex.indexOf('#')], '');
  }

  bigint = parseInt(hex, 16);
  r = (bigint >> 16) & 255;
  g = (bigint >> 8) & 255;
  b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

export default (color, transparency) => {
  const _color = color[0] === '#' ? hex2RGB(color) : color;

  return _color.replace(')', `, .${transparency})`).replace('rgb', 'rgba');
};