export const handleKeyDown = (evt, player) => {
  switch (evt.keyCode) {
    case 17:
      player.break(true);
      return;
    case 37:
      player.turnLeft(true);
      return;
    case 38:
      player.accelerate(true);
      return;
    case 39:
      player.turnRight(true);
      return;
    case 40:
      player.deaccelerate(true);
      return;
    case 32:
      player.shoot();
      return;
  }
}

export const handleKeyUp = (evt, player) => {
  switch (evt.keyCode) {
    case 17:
      player.break(false);
      return;
    case 38:
      player.accelerate(false);
      return;
    case 37:
    case 39:
      player.turnLeft(false);
      player.turnRight(false);
      return;
    case 40:
      player.deaccelerate(false);
      return;
  }
}