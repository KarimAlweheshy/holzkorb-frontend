export function titleIfy(slug) {
  var words = slug.split('-');
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }
  return words.join(' ');
}
export function slugify(string) {
  const a =
    'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b =
    'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
export function formatMoney(total) {
  return `${!isNaN(parseFloat(total)) ? parseFloat(total).toFixed(2) : 0} EGP`;
}
export function getAmountHumanReadable(item, i = 1) {
  let { unitAmount, unitType } = item;
  if (!!item.isBagNotBasket && unitType === 'Basket') {
    unitType = 'Bundle';
  }
  return unitType === 'weight'
    ? +unitAmount * i >= 1000
      ? ((+unitAmount * i) / 1000).toFixed(2) + ' kg'
      : +unitAmount * i + ' grams'
    : `${i} ${
        unitType
          ? unitType.charAt(0).toUpperCase() + unitType.slice(1).toLowerCase()
          : 'Piece'
      }${i > 1 ? 's' : ''}`;
}
export function getTrimmedString(string, length = 8) {
  if (string.length <= length) {
    return string;
  } else {
    return string.substring(0, length) + '...';
  }
}

export function getKiloPrice(item) {
  return item.unitType === 'weight'
    ? item.unitAmount % 1000 > 100 || item.unitAmount >= 1000
      ? `1kg =  ${formatMoney((item.price * 1000) / item.unitAmount)}`
      : item.unitAmount % 1000 < 100
      ? `100gm =  ${formatMoney((item.price * 100) / item.unitAmount)}`
      : ''
    : null;
}
