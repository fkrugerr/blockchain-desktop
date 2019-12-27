import { compose, range, map } from 'rambda';
import uuidv4 from 'uuid/v4';

const calculateX = (counter, width) => {
  const mod = (counter - 1) % 3;
  if (!mod) return 30;
  return mod === 1
    ? width / 2 - 150
    : width - 330;
};

export const generateBlocks = ({ count, width }) => {
  const makeBlock = (counter) => {
    const row = Math.ceil(counter / 3) - 1;
    return {
      id: uuidv4(),
      title: `Block #${counter}`,
      w: 300,
      h: 150,
      x: calculateX(counter, width),
      y: row && 150 * row + 30,
    };
  };

  return compose(
    map(makeBlock),
    range(1),
  )(count + 1);
};

export const emtty = '';
