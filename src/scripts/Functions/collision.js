export const edgeCollision = (newXValue, newYValue, container) => {
  if (newYValue < container.height / 2) {
    return true;
  }

  if (newXValue < container.width / 2) {
    return true;
  }

  if (newYValue > window.innerHeight - container._bounds.maxY) {
    return true;
  }

  if (newXValue > window.innerWidth - container._bounds.maxX) {
    return true;
  }

  return false;
}

export const unitCollision = (unit, otherUnits, excluded) => {
  const ab = unit._container.getBounds();
  for (let i = 0; i < otherUnits.length; i++) {
    const otherUnit = otherUnits[i];
    if (unit === otherUnit || (excluded && otherUnit === excluded)) {
      continue;
    }
    const bb = otherUnit._container.getBounds();
    if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
      return otherUnit;
    }
  }
  return false;
}