const chooseNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return;
  } else if (min > max) {
    const savedMin = min;
    min = max;
    max = savedMin;
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

chooseNumber(10, 200);
