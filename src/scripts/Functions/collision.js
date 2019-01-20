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

export const hitTestCircle = (c1, c2) => {
  const r1 = (c1._container.width / 2) + 1;
  const r2 = (c2._container.width / 2) + 1;
  const a =  r1 + r2;
  const x = c1._container.x - c2._container.x;
  const y = c1._container.y - c2._container.y;
  console.log(r1);
  console.log(r2);
  console.log(x);
  console.log(y);

  return a > Math.sqrt((x * x) + (y * y));
} 

export const circleCollision = (c1, circles) => {
  for(let i =0; i < circles.length; i++) {
    if(hitTestCircle(c1, circles[i])) {
      return true;
    }
  }
  return false;
} 