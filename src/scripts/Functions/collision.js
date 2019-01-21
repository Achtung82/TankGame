export const edgeCollision = (newXValue, newYValue, container, width, height) => {
  const heightRadie = (container.height / 2) + 1;
  const widthRadie = (container.width / 2) + 1;
  return newYValue < heightRadie ||
    newXValue < widthRadie ||
    newYValue > height - heightRadie ||
    newXValue > width - widthRadie;
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

export const hitCircle = (px, py, r, c) => {
  const cb = c._container.getBounds();
  const r2 = (cb.width / 2);
  const a =  r + r2;
  const x = px - c._container.x;
  const y = py - c._container.y;
  return a > Math.sqrt((x * x) + (y * y));
} 

export const circleCollision = (px, py, r, circles) => {
  for(let i =0; i < circles.length; i++) {
    if(hitCircle(px, py, r, circles[i])) {
      return true;
    }
  }
  return false;
}