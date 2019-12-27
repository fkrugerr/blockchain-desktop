import { compose, range, map } from 'rambda';
import uuidv4 from 'uuid/v4';


export const generateBlocks = ({ count, width }) => {
  console.log(width);
  const makeBlock = counter => ({
    id: uuidv4(),
    title: `Block #${counter}`,
    w: 300,
    h: 150,
    x: counter * 50,
    y: (counter - 1) * 50,
  });

  return compose(
    map(makeBlock),
    range(1),
  )(count + 1);
};

export const emtty = '';
