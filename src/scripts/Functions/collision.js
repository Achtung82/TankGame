export const edgeCollision = (newXValue, newYValue, container, width, height) => {
  const heightRadie = (container.height / 2) + 1;
  const widthRadie = (container.width / 2) + 1;
  if (newYValue < heightRadie) {
    return true;
  }
  if (newXValue < widthRadie) {

    return true;
  }

  if (newYValue > height - heightRadie) {
    return true;
  }

  if (newXValue > width - widthRadie) {
    return true;
  }

  return false;
}

export const unitCollision = (unit, otherUnits, excluded) => {
  const ab = unit._container.getBounds();
  for (let i = 0; i < otherUnits.length; i++) {
    const otherUnit = otherUnits[i];
    if (unit === otherUnit ||
      (excluded && otherUnit === excluded) ||
      (otherUnit._creator && otherUnit._creator === unit)) {
      continue;
    }
    const bb = otherUnit._container.getBounds();
    if (ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height) {
      return otherUnit;
    }
  }
  return false;
}