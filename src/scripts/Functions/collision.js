export const edgeCollision = (newXValue, newYValue, container) => {
  if (newYValue < container.height / 2) {
    return false;
  }

  if (newXValue < container.width / 2) {
    return false;
  }

  if (newYValue > window.innerHeight - container._bounds.maxY) {
    return false;
  }

  if (newXValue > window.innerWidth - container._bounds.maxX) {
    return false;
  }

  return true;
}